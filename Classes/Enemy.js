class Enemy {
    static originalSpawnSpeed = 21.6;
    static spawnSpeed = Enemy.originalSpawnSpeed;
    static originalMinRadius = 20;
    static originalMaxRadius = 52;
    static minRadius = Enemy.originalMinRadius;
    static maxRadius = Enemy.originalMaxRadius;
    static spawnPool = 0;
    static spawnAt = Enemy.maxRadius;
    static scaling;
    static minSpeed = 100;
    static maxSpeed = 200;

    constructor() {
        this.radius = random(Enemy.minRadius, Enemy.maxRadius);
        this.originalRadius = this.radius;
        this.minRadius = Enemy.originalMinRadius;
        this.hitPoints = this.radius;
        this.x = random(this.radius, canvas.width - this.radius);
        this.y = 0 - this.radius * 2;
        this.dy =
            (1 - this.radius / Enemy.maxRadius) *
                (Enemy.maxSpeed - Enemy.minSpeed) +
            Enemy.minSpeed;
        this.color = "black";
        this.hitColor = "orange";
        this.hitDuration;
        this.hitDurationColor;
        enemies.push(this);
    }

    isHit(projectileColor) {
        this.hitDuration = Player.reloadTime / 2;
        this.hitDurationColor = 0.1;
        this.radius -= Projectile.damage;
        rgbProjectiles ? (this.hitColor = projectileColor) : null;
    }

    onDeath() {
        enemies.splice(enemies.indexOf(this), 1);
        Player.score += Math.floor(this.hitPoints / 3);
        for (let i = 0; i < Math.floor(this.originalRadius / 10); i++) {
            console.log(Math.floor(this.radius / 10));
            let loot = new Loot(this.x, this.y, this.dy);
        }
    }

    update() {
        if (this.radius < this.minRadius) {
            this.onDeath();
        }

        if (
            this.y + this.radius >=
            canvas.height - HealthBar.height - HealthBar.marginBottom
        ) {
            healthBar.isHit(this.radius);
            enemies.splice(enemies.indexOf(this), 1);
        }

        if (
            this.x - Player.dx * Player.moveRatio + this.radius <=
                canvas.width &&
            this.x - Player.dx * Player.moveRatio - this.radius >= 0
        ) {
            this.x -= Player.dx * Player.moveRatio;
        }

        this.y += this.dy * dt - Player.dy * Player.moveRatio;

        /* if (this.hitDuration > 0) {
            this.hitDuration -= dt;
        } */
    }

    draw() {
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
