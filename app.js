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

init();

addEventListener("resize", () => {
    canvas.width = innerWidth * 0.7;
    canvas.height = innerWidth * 0.49;
    init();
});

function init() {
    canvas.width = innerWidth * 0.7;
    canvas.height = innerWidth * 0.49;

    start.style.display = "initial";
    restart.style.display = "none";

    reset();

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
    }
}

main();
function main(timeStamp) {
    if (running) {
        now = timeStamp;
        dt = (now - then) / 1000;
        if (isNaN(dt)) {
            dt = 1 / 60;
        }
        fps = 1 / dt;
        then = now;
        //console.log(fps);

        player.update();

        healthBar.update();

        projectiles.forEach((element) => {
            element.update();
        });

        enemies.forEach((element) => {
            element.update();
        });

        stars.forEach((element) => {
            element.update();
        });

        drops.forEach((element) => {
            element.update();
        });

        expBar.update();

        while (starCount < Star.amount) {
            let star = new Star(
                random(-3 * canvas.width, 3 * canvas.width),
                -Star.maxSize
            );
        }

        if (Enemy.spawnPool >= Enemy.spawnAt) {
            let enemy = new Enemy();
            Enemy.spawnPool -= enemy.radius;
        }
        Enemy.scaling = 1 / 3 + (Math.floor(Player.level / 5) * 1) / 3;
        Enemy.spawnPool += Enemy.spawnSpeed * dt;
        Enemy.spawnSpeed += Enemy.scaling * dt;
        Enemy.minRadius += Math.sqrt(Enemy.scaling) * dt;
        Enemy.maxRadius += Enemy.scaling * dt;

        scoreSpan.innerText = Player.score;
        levelSpan.innerText = Player.level;
    }
    animate();
    requestAnimationFrame(main);
}

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((element) => {
        element.draw();
    });

    projectiles.forEach((element) => {
        element.draw();
    });

    enemies.forEach((element) => {
        element.draw();
    });

    drops.forEach((element) => {
        element.draw();
    });

    healthBar.draw();

    expBar.draw();

    player.draw();
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

restartButton.addEventListener("click", (timeStamp) => {
    projectiles = [];
    enemies = [];
    stars = [];
    drops = [];

    then = timeStamp;

    player.x = canvas.width / 2;
    player.y = canvas.height / 2;

    reset();

    starCount = 0;
    for (let i = 0; i < Star.amount; i++) {
        let star = new Star(
            random(-3 * canvas.width, 3 * canvas.width),
            random(0, canvas.height)
        );
    }

    restart.style.display = "none";
    running = true;
});

function reset() {
    HealthBar.damage = 0;
    Player.score = 0;
    Player.level = 1;
    EXPbar.value = 0;

    Enemy.spawnPool = 0;
    Enemy.spawnSpeed = Enemy.originalSpawnSpeed;
    Enemy.minRadius = Enemy.originalMinRadius;
    Enemy.maxRadius = Enemy.originalMaxRadius;
}
