let cols, rows, fr;
let toff = 0;
const scale = 20;
const particles = [];
const maxParticles = 2500;

function setup() {    
    createCanvas(800, 600);   
    fr = createP();
    cols = floor(width/scale) + 1;
    rows = floor(height/scale) + 1;
    for(let i = 0; i < maxParticles; i++){
        particles[i] = new Particle();
    }
    background(51, 51, 51);  
}

function draw() {       

    stroke(255, 50);
    const field = [];
    let yoff = 0;
    for(let y = 0; y < rows; y++){
        let xoff = 0;
        field[y] = [];
        for(let x = 0; x < cols; x++){
            // *4 (more variety angles than just 2PI)
            const vector = p5.Vector.fromAngle(noise(xoff, yoff, toff) * TWO_PI * 4);
            // set strong field
            vector.setMag(1);
            field[y][x] = vector;

            xoff += 0.01
        }
        yoff += 0.01;
    }
    toff+= 0.0003;
    
    fr.html(floor(frameRate()));

    for(let i = 0; i < particles.length; i++){
        particles[i].checkEdge();
        particles[i].followField(field); 
        particles[i].update();
        particles[i].show();
    }
}