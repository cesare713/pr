/* Mobile landing page interactivity */

const GOOGLE_FORM_URL = "https://forms.gle/7NjzQBmT4k5mVfFt6";

function $(sel, root = document) {
  return root.querySelector(sel);
}

function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function showToast(message) {
  const toast = $("#toast");
  const toastMsg = $("#toastMsg");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.hidden = false;

  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => {
    toast.hidden = true;
  }, 2600);
}

function initAccordion() {
  const triggers = $all("[data-acc-trigger]");
  if (!triggers.length) return;

  const openItem = (key) => {
    const t = $(`[data-acc-trigger="${key}"]`);
    const panel = $(`[data-acc-panel="${key}"]`);
    if (!t || !panel) return;

    t.setAttribute("aria-expanded", "true");
    const icon = t.querySelector(".acc-trigger__icon");
    if (icon) icon.textContent = "-";

    panel.hidden = false;
  };

  const closeItem = (key) => {
    const t = $(`[data-acc-trigger="${key}"]`);
    const panel = $(`[data-acc-panel="${key}"]`);
    if (!t || !panel) return;

    t.setAttribute("aria-expanded", "false");
    const icon = t.querySelector(".acc-trigger__icon");
    if (icon) icon.textContent = "+";

    panel.hidden = true;
  };

  triggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-acc-trigger");
      const isExpanded = btn.getAttribute("aria-expanded") === "true";

      // One-open-at-a-time UX.
      triggers.forEach((other) => {
        const otherKey = other.getAttribute("data-acc-trigger");
        if (otherKey !== key) closeItem(otherKey);
      });

      if (isExpanded) closeItem(key);
      else openItem(key);
    });
  });
}

function initGoogleFormButton() {
  const btn = $("#googleFormBtn");
  const finePrint = $("#ctaFinePrint");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (!GOOGLE_FORM_URL) {
      showToast("구글 폼 링크가 곧 연결됩니다.");
      if (finePrint) {
        finePrint.textContent = "현재는 임시 상태예요. 구글 폼 링크가 연결되면 다시 눌러주세요.";
      }
      return;
    }

    window.location.href = GOOGLE_FORM_URL;
  });
}

function initYear() {
  const el = $("#year");
  if (el) el.textContent = String(new Date().getFullYear());
}

initYear();
initAccordion();
initGoogleFormButton();

