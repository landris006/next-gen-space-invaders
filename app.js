import Player from "./Classes/Player.js";
import Enemy from "./Classes/Enemy.js";
import EXPbar from "./Classes/EXPbar.js";
import HealthBar from "./Classes/HealthBar.js";
import Loot from "./Classes/Loot.js";
import Projectile from "./Classes/Projectile.js";
import Star from "./Classes/Star.js";
import { random, keyBoard } from "./utility.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const scoreSpan = document.getElementById("score").querySelector("span");
const levelSpan = document.getElementById("exp").querySelector("span");
const start = document.getElementById("start");
const startButton = document.getElementById("startButton");
const restart = document.getElementById("restart");
const restartButton = document.getElementById("restartButton");
const rgb = document.getElementById("ofc");

var gameState = {
    canvas: canvas,
    c: c,
};

var then;
var now;
var dt = 0;
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

        // Collecting variables into and object, so it will be easier to pass them all into functions
        gameState = {
            ...gameState,
            dt: dt,
            projectiles: projectiles,
            rgbProjectiles: rgbProjectiles,
            enemies: enemies,
            stars: stars,
            drops: drops,
            player: player,
            healthBar: healthBar,
            expBar: expBar,
        };

        // Player movement and shooting
        if (keyBoard["KeyW"] && player.y > 0 + player.height / 2) {
            player.y = Math.max(
                (player.y -= player.movementSpeedY * dt),
                0 + player.height / 2
            );
            player.dy = -player.movementSpeedY * dt;
        } else if (
            keyBoard["KeyS"] &&
            player.y < canvas.height - player.height / 2
        ) {
            player.y = Math.min(
                (player.y += player.movementSpeedY * dt),
                canvas.height - player.height / 2
            );
            player.dy = player.movementSpeedY * dt;
        } else {
            player.dy = 0;
        }

        if (keyBoard["KeyA"]) {
            player.x -= player.movementSpeedX * dt;
            player.dx = -player.movementSpeedX * dt;
        } else if (keyBoard["KeyD"]) {
            player.x += player.movementSpeedX * dt;
            player.dx = player.movementSpeedX * dt;
        } else {
            player.dx = 0;
        }

        if (player.x > canvas.width) {
            player.x = 0;
        }
        if (player.x < 0) {
            player.x = canvas.width;
        }
        if (keyBoard["Space"]) {
            if (player.readyToFire >= player.reloadTime) {
                if (player.trippleBarrel) {
                    let projectile1 = new Projectile(
                        player.x - player.width / 2,
                        player.y - player.height / 2,
                        player,
                        rgbProjectiles
                    );
                    projectiles.push(projectile1);
                    let projectile2 = new Projectile(
                        player.x,
                        player.y - player.height / 2,
                        player,
                        rgbProjectiles
                    );
                    projectiles.push(projectile2);
                    let projectile3 = new Projectile(
                        player.x + player.width / 2,
                        player.y - player.height / 2,
                        player,
                        rgbProjectiles
                    );
                    projectiles.push(projectile3);
                    player.readyToFire = 0;
                } else if (player.doubleBarrel) {
                    let projectile1 = new Projectile(
                        player.x - player.width / 5,
                        player.y - player.height / 2,
                        player,
                        rgbProjectiles
                    );
                    projectiles.push(projectile1);
                    let projectile2 = new Projectile(
                        player.x + player.width / 5,
                        player.y - player.height / 2,
                        player,
                        rgbProjectiles
                    );
                    projectiles.push(projectile2);
                    player.readyToFire = 0;
                } else {
                    let projectile = new Projectile(
                        player.x,
                        player.y - player.height / 2,
                        player,
                        rgbProjectiles
                    );
                    projectiles.push(projectile);
                    player.readyToFire = 0;
                }
            }
        }
        player.rapidFire
            ? (player.readyToFire += 1.5 * dt)
            : (player.readyToFire += dt);

        // Update every object
        player.update();

        healthBar.update(gameState);
        if (healthBar.damage >= healthBar.max) {
            endGame();
        }

        projectiles.forEach((projectile) => {
            projectile.update(gameState);
        });

        enemies.forEach((enemy) => {
            enemy.update(gameState);
            if (enemy.radius < enemy.minRadius) {
                enemies.splice(enemies.indexOf(enemy), 1);
                player.score += Math.floor(enemy.hitPoints / 3);
                for (
                    let i = 0;
                    i < Math.floor(enemy.originalRadius / 10);
                    i++
                ) {
                    let loot = new Loot(enemy.x, enemy.y, enemy.dy, healthBar);
                    drops.push(loot);
                }
            }
        });

        stars.forEach((star) => {
            star.update(gameState);
            if (star.y >= canvas.height) {
                starCount = starCount - 1;
                stars.splice(stars.indexOf(star), 1);
            }
        });
        drops.forEach((loot) => {
            loot.update(gameState);
        });
        expBar.update(gameState);

        //Spawn stars
        while (starCount < Star.amount) {
            let star = new Star(
                random(-3 * canvas.width, 3 * canvas.width),
                -Star.maxSize
            );
            starCount++;
            stars.push(star);
        }

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

        // Score update
        scoreSpan.innerText = player.score;
        levelSpan.innerText = player.level;
    }

    // Animate
    c.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
        star.draw(gameState);
    });
    projectiles.forEach((projectile) => {
        projectile.draw(gameState);
    });
    enemies.forEach((enemy) => {
        enemy.draw(gameState);
    });
    drops.forEach((loot) => {
        loot.draw(gameState);
    });
    healthBar.draw(gameState);
    expBar.draw(gameState);
    player.draw(gameState);
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
