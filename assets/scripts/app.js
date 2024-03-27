// global value
const attackValue = 10;
const monsterAttackValue = 15;
const strongAttackValue = 18;

let healthBar = 100;
let monsterHealth = healthBar;
let playerHealth = healthBar;

adjustHealthBars(healthBar);

const attackMonster = (mode) => {
    
}

const performAttackHandler = () => {
    const damage = dealMonsterDamage(attackValue);
    monsterHealth -= damage; 

    const playerDamage = dealPlayerDamage(monsterAttackValue);
    playerHealth -= playerDamage;

    if (monsterHealth <= 0 && playerHealth > 0) {
        console.log("You won!");
    } else if (playerHealth <= 0 && monsterHealth > 0) {
        console.log("You lost!");
    } else if (monsterHealth <= 0 && playerHealth <= 0) {
        console.log("You drew!");
    }
}

const performStrongAttackHandler = () => {
    const damage = dealMonsterDamage(strongAttackValue);
    monsterHealth -= damage; 

    const playerDamage = dealPlayerDamage(monsterAttackValue);
    playerHealth -= playerDamage;

    if (monsterHealth <= 0 && playerHealth > 0) {
        console.log("You won!");
    } else if (playerHealth <= 0 && monsterHealth > 0) {
        console.log("You lost!");
    } else if (monsterHealth <= 0 && playerHealth <= 0) {
        console.log("You drew!");
    }
}

attackBtn.addEventListener('click', performAttackHandler);
strongAttackBtn.addEventListener('click', performStrongAttackHandler);