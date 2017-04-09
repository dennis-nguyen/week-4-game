$(document).ready(function() {

    var chosenHP = 0;
    var enemyHP = 0;
    var chosenAP = 0;
    var enemyAP = 0;
    var chosenCounter = 0;
    var enemyCounter = 0;
    var stackCounter = 1;
    var defeated = 0;
    var greyContainer;

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



    // PICKS CHOSEN HERO + FIGHTER
    function pickFighter(fighter) {
        if (chosenCounter == 0) {
            $("#" + fighter).appendTo("#heroArea");
            chosenCounter++;
            chosenHP = eval(fighter + ".hp");
            chosenAP = eval(fighter + ".ap");
            $(".fighters").addClass("enemies");
            $("#" + fighter).addClass("myHero");
            $("#" + fighter).off("click");
            $(".title").text("Pick your opponent!");
            $(".chosenName").text(fighter.toUpperCase());
            $(".chosenHealth").text(chosenHP);

        } else if (chosenCounter == 1 && enemyCounter == 0) {
            $("#" + fighter).appendTo("#enemyArea");
            enemyCounter++;
            enemyHP = eval(fighter + ".hp");
            enemyAP = eval(fighter + ".counter");
            $(".enemyName").text(fighter.toUpperCase());
            $(".enemyHealth").text(enemyHP);
            $("#" + fighter).off("click");
            greyContainer = "#g" + fighter;
        }
    }

    function battle() {
        var attackmulti = (chosenAP * stackCounter);
        enemyHP = enemyHP - attackmulti;
        if (enemyHP > 0) {
            chosenHP = chosenHP - enemyAP;
        }
        stackCounter++;
        $("#combatText").html("You just dealt " + attackmulti + " damage and received " + enemyAP + " damage!")
    }

    $("#atk").click(function() {
        var attackmulti = (chosenAP * stackCounter);
        if (enemyCounter == 1) {
            battle();

            $(".chosenHealth").text(chosenHP);
            $(".enemyHealth").text(enemyHP);
            winCondition();
        }

    });

    function winCondition() {
        if (chosenHP <= 0) {
            $("#loseModal").modal("show");
        } else if (enemyHP <= 0 && defeated == 2) {
            console.log("YOU WIN");
            $("#winModal").modal("show");
            enemyCounter--;
            $("#enemyArea > div").appendTo(greyContainer).fadeTo("slow", 0.15);
            $(".enemyHealth").text("HEALTH");
            $(".enemyName").text("OPPONENT");
        } else if (enemyHP <= 0) {
            console.log("Pick your next enemy");
            enemyCounter--;
            defeated++;
            console.log(defeated);
            $("#enemyArea > div").appendTo(greyContainer).fadeTo("slow", 0.15);
            $(".enemyHealth").text("HEALTH");
            $(".enemyName").text("OPPONENT");
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
