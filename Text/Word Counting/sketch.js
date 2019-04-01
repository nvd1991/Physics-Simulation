const authors = [];
const tokensOfInterest = [
    'we', 'book', 'happiness', 'young', 'girl', 'house', 'school', 'aunt', 'angry', 'door', 'sky', 'life',
]
const drawData = {};
// const colors = {};
const scale = 20;
const colors = {}
let maxRange = 0; 

function setup() {
    authors.push(
        new Author(
            'B. M. Bower',
            [
                'The Parowan Bonanza',
                'Lonesome Land',
                'The Happy Family',
            ]));

    authors.push(
        new Author(
            'Rudyard Kipling',
            [
                'Meren urhoja Kertomus suurilta matalikoilta',
                'Indian Tales',
                'Songs from Books',
            ]));


    colors['B. M. Bower'] = color('#FF4136');
    colors['Rudyard Kipling'] = color('#7FDBFF');

    for (let author of authors) {
        author.loadWorks();
    }
    createCanvas(1500, 800);
}

function draw() {
    background(51);
    const allAuthorsLoaded = authors.every(function(author) {
        return author.loaded;
    });
    if(!allAuthorsLoaded){
        processingText();
    } else {
        if(Object.keys(drawData).length === 0){
            for(let token of tokensOfInterest){
                drawData[token] = {};
                for(let author of authors){
                    drawData[token][author.name] = author.dictionaryOfWordFrequency.all[token];
                    if(author.dictionaryOfWordFrequency.all[token] > maxRange) maxRange = author.dictionaryOfWordFrequency.all[token];
                }
            }
        } else {
            let index = 0;
            const numberOfAuthors = authors.length;
            translate(0, height * 0.9);
            for(let token in drawData){
                let innerIndex = 0;
                noStroke();
                for(let author in drawData[token]){
                    fill(colors[author]);
                    const freqHeight = map(drawData[token][author] / maxRange, 0, 1, 0, height * 0.7);
                    // position in block + offset of whole block + margin of whole block
                    rect(innerIndex * scale + index * scale * numberOfAuthors + index * 10, 0, scale, - freqHeight);
                    innerIndex++;
                }  
                // Draw token 
                push();
                fill(255);
                translate(index * scale * numberOfAuthors + index * 10, 0 + textSize());
                rotate(HALF_PI);
                text(token, 0, 0);    
                pop();

                index++;      
            }
        }
    }
}

function processingText() {
    // Draw waiting text
    push();
    translate(width / 2, height / 2);
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(255);
    text('Processing text ...', 0, 0);
    pop();
}