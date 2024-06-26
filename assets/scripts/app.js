// global value
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;
const STRONG_ATTACK_VALUE = 18;
const HEAL_AMOUNT = 20;

const LOG_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_GAME_OVER = "GAME_OVER";

const healthBarValues = () => {
    const enteredValue = prompt("Enter a value", "100");
    const parsedValue = parseInt(enteredValue);
    if (isNaN(parsedValue) || parsedValue <= 0) {
        throw { message: "Invalid input" };
    }
    return parsedValue;
}

let healthBar;

try {
    healthBar = healthBarValues();
} catch (e) {
    console.log(e);
    healthBar = 100;
    alert("Invalid input. Use a number!")
}

let battleLog = [];
let monsterHealth = healthBar;
let playerHealth = healthBar;
let hasBonusLife = true;

adjustHealthBars(healthBar);

const showLog = (event, value, monsterHealth, playerHealth) => {
    let logEntry = {
        event: event,
        value: value,
        monsterHealth: monsterHealth,
        playerHealth: playerHealth,
    };
    switch (event) {
        case LOG_PLAYER_ATTACK:
            logEntry.target = "MONSTER";
            break;
        case LOG_PLAYER_STRONG_ATTACK:
            logEntry.target = "MONSTER";
            break;
        case LOG_MONSTER_ATTACK:
            logEntry.target = "PLAYER";
            break;
        case LOG_PLAYER_HEAL:
            logEntry.target = "PLAYER";
            break;
        default:
            logEntry = {}
    }
    battleLog.push(logEntry);
};

const reset = () => {
    monsterHealth = healthBar;
    playerHealth = healthBar;
    resetGame(healthBar);
};

const endRound = () => {
    const initialLife = playerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    playerHealth -= playerDamage;
    showLog(LOG_MONSTER_ATTACK, playerDamage, monsterHealth, playerHealth);

    if (playerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        playerHealth = initialLife;
        setPlayerHealth(initialLife);
        alert("One more chance at this");
    }

    if (monsterHealth <= 0 && playerHealth > 0) {
        alert("You won!");
        showLog(LOG_GAME_OVER, "PLAYER WON", monsterHealth, playerHealth);
        reset();
    } else if (playerHealth <= 0 && monsterHealth > 0) {
        alert("You lost!");
        showLog(LOG_GAME_OVER, "PLAYER LOST", monsterHealth, playerHealth);
        reset();
    } else if (monsterHealth <= 0 && playerHealth <= 0) {
        alert("You drew!");
        showLog(LOG_GAME_OVER, "A DRAW", monsterHealth, playerHealth);
        reset();
    }
};

const attackMonster = (type) => {
    let maxDamage = type === "ATTACK" ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    let logEvent =
        type === "ATTACK" ? LOG_PLAYER_ATTACK : LOG_PLAYER_STRONG_ATTACK;
    // if (type === 'ATTACK') {
    //     maxDamage = ATTACK_VALUE;
    //     logEvent = LOG_PLAYER_ATTACK;
    // } else if (type === 'STRONG_ATTACK') {
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_PLAYER_STRONG_ATTACK;
    // }

    const damage = dealMonsterDamage(maxDamage);
    monsterHealth -= damage;
    showLog(logEvent, damage, monsterHealth, playerHealth);
    endRound();
};

const performAttackHandler = () => {
    attackMonster("ATTACK");
};

const performStrongAttackHandler = () => {
    attackMonster("STRONG_ATTACK");
};

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
    showLog(LOG_PLAYER_HEAL, healValue, monsterHealth, playerHealth);
    endRound();
};

const printBattleLogHandler = () => {
    for (const entry of battleLog) {
        console.log(entry);
        for (const key in entry) {
            console.log(`${key} - ${entry[key]}`);
        }
    }
};

attackBtn.addEventListener("click", performAttackHandler);
strongAttackBtn.addEventListener("click", performStrongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printBattleLogHandler);
