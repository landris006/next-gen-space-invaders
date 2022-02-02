class EXPbar {
    static min = 0;
    static max = 200;
    static value = 0;
    static marginSide = 15;
    static height = 20;
    static padding = 2;
    static color = "brown";

    update() {
        if (EXPbar.value >= EXPbar.max) {
            EXPbar.value -= EXPbar.max;
            EXPbar.max *= 1.2;
            Player.level++;
        }
    }

    draw() {
        c.beginPath();
        c.rect(
            EXPbar.marginSide,
            innerHeight / 10.5,
            canvas.width / 4,
            EXPbar.height
        );
        c.strokeStyle = "black";
        c.stroke();

        c.beginPath();
        c.rect(
            EXPbar.marginSide + EXPbar.padding,
            innerHeight / 10.5 + EXPbar.padding,
            (canvas.width / 4 - 2 * EXPbar.padding) *
                (EXPbar.value / EXPbar.max),
            EXPbar.height - EXPbar.padding * 2
        );
        c.fillStyle = EXPbar.color;
        c.fill();
    }
}
