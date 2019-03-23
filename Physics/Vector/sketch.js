let balls;

function setup(){
    createCanvas(400, 400);
    balls = [
        new Ball(createVector(50, 70), createVector(2.5, -2)),
        new Ball(createVector(233, 300), createVector(1.5, 1)),
        new Ball(createVector(200, 200), createVector(4.5, -5)),
        new Ball(createVector(35, 269), createVector(1, -2)),
        new Ball(createVector(100, 200), createVector(3, 2.5)),
    ];

    function Ball(location, velocity){
        this.location = location;
        this.velocity = velocity;
        this.drawBall = drawBall;
        this.moveBall = moveBall;
        this.checkBounce = checkBounce;
    }

    function drawBall(){
        stroke(255,239,150);
        strokeWeight(2);
        fill(107,91,149);
        circle(this.location.x, this.location.y, 20);
    }

    function moveBall(){
        this.location.add(this.velocity);
    }

    function checkBounce(){
        if(this.location.x > width || this.location.x < 0){
            this.velocity.x *= -1;
        }
        if(this.location.y > height || this.location.y < 0){
            this.velocity.y *= -1;
        }
    }
}

function draw(){
    background(51, 51, 51);
    
    for(let ball of balls){
        ball.moveBall(); 
        ball.checkBounce();
        ball.drawBall();           
    }   
}
