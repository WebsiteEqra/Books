/* =============================
البحث عن كتاب
============================= */
function searchBook() {
  let input = document.getElementById("searchInput").value.toLowerCase().trim();

  if (!input) {
    alert("من فضلك اكتب كلمة للبحث");
    return;
  }

  // قائمة الكتب مع كلمات مفتاحية
  let books = [
    {
      keywords: ["life", "حياه", "حياة"],
      file: "book1.html"
    },
    {
      keywords: ["ابق", "قويا", "كن"],
      file: "book2.html"
    },
    {
      keywords: ["النفسي", "التلاعب", "تقنية"],
      file: "book3.html"
    },
    {
      keywords: ["إنسانا", "تكون", "كيف"],
      file: "book4.html"
    },
    {
      keywords: ["كيارا", "لأنها"],
      file: "book5.html"
    },
    {
      keywords: ["العربيه", "العربية", "الثقافه", "الثقافة"],
      file: "book6.html"
    }
  ];

  let found = null;

  // البحث بالكلمات المفتاحية
  for (let book of books) {
    for (let keyword of book.keywords) {
      if (input.includes(keyword.toLowerCase())) {
        found = book.file;
        break;
      }
    }
    if (found) break;
  }

  if (found) {
    window.location.href = found; // يفتح صفحة HTML بدل PDF
  } else {
    alert("الكتاب غير موجود");
  }
}
/* =============================
   🌙☀️ الوضع الليلي / الفاتح
============================= */
const toggleBtn = document.getElementById("toggleMode");
const body = document.body;

// تحميل الوضع المحفوظ
let savedMode = localStorage.getItem("mode");
if (savedMode) {
  body.classList.add(savedMode);
  toggleBtn.textContent =
    savedMode === "dark" ? "☀️ الوضع الفاتح" : "🌙 الوضع الداكن";
} else {
  body.classList.add("dark"); // الافتراضي داكن
  toggleBtn.textContent = "☀️ الوضع الفاتح";
}

// عند الضغط على الزر
toggleBtn.addEventListener("click", () => {
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
    localStorage.setItem("mode", "light");
    toggleBtn.textContent = "🌙 الوضع الداكن";
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    localStorage.setItem("mode", "dark");
    toggleBtn.textContent = "☀️ الوضع الفاتح";
  }
});