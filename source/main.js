const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const imgBackground = new Image();
imgBackground.src = "assets/images/background/menu.png";

const imgProfile = new Image();
imgProfile.src = "assets/images/icons/profile.png";

const imgTrophy = new Image();
imgTrophy.src = "assets/images/icons/trophy.png";

const imgGold = new Image();
imgGold.src = "assets/images/icons/gold.png";

const imgGems = new Image();
imgGems.src = "assets/images/icons/gems.png";

const imgShop = new Image();
imgShop.src = "assets/images/icons/shop.png";

const imgIndex = new Image();
imgIndex.src = "assets/images/icons/index.png";

const imgCommonStarrdrop = new Image();
imgCommonStarrdrop.src = "assets/images/icons/commonStarrdrop.png";

const imgRareStarrdrop = new Image();
imgRareStarrdrop.src = "assets/images/icons/rareStarrdrop.png";

let selectedBrawler = "shelly";
let scene = "menu";
let enemyChosen = false;
let enemy;
let doneDrop = false;
let drop;
let resultShown = false;
let trophies = 0;
let gold = 100;
let gems = 0;
let commonStarrdropAmont = 0;
let rareStarrdropAmont = 0;
let goTo = "menu";

canvas.width = 1250;
canvas.height = 625;

////////////////////////////////////////////////////////////////////////////////////////////////

const key = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
    q: { pressed: false }
}

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('keydown', (evt) => {
    if(evt.key === 'w' || evt.key === 'W') {
        key.w.pressed = true;
    } else if(evt.key === 'a' || evt.key === 'A') {
        key.a.pressed = true;
    } else if(evt.key ==='s' || evt.key === 'S') {
        key.s.pressed = true;
    } else if(evt.key === 'd' || evt.key === 'D') {
        key.d.pressed = true;
    } else if(evt.key === 'q' || evt.key === 'Q') {
        key.q.pressed = true;
    }
});

window.addEventListener('keyup', (evt) => {
    if(evt.key === 'w' || evt.key === 'W') {
        key.w.pressed = false;
    } else if(evt.key === 'a' || evt.key === 'A') {
        key.a.pressed = false;
    } else if(evt.key ==='s' || evt.key === 'S') {
        key.s.pressed = false;
    } else if(evt.key === 'd' || evt.key === 'D') {
        key.d.pressed = false;
    } else if(evt.key === 'q' || evt.key === 'Q') {
        key.q.pressed = false;
    }
});

canvas.addEventListener("mousemove", (evt) => {
    let gameRect = canvas.getBoundingClientRect();
    cursor.x = evt.clientX - gameRect.left;
    cursor.y = evt.clientY - gameRect.top;
})

canvas.addEventListener("click", () => {
    if(scene == "menu") {
        if(cursor.x > 90 && cursor.x < 210 && cursor.y > 520 && cursor.y < 600) {
            scene = "shop";
        } else if(cursor.x > 235 && cursor.x < 355 && cursor.y > 520 && cursor.y < 600) {
            scene = "index";
        } else if(cursor.x > 385 && cursor.x < 840 && cursor.y > 520 && cursor.y < 600) {
            scene = "game";
        } else if(cursor.x > 870 && cursor.x < 990 && cursor.y > 520 && cursor.y < 600) {
            if(commonStarrdropAmont > 0) {
                commonStarrdropAmont--;
                goTo = "menu";
                scene = "commonStarrdrop";
            }
        } else if(cursor.x > 1010 && cursor.x < 1140 && cursor.y > 520 && cursor.y < 600) {
            if(commonStarrdropAmont > 0) {
                rareStarrdropAmont--;
                goTo = "menu";
                scene = "rareStarrdrop";
            }
        }
    } else if(scene == "shop") {
        if(cursor.x > 745 && cursor.x < 870 && cursor.y > 15 && cursor.y < 95) {
            scene = "menu";
        } else if(cursor.x > 150 && cursor.x < 340 && cursor.y > 150 && cursor.y < 515) {
            if(gold >= 100) {
                scene = "commonStarrdrop";
                goTo = "shop";
                gold -= 100;
            }
        } else if(cursor.x > 370 && cursor.x < 560 && cursor.y > 150 && cursor.y < 515) {
            if(gems >= 10) {
                scene = "commonStarrdrop";
                goTo = "shop";
                gems -= 10;
            }
        } else if(cursor.x > 590 && cursor.x < 785 && cursor.y > 150 && cursor.y < 515) {
            if(gold >= 750) {
                scene = "rareStarrdrop";
                goTo = "shop";
                gold -= 750;
            }
        } else if(cursor.x > 810 && cursor.x < 1000 && cursor.y > 150 && cursor.y < 515) {
            if(gems >= 70) {
                scene = "rareStarrdrop";
                goTo = "shop";
                gems -= 70;
            }
        }
    } else if(scene == "index") {
        if(cursor.x > 745 && cursor.x < 870 && cursor.y > 15 && cursor.y < 95) {
            scene = "menu";
        } else if(cursor.x > 150 && cursor.x < 340 && cursor.y > 150 && cursor.y < 515) {
            selectedBrawler = "shelly";
            scene = "menu";
        } else if(cursor.x > 370 && cursor.x < 560 && cursor.y > 150 && cursor.y < 515) {
            selectedBrawler = "colt";
            scene = "menu";
        } else if(cursor.x > 590 && cursor.x < 785 && cursor.y > 150 && cursor.y < 515) {
            selectedBrawler = "elprimo";
            scene = "menu";
        } else if(cursor.x > 810 && cursor.x < 1000 && cursor.y > 150 && cursor.y < 515) {
            selectedBrawler = "edgar";
            scene = "menu";
        }
    } else if(scene == "commonStarrdrop") {
        if(cursor.x > 0 && cursor.x < 1250 && cursor.y > 0 && cursor.y < 625) {
            scene = "dropCommon";
        }
    } else if(scene == "rareStarrdrop") {
        if(cursor.x > 0 && cursor.x < 1250 && cursor.y > 0 && cursor.y < 625) {
            scene = "dropRare";
        }
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////

setInterval(() => {
    if(commonStarrdropAmont < 5) {
        commonStarrdropAmont++;
    }
}, 15000);

setInterval(() => {
    if(rareStarrdropAmont < 3) {
        rareStarrdropAmont++;
    }
}, 60000);

////////////////////////////////////////////////////////////////////////////////////////////////

function drawCurrencies() {
    ctx.fillStyle = "#ffffff";
    ctx.font = "32px Nougat-ExtraBlack";

    if(gold > 999) {
        ctx.fillText(gold, 905, 82.5);
    } else if(gold > 99) {
        ctx.fillText(gold, 915, 82.5);
    } else if(gold > 9) {
        ctx.fillText(gold, 925, 82.5);
    } else {
        ctx.fillText(gold, 935, 82.5);
    }

    if(gems > 999) {
        ctx.fillText(gems, 1055, 82.5);
    } else if(gems > 99) {
        ctx.fillText(gems, 1065, 82.5);
    } else if(gems > 9) {
        ctx.fillText(gems, 1075, 82.5);
    } else {
        ctx.fillText(gems, 1085, 82.5);
    }
}

function drawMenu() {
    ctx.drawImage(imgBackground, 0, 0, canvas.width, canvas.height);

    // Styles
    ctx.font = "32px Nougat-ExtraBlack";
    ctx.fillStyle = "#33334d";
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;

    // Buttons
    ctx.setTransform(1, 0, -0.2, 1, 0, 0);
    ctx.fillRect(100, 15, 125, 80);
    ctx.strokeRect(100, 15, 125, 80);
    ctx.fillRect(255, 15, 475, 80);
    ctx.strokeRect(255, 15, 475, 80);
    ctx.fillRect(895, 15, 125, 80);
    ctx.strokeRect(895, 15, 125, 80);
    ctx.fillRect(1045, 15, 125, 80);
    ctx.strokeRect(1045, 15, 125, 80);
    ctx.fillRect(205, 525, 125, 80);
    ctx.strokeRect(205, 525, 125, 80);
    ctx.fillRect(355, 525, 125, 80);
    ctx.strokeRect(355, 525, 125, 80)
    ctx.fillRect(505, 525, 470, 80);
    ctx.strokeRect(505, 525, 470, 80);
    ctx.fillRect(1000, 525, 125, 80);
    ctx.strokeRect(1000, 525, 125, 80);
    ctx.fillRect(1150, 525, 125, 80);
    ctx.strokeRect(1150, 525, 125, 80);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Icons
    ctx.setTransform(1, 0, -0.2, 1, 0, 0);
    ctx.drawImage(imgProfile, 130, 22, 65, 65);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(imgTrophy, 270, 30, 60, 50);
    ctx.drawImage(imgGold, 930, 2.5, 45, 45);
    ctx.drawImage(imgGems, 1080, 2.5, 45, 45);
    ctx.drawImage(imgShop, 122.5, 535, 60, 60);
    ctx.drawImage(imgIndex, 275, 535, 65, 60);
    ctx.drawImage(imgCommonStarrdrop, 925, 495, 65, 65);
    ctx.drawImage(imgRareStarrdrop, 1075, 495, 65, 65);

    // Text
    ctx.fillStyle = "#ffffff";
    ctx.fillText(trophies, 350, 65.5);
    ctx.fillText("ZAGRAJ", 570, 575);
    ctx.fillText((commonStarrdropAmont + "/5"), 920, 590);
    ctx.fillText((rareStarrdropAmont + "/3"), 1070, 590);
    drawCurrencies();
}

function drawShop() {
    ctx.drawImage(imgBackground, 0, 0, canvas.width, canvas.height);

    // Styles
    ctx.font = "32px Nougat-ExtraBlack";
    ctx.fillStyle = "#33334d";
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;

    // Buttons
    ctx.setTransform(1, 0, -0.2, 1, 0, 0);
    ctx.fillRect(745, 15, 125, 80);
    ctx.strokeRect(745, 15, 125, 80);
    ctx.fillRect(895, 15, 125, 80);
    ctx.strokeRect(895, 15, 125, 80);
    ctx.fillRect(1045, 15, 125, 80);
    ctx.strokeRect(1045, 15, 125, 80);
    ctx.fillRect(250, 150, 200, 375);
    ctx.strokeRect(250, 150, 200, 375);
    ctx.fillRect(475, 150, 200, 375);
    ctx.strokeRect(475, 150, 200, 375);
    ctx.fillRect(700, 150, 200, 375);
    ctx.strokeRect(700, 150, 200, 375);
    ctx.fillRect(925, 150, 200, 375);
    ctx.strokeRect(925, 150, 200, 375);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Icons
    ctx.drawImage(imgGold, 930, 2.5, 45, 45);
    ctx.drawImage(imgGems, 1080, 2.5, 45, 45);
    ctx.drawImage(imgCommonStarrdrop, 240, 175, 125, 125);
    ctx.drawImage(imgGold, 200, 450, 35, 35);
    ctx.drawImage(imgCommonStarrdrop, 465, 175, 125, 125);
    ctx.drawImage(imgGems, 435, 450, 35, 35);
    ctx.drawImage(imgRareStarrdrop, 690, 175, 125, 125);
    ctx.drawImage(imgGold, 660, 450, 35, 35);
    ctx.drawImage(imgRareStarrdrop, 915, 175, 125, 125);
    ctx.drawImage(imgGems, 885, 450, 35, 35);

    // Text
    ctx.fillStyle = "#ffffff";
    drawCurrencies();
    ctx.fillText("100", 240, 480);
    ctx.fillText("10", 475, 480);
    ctx.fillText("750", 700, 480);
    ctx.fillText("70", 925, 480);
    ctx.font = "64px Nougat-ExtraBlack";
    ctx.fillText("<", 775, 75);
}

function drawIndex() {
    ctx.drawImage(imgBackground, 0, 0, canvas.width, canvas.height);

    // Styles
    ctx.font = "32px Nougat-ExtraBlack";
    ctx.fillStyle = "#33334d";
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;

    // Buttons
    ctx.setTransform(1, 0, -0.2, 1, 0, 0);
    ctx.fillRect(745, 15, 125, 80);
    ctx.strokeRect(745, 15, 125, 80);
    ctx.fillRect(895, 15, 125, 80);
    ctx.strokeRect(895, 15, 125, 80);
    ctx.fillRect(1045, 15, 125, 80);
    ctx.strokeRect(1045, 15, 125, 80);
    ctx.fillRect(250, 150, 200, 375);
    ctx.strokeRect(250, 150, 200, 375);
    ctx.fillRect(475, 150, 200, 375);
    ctx.strokeRect(475, 150, 200, 375);
    ctx.fillRect(700, 150, 200, 375);
    ctx.strokeRect(700, 150, 200, 375);
    ctx.fillRect(925, 150, 200, 375);
    ctx.strokeRect(925, 150, 200, 375);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Icons
    ctx.drawImage(imgGold, 930, 2.5, 45, 45);
    ctx.drawImage(imgGems, 1080, 2.5, 45, 45);
    ctx.drawImage(imgShelly, 240, 175, 125, 125);
    ctx.drawImage(imgColt, 465, 175, 125, 125);
    ctx.drawImage(imgElprimo, 690, 175, 125, 125);
    ctx.drawImage(imgEdgar, 915, 175, 125, 125);

    // Text
    ctx.fillStyle = "#ffffff";
    drawCurrencies();
    ctx.fillText("WYBIERZ", 195, 480);
    ctx.fillText("WYBIERZ", 420, 480);
    ctx.fillText("WYBIERZ", 645, 480);
    ctx.fillText("WYBIERZ", 870, 480);
    ctx.font = "64px Nougat-ExtraBlack";
    ctx.fillText("<", 775, 75);
}

function drawStarrdrop(rarity) {
    ctx.drawImage(imgBackground, 0, 0, canvas.width, canvas.height);

    const rarities = {
        common: imgCommonStarrdrop,
        rare: imgRareStarrdrop
    };

    ctx.drawImage(rarities[rarity], canvas.width / 2 - 122.5, canvas.height / 2 - 112.5, 245, 225);
}

function drawDrop(rarity) {
    ctx.drawImage(imgBackground, 0, 0, canvas.width, canvas.height);

    let drops = [];
    if(rarity == "common") {
        drops = [
            { img: imgGold, amount: 50 },
            { img: imgGold, amount: 75 },
            { img: imgGold, amount: 100 },
            { img: imgGold, amount: 125 },
            { img: imgGold, amount: 150 },
            { img: imgGems, amount: 10 },
            { img: imgGems, amount: 20 },
            { img: imgGems, amount: 30 },
            { img: imgGems, amount: 40 }
        ];
    } else if(rarity == "rare") {
        drops = [
            { img: imgGold, amount: 250 },
            { img: imgGold, amount: 275 },
            { img: imgGold, amount: 300 },
            { img: imgGold, amount: 325 },
            { img: imgGold, amount: 350 },
            { img: imgGems, amount: 30 },
            { img: imgGems, amount: 40 },
            { img: imgGems, amount: 50 },
            { img: imgGems, amount: 60 },
            { img: imgGems, amount: 70 },
            { img: imgGems, amount: 80 },
        ];
    }

    if(!doneDrop) {
        let selectedDropIndex = Math.floor(Math.random() * drops.length);
        drop = drops[selectedDropIndex];
        doneDrop = true;

        if(drop.img == imgGold) {
            gold += drop.amount;
        } else if(drop.img == imgGems) {
            gems += drop.amount;
        }

        setTimeout(() => {
            if(goTo == "menu") {
                scene = "menu";
            } else if(goTo == "shop") {
                scene = "shop";
            }
            doneDrop = false;
        }, 1000);
    } else {
        ctx.drawImage(drop.img, canvas.width / 2 - 100, canvas.height / 2 - 100, 200, 200);

        ctx.font = "32px Nougat-ExtraBlack";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(drop.amount, canvas.width / 2, 450);
        ctx.textAlign = "left";
    }
}

function drawGame() {
    ctx.drawImage(imgBackground, 0, 0, canvas.width, canvas.height);

    // Styles
    ctx.font = "32px Nougat-ExtraBlack";
    ctx.fillStyle = "#33334d";
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;

    // Buttons
    ctx.setTransform(1, 0, -0.2, 1, 0, 0);
    ctx.fillRect(100, 15, 100, 50);
    ctx.strokeRect(100, 15, 100, 50);
    ctx.fillRect(225, 15, 100, 50);
    ctx.strokeRect(225, 15, 100, 50);
    ctx.fillRect(350, 15, 100, 50);
    ctx.strokeRect(350, 15, 100, 50);
    ctx.fillRect(475, 15, 335, 50);
    ctx.strokeRect(475, 15, 335, 50);
    ctx.fillRect(835, 15, 335, 50);
    ctx.strokeRect(835, 15, 335, 50);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Text
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "right";
    ctx.fillText(shelly.health, 780, 50);
    ctx.fillText(shellyEnemy.health, 1140, 50);
    ctx.textAlign = "left";
}

function drawResults(result) {
    ctx.drawImage(imgBackground, 0, 0, canvas.width, canvas.height);

    // Styles
    ctx.font = "64px Nougat-ExtraBlack";
    ctx.fillStyle = "#33334d";
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;

    // Icons
    ctx.drawImage(imgTrophy, canvas.width / 2 - 100, canvas.height / 2 - 40, 100, 80);

    // Text
    ctx.fillStyle = "#ffffff";
    ctx.fillText(result ? "+10" : "-10", 640, canvas.height / 2 + 20);
}

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(scene == "menu") {
        drawMenu();
    } else if(scene == "shop") {
        drawShop();
    } else if(scene == "index") {
        drawIndex();
    } else if(scene == "commonStarrdrop") {
        drawStarrdrop("common");
    } else if(scene == "rareStarrdrop") {
        drawStarrdrop("rare");
    } else if(scene == "dropCommon") {
        drawDrop("common");
    } else if(scene == "dropRare") {
        drawDrop("rare");
    } else if(scene == "game") {
        drawGame();
    } else if(scene == "resultsW") {
        drawResults(true);

        if(!resultShown) {
            resultShown = true;
            setTimeout(() => {
                scene = "menu";
                resultShown = false;
            }, 1000);
        }
    } else if(scene == "resultsL") {
        drawResults(false);

        if(!resultShown) {
            resultShown = true;
            setTimeout(() => {
                scene = "menu";
                resultShown = false;
            }, 1000);
        }
    }

    if(scene == "game") {
        if(!enemyChosen) {
            enemyChosen = true;
            enemy = Math.floor(Math.random() * 4) + 1;
        } else {
            if(enemy == 1) {
                shellyEnemy.draw();
            } else if(enemy == 2) {
                coltEnemy.draw();
            } else if(enemy == 3) {
                elprimoEnemy.draw();
            } else if(enemy == 4) {
                edgarEnemy.draw();
            }
        }
    }

    if(selectedBrawler == "shelly") {
        shelly.draw();
    } else if(selectedBrawler == "colt") {
        colt.draw();
    } else if(selectedBrawler == "elprimo") {
        elprimo.draw();
    } else if(selectedBrawler == "edgar") {
        edgar.draw();
    }

    requestAnimationFrame(main);
}

main();