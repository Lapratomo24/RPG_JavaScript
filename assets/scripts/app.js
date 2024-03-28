// global value
const attackValue = 10;
const monsterAttackValue = 15;
const strongAttackValue = 18;
const healAmount = 20;

let healthBar = 100;
let monsterHealth = healthBar;
let playerHealth = healthBar;
let hasBonusLife = true;

adjustHealthBars(healthBar);

const reset = () => {
    monsterHealth = healthBar;
    playerHealth = healthBar;
    resetGame(healthBar);
}

const endRound = () => {
    const initialLife = playerHealth;
    const playerDamage = dealPlayerDamage(monsterAttackValue);
    playerHealth -= playerDamage;

    if (playerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        playerHealth = initialLife;
        setPlayerHealth(initialLife);
        alert("One more chance at this");
    }

    if (monsterHealth <= 0 && playerHealth > 0) {
        alert("You won!");
        reset();
    } else if (playerHealth <= 0 && monsterHealth > 0) {
        alert("You lost!");
        reset();
    } else if (monsterHealth <= 0 && playerHealth <= 0) {
        alert("You drew!");
        reset();
    }
}

const attackMonster = (type) => {
    let maxDamage;
    if (type === 'attack') {
        maxDamage = attackValue;
    } else if (type === 'strongAttack') {
        maxDamage = strongAttackValue;
    }

    const damage = dealMonsterDamage(maxDamage);
    monsterHealth -= damage; 

    endRound();
}

const performAttackHandler = () => {
    attackMonster('attack');
}

const performStrongAttackHandler = () => {
    attackMonster('strongAttack');
}

const healPlayerHandler = () => {
    let healValue;
    if (playerHealth >= healthBar - healAmount) {
        alert("You are already at maximum health");
        healValue = healthBar - playerHealth;
    } else {
        healValue = healAmount;
    }
    increasePlayerHealth(healAmount);
    playerHealth += healAmount;
    endRound();
}

attackBtn.addEventListener('click', performAttackHandler);
strongAttackBtn.addEventListener('click', performStrongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);