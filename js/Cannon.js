class Cannon {
    constructor(x, y, width, height, angle){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.cannon_img = loadImage("assets/CANON.png");
        this.cannon_base = loadImage("assets/cannon_base.png");
    }

    display() {
        console.log(this.angle);
        if(keyIsDown(UP_ARROW) && this.angle > -1.45){
            this.angle -= 0.02;
        }

        if(keyIsDown(DOWN_ARROW) && this.angle < 0.35){
            this.angle += 0.02;
        }
        
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.cannon_img, 0, 0, this.width, this.height);
        pop();

        image(this.cannon_base, 70, 20, 200, 200);
        noFill();
    }
}