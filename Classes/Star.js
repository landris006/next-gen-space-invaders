import { random } from "../utility.js";

export default class Star {
    static color = "black";
    static minSize = 0;
    static maxSize = 5;
    static amount = 500;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(Star.minSize, Star.maxSize);
    }

    update({ player }) {
        this.x -= this.size * player.dx * player.moveRatio ** 2;
        this.y +=
            this.size * player.moveRatio -
            this.size * player.dy * player.moveRatio ** 2;
    }

    draw({ c }) {
        c.beginPath();
        c.rect(this.x, this.y, this.size, this.size);
        c.fillStyle = Star.color;
        c.fill();
    }
}
