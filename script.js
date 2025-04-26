// 1️⃣ Timer que persiste com localStorage
(function detectDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(ua)) {
    document.body.classList.add('device-mobile');
  } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
    document.body.classList.add('device-mobile');
  } else {
    document.body.classList.add('device-desktop');
  }
})();

// ⏱️ Timer que persiste com localStorage
function startCountdown(duration) {
  const countdownElement = document.getElementById("countdown");
  const storageKey = "timerEndTime";

  let endTime = localStorage.getItem(storageKey);

  if (!endTime) {
    const now = Date.now();
    endTime = now + duration * 1000;
    localStorage.setItem(storageKey, endTime);
  } else {
    endTime = parseInt(endTime, 10);
  }

  function updateCountdown() {
    const now = Date.now();
    const remaining = endTime - now;

    if (remaining <= 0) {
      countdownElement.textContent = "00:00:00";
      localStorage.removeItem(storageKey);
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdownElement.textContent =
      `${hours.toString().padStart(2, "0")}:` +
      `${minutes.toString().padStart(2, "0")}:` +
      `${seconds.toString().padStart(2, "0")}`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// 2️⃣ Executa o timer ao carregar a página
window.onload = function () {
  const twentyFourHoursInSeconds = 60 * 60 * 24;
  startCountdown(twentyFourHoursInSeconds);
};

// 3️⃣ Lightbox dos depoimentos
document.querySelectorAll('.ver-depoimento').forEach((button, index) => {
  button.addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    const imageSources = ['img1.png', 'depoimento-3.jpg', 'depoimento-3.jpeg', 'depoimento-4.jpg'];
    lightboxImg.src = imageSources[index];
    lightbox.classList.remove('hidden');
  });
});

document.querySelector('.close-btn').addEventListener('click', () => {
  document.getElementById('lightbox').classList.add('hidden');
});
