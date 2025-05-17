// 创建 canvas 元素
const canvas = document.createElement('canvas');
canvas.id = 'starCanvas';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '9999';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// 设置 canvas 尺寸
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.brightness = Math.random();
    }
    draw() {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(
                this.x,
                this.y - this.size * (i === 0 ? 0 : 1.5 - 0.3 * i)
            );
            ctx.lineTo(
                this.x + this.size * (i === 0 ? 1 : 0.5 - 0.3 * i),
                this.y - this.size * (i === 0 ? 0.5 : 1 - 0.3 * i)
            );
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.fill();
    }
}

let stars = [];

// 添加点击效果
document.addEventListener('click', (e) => {
    for (let i = 0; i < 10; i++) {
        stars.push(new Star(e.clientX, e.clientY));
    }
    // 限制星星数量
    if (stars.length > 100) {
        stars = stars.slice(-100);
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star, index) => {
        star.draw();
        // 让星星逐渐消失
        star.brightness -= 0.02;
        if (star.brightness <= 0) {
            stars.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}
animate();