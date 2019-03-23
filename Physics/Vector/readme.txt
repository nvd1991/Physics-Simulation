Vector has:
- magnitude (the length of the vector)
- direction (the angle relative to some axis)

Ex Bouncing balls:
- Ball (
    location vector, 
    velocity vector,
    moveBall func(),
    checkBounce func(),
    drawBall func(),
    checkCollision func())
Description: 
1. Balls moves based on it's position and velocity
2. Balls bounces back if they reaches the border
3. Simple Collision if 2 balls collide, velocity *= -1

Data:
balls = [
        new Ball(createVector(50, 70), createVector(2.5, -2)),
        new Ball(createVector(233, 300), createVector(1.5, 1)),
        new Ball(createVector(200, 200), createVector(4.5, -5)),
        new Ball(createVector(35, 269), createVector(1, -2)),
        new Ball(createVector(100, 200), createVector(3, 2.5)),
    ];