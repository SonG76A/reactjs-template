// Игровые данные
let gameState = {
    gold: 1000,
    army: 10,
    castles: 1,
    income: 0,
    armyGrowth: 0
};

// Постройки
let buildings = {
    farm: { level: 1, goldPerSecond: 5, upgradeCost: 100 },
    barracks: { level: 1, armyPerSecond: 1, upgradeCost: 250 },
    castle: { level: 1, armyBonus: 10, upgradeCost: 1000 },
    wizard: { level: 0, goldPerSecond: 20, upgradeCost: 5000 }
};

// Вражеские замки
let enemyCastles = [
    { id: 1, name: "Банкрот-Бич", defense: 50, rewardGold: 500, rewardCastles: 1, armyCost: 20, conquered: false },
    { id: 2, name: "Цитадель Азаза", defense: 200, rewardGold: 2000, rewardCastles: 3, armyCost: 50, conquered: false },
    { id: 3, name: "Твердыня Гиро", defense: 1000, rewardGold: 10000, rewardCastles: 10, armyCost: 200, conquered: false }
];

// Обновление интерфейса
function updateUI() {
    document.getElementById('gold').textContent = gameState.gold;
    document.getElementById('army').textContent = gameState.army;
    document.getElementById('castles').textContent = gameState.castles;
    
    // Обновление кнопок улучшений
    for (const [type, data] of Object.entries(buildings)) {
        const buildingElement = document.querySelector(`[data-type="${type}"]`);
        if (buildingElement) {
            buildingElement.querySelector('.level').textContent = data.level;
            buildingElement.querySelector('.cost').textContent = data.upgradeCost;
        }
    }
    
    // Обновление вражеских замков
    enemyCastles.forEach(castle => {
        const castleElement = document.querySelector(`[data-id="${castle.id}"]`);
        if (castleElement) {
            castleElement.querySelector('.defense').textContent = castle.defense;
            castleElement.querySelector('.reward').textContent = castle.rewardGold;
            castleElement.querySelector('.army-cost').textContent = castle.armyCost;
            
            const button = castleElement.querySelector('.attack-btn');
            if (castle.conquered) {
                button.textContent = "Захвачено";
                button.disabled = true;
                button.style.background = "#2e7d32";
            }
        }
    });
}

// Улучшение постройки
function upgradeBuilding(type) {
    const building = buildings[type];
    
    if (gameState.gold >= building.upgradeCost) {
        gameState.gold -= building.upgradeCost;
        
        if (type === 'farm') {
            building.level++;
            gameState.income += building.goldPerSecond;
            building.upgradeCost = Math.floor(building.upgradeCost * 1.5);
            addLog(`Ферма улучшена до уровня ${building.level}! (+${building.goldPerSecond} золота/сек)`);
        }
        
        else if (type === 'barracks') {
            building.level++;
            gameState.armyGrowth += building.armyPerSecond;
            building.upgradeCost = Math.floor(building.upgradeCost * 1.5);
            addLog(`Казармы улучшены до уровня ${building.level}! (+${building.armyPerSecond} воин/сек)`);
        }
        
        else if (type === 'castle') {
            building.level++;
            gameState.army += building.armyBonus;
            gameState.castles++;
            building.upgradeCost = Math.floor(building.upgradeCost * 2);
            addLog(`Построен новый замок! +${building.armyBonus} воинов, +1 замок.`);
        }
        
        else if (type === 'wizard' && building.level === 0) {
            building.level = 1;
            gameState.income += building.goldPerSecond;
            addLog(`Башня магии исследована! +${building.goldPerSecond} золота/сек`);
        }
        
        updateUI();
    } else {
        addLog("Недостаточно золота!", true);
    }
}

// Атака замка
function attackCastle(id) {
    const castle = enemyCastles.find(c => c.id === id);
    
    if (castle.conquered) {
        addLog("Этот замок уже ваш!", true);
        return;
    }
    
    if (gameState.army >= castle.armyCost) {
        gameState.army -= castle.armyCost;
        
        // Шанс победы зависит от соотношения армий
        const victoryChance = Math.min(0.9, (gameState.army / castle.defense) * 2);
        
        if (Math.random() < victoryChance) {
            // Победа
            gameState.gold += castle.rewardGold;
            gameState.castles += castle.rewardCastles;
            castle.conquered = true;
            addLog(`🏰 Замок "${castle.name}" захвачен! Награда: ${castle.rewardGold} золота, ${castle.rewardCastles} замков.`);
        } else {
            // Поражение
            addLog(`⚔️ Атака на замок "${castle.name}" отбита! Потеряно ${castle.armyCost} воинов.`, true);
        }
        
        updateUI();
    } else {
        addLog("Недостаточно воинов для атаки!", true);
    }
}

// Пассивный доход
function passiveIncome() {
    gameState.gold += gameState.income;
    gameState.army += gameState.armyGrowth;
    updateUI();
}

// Лог событий
function addLog(message, isError = false) {
    const logContent = document.getElementById('logContent');
    const logEntry = document.createElement('p');
    logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    logEntry.style.color = isError ? '#ff6b6b' : '#4caf50';
    logContent.appendChild(logEntry);
    logContent.scrollTop = logContent.scrollHeight;
}

// Инициализация
setInterval(passiveIncome, 1000); // Пассивный доход каждую секунду
updateUI();
addLog("Королевство Гиро основано! Удачи, мой лорд!");

// Сохранение игры (простое)
function saveGame() {
    localStorage.setItem('kingdomGame', JSON.stringify({ gameState, buildings, enemyCastles }));
    addLog("Игра сохранена!");
}

function loadGame() {
    const saved = localStorage.getItem('kingdomGame');
    if (saved) {
        const data = JSON.parse(saved);
        gameState = data.gameState;
        buildings = data.buildings;
        enemyCastles = data.enemyCastles;
        updateUI();
        addLog("Игра загружена!");
    }
}

// Кнопки сохранения/загрузки (можно добавить в HTML)
// <button onclick="saveGame()">💾 Сохранить</button>
// <button onclick="loadGame()">📂 Загрузить</button>