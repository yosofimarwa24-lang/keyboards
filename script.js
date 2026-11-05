const text = document.getElementById("text");
const keys = document.getElementById("keys");
const count = document.getElementById("count");

// حروف فارسی در ردیف‌های جداگانه
const rows = ["ضصثقفغعهخحج", "شسیبلاتنمکگ", "ظطزرذدپوزژچ"];

// ردیف علامت‌های خاص (شامل تیلده)
const symbols = ["~", "!", "؟", "،", ";", ".", "‌", "«", "»", "(", ")", "ـ"];

// ساخت حروف با DOM
rows.forEach((row) => {
  const div = document.createElement("div");
  div.className = "key-row";

  [...row].forEach((letter) => {
    const btn = document.createElement("button");
    btn.textContent = letter;

    btn.addEventListener("click", () => add(letter));

    div.appendChild(btn);
  });

  keys.appendChild(div);
});

// ساخت ردیف علامت‌ها
const symRow = document.createElement("div");
symRow.className = "key-row symbol-row";

symbols.forEach((sym) => {
  const btn = document.createElement("button");
  btn.textContent = sym;
  btn.className = "symbol-key";
  btn.addEventListener("click", () => add(sym));
  symRow.appendChild(btn);
});

keys.appendChild(symRow);

// نوشتن حروف
function add(char) {
  text.setRangeText(char, text.selectionStart, text.selectionEnd, "end");

  text.focus();
  update();
}

// حذف حرف
function del() {
  let start = text.selectionStart;
  let end = text.selectionEnd;

  if (start === end && start > 0) start--;

  text.setRangeText("", start, end, "end");

  text.focus();
  update();
}

// پاک کردن
function clearText() {
  text.value = "";
  update();
}

// کپی متن
async function copyText() {
  try {
    await navigator.clipboard.writeText(text.value);
    alert("متن کپی شد!");
  } catch {
    text.select();
    document.execCommand("copy");
    alert("متن کپی شد!");
  }
}

// شمارش حروف
function update() {
  count.textContent = text.value.length;
}

text.addEventListener("input", update);