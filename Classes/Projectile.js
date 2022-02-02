class Projectile {
    constructor(x, y) {
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
        projectiles.push(this);
    }

    update() {
        enemies.forEach((element) => {
            if (
                (this.x - element.x) ** 2 +
                    (this.y - this.height - element.y) ** 2 <=
                element.radius ** 2
            ) {
                projectiles.splice(projectiles.indexOf(this), 1);
                element.isHit(this);
            }
        });
        this.x -= player.dx * player.moveRatio;
        this.y -= this.dy * dt + player.dy * player.moveRatio;
    }

    draw() {
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
