let balls;

function setup() {    
    const Ball = BallFunction();
    
    createCanvas(800, 600);
    balls = [
        new Ball(100, 20, createVector(50, 70), createVector(0, 0), createVector(0, 0)),
        new Ball(10, 2, createVector(100, 70), createVector(0, 0), createVector(0, 0)),
        new Ball(50, 10, createVector(200, 70), createVector(0, 0), createVector(0, 0)),
    ];
}

function draw() {
    background(51, 51, 51);    
    const gravity = createVector(0, 0.5);
    for (let ball of balls) {
        ball.applyForce(p5.Vector.mult(gravity, ball.mass));
        ball.checkBounce();
        ball.moveBall();
        ball.drawBall();
    }
}

function mousePressed(){
    for (let ball of balls) {
        ball.applyForce(createVector(0.5, 0));
    }
    ball.applyForce(p5.Vector.mult(gravity, ball.mass));
}

function BallFunction(){
    const Ball = function(mass, radius, location, velocity, acceleration) {
        this.mass = mass;
        this.radius = radius;
        this.location = location;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }
    Ball.prototype.drawBall = drawBall;
    Ball.prototype.moveBall = moveBall;
    Ball.prototype.checkBounce = checkBounce;
    Ball.prototype.applyForce = applyForce;

    function drawBall() {
        stroke(255, 239, 150);
        strokeWeight(2);
        fill(107, 91, 149);
        circle(this.location.x, this.location.y, this.radius);
    }

    function moveBall() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }

    function applyForce(force){
        this.acceleration.add(p5.Vector.div(force, this.mass));
    }

    function checkBounce() {
        if (this.location.x >= width || this.location.x < 0) {            
            this.velocity.x *= -1;
        }
        if (this.location.y > height || this.location.y < 0) {
            this.velocity.y *= -1;
        }
    }

    return Ball;
}