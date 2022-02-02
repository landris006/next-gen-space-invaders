import { random } from "../utility.js";

export default class Enemy {
    static spawnSpeed = 21.6;
    static minRadius = 20;
    static maxRadius = 52;
    static spawnAt = Enemy.maxRadius;
    static minSpeed = 100;
    static maxSpeed = 200;

    constructor(minRadius, maxRadius, canvas) {
        this.radius = random(minRadius, maxRadius);
        this.originalRadius = this.radius;
        this.minRadius = Enemy.minRadius;
        this.hitPoints = this.radius;
        this.x = random(this.radius, canvas.width - this.radius);
        this.y = 0 - this.radius * 2;
        this.dy =
            (1 - this.radius / maxRadius) * (Enemy.maxSpeed - Enemy.minSpeed) +
            Enemy.minSpeed;
        this.color = "black";
        this.hitColor = "orange";
        this.hitDuration;
        this.hitDurationColor;
    }

    update(player, canvas, dt, enemies, stars, drops, healthBar, projectiles) {
        if (
            this.y + this.radius >=
            canvas.height - healthBar.height - healthBar.marginBottom
        ) {
            healthBar.damage += this.radius;
            healthBar.hitUntil = 0.07;
            enemies.splice(enemies.indexOf(this), 1);
        }

        if (
            this.x - player.dx * player.moveRatio + this.radius <=
                canvas.width &&
            this.x - player.dx * player.moveRatio - this.radius >= 0
        ) {
            this.x -= player.dx * player.moveRatio;
        }

        this.y += this.dy * dt - player.dy * player.moveRatio;
    }

    draw(canvas, c, dt) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        if (this.hitDuration > 0) {
            c.fillStyle = this.hitColor;
            this.hitDuration -= dt;
        }
        if (this.hitDurationColor > 0) {
            this.hitDurationColor -= dt;
            c.fillStyle = this.hitColor;
        } else {
            c.fillStyle = this.color;
        }
        c.fill();
    }
}
