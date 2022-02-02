class Projectile {
    static asd;

    constructor(x, y, player, rgbProjectiles) {
        this.x = x;
        this.y = y;
        this.width = 7;
        this.height = 15;
        this.damage = 7 + player.level;
        this.projectileSpeed = 720;
        this.projectileColor = "black";
        this.dy = this.projectileSpeed;
        this.color;
        rgbProjectiles
            ? (this.color = randomRGB())
            : (this.color = this.projectileColor);
    }

    update(player, canvas, dt, enemies, stars, drops, healthBar, projectiles) {
        enemies.forEach((enemy) => {
            if (
                (this.x - enemy.x) ** 2 +
                    (this.y - this.height - enemy.y) ** 2 <=
                enemy.radius ** 2
            ) {
                projectiles.splice(projectiles.indexOf(this), 1);
                enemy.hitDuration = player.reloadTime / 2;
                enemy.hitDurationColor = 0.1;
                enemy.radius -= this.damage;
                this.color === "black" ? null : (enemy.hitColor = this.color);
            }
        });
        this.x -= player.dx * player.moveRatio;
        this.y -= this.dy * dt + player.dy * player.moveRatio;
    }

    draw(canvas, c) {
        c.beginPath();
        c.rect(
            this.x - this.width / 2,
            this.y - this.height,
            this.width,
            this.height
        );
        c.fillStyle = this.color;
        c.fill();
    }
}
