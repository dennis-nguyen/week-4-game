$(document).ready(function() {

    var chosenHP = 0;
    var enemyHP = 0;
    var chosenAP = 0;
    var enemyAP = 0;
    var chosenCounter = 0;
    var enemyCounter = 0;
    var stackCounter = 1;
    var defeated = 0;

    var ryu = {
        hp: 120,
        ap: 8,
        counter: 10
    };
    var chunli = {
        hp: 100,
        ap: 10,
        counter: 5
    };
    var ken = {
        hp: 150,
        ap: 5,
        counter: 20
    };
    var blanka = {
        hp: 180,
        ap: 6,
        counter: 25
    };



    // PICKS CHOSEN HERO + FIGHTER
    function pickFighter(fighter) {
        if (chosenCounter == 0) {
            $("#" + fighter).appendTo("#heroArea");
            chosenCounter++;
            chosenHP = eval(fighter + ".hp");
            chosenAP = eval(fighter + ".ap");
            $("#" + fighter).off("click");
        } else if (chosenCounter == 1 && enemyCounter == 0) {
            $("#" + fighter).appendTo("#enemyArea");
            enemyCounter++;
            enemyHP = eval(fighter + ".hp");
            enemyAP = eval(fighter + ".counter");
        }
    }

    function battle() {
        var attackmulti = (chosenAP * stackCounter);
        if (enemyHP > 0) {
            enemyHP = enemyHP - attackmulti;
        }
        if (enemyHP > 0) {
            chosenHP = chosenHP - enemyAP;
        }
        stackCounter++;
    }

    $("#atk").click(function() {
        var attackmulti = (chosenAP * stackCounter);
        if (enemyCounter == 1) {
            battle();
            winCondition();
            console.log("multiattack is at " + attackmulti);
            console.log("enemy HP is " + enemyHP);
            console.log("chosen HP is " + chosenHP);
        }

    });

    function winCondition() {
        if (chosenHP <= 0) {
            console.log("YOU LOSE");
        } else if (enemyHP <= 0 && defeated == 2) {
            console.log("YOU WIN");
            $("#enemyArea").empty();
        } else if (enemyHP <= 0) {
            console.log("Pick your next enemy");
            enemyCounter--;
            defeated++;
            console.log(defeated);
            $("#enemyArea").empty();
        }
    };





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

});
