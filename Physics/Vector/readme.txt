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
4. New velocity = velocity + accelration (every frame)
5. Accelration vector always points towards the mouse

Data:
    balls = [
        new Ball(10, createVector(50, 70), createVector(2.5, -2), createVector(0, 0)),
        new Ball(20, createVector(233, 300), createVector(1.5, 1),createVector(0, 0)),
        new Ball(15, createVector(200, 200), createVector(4.5, -5), createVector(0, 0)),
        new Ball(30, createVector(35, 269), createVector(1, -2), createVector(0, 0)),
        new Ball(10, createVector(100, 200), createVector(3, 2.5), createVector(0, 0)),
    ];