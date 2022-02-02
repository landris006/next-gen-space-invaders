class EXPbar {
    constructor() {
        this.min = 0;
        this.max = 200;
        this.value = 0;
        this.marginSide = 15;
        this.height = 20;
        this.padding = 2;
        this.color = "brown";
    }

    update() {
        if (this.value >= this.max) {
            this.value -= this.max;
            this.max *= 1.2;
            player.level++;
        }
    }

    draw() {
        c.beginPath();
        c.rect(
            this.marginSide,
            innerHeight / 10.5,
            canvas.width / 4,
            this.height
        );
        c.strokeStyle = "black";
        c.stroke();

        c.beginPath();
        c.rect(
            this.marginSide + this.padding,
            innerHeight / 10.5 + this.padding,
            (canvas.width / 4 - 2 * this.padding) * (this.value / this.max),
            this.height - this.padding * 2
        );
        c.fillStyle = this.color;
        c.fill();
    }
}
