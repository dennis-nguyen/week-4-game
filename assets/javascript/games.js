    var chosenHP = 0;
    var enemyHP = 0;
    var chosenAP = 0;
    var enemyAP = 0;
    var choseFighter = false;
    var choseEnemy = false;
    var stackCounter = 1;
    var defeated = 0;
    var previousSpot;
    var char = []; //Character Array
    var themeOff = true;

    function Character(config) {
        this.name = config.name;
        this.hp = config.hp;
        this.ap = config.ap;
        this.counter = config.counter;
        this.pickFighter = function(fighter) {
            var clickedFighter = $("#" + fighter);
            if (choseFighter === false) {
                clickedFighter.appendTo("#heroArea");
                choseFighter = true;
                this.updateChosenStats(fighter);
                this.updateChosenText(fighter);

            } else if (choseFighter === true && choseEnemy === false) {
                clickedFighter.appendTo("#enemyArea");
                choseEnemy = true;
                this.updateEnemyStats(fighter);
                this.updateEnemyText(fighter);
            }
        };

        this.updateChosenStats = function(fighter) {
            var clickedFighter = $("#" + fighter);
            chosenHP = char[fighter].hp;
            chosenAP = char[fighter].ap;
            $(".fighters").addClass("enemies");
            clickedFighter.addClass("myHero");
            clickedFighter.off("click");
        };

        this.updateChosenText = function(fighter) {
            $(".title").text("Pick your opponent!");
            $(".title").css("color", "red");
            $(".chosenName").text(fighter.toUpperCase());
            this.updateHealth();
        };

        this.updateEnemyStats = function(fighter) {
            enemyHP = char[fighter].hp;
            enemyAP = char[fighter].counter;
        };

        this.updateEnemyText = function(fighter) {
            var clickedFighter = $("#" + fighter);
            $(".enemyName").text(fighter.toUpperCase());
            clickedFighter.off("click");
            previousSpot = "#g" + fighter;
            this.updateHealth();
        };

        this.updateHealth = function() {
                $(".chosenHealth").text(chosenHP);
                $(".enemyHealth").text(enemyHP);
            };
            // SENDS OPPONENT BACK TO THEIR ORIGINAL DIV ON DEFEAT GREYED OUT
        this.resetOnEnemyDefeat = function() {
                $("#enemyArea > div").appendTo(previousSpot).fadeTo("slow", 0.15);
                $(".enemyHealth").text("HEALTH");
                $(".enemyName").text("OPPONENT");
            };
            // DAMAGE LOGIC
        this.battle = function() {
            var attackmulti = (chosenAP * stackCounter);
            enemyHP = enemyHP - attackmulti;
            if (enemyHP > 0) {
                chosenHP = chosenHP - enemyAP;
                $("#combatText").html("You just dealt " + attackmulti + " damage and received " + enemyAP + " damage!");
            } else {
                $("#combatText").html("You just dealt " + attackmulti + " damage!");
            }
            stackCounter++;
            this.updateHealth();
        };

        this.winCondition = function() {
            if (chosenHP <= 0) {
                $("#loseModal").modal("show");
                $(".title").text("You Lose.");
                $("#atk").off("click");
            } else if (enemyHP <= 0 && defeated == 2) {
                $("#winModal").modal("show");
                $(".title").text("You Won!");
                choseEnemy = false;
                this.resetOnEnemyDefeat();
            } else if (enemyHP <= 0) {
                choseEnemy = false;
                defeated++;
                this.resetOnEnemyDefeat();
            }
        };

        this.toggleTheme = function() {
            if (themeOff) {
                $('#theme')[0].play();
                themeOff = false;
                $(".theme-button").attr("class", "btn btn-default btn-xs theme-button").html('<span class="glyphicon glyphicon-pause"> </span> Pause Theme');
            } else {
                $('#theme')[0].pause();
                themeOff = true;
                $(".theme-button").attr("class", "btn btn-danger btn-xs theme-button").html('<span class="glyphicon glyphicon-music"> </span> Play Theme');
            }
        };

        this.attackClick = function() {
            if (choseEnemy === true) {
                this.battle();
                this.winCondition();
            }
        };


    }

    var fighters = {
        ryuConfig: {
            name: "ryu",
            hp: 130,
            ap: 10,
            counter: 12
        },
        chunliConfig: {
            name: "chunli",
            hp: 100,
            ap: 15,
            counter: 13
        },
        kenConfig: {
            name: "ken",
            hp: 150,
            ap: 6,
            counter: 20
        },
        blankaConfig: {
            name: "blanka",
            hp: 180,
            ap: 4,
            counter: 25
        },

    };

    for (var fighter in fighters) {
        char[fighters[fighter].name] = new Character(fighters[fighter]);
    }

    $(document).ready(function() {
        function applyClickHandlers() {
            $("#atk").click(function() {
                char["ryu"].attackClick();
            });

            $("#ryu").click(function() {
                char["ryu"].pickFighter("ryu");
            });

            $("#ken").click(function() {
                char["ken"].pickFighter("ken");
            });

            $("#chunli").click(function() {
                char["chunli"].pickFighter("chunli");
            });

            $("#blanka").click(function() {
                char["blanka"].pickFighter("blanka");
            });

            $(".theme-button").on("click", function() {
                char["ryu"].toggleTheme();
            });
        }

        applyClickHandlers();
    });
