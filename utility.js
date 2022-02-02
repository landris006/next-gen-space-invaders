var mouse = {
    x: undefined,
    y: undefined
}
var keyBoard = {};

/* if (keyBoard["KeyD"]) {
    player.x += Player.movementSpeedX;
} */

addEventListener("mousemove", (event)=> {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener("keydown", (event)=> {
    keyBoard[event.code] = true;
}) 

addEventListener("keyup", (event)=> {
    keyBoard[event.code] = false;
})


// random functions
function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomRGB() {
    return "rgb("+randomInt(0, 256)+","+randomInt(0, 256)+","+randomInt(0, 256)+")";
}