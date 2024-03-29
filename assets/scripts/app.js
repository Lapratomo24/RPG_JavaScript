// global value
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;
const STRONG_ATTACK_VALUE = 18;
const HEAL_AMOUNT = 20;

const LOG_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_GAME_OVER = 'GAME_OVER';

const enteredValue = prompt("Enter a value", "100")

let healthBar = parseInt(enteredValue);
let battleLog = [];

if (isNaN(healthBar)) {
    healthBar = 100;
}

let monsterHealth = healthBar;
let playerHealth = healthBar;
let hasBonusLife = true;

adjustHealthBars(healthBar);

const showLog = (event, value, monsterHealth, playerHealth) => {
    let logEntry;
    if (event === LOG_PLAYER_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'MONSTER',
            monsterHealth: monsterHealth,
            playerHealth: playerHealth
        }
    } else if (event === LOG_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'MONSTER',
            monsterHealth: monsterHealth,
            playerHealth: playerHealth
        }
    } else if (event === LOG_MONSTER_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'PLAYER',
            monsterHealth: monsterHealth,
            playerHealth: playerHealth
        } 
    } else if (event === LOG_PLAYER_HEAL) {
        logEntry = {
            event: event,
            value: value,
            target: 'PLAYER',
            monsterHealth: monsterHealth,
            playerHealth: playerHealth
        }
    } else if (event === LOG_GAME_OVER) {
        logEntry = {
            event: event,
            value: value,
            monsterHealth: monsterHealth,
            playerHealth: playerHealth
        }
    } 
    battleLog.push(logEntry);
} 

const reset = () => {
    monsterHealth = healthBar;
    playerHealth = healthBar;
    resetGame(healthBar);
}

const endRound = () => {
    const initialLife = playerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    playerHealth -= playerDamage;
    showLog(
        LOG_MONSTER_ATTACK,
        playerDamage,
        monsterHealth,
        playerHealth);

    if (playerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        playerHealth = initialLife;
        setPlayerHealth(initialLife);
        alert("One more chance at this");
    }

    if (monsterHealth <= 0 && playerHealth > 0) {
        alert("You won!");
        showLog(
            LOG_GAME_OVER,
            'PLAYER WON',
            monsterHealth,
            playerHealth);
        reset();
    } else if (playerHealth <= 0 && monsterHealth > 0) {
        alert("You lost!");
        showLog(
            LOG_GAME_OVER,
            'PLAYER LOST',
            monsterHealth,
            playerHealth);
        reset();
    } else if (monsterHealth <= 0 && playerHealth <= 0) {
        alert("You drew!");
        showLog(
            LOG_GAME_OVER,
            'A DRAW',
            monsterHealth,
            playerHealth);
        reset();
    }
}

const attackMonster = (type) => {
    let maxDamage;
    let logEvent;
    if (type === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_PLAYER_ATTACK;
    } else if (type === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_PLAYER_STRONG_ATTACK;
    }

    const damage = dealMonsterDamage(maxDamage);
    monsterHealth -= damage; 
    showLog(
        logEvent,
        damage,
        monsterHealth,
        playerHealth);
    endRound();
}

const performAttackHandler = () => {
    attackMonster('ATTACK');
}

const performStrongAttackHandler = () => {
    attackMonster('STRONG_ATTACK');
}

const healPlayerHandler = () => {
    let healValue;
    if (playerHealth >= healthBar - HEAL_AMOUNT) {
        alert("You are already at maximum health");
        healValue = healthBar - playerHealth;
    } else {
        healValue = HEAL_AMOUNT;
    }
    increasePlayerHealth(HEAL_AMOUNT);
    playerHealth += HEAL_AMOUNT;
    showLog(
        LOG_PLAYER_HEAL,
        healValue,
        monsterHealth,
        playerHealth);
    endRound();
}

const printBattleLogHandler = () => {
    console.log(battleLog);
}

attackBtn.addEventListener('click', performAttackHandler);
strongAttackBtn.addEventListener('click', performStrongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printBattleLogHandler);