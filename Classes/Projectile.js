class Projectile {
    static width = 7;
    static height = 15;
    static damage = 7 + Player.level;
    static projectileSpeed = 720;
    static projectileColor = "black";

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dy = Projectile.projectileSpeed;
        this.color;
        rgbProjectiles
            ? (this.color = randomRGB())
            : (this.color = Projectile.projectileColor);
        projectiles.push(this);
    }

    update() {
        enemies.forEach((element) => {
            if (
                (this.x - element.x) ** 2 +
                    (this.y - Projectile.height - element.y) ** 2 <=
                element.radius ** 2
            ) {
                projectiles.splice(projectiles.indexOf(this), 1);
                element.isHit(this.color);
            }
        });
        this.x -= Player.dx * Player.moveRatio;
        this.y -= this.dy * dt + Player.dy * Player.moveRatio;
    }

    draw() {
        c.beginPath();
        c.rect(
            this.x - Projectile.width / 2,
            this.y - Projectile.height,
            Projectile.width,
            Projectile.height
        );
        c.fillStyle = this.color;
        c.fill();
    }
}
