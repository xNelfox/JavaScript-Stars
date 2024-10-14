const imgShelly = new Image();
imgShelly.src = "assets/images/brawlers/shelly.png";

const imgShellyAttack = new Image();
imgShellyAttack.src = "assets/images/attacks/shelly.png";

const imgColt = new Image();
imgColt.src = "assets/images/brawlers/colt.png";

const imgColtAttack = new Image();
imgColtAttack.src = "assets/images/attacks/colt.png";

const imgElprimo = new Image();
imgElprimo.src = "assets/images/brawlers/elprimo.png";

const imgElprimoAttack = new Image();
imgElprimoAttack.src = "assets/images/attacks/elprimo.png";

const imgEdgar = new Image();
imgEdgar.src = "assets/images/brawlers/edgar.png";

const imgEdgarAttack = new Image();
imgEdgarAttack.src = "assets/images/attacks/edgar.png";

////////////////////////////////////////////////////////////////////////////////////////////////

function resetStats() {
    const brawlers = [shelly, colt, elprimo, edgar];
    brawlers.forEach(brawler => {
        brawler.pos.x = canvas.width / 2 - 87.5;
        brawler.pos.y = canvas.height / 2 - 87.5;
        brawler.health = brawler.maxHealth;
        brawler.reloading = false;
        brawler.attackAmount = 3;
        brawler.canAttack = true;
    });

    const enemyBrawlers = [shellyEnemy, coltEnemy, elprimoEnemy, edgarEnemy];
    enemyBrawlers.forEach(brawler => {
        brawler.pos.x = canvas.width / 2 - 450;
        brawler.pos.y = canvas.height / 2 - 87.5;
        brawler.health = brawler.maxHealth;
        brawler.reloading = false;
        brawler.attackAmount = 3;
        brawler.canAttack = true;
    });
}

function endGame(result) {
    enemyChosen = false;

    if(result) {
        scene = "resultsW";
        trophies += 10;
        gold += 20;
    } else if(!result) {
        scene = "resultsL";
        if(trophies >= 10) {
            trophies -= 10;
        }
    }

    resetStats();
}

////////////////////////////////////////////////////////////////////////////////////////////////

class Brawler {
    constructor({img, imgAttack, pos, name}) {
        this.img = img;
        this.imgAttack = imgAttack;
        this.pos = pos;
        this.brawler = name;
        this.width = 150;
        this.height = 150;
        this.isAttackVisible = false;
    }

    draw() {
        if(scene == "menu" || scene == "game") {
            ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
        }

        if(scene != "game") {
            return;
        }

        if(this.attackAmount == 0 && !this.reloading) {
            this.reloadAmo(3);
        } else if(this.attackAmount == 1 && !this.reloading) {
            this.reloadAmo(2);
        }  else if(this.attackAmount == 2 && !this.reloading) {
            this.reloadAmo(1);
        }

        if(key.q.pressed) {
            this.brawlerAttack();
        }

        this.handleMovement();
        this.drawHealthBar();
        this.drawAttackAvaliable();

        if(this.isAttackVisible) {
            this.drawAttackImg(this.attackX, this.attackY);
        }
    }

    handleMovement() {
        if(key.w.pressed) {
            this.pos.y -= 2.5;

            if(this.pos.y < 0 + 75) {
                this.pos.y = 0 + 75;
            }
        } else if(key.a.pressed) {
            this.pos.x -= 2.5;

            if(this.pos.x < 0) {
                this.pos.x = 0;
            }
        } else if(key.s.pressed) {
            this.pos.y += 2.5;

            if(this.pos.y + this.height > canvas.height) {
                this.pos.y = canvas.height - this.height;
            }
        } else if(key.d.pressed) {
            this.pos.x += 2.5;

            if(this.pos.x + this.width > canvas.width) {
                this.pos.x = canvas.width - this.width;
            }
        }
    }

    drawHealthBar() {
        ctx.fillStyle = "#27ae60";
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 5;

        const maxHealth = this.maxHealth;
        const healthBarWidth = (this.health / maxHealth) * 335;

        ctx.setTransform(1, 0, -0.2, 1, 0, 0);
        ctx.fillRect(475, 15, healthBarWidth, 50);
        ctx.strokeRect(475, 15, healthBarWidth, 50);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawAttackAvaliable() {
        ctx.fillStyle = "#d86c24";
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 5;

        for(let i = 0; i < this.attackAmount; i++) {
            ctx.setTransform(1, 0, -0.2, 1, 0, 0);
            ctx.fillRect(100 + i * 125, 15, 100, 50);
            ctx.strokeRect(100 + i * 125, 15, 100, 50);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }

    drawAttackImg(attackX, attackY) {
        ctx.save();
        ctx.translate(attackX, attackY);
        ctx.rotate(this.attackAngle);
        ctx.drawImage(this.imgAttack, -50, -50, 100, 100);
        ctx.restore();
    }

    drawAttack(attackX, attackY) {
        this.attackX = attackX;
        this.attackY = attackY;
        this.isAttackVisible = true;

        setTimeout(() => {
            this.isAttackVisible = false;
        }, 100);

        let brawler;
        if(enemy == 1) {
            brawler = shellyEnemy;
        } else if(enemy == 2) {
            brawler = coltEnemy;
        } else if(enemy == 3) {
            brawler = elprimoEnemy;
        } else if(enemy == 4) {
            brawler = edgarEnemy;
        }

        const isEnemyHit = (
            brawler.pos.x < attackX + 100 &&
            brawler.pos.x + shellyEnemy.width > attackX - 50 &&
            brawler.pos.y < attackY + 100 &&
            brawler.pos.y + shellyEnemy.height > attackY - 50
        );

        if(isEnemyHit) {
            brawler.health -= this.damage;

            if(brawler.health <= 0) {
                endGame(true);
            }
        }
    }


    reloadAmo(missingAttacks) {
        this.reloading = true;

        for(let i = 0; i < missingAttacks; i++) {
            setTimeout(() => {
                if(this.attackAmount < 3) {
                    this.attackAmount++;
                }
                if(i === missingAttacks - 1) {
                    this.reloading = false;
                }
            }, this.reloadSpeed * 1000 * (i + 1));
        }
    }

    brawlerAttack() {
        if(this.attackAmount == 0 || !this.canAttack) {
            return;
        }

        this.canAttack = false;
        this.attackAmount--;
        this.drawAttackAvaliable();

        let dx = cursor.x - (this.pos.x + this.width / 2);
        let dy = cursor.y - (this.pos.y + this.height / 2);
        let distance = Math.sqrt(dx * dx + dy * dy);
        let normalizedX = dx / distance;
        let normalizedY = dy / distance;

        let attackDistance = 10 * this.range;

        let attackX = (this.pos.x + this.width / 2) + normalizedX * attackDistance;
        let attackY = (this.pos.y + this.height / 2) + normalizedY * attackDistance;

        this.attackAngle = Math.atan2(dy, dx);

        this.drawAttack(attackX, attackY);
        this.drawAttackImg(attackX, attackY);

        setTimeout(() => {
            this.canAttack = true;
        }, 500);
    }
}

class Shelly extends Brawler {
    constructor({img, imgAttack, pos}) {
        super({img, imgAttack, pos, name: "shelly"});
        this.maxHealth = 5000;
        this.health = 5000;
        this.damage = 1660;
        this.range = 7.67;
        this.reloadSpeed = 1.5;
        this.reloading = false;
        this.attackAmount = 3;
        this.canAttack = true;
    }
}

class Colt extends Brawler {
    constructor({img, imgAttack, pos}) {
        super({img, imgAttack, pos, name: "colt"});
        this.maxHealth = 4000;
        this.health = 4000;
        this.damage = 2000;
        this.range = 10;
        this.reloadSpeed = 1.2;
        this.reloading = false;
        this.attackAmount = 3;
        this.canAttack = true;
    }
}

class Elprimo extends Brawler {
    constructor({img, imgAttack, pos}) {
        super({img, imgAttack, pos, name: "elprimo"});
        this.maxHealth = 6000;
        this.health = 6000;
        this.damage = 1500;
        this.range = 5;
        this.reloadSpeed = 2;
        this.reloading = false;
        this.attackAmount = 3;
        this.canAttack = true;
    }
}

class Edgar extends Brawler {
    constructor({img, imgAttack, pos}) {
        super({img, imgAttack, pos, name: "edgar" });
        this.maxHealth = 4200;
        this.health = 4200;
        this.damage = 1200;
        this.range = 5;
        this.reloadSpeed = 1.2;
        this.reloading = false;
        this.attackAmount = 3;
        this.canAttack = true;
    }
}

const shelly = new Shelly({
    img: imgShelly,
    imgAttack: imgShellyAttack,
    pos: { x: canvas.width / 2 - 87.5, y: canvas.height / 2 - 87.5}
});

const colt = new Colt({
    img: imgColt,
    imgAttack: imgColtAttack,
    pos: { x: canvas.width / 2 - 87.5, y: canvas.height / 2 - 87.5}
});

const elprimo = new Elprimo({
    img: imgElprimo,
    imgAttack: imgElprimoAttack,
    pos: { x: canvas.width / 2 - 87.5, y: canvas.height / 2 - 87.5}
});

const edgar = new Edgar({
    img: imgEdgar,
    imgAttack: imgEdgarAttack,
    pos: { x: canvas.width / 2 - 87.5, y: canvas.height / 2 - 87.5}
});

////////////////////////////////////////////////////////////////////////////////////////////////

class EnemyBrawler {
    constructor({img, imgAttack, pos, name}) {
        this.img = img;
        this.imgAttack = imgAttack;
        this.pos = pos;
        this.brawler = name;
        this.width = 150;
        this.height = 150;
        this.isAttackVisible = false;
    }

    draw() {
        if(scene != "game") {
            return;
        }

        this.brawlerAttack();

        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
        const movement = Math.floor(Math.random() * 5);

        if(this.attackAmount == 0 && !this.reloading) {
            this.reloadAmo(3);
        } else if(this.attackAmount == 1 && !this.reloading) {
            this.reloadAmo(2);
        }  else if(this.attackAmount == 2 && !this.reloading) {
            this.reloadAmo(1);
        }

        this.handleMovement(movement);
        this.drawHealthBar();

        if(this.isAttackVisible) {
            this.drawAttackImg(this.attackX, this.attackY);
        }
    }

    handleMovement(movement) {
        if(movement == 1) {
            this.pos.y -= 2.5;

            if(this.pos.y < 0 + 75) {
                this.pos.y = 0 + 75;
            }
        } else if(movement == 2) {
            this.pos.x -= 2.5;

            if(this.pos.x < 0) {
                this.pos.x = 0;
            }
        } else if(movement == 4) {
            this.pos.y += 2.5;

            if(this.pos.y + this.height > canvas.height) {
                this.pos.y = canvas.height - this.height;
            }
        } else if(movement == 5) {
            this.pos.x += 2.5;

            if(this.pos.x + this.width > canvas.width) {
                this.pos.x = canvas.width - this.width;
            }
        }
    }

    drawHealthBar() {
        ctx.fillStyle = "#e74c3c";
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 5;

        const maxHealth = this.maxHealth;
        const healthBarWidth = (this.health / maxHealth) * 335;

        ctx.setTransform(1, 0, -0.2, 1, 0, 0);
        ctx.fillRect(835, 15, healthBarWidth, 50);
        ctx.strokeRect(835, 15, healthBarWidth, 50);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawAttackImg(attackX, attackY) {
        ctx.save();
        ctx.translate(attackX, attackY);
        ctx.rotate(this.attackAngle);
        ctx.drawImage(this.imgAttack, -50, -50, 100, 100);
        ctx.restore();
    }

    drawAttack(attackX, attackY) {
        this.attackX = attackX;
        this.attackY = attackY;
        this.isAttackVisible = true;

        setTimeout(() => {
            this.isAttackVisible = false;
        }, 100);

        const isEnemyHit = (
            eval(selectedBrawler).pos.x < attackX + 100 &&
            eval(selectedBrawler).pos.x + shellyEnemy.width > attackX - 50 &&
            eval(selectedBrawler).pos.y < attackY + 100 &&
            eval(selectedBrawler).pos.y + shellyEnemy.height > attackY - 50
        );

        if(isEnemyHit) {
            eval(selectedBrawler).health -= this.damage;

            if(eval(selectedBrawler).health <= 0) {
                endGame(false);
            }
        }
    }

    reloadAmo(missingAttacks) {
        this.reloading = true;

        for(let i = 0; i < missingAttacks; i++) {
            setTimeout(() => {
                if(this.attackAmount < 3) {
                    this.attackAmount++;
                }
                if(i === missingAttacks - 1) {
                    this.reloading = false;
                }
            }, this.reloadSpeed * 1000 * (i + 1));
        }
    }

    brawlerAttack() {
        if(this.attackAmount == 0 || !this.canAttack) {
            return;
        }

        this.canAttack = false;
        this.attackAmount--;

        let attackDistance = 10 * this.range;

        let attackX = (this.pos.x + this.width / 2) + 1 * attackDistance;
        let attackY = (this.pos.y + this.height / 2) + 1 * attackDistance;

        this.attackAngle = Math.atan2(this.pos.x + this.width / 2, this.pos.x + this.height / 2);

        this.drawAttack(attackX, attackY);
        this.drawAttackImg(attackX, attackY);

        setTimeout(() => {
            this.canAttack = true;
        }, 500);
    }
}

class ShellyEnemy extends EnemyBrawler {
    constructor({img, imgAttack, pos}) {
        super({img, imgAttack, pos, name: "shelly"});
        this.maxHealth = 5000;
        this.health = 5000;
        this.damage = 1660;
        this.range = 7.67;
        this.reloadSpeed = 1.5;
        this.reloading = false;
        this.attackAmount = 3;
        this.canAttack = true;
    }
}

class ColtEnemy extends EnemyBrawler {
    constructor({img, imgAttack, pos}) {
        super({img, imgAttack, pos, name: "colt"});
        this.maxHealth = 4000;
        this.health = 4000;
        this.damage = 2000;
        this.range = 10;
        this.reloadSpeed = 1.2;
        this.reloading = false;
        this.attackAmount = 3;
        this.canAttack = true;
    }
}

class ElprimoEnemy extends EnemyBrawler {
    constructor({img, imgAttack, pos}) {
        super({img, imgAttack, pos, name: "elprimo"});
        this.maxHealth = 6000;
        this.health = 6000;
        this.damage = 1500;
        this.range = 5;
        this.reloadSpeed = 2;
        this.reloading = false;
        this.attackAmount = 3;
        this.canAttack = true;
    }
}

class EdgarEnemy extends EnemyBrawler {
    constructor({img, imgAttack, pos}) {
        super({img, imgAttack, pos, name: "edgar" });
        this.maxHealth = 4200;
        this.health = 4200;
        this.damage = 1200;
        this.range = 5;
        this.reloadSpeed = 1.2;
        this.reloading = false;
        this.attackAmount = 3;
        this.canAttack = true;
    }
}

const shellyEnemy = new ShellyEnemy({
    img: imgShelly,
    imgAttack: imgShellyAttack,
    pos: { x: canvas.width / 2 - 450, y: canvas.height / 2 - 87.5}
});

const coltEnemy = new ColtEnemy({
    img: imgColt,
    imgAttack: imgColtAttack,
    pos: { x: canvas.width / 2 - 450, y: canvas.height / 2 - 87.5}
});

const elprimoEnemy = new ElprimoEnemy({
    img: imgElprimo,
    imgAttack: imgElprimoAttack,
    pos: { x: canvas.width / 2 - 450, y: canvas.height / 2 - 87.5}
});

const edgarEnemy = new EdgarEnemy({
    img: imgEdgar,
    imgAttack: imgEdgarAttack,
    pos: { x: canvas.width / 2 - 450, y: canvas.height / 2 - 87.5}
});