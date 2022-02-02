const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const scoreSpan = document.getElementById("score").querySelector("span");
const levelSpan = document.getElementById("exp").querySelector("span");
const start = document.getElementById("start");
const startButton = document.getElementById("startButton");
const restart = document.getElementById("restart");
const restartButton = document.getElementById("restartButton");
const rgb = document.getElementById("ofc");

var then;
var now;
var dt;
var fps;

var running;

var projectiles;
var enemies;
var stars;
var drops;

var player;

var healthBar;

var expBar;

var starCount;

var rgbProjectiles;

var scaling;
var spawnPool;
var spawnSpeed;
var minRadius;
var maxRadius;

var gameStatus = {
    then,
    now,
    dt,
    fps,

    running,

    projectiles,
    enemies,
    stars,
    drops,

    player,

    healthBar,

    expBar,

    starCount,

    scaling,
    spawnPool,
    spawnSpeed,
    minRadius,
    maxRadius,
};

init();
addEventListener("resize", () => {
    canvas.width = innerWidth * 0.7;
    canvas.height = innerWidth * 0.49;
    init();
});
function init() {
    // Initial setup, starting scene
    canvas.width = innerWidth * 0.7;
    canvas.height = innerWidth * 0.49;

    start.style.display = "initial";
    restart.style.display = "none";

    spawnPool = 0;
    spawnSpeed = Enemy.spawnSpeed;
    minRadius = Enemy.minRadius;
    maxRadius = Enemy.maxRadius;

    rgbProjectiles = true;
    then = 0;

    running = false;

    projectiles = [];
    enemies = [];
    stars = [];
    drops = [];

    player = new Player(canvas.width / 2, canvas.height / 2);

    healthBar = new HealthBar();

    expBar = new EXPbar();

    starCount = 0;
    for (let i = 0; i < Star.amount; i++) {
        let star = new Star(
            random(-3 * canvas.width, 3 * canvas.width),
            random(0, canvas.height)
        );
        starCount++;
        stars.push(star);
    }
}

main();
function main(timeStamp) {
    if (running) {
        // Calculating the time passed since the last frame
        now = timeStamp;
        dt = (now - then) / 1000;
        if (isNaN(dt)) {
            dt = 1 / 60;
        }
        fps = 1 / dt;
        then = now;

        // Update
        player.update(
            player,
            canvas,
            dt,
            enemies,
            stars,
            drops,
            healthBar,
            projectiles,
            rgbProjectiles
        );
        healthBar.update(
            player,
            canvas,
            dt,
            enemies,
            stars,
            drops,
            healthBar,
            projectiles
        );
        if (healthBar.damage >= healthBar.max) {
            endGame();
        }
        projectiles.forEach((projectile) => {
            projectile.update(
                player,
                canvas,
                dt,
                enemies,
                stars,
                drops,
                healthBar,
                projectiles
            );
        });
        enemies.forEach((enemy) => {
            enemy.update(
                player,
                canvas,
                dt,
                enemies,
                stars,
                drops,
                healthBar,
                projectiles
            );
        });
        stars.forEach((star) => {
            star.update(
                player,
                canvas,
                dt,
                enemies,
                stars,
                drops,
                healthBar,
                projectiles,
                starCount
            );
            if (star.y >= canvas.height) {
                starCount = starCount - 1;
                stars.splice(stars.indexOf(star), 1);
            }
        });
        drops.forEach((loot) => {
            loot.update(
                player,
                canvas,
                dt,
                enemies,
                stars,
                drops,
                healthBar,
                expBar,
                projectiles
            );
        });
        expBar.update(
            player,
            canvas,
            dt,
            enemies,
            stars,
            drops,
            healthBar,
            projectiles
        );

        //Spawn stars
        while (starCount < Star.amount) {
            let star = new Star(
                random(-3 * canvas.width, 3 * canvas.width),
                -Star.maxSize
            );
            starCount++;
            stars.push(star);
        }
        console.log(starCount);
        // Enemy scaling
        if (spawnPool >= maxRadius) {
            let enemy = new Enemy(minRadius, maxRadius, canvas);
            spawnPool -= enemy.radius;
            enemies.push(enemy);
        }
        scaling = 1 / 3 + (Math.floor(player.level / 5) * 1) / 3;
        spawnPool += spawnSpeed * dt;
        spawnSpeed += scaling * dt;
        minRadius += Math.sqrt(scaling) * dt;
        maxRadius += scaling * dt;

        // Score
        scoreSpan.innerText = player.score;
        levelSpan.innerText = player.level;
    }

    // Animate
    c.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
        star.draw(canvas, c);
    });
    projectiles.forEach((projectile) => {
        projectile.draw(canvas, c);
    });
    enemies.forEach((enemy) => {
        enemy.draw(canvas, c, dt);
    });
    drops.forEach((loot) => {
        loot.draw(canvas, c);
    });
    healthBar.draw(canvas, c);
    expBar.draw(canvas, c);
    player.draw(canvas, c);
    requestAnimationFrame(main);
}

function endGame() {
    restart.style.display = "initial";
    running = false;
}

startButton.addEventListener("click", (timeStamp) => {
    running = true;
    start.style.display = "none";
    then = timeStamp;
    rgb.checked ? (rgbProjectiles = true) : (rgbProjectiles = false);
});

restartButton.addEventListener("click", () => init());
