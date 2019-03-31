const letters = [];
let heightScale = 20;
let widthScale = 20;
let cols, rows;

function setup() {
    createCanvas(windowWidth, windowHeight - 4);
    rows = height/heightScale;
    cols = width/widthScale;
    const moreInfo = {
        rows: rows, 
        cols: cols, 
        widthScale: widthScale, 
        heightScale: heightScale
    };
    // fr = createP();

    for(y = 0; y < rows; y++){
        for(x = 0; x < cols; x++)
        letters.push(new Letter(x, y, moreInfo));
    }
    
}

function draw() {    
    background(0);
    
    for(letter of letters){
        letter.draw();        
    }
    
    // fr.html(floor(frameRate()));
}
