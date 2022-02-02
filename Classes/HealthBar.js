export default class HealthBar {
    constructor() {
        this.max = 100;
        this.min = 0;
        this.marginSide = 10;
        this.marginBottom = 10;
        this.height = 20;
        this.padding = 2;
        this.damage = 0;
        this.color = "black";
        this.hitColor = "orange";
        this.hitUntil = 0;
        this.isHit = false;
    }

    update(player, canvas, dt, enemies, stars, drops, healthBar, projectiles) {
        this.max = 100 + player.level * 10;
        this.damage = Math.min(this.damage, this.max);
        this.damage = Math.max(this.damage, 0);

        if (this.hitUntil > 0) {
            this.isHit = true;
            this.hitUntil -= dt;
        } else {
            this.isHit = false;
        }
    }

    draw(canvas, c) {
        c.beginPath();
        c.rect(
            this.marginSide,
            canvas.height - this.height - this.marginBottom,
            canvas.width - 2 * this.marginSide,
            this.height
        );
        c.strokeStyle = "black";
        c.stroke();
        c.beginPath();
        c.rect(
            this.marginSide + this.padding,
            canvas.height - this.height - this.marginBottom + this.padding,
            canvas.width -
                this.padding * this.marginSide -
                this.padding * 2 -
                (this.damage *
                    (canvas.width - this.marginSide * 2 - this.padding * 2)) /
                    this.max,
            this.height - this.padding * 2
        );

        this.isHit ? (c.fillStyle = this.hitColor) : (c.fillStyle = this.color);

        c.fill();
    }
}
