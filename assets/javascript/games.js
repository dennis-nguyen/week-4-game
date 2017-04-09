var chosenHP = 0;
var enemyHP = 0;
var chosenAP = 0;
var enemyAP = 0;
var choseFighter = false;
var choseEnemy = false;
var stackCounter = 1;
var defeated = 0;
var previousSpot;

var ryu = {
    hp: 120,
    ap: 8,
    counter: 10
};
var chunli = {
    hp: 100,
    ap: 15,
    counter: 5
};
var ken = {
    hp: 150,
    ap: 5,
    counter: 20
};
var blanka = {
    hp: 180,
    ap: 4,
    counter: 25
};

$(document).ready(function() {

    // PICKS CHOSEN HERO + FIGHTER
    function pickFighter(fighter) {
        if (choseFighter == false) {
            $("#" + fighter).appendTo("#heroArea");
            choseFighter = true;
            updateChosenStats(fighter);
            updateChosenText(fighter);

        } else if (choseFighter == true && choseEnemy == false) {
            $("#" + fighter).appendTo("#enemyArea");
            choseEnemy = true;
            updateEnemyStats(fighter);
            updateEnemyText(fighter);
        }
    }

    function updateChosenStats(fighter) {
        chosenHP = eval(fighter + ".hp");
        chosenAP = eval(fighter + ".ap");
        $(".fighters").addClass("enemies");
        $("#" + fighter).addClass("myHero");
        $("#" + fighter).off("click");
    }

    function updateChosenText(fighter) {
        $(".title").text("Pick your opponent!");
        $(".title").css("color", "red");
        $(".chosenName").text(fighter.toUpperCase());
        updateHealth();
    }

    function updateEnemyStats(fighter) {
        enemyHP = eval(fighter + ".hp");
        enemyAP = eval(fighter + ".counter");
    }

    function updateEnemyText(fighter) {
        $(".enemyName").text(fighter.toUpperCase());
        $("#" + fighter).off("click");
        previousSpot = "#g" + fighter;
        updateHealth();
    }

    function updateHealth() {
        $(".chosenHealth").text(chosenHP);
        $(".enemyHealth").text(enemyHP);
    }

    function resetOnEnemyDefeat() {
        $("#enemyArea > div").appendTo(previousSpot).fadeTo("slow", 0.15);
        $(".enemyHealth").text("HEALTH");
        $(".enemyName").text("OPPONENT");
    }

    function battle() {
        var attackmulti = (chosenAP * stackCounter);
        enemyHP = enemyHP - attackmulti;
        if (enemyHP > 0) {
            chosenHP = chosenHP - enemyAP;
            $("#combatText").html("You just dealt " + attackmulti + " damage and received " + enemyAP + " damage!")
        } else {
            $("#combatText").html("You just dealt " + attackmulti + " damage")
        }
        stackCounter++;
        updateHealth();
    }


    function winCondition() {
        if (chosenHP <= 0) {
            $("#loseModal").modal("show");
        } else if (enemyHP <= 0 && defeated == 2) {
            $("#winModal").modal("show");
            choseEnemy = false;
            resetOnEnemyDefeat();
        } else if (enemyHP <= 0) {
            choseEnemy = false;
            defeated++;
            resetOnEnemyDefeat();
        }
    };




    function applyHandlers() {
        $("#atk").click(function() {
            var attackmulti = (chosenAP * stackCounter);
            if (choseEnemy == true) {
                battle();
                winCondition();
            }
        });

        $("#ryu").click(function() {
            pickFighter("ryu");
        });

        $("#ken").click(function() {
            pickFighter("ken");
        });

        $("#chunli").click(function() {
            pickFighter("chunli");
        });

        $("#blanka").click(function() {
            pickFighter("blanka");
        });
    }

    applyHandlers();




});
