let columns, rows;
let flying = 0;
const step = 0.2;
const peak = 100;
const terrain = [];
const scale = 20;
const w = 1600;
const h = 700;

function setup() {    
    createCanvas(1000, 600, WEBGL);
    columns = w/scale;
    rows = h/scale;         
}

function draw() {    
    background(51, 51, 51);   
    setupZArray(); 
    drawTerrain();    
}

function setupZArray(){
    let yoff = flying;
    for(let y = 0; y < rows; y++){
        terrain[y] = [];
        let xoff = 0;
        for(let x = 0; x < columns; x ++){
            //Use noise with small increment (create smooth random number)
            terrain[y][x] = map(noise(yoff, xoff), 0, 1, -peak, peak);
            xoff += step;
        }
        yoff += step;
    }   
    flying -= step;
}

function drawTerrain(){
    stroke(255);
    noFill();
    rotateX(PI/3);
    translate(-w/2, -h/2);    
    for(let y = 0; y < rows - 1; y++){
        beginShape(TRIANGLE_STRIP)
        for(let x = 0; x < columns; x ++){
            vertex(x * scale, y * scale, terrain[y][x]);
            vertex(x * scale, (y + 1) * scale, terrain[y + 1][x]);
        }
        endShape();
    }
}