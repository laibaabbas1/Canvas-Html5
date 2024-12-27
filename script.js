const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.Width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#bada55';
ctx.lineJoin = 'round';
ctx.lineCap = "round";
ctx.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let directon = true;

function draw(e) {
    if (!isDrawing) return;// Stop the function from running when they are not moused down.
    //console.log(e);
    ctx.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx.beginPath();
    //Start From
    ctx.moveTo(e.offsetX, e.offsetY);
    //Go To
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;

    if (hue >= 360) {
        hue = 0;
    }
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }

    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

//Add mouse event listeners
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

//Add touch event listeners
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawing = true;
    const touch = e.touches[0];
    [lastX, lastY] = [touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop];
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const touch = e.touches[0];
    draw({
        offsetX: touch.clientX - canvas.offsetLeft,
        offsetY: touch.clientY - canvas.offsetTop
    });
});

canvas.addEventListener('touchend',()=> isDrawing=false);
canvas.addEventListener('touchcancel',()=> isDrawing=false);