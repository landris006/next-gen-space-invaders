class Player {
    static width = 40;
    static height = 50;
    static dx = 0;
    static dy = 0;
    static movementSpeedX = 360;
    static movementSpeedY = 360;
    static reloadTime = 0.2;
    static readyToFire = Player.reloadTime;
    static color = "black";
    static thrusterColor = "red";
    static moveRatio = 1 / 6;
    static mouseDisatance;
    static score = 0;
    static level = 1;
    static pullSpeed = 700;
    static pullInLootRange = 200;
    static doubleBarrel = false;
    static trippleBarrel = false;
    static rapidFire = false;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    update() {
        Player.level >= 5
            ? (Player.doubleBarrel = true)
            : (Player.doubleBarrel = false);
        Player.level >= 10
            ? (Player.trippleBarrel = true)
            : (Player.trippleBarrel = false);
        Player.level >= 13
            ? (Player.rapidFire = true)
            : (Player.rapidFire = false);

        if (keyBoard["KeyW"] && player.y > 0 + Player.height / 2) {
            player.y = Math.max(
                (player.y -= Player.movementSpeedY * dt),
                0 + Player.height / 2
            );
            Player.dy = -Player.movementSpeedY * dt;
        } else if (
            keyBoard["KeyS"] &&
            player.y < canvas.height - Player.height / 2
        ) {
            player.y = Math.min(
                (player.y += Player.movementSpeedY * dt),
                canvas.height - Player.height / 2
            );
            Player.dy = Player.movementSpeedY * dt;
        } else {
            Player.dy = 0;
        }

        if (keyBoard["KeyA"]) {
            player.x -= Player.movementSpeedX * dt;
            Player.dx = -Player.movementSpeedX * dt;
        } else if (keyBoard["KeyD"]) {
            player.x += Player.movementSpeedX * dt;
            Player.dx = Player.movementSpeedX * dt;
        } else {
            Player.dx = 0;
        }

        if (player.x > canvas.width) {
            player.x = 0;
        }
        if (player.x < 0) {
            player.x = canvas.width;
        }

        if (keyBoard["Space"]) {
            if (Player.readyToFire >= Player.reloadTime) {
                if (Player.trippleBarrel) {
                    let projectile1 = new Projectile(
                        this.x - Player.width / 2,
                        this.y - Player.height / 2
                    );
                    let projectile2 = new Projectile(
                        this.x,
                        this.y - Player.height / 2
                    );
                    let projectile3 = new Projectile(
                        this.x + Player.width / 2,
                        this.y - Player.height / 2
                    );
                    Player.readyToFire = 0;
                } else if (Player.doubleBarrel) {
                    let projectile1 = new Projectile(
                        this.x - Player.width / 5,
                        this.y - Player.height / 2
                    );
                    let projectile2 = new Projectile(
                        this.x + Player.width / 5,
                        this.y - Player.height / 2
                    );
                    Player.readyToFire = 0;
                } else {
                    let projectile = new Projectile(
                        this.x,
                        this.y - Player.height / 2
                    );
                    Player.readyToFire = 0;
                }
            }
        }

        //Player.angle = Math.atan((mouse.y - this.y) / (mouse.x - this.x));
        Player.rapidFire
            ? (Player.readyToFire += 1.5 * dt)
            : (Player.readyToFire += dt);
    }

    draw() {
        c.beginPath();
        c.moveTo(this.x, this.y - Player.height / 2);
        c.lineTo(this.x - Player.width / 2, this.y + Player.height / 2);
        c.lineTo(this.x + Player.width / 2, this.y + Player.height / 2);
        c.lineTo(this.x, this.y - Player.height / 2);
        c.fillStyle = Player.color;
        c.fill();

        c.beginPath();
        c.rect(
            this.x - Player.width / 4,
            this.y + Player.height / 2,
            Player.width / 6,
            Player.width / 5
        );
        c.fillStyle = Player.thrusterColor;
        c.fill();
        c.beginPath();
        c.rect(
            this.x + Player.width / 4 - Player.width / 6,
            this.y + Player.height / 2,
            Player.width / 6,
            Player.width / 5
        );
        c.fillStyle = Player.thrusterColor;
        c.fill();

        /* c.beginPath();
        c.arc(this.x, this.y, 3, 0, Math.PI*2);
        c.fillStyle = "red";
        c.fill(); */
    }
}
