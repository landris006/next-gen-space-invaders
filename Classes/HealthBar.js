class HealthBar {
    static max = 100;
    static min = 0;
    static marginSide = 10;
    static marginBottom = 10;
    static height = 20;
    static padding = 2;
    static damage = 0;
    static color = "black";
    static hitColor = "orange";
    static hitUntil = 0;
    static isHit = false;

    isHit(radius) {
        HealthBar.damage += radius;
        HealthBar.hitUntil = 0.07;
    }

    update() {
        HealthBar.max = 100 + Player.level * 10;
        HealthBar.damage = Math.min(HealthBar.damage, HealthBar.max);
        HealthBar.damage = Math.max(HealthBar.damage, 0);

        if (HealthBar.hitUntil > 0) {
            HealthBar.isHit = true;
            HealthBar.hitUntil -= dt;
        } else {
            HealthBar.isHit = false;
        }

        if (HealthBar.damage >= HealthBar.max) {
            endGame();
        }
    }

    draw() {
        c.beginPath();
        c.rect(
            HealthBar.marginSide,
            canvas.height - HealthBar.height - HealthBar.marginBottom,
            canvas.width - 2 * HealthBar.marginSide,
            HealthBar.height
        );
        c.strokeStyle = "black";
        c.stroke();
        c.beginPath();
        c.rect(
            HealthBar.marginSide + HealthBar.padding,
            canvas.height -
                HealthBar.height -
                HealthBar.marginBottom +
                HealthBar.padding,
            canvas.width -
                HealthBar.padding * HealthBar.marginSide -
                HealthBar.padding * 2 -
                (HealthBar.damage *
                    (canvas.width -
                        HealthBar.marginSide * 2 -
                        HealthBar.padding * 2)) /
                    HealthBar.max,
            HealthBar.height - HealthBar.padding * 2
        );

        HealthBar.isHit
            ? (c.fillStyle = HealthBar.hitColor)
            : (c.fillStyle = HealthBar.color);

        c.fill();
    }
}
