class Player {
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

    update(
        player,
        canvas,
        dt,
        enemies,
        stars,
        drops,
        healthBar,
        projectiles,
        rgbProjectiles
    ) {
        this.level >= 5
            ? (this.doubleBarrel = true)
            : (this.doubleBarrel = false);
        this.level >= 10
            ? (this.trippleBarrel = true)
            : (this.trippleBarrel = false);
        this.level >= 13 ? (this.rapidFire = true) : (this.rapidFire = false);

        if (keyBoard["KeyW"] && this.y > 0 + this.height / 2) {
            this.y = Math.max(
                (this.y -= this.movementSpeedY * dt),
                0 + this.height / 2
            );
            this.dy = -this.movementSpeedY * dt;
        } else if (
            keyBoard["KeyS"] &&
            this.y < canvas.height - this.height / 2
        ) {
            this.y = Math.min(
                (this.y += this.movementSpeedY * dt),
                canvas.height - this.height / 2
            );
            this.dy = this.movementSpeedY * dt;
        } else {
            this.dy = 0;
        }

        if (keyBoard["KeyA"]) {
            this.x -= this.movementSpeedX * dt;
            this.dx = -this.movementSpeedX * dt;
        } else if (keyBoard["KeyD"]) {
            this.x += this.movementSpeedX * dt;
            this.dx = this.movementSpeedX * dt;
        } else {
            this.dx = 0;
        }

        if (this.x > canvas.width) {
            this.x = 0;
        }
        if (this.x < 0) {
            this.x = canvas.width;
        }

        if (keyBoard["Space"]) {
            if (this.readyToFire >= this.reloadTime) {
                if (this.trippleBarrel) {
                    let projectile1 = new Projectile(
                        this.x - this.width / 2,
                        this.y - this.height / 2,
                        this,
                        rgbProjectiles
                    );
                    projectiles.push(projectile1);
                    let projectile2 = new Projectile(
                        this.x,
                        this.y - this.height / 2,
                        this,
                        rgbProjectiles
                    );
                    projectiles.push(projectile2);
                    let projectile3 = new Projectile(
                        this.x + this.width / 2,
                        this.y - this.height / 2,
                        this,
                        rgbProjectiles
                    );
                    projectiles.push(projectile3);
                    this.readyToFire = 0;
                } else if (this.doubleBarrel) {
                    let projectile1 = new Projectile(
                        this.x - this.width / 5,
                        this.y - this.height / 2,
                        this,
                        rgbProjectiles
                    );
                    projectiles.push(projectile1);
                    let projectile2 = new Projectile(
                        this.x + this.width / 5,
                        this.y - this.height / 2,
                        this,
                        rgbProjectiles
                    );
                    projectiles.push(projectile2);
                    this.readyToFire = 0;
                } else {
                    let projectile = new Projectile(
                        this.x,
                        this.y - this.height / 2,
                        this,
                        rgbProjectiles
                    );
                    projectiles.push(projectile);
                    this.readyToFire = 0;
                }
            }
        }

        //this.angle = Math.atan((mouse.y - this.y) / (mouse.x - this.x));
        this.rapidFire
            ? (this.readyToFire += 1.5 * dt)
            : (this.readyToFire += dt);
    }

    draw(canvas, c) {
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
