export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 50;
        this.dx = 0;
        this.dy = 0;
        this.movementSpeedX = 360;
        this.movementSpeedY = 360;
        this.reloadTime = 0.2;
        this.readyToFire = this.reloadTime;
        this.color = "black";
        this.thrusterColor = "red";
        this.moveRatio = 1 / 6;
        this.mouseDisatance;
        this.score = 0;
        this.level = 1;
        this.pullSpeed = 700;
        this.pullInLootRange = 200;
        this.doubleBarrel = false;
        this.trippleBarrel = false;
        this.rapidFire = false;
    }

    update() {
        this.level >= 5
            ? (this.doubleBarrel = true)
            : (this.doubleBarrel = false);
        this.level >= 10
            ? (this.trippleBarrel = true)
            : (this.trippleBarrel = false);
        this.level >= 13 ? (this.rapidFire = true) : (this.rapidFire = false);
    }

    draw({ c }) {
        c.beginPath();
        c.moveTo(this.x, this.y - this.height / 2);
        c.lineTo(this.x - this.width / 2, this.y + this.height / 2);
        c.lineTo(this.x + this.width / 2, this.y + this.height / 2);
        c.lineTo(this.x, this.y - this.height / 2);
        c.fillStyle = this.color;
        c.fill();

        c.beginPath();
        c.rect(
            this.x - this.width / 4,
            this.y + this.height / 2,
            this.width / 6,
            this.width / 5
        );
        c.fillStyle = this.thrusterColor;
        c.fill();
        c.beginPath();
        c.rect(
            this.x + this.width / 4 - this.width / 6,
            this.y + this.height / 2,
            this.width / 6,
            this.width / 5
        );
        c.fillStyle = this.thrusterColor;
        c.fill();

        /* c.beginPath();
        c.arc(this.x, this.y, 3, 0, Math.PI*2);
        c.fillStyle = "red";
        c.fill(); */
    }
}
