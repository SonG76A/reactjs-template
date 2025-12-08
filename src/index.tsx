kingdom_game/
├── index.html
├── style.css
├── script.js
└── assets/ (папка с иконками)
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Королевство Гиро</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <!-- Заголовок -->
        <header>
            <h1><i class="fas fa-crown"></i> Королевство Гиро</h1>
            <p class="subtitle">Строй замки, собирай армию, покоряй земли!</p>
        </header>

        <!-- Ресурсы -->
        <div class="resources">
            <div class="resource">
                <span class="icon">🪙</span>
                <span>Золото: <strong id="gold">1000</strong></span>
            </div>
            <div class="resource">
                <span class="icon">⚔️</span>
                <span>Армия: <strong id="army">10</strong></span>
            </div>
            <div class="resource">
                <span class="icon">🏰</span>
                <span>Замки: <strong id="castles">1</strong></span>
            </div>
        </div>

        <!-- Основной интерфейс -->
        <div class="game-content">
            <!-- Левая колонка: Постройки -->
            <div class="buildings">
                <h2><i class="fas fa-hammer"></i> Постройки</h2>
                <div class="building" data-type="farm">
                    <div class="building-icon">🌾</div>
                    <div class="building-info">
                        <h3>Ферма</h3>
                        <p>+5 золота/сек</p>
                        <p>Уровень: <span class="level">1</span></p>
                    </div>
                    <button class="upgrade-btn" onclick="upgradeBuilding('farm')">
                        Улучшить (<span class="cost">100</span> 🪙)
                    </button>
                </div>

                <div class="building" data-type="barracks">
                    <div class="building-icon">⚔️</div>
                    <div class="building-info">
                        <h3>Казармы</h3>
                        <p>+1 воин/сек</p>
                        <p>Уровень: <span class="level">1</span></p>
                    </div>
                    <button class="upgrade-btn" onclick="upgradeBuilding('barracks')">
                        Улучшить (<span class="cost">250</span> 🪙)
                    </button>
                </div>

                <div class="building" data-type="castle">
                    <div class="building-icon">🏰</div>
                    <div class="building-info">
                        <h3>Замок</h3>
                        <p>+10 армии, +1 замок</p>
                        <p>Уровень: <span class="level">1</span></p>
                    </div>
                    <button class="upgrade-btn" onclick="upgradeBuilding('castle')">
                        Купить (<span class="cost">1000</span> 🪙)
                    </button>
                </div>

                <div class="building" data-type="wizard">
                    <div class="building-icon">🔮</div>
                    <div class="building-info">
                        <h3>Башня магии</h3>
                        <p>+20 золота/сек</p>
                        <p>Уровень: <span class="level">0</span></p>
                    </div>
                    <button class="upgrade-btn" onclick="upgradeBuilding('wizard')">
                        Исследовать (<span class="cost">5000</span> 🪙)
                    </button>
                </div>
            </div>

            <!-- Правая колонка: Замки и битвы -->
            <div class="castles">
                <h2><i class="fas fa-flag"></i> Замки для захвата</h2>
                
                <div class="enemy-castle" data-id="1">
                    <h3>Замок Банкрот-Бич</h3>
                    <p>Защита: <span class="defense">50</span> ⚔️</p>
                    <p>Награда: <span class="reward">500</span> 🪙 + 1 🏰</p>
                    <button class="attack-btn" onclick="attackCastle(1)">
                        Атаковать (<span class="army-cost">20</span> ⚔️)
                    </button>
                </div>

                <div class="enemy-castle" data-id="2">
                    <h3>Цитадель Азаза</h3>
                    <p>Защита: <span class="defense">200</span> ⚔️</p>
                    <p>Награда: <span class="reward">2000</span> 🪙 + 3 🏰</p>
                    <button class="attack-btn" onclick="attackCastle(2)">
                        Атаковать (<span class="army-cost">50</span> ⚔️)
                    </button>
                </div>

                <div class="enemy-castle" data-id="3">
                    <h3>Твердыня Гиро</h3>
                    <p>Защита: <span class="defense">1000</span> ⚔️</p>
                    <p>Награда: <span class="reward">10000</span> 🪙 + 10 🏰</p>
                    <button class="attack-btn" onclick="attackCastle(3)">
                        Атаковать (<span class="army-cost">200</span> ⚔️)
                    </button>
                </div>
            </div>
        </div>

        <!-- Лог событий -->
        <div class="log">
            <h3><i class="fas fa-scroll"></i> Хроники королевства</h3>
            <div id="logContent">
                <p>Добро пожаловать в Королевство Гиро!</p>
                <p>Стройте фермы, улучшайте казармы, захватывайте замки!</p>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>