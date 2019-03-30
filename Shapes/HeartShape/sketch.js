let t;
const heartPoints = [];
const scale = 8;
const maxT = 2 * Math.PI;
const tStep = 0.01;

function setup() {
    t = 0;
    createCanvas(1000, 600);
}

function draw() {
    background(51, 51, 51);
    translate(width / 2, height / 2);

    updateHeartPoints();
    drawHeart();    
}

function updateHeartPoints(){
    if (t < maxT) {
        const currentX = 16 * pow(sin(t), 3);
        const currentY = 13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t);
        heartPoints.push(createVector(currentX  * scale, (-1) * currentY * scale));
        t += tStep;
    }
}

function drawHeart(){
    noFill();
    stroke(255);
    beginShape();
    for (let point of heartPoints) {
        vertex(point.x, point.y);
    }
    endShape();
}