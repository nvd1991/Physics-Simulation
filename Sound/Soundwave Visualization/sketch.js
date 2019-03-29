let song, sliderVolume, amplitude, colWidth, img, myFont;
let sizeLog = [];
const gap = 60;
const radius = 150;
const innerRadius = 120;
const maxLog = 40;
const fRate = 10;
const sizeStart = -10;
const sizeEnd = 30;
let xoff = 0;
let tick = 0;

function preload() {
    soundFormats('mp3');
    img = loadImage('../../Resources/Image/background.png');
    myFont = loadFont('../../Resources/Font/QanelasSoftDEMO-ExtraBold.otf');
}

function setup() {
    createCanvas(1000, 600);
    colWidth = width / maxLog;
    amplitude = new p5.Amplitude();    
    angleMode(DEGREES);
    song = loadSound('../../Resources/Sound/China-P.mp3', function (sound) {
        song.setVolume(1);
        song.play();
    });
    frameRate(fRate);
}

function draw() {    
    image(img, 0, 0, 1000, 600);

    const size = getSize();
    setupContext();
    drawOuterWave();
    drawBaseArc();
    drawInnerBar();

    
}

function getSize(){
    const size = map(amplitude.getLevel(), 0, 1, sizeStart, sizeEnd);
    if (sizeLog.length === maxLog) sizeLog.shift();
    sizeLog.push(size);
    return size;
}

function setupContext(){
    translate(width / 2, height / 2);
    scale(map(amplitude.getLevel(), 0, 1, 0.95, 1.05));
    noFill();
    strokeCap(ROUND);
}

function drawOuterWave(){
    stroke(188, 81, 106);    
    strokeWeight(2);
    beginShape();
    for (let index = 0; index < maxLog; index++) {
        const angle = map(index, 0, maxLog - 1, 90 + gap / 2, 450 - gap / 2);
        let r;
        if(index === 0 || index === sizeLog.length - 1){
            r = radius;
        } else {
            r = radius + sizeLog[index];
        }        
        const x = cos(angle) * r;
        const y = - (sin(angle) * r);
        if (index === 0) curveVertex(x, y);
        curveVertex(x, y);
        if (index === sizeLog.length - 1) curveVertex(x, y);
    }
    endShape();
}

function drawBaseArc(){
    strokeWeight(1.5);
    arc(0, 0, radius * 2, radius * 2, -90 + gap/2, 270 - gap / 2);
}

function drawInnerBar(){
    stroke(223);
    beginShape();
    for (let index = 0; index < maxLog; index++) {
        const angle = map(index, 0, maxLog - 1, 90 + gap / 2, 450 - gap / 2);
        const lineStroke = map(sizeLog[index], sizeStart, sizeEnd, 0.7, 3);
        let r = innerRadius;       
        const x1 = cos(angle) * r;
        const y1 = - (sin(angle) * r);
        const x2 = cos(angle) * (r - sizeLog[index]);
        const y2 = - (sin(angle) * (r - sizeLog[index]));
        line(x1, y1, x2, y2);
    }
    endShape();
}

function drawText(){
    strokeWeight(1.5);
    fill(0, 0, 0, 0);
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    textFont(myFont);
    stroke(223, 223, 223, 140);
    text('P5BEAT', 0, 0);
}