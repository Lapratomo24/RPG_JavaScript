// global value
const attackValue = 10;
const monsterAttackValue = 15;

let healthBar = 100;
let monsterHealth = healthBar;
let playerHealth = healthBar;

adjustHealthBars(healthBar);

const performAttack = () => {
    const damage = dealMonsterDamage(attackValue);
    monsterHealth -= damage; 

    if (monsterHealth <= 0) {
        console.log("You won!");
    }
}

attackBtn.addEventListener('click', performAttack);