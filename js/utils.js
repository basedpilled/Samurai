
function rectangularCollision (player,enemy) {
    return (player.attackBox.position.x + player.attackBox.width >= enemy.attackBox.position.x && 
        player.attackBox.position.x  <= enemy.position.x + enemy.width && 
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y && 
        player.attackBox.position.y <= enemy.position.y + enemy.height)
}
let timer = 60;

function determineWinner(player,enemy, timerId) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex';
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie';
    }
    if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Enemy Wins';
    } 
    if (enemy.health < player.health) {
        document.querySelector('#displayText').innerHTML = 'Player Wins';
    }
}
let timerId;
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.getElementById("timer").innerHTML = timer;
    }
    if (timer === 0) {
        determineWinner(player,enemy);
    }
}