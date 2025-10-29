// ====== ELEMENTS ======
const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("birthdayMessage");
const titleEl = document.getElementById("mainTitle");
const textEl = document.getElementById("countdownText");
const bgMusic = document.getElementById("bgMusic");

// ====== TARGET DATE ======
const targetDate = new Date("October 28, 2025 00:00:00").getTime();

// ====== COUNTDOWN ======
function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    titleEl.textContent = "🎉 It's Your Birthday! 🎉";
    textEl.textContent = "";
    countdownEl.textContent = "";
    messageEl.classList.remove("hidden");
    titleEl.classList.add("birthday-glow");

    playMusic();
    startHearts();
    startConfetti();
    startBalloons();

    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);

// ====== MUSIC ======
function playMusic() {
  bgMusic.volume = 0.5;
  bgMusic.play().catch(() => {
    // fallback for autoplay restrictions
    document.body.addEventListener("click", () => bgMusic.play());
  });
}

// ====== HEARTS ======
function startHearts() {
  const canvas = document.getElementById("hearts");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let hearts = [];
  for (let i = 0; i < 50; i++) {
    hearts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 10 + 5,
      speed: Math.random() * 1 + 0.5,
      color: `rgba(255, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 150 + 150)}, 0.7)`
    });
  }

  function drawHeart(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size/2, y - size/2, x - size, y + size/3, x, y + size);
    ctx.bezierCurveTo(x + size, y + size/3, x + size/2, y - size/2, x, y);
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
      h.y -= h.speed;
      if (h.y < -10) { h.y = canvas.height + 10; h.x = Math.random() * canvas.width; }
      drawHeart(h.x, h.y, h.size, h.color);
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// ====== CONFETTI ======
function startConfetti() {
  const canvas = document.createElement("canvas");
  canvas.id = "confetti";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let confetti = [];
  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 3 + 1,
      speedX: Math.random() * 2 - 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      c.y += c.speedY;
      c.x += c.speedX;
      if (c.y > canvas.height) { c.y = -10; c.x = Math.random() * canvas.width; }
      if (c.x > canvas.width) { c.x = 0; }
      if (c.x < 0) { c.x = canvas.width; }
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.size, c.size);
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// ====== BALLOONS ======
function startBalloons() {
  const colors = ["#ff6b81", "#ffa500", "#ffde59", "#6b5bff", "#3bf"];
  for (let i = 0; i < 15; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.left = Math.random() * 90 + "%";
    balloon.style.animationDuration = (5 + Math.random() * 5) + "s";
    balloon.style.width = (30 + Math.random() * 20) + "px";
    balloon.style.height = (40 + Math.random() * 30) + "px";
    document.body.appendChild(balloon);
  }
}
