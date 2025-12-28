const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const result = document.getElementById("result");

const prizes = [
  "🎁 Скидка 10%",
  "🔥 Скидка 20%",
  "❌ Без приза",
  "🎉 Скидка 30%",
  "🎄 Подарок",
  "💥 Скидка 50%"
];

const colors = [
  "#ffcc00",
  "#ff6699",
  "#66ffcc",
  "#ff9966",
  "#99ccff",
  "#cc99ff"
];

let angle = 0;
let spinning = false;

function drawWheel() {
  const arc = Math.PI * 2 / prizes.length;
  for (let i = 0; i < prizes.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, arc * i + angle, arc * (i + 1) + angle);
    ctx.fill();

    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(arc * i + arc / 2 + angle);
    ctx.fillStyle = "#000";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "right";
    ctx.fillText(prizes[i], 140, 5);
    ctx.restore();
  }
}

drawWheel();

spinBtn.onclick = () => {
  if (spinning) return;
  spinning = true;
  result.textContent = "";

  const spinAngle = Math.random() * 3000 + 2000;
  const duration = 4000;
  const start = performance.now();

  function animate(time) {
    const progress = Math.min((time - start) / duration, 1);
    angle = spinAngle * easeOut(progress) * Math.PI / 180;
    ctx.clearRect(0, 0, 300, 300);
    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      const index = prizes.length -
        Math.floor(((angle % (Math.PI * 2)) / (Math.PI * 2)) * prizes.length) - 1;
      result.textContent = Ваш приз: ${prizes[index < 0 ? 0 : index]};
    }
  }

  requestAnimationFrame(animate);
};

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}
