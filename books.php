<?php
$file = "books.json"; // ملف التخزين
if (!file_exists($file)) {
    file_put_contents($file, json_encode([]));
}
$data = json_decode(file_get_contents($file), true);

$book_id = $_GET['book_id'] ?? null;
$action  = $_GET['action'] ?? null;
$value   = isset($_GET['value']) ? intval($_GET['value']) : null;

if (!$book_id) {
    die(json_encode(["error" => "book_id missing"]));
}

// لو الكتاب مش موجود في الداتا نعمله تهيئة
if (!isset($data[$book_id])) {
    $data[$book_id] = [
        "views" => 0,
        "votes" => 0,
        "total" => 0
    ];
}

// ✅ عداد المشاهدات مع حماية مدى الحياة
if ($action === "view") {
    $cookie_name = "viewed_" . $book_id;
    if (!isset($_COOKIE[$cookie_name])) {
        $data[$book_id]["views"]++;
        // تخزين الكوكي لمدة 10 سنين
        setcookie($cookie_name, "1", time() + (10 * 365 * 24 * 60 * 60), "/");
    }
}

// ✅ التقييم مع حماية مدى الحياة
elseif ($action === "rate" && $value !== null) {
    if ($value >= 1 && $value <= 5) {
        $cookie_name = "rated_" . $book_id;
        if (!isset($_COOKIE[$cookie_name])) {
            $data[$book_id]["votes"]++;
            $data[$book_id]["total"] += $value;
            // تخزين الكوكي لمدة 10 سنين
            setcookie($cookie_name, $value, time() + (10 * 365 * 24 * 60 * 60), "/");
        }
    }
}

// ✅ إلغاء التقييم
elseif ($action === "unrate" && $value !== null) {
    if ($value >= 1 && $value <= 5) {
        $cookie_name = "rated_" . $book_id;
        if (isset($_COOKIE[$cookie_name])) {
            if ($data[$book_id]["votes"] > 0) {
                $data[$book_id]["votes"]--;
                $data[$book_id]["total"] -= $value;
            }
            // نحذف الكوكي
            setcookie($cookie_name, "", time() - 3600, "/");
        }
    }
}

// حفظ البيانات
file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// إخراج النتيجة
$book = $data[$book_id];
$avg  = $book["votes"] > 0 ? $book["total"] / $book["votes"] : 0;

header("Content-Type: application/json; charset=utf-8");
echo json_encode([
    "views" => $book["views"],
    "votes" => $book["votes"],
    "avg"   => $avg
], JSON_UNESCAPED_UNICODE);
