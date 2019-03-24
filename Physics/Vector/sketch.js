let balls;

function setup() {
    createCanvas(400, 400);
    balls = [
        new Ball(10, createVector(50, 70), createVector(2.5, -2), createVector(0, 0)),
        new Ball(20, createVector(233, 300), createVector(1.5, 1),createVector(0, 0)),
        new Ball(15, createVector(200, 200), createVector(4.5, -5), createVector(0, 0)),
        new Ball(30, createVector(35, 269), createVector(1, -2), createVector(0, 0)),
        new Ball(10, createVector(100, 200), createVector(3, 2.5), createVector(0, 0)),
    ];

    function Ball(radius, location, velocity, acceleration) {
        this.radius = radius;
        this.location = location;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }
    Ball.prototype.drawBall = drawBall;
    Ball.prototype.moveBall = moveBall;
    Ball.prototype.checkBounce = checkBounce;
    Ball.prototype.checkCollision = checkCollision;

    function drawBall() {
        stroke(255, 239, 150);
        strokeWeight(2);
        fill(107, 91, 149);
        circle(this.location.x, this.location.y, this.radius);
    }

    function moveBall() {
        this.acceleration = createVector(mouseX, mouseY).sub(this.location).normalize().mult(0.1);
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
    }

    function checkBounce() {
        if (this.location.x > width || this.location.x < 0) {
            this.velocity.x *= -1;
        }
        if (this.location.y > height || this.location.y < 0) {
            this.velocity.y *= -1;
        }
    }

    function checkCollision() {
        for (let ball of balls) {
            if (ball === this) continue;
            const distance = this.location.copy().sub(ball.location).mag();
            if (distance <= (this.radius + ball.radius)) {
                this.velocity.mult(-1);
            }
        }
    }
}

function draw() {
    background(51, 51, 51);

    for (let ball of balls) {
        ball.checkCollision();
        ball.checkBounce();
        ball.moveBall();
        ball.drawBall();
    }
}
