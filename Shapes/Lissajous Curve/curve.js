const Curve = function() {
    function Curve(){
        this.points = [];
    }
    
    Curve.prototype.addPoint = function(x, y) {
        this.points.push(createVector(x, y));
    }
    
    Curve.prototype.draw = function() {
        push();
        stroke(255);
        strokeWeight(1);
        beginShape();
        for(let point of this.points){
            vertex(point.x, point.y);
        }
        endShape();
        pop();
    }

    return Curve;
}();

