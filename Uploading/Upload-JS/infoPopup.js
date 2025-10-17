// 🟢 INFO POPUP JAVA SCRIPT

document.addEventListener("DOMContentLoaded", function () {
  const infoIcon = document.getElementById('phone-info');
  const popup = document.getElementById('phone-info-popup');
  if (infoIcon && popup) {
    infoIcon.addEventListener('mouseenter', () => popup.style.display = 'block');
    infoIcon.addEventListener('mouseleave', () => popup.style.display = 'none');
    infoIcon.addEventListener('focus', () => popup.style.display = 'block');
    infoIcon.addEventListener('blur', () => popup.style.display = 'none');
  }
});
