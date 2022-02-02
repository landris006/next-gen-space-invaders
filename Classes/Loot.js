class Loot {
    constructor(x, y, initialDY) {
        this.size = random(7, 15);
        this.value = this.size;
        this.x = x;
        this.y = y;
        this.intitialDY = initialDY;
        this.ox = this.x;
        this.oy = this.y;
        this.distanceFromPlayer;
        this.scatterRange;
        this.maxScatterRange = 30;
        this.dx = random(-100, 100);
        this.dy = random(-100, 100);
        this.odx = this.dx;
        this.ody = this.dy;
        this.color;
        this.type;
        this.decideType();
    }

    decideType() {
        this.type = "exp";
        this.color = "brown";

        if (healthBar.damage > 0) {
            let roll = randomInt(0, 10);
            if (roll == 0) {
                this.type = "heal";
                this.color = "green";
            }
        }
    }

    update() {
        this.scatterRange = Math.sqrt(
            (this.x - this.ox) ** 2 + (this.y - this.oy) ** 2
        );
        this.distanceFromPlayer = Math.sqrt(
            (this.x - player.x) ** 2 + (this.y - player.y) ** 2
        );
        //console.log(this.scatterRange)

        this.x += this.dx * dt - player.dx * player.moveRatio;
        this.y +=
            this.dy * dt + this.intitialDY * dt - player.dy * player.moveRatio;
        this.ox -= player.dx * player.moveRatio;
        this.oy += this.intitialDY * dt - player.dy * player.moveRatio;
        this.dx =
            this.odx * (1 - this.scatterRange / this.maxScatterRange) ** 1;
        this.dy =
            this.ody * (1 - this.scatterRange / this.maxScatterRange) ** 1;
        //console.log(this.distanceFromPlayer)

        if (this.distanceFromPlayer <= player.pullInLootRange) {
            //this.pulling = true;
            this.ox = this.x;
            this.oy = this.y;
            this.angle = Math.atan((player.y - this.y) / (this.x - player.x));
            if (this.x >= player.x) {
                this.x -=
                    player.pullSpeed *
                    Math.max(
                        (1 -
                            this.distanceFromPlayer / player.pullInLootRange) **
                            2,
                        0.2
                    ) *
                    Math.cos(this.angle) *
                    dt;
                this.y +=
                    player.pullSpeed *
                    Math.max(
                        (1 -
                            this.distanceFromPlayer / player.pullInLootRange) **
                            2,
                        0.2
                    ) *
                    Math.sin(this.angle) *
                    dt;
            } else {
                this.x +=
                    player.pullSpeed *
                    Math.max(
                        (1 -
                            this.distanceFromPlayer / player.pullInLootRange) **
                            2,
                        0.2
                    ) *
                    Math.cos(this.angle) *
                    dt;
                this.y -=
                    player.pullSpeed *
                    Math.max(
                        (1 -
                            this.distanceFromPlayer / player.pullInLootRange) **
                            2,
                        0.2
                    ) *
                    Math.sin(this.angle) *
                    dt;
            }
        }

        if (
            this.distanceFromPlayer <
            Math.min(player.width, player.height) / 2
        ) {
            drops.splice(drops.indexOf(this), 1);
            if (this.type == "heal") {
                healthBar.damage -= this.value;
            } else expBar.value += this.value;
        }

        /* if(this.pulling && this.distanceFromPlayer > player.pullInLootRange) {
            this.pulling = false;
            this.dx = 0;
            this.dy = 0;
        } */
    }

    draw() {
        c.beginPath();
        c.rect(
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            this.size
        );
        c.fillStyle = this.color;
        c.fill();

        /* c.beginPath();
        c.arc(this.x, this.y, 3, 0, Math.PI*2);
        c.fillStyle = "red";
        c.fill(); */
    }
}
