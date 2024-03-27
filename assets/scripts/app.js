// global value
const attackValue = 10;
const monsterAttackValue = 15;
const strongAttackValue = 18;
const healAmount = 20;

let healthBar = 100;
let monsterHealth = healthBar;
let playerHealth = healthBar;

adjustHealthBars(healthBar);

const endRound = () => {
    const playerDamage = dealPlayerDamage(monsterAttackValue);
    playerHealth -= playerDamage;

    if (monsterHealth <= 0 && playerHealth > 0) {
        alert("You won!");
    } else if (playerHealth <= 0 && monsterHealth > 0) {
        alert("You lost!");
    } else if (monsterHealth <= 0 && playerHealth <= 0) {
        alert("You drew!");
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