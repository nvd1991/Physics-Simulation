const boxSize = 80;
const d = boxSize * 0.8;
const r = d / 2;
const curves = [];
let cols, rows;
let angle = 0;
let p;
let saved = false;

function setup() {
    createCanvas(1760, 960);
    cols = width / boxSize - 1;
    rows = height / boxSize - 1;
    fr = createP();
}

function draw() {    
    background(51, 51, 51);
    noFill();
    const xList = drawReference('cols', cols);
    const yList = drawReference('rows', rows);    
    updateAndDrawCurves(xList, yList);     
    angle -= 0.01;
    resetCurves();
    fr.html(floor(frameRate()));
}

function drawReference(type, size) {
    const data = [];
    for (let i = 0; i < size; i++) {
        //Draw circle
        push();
        stroke(200);
        const cx = type === 'cols' ? (i + 1) * boxSize + boxSize / 2 : boxSize / 2;
        const cy = type === 'cols' ? boxSize / 2 : (i + 1) * boxSize + boxSize / 2;
        ellipse(cx, cy, d, d);
        //Draw Point
        stroke(255);
        strokeWeight(3);
        const px = cx + r * cos(angle * (i + 1) - HALF_PI);
        const py = cy + r * sin(angle * (i + 1) - HALF_PI);
        point(px, py);
        //Draw line
        stroke(255, 50);
        strokeWeight(1);
        if (type === 'cols') {
            line(px, 0, px, height);
            data.push(px);
        } else {
            line(0, py, width, py);
            data.push(py);
        }
        pop();
    }
    return data;
}

// Loop throught curves lists and 
// add points to every curve using the list of x and y generated each frame
// and draw the curve
function updateAndDrawCurves(xList, yList) {
    push(); 
    for (y = 0; y < rows; y++) {
        if(!curves[y]) curves[y] = [];
        for (x = 0; x < cols; x++) {
            if(!curves[y][x]) curves[y][x] = new Curve();
            //update curve point
            curves[y][x].addPoint(xList[x], yList[y]);
            //draw curve
            stroke(255);
            curves[y][x].draw();
            //hightlight current point            
            strokeWeight(8);
            point(xList[x], yList[y]);
        }
    }
    pop();
}

function resetCurves(){
    if(angle < - TWO_PI) {
        angle = 0;
        curves.splice(0, curves.length);
        if(!saved) {
            saveCanvas('Lissajous_Curve', 'png');
            saved = !saved;
        }
    } 
}