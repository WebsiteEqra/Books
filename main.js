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