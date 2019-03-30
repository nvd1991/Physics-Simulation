const Particle = (function(){
    function Particle(){
        this.position = createVector(random(0, width),random(0, height));
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);
        // save previous position to draw a line so that no pixel is left in between
        this.previousPosition = this.position.copy();
        // set max speed of particle
        this.maxSpeed = 2;
    }
    
    Particle.prototype.update = function(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    Particle.prototype.updatePrevious = function(){
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;
    }

    Particle.prototype.checkEdge = function(){
        if(this.position.x < 0) {            
            this.position.x = width;
            this.updatePrevious();
        }
        if(this.position.x > width) {
            this.position.x = 0;
            this.updatePrevious();
        }
        if(this.position.y < 0) {
            this.position.y = height;
            this.updatePrevious();
        }
        if(this.position.y > height) {
            this.position.y = 0;
            this.updatePrevious();
        }
    }
    
    Particle.prototype.applyForce = function(force){
        this.acceleration.add(force);
    }

    Particle.prototype.followField = function(field){
        const regionX = floor(this.position.x / scale);
        const regionY = floor(this.position.y / scale);
        this.applyForce(field[regionY][regionX]); 
    }
    
    Particle.prototype.show = function(){
        strokeWeight(1);
        stroke(255, 10);
        line(this.position.x, this.position.y, this.previousPosition.x, this.previousPosition.y);
        this.updatePrevious();
    }

    return Particle;
})()
