<?php
//Game rules
// starting values

$girls_score = 0;
$boys_score = 0;
$game_moves = "";
$start_position_girls = "g40";
$start_position_boys = "g40";


// test

$data = array( $game_moves, $girls_score, $boys_score);

// check if we are saving

if($_POST["save_game"]) {

    $girls_score = $_POST["girls_score"];
    $boys_score = $_POST["boys_score"];
    $game_moves = $_POST["game_moves"];

    if($girls_score == 0) {
        $start_position_girls = "g40";
    } elseif ($girls_score >= 40) {
        $temp_score = $girls_score - 40;
        while($temp_score >= 40) {
            $temp_score = $girls_score - 40;
        }
        $start_position_girls = "g" . strval($temp_score);
    } else {
        $start_position_girls = "g" . strval($girls_score);
    }

    if($boys_score == 0) {
        $start_position_boys = "b40";
    } elseif ($boys_score >= 40) {
        $temp_score = $boys_score - 40;
        while($temp_score >= 40) {
            $temp_score = $boys_score - 40;
        }
        $start_position_boys = "b" . strval($temp_score);
    } else {
        $start_position_boys = "b" . strval($boys_score);
    }

    $data = array(
        "game_moves" => $game_moves, "girls_score" => $girls_score,  "boys_score" => $boys_score
    );
    $save_data = implode(": ", $data);
    // check for save file

    $fp1 = fopen('save/save.txt', 'w');
    if ( !$fp1 ) {
        $myfile = fopen("save.txt", "w");
        fwrite("save/save.txt", $save_data);
        fclose($myfile);
    } else {
        if(fwrite($fp1, $save_data) === FALSE) {
            print("oh");
        }
        
    }
    fclose($fp1);
    
} else {

    // check for save file
    $fp2 = file_get_contents('save/save.txt', true);
    if ( !$fp2 ) {
        $data = "";
    } else {
        $data = explode(": ", $fp2);
        if($data == NULL) {
            $data = "";
            print("test");
        } else {
            $girls_score = intval($data[1]);
            $boys_score = intval($data[2]);
            $game_moves = intval($data[0]);
            if($girls_score == 0) {
                $start_position_girls = "g40";
            } elseif ($girls_score >= 40) {
                $temp_score = $girls_score - 40;
                while($temp_score >= 40) {
                    $temp_score = $girls_score - 40;
                }
                $start_position_girls = "g" . strval($temp_score);
            } else {
                $start_position_girls = "g" . strval($girls_score);
            }
            
            if($boys_score == 0) {
                $start_position_boys = "b40";
            } elseif ($boys_score >= 40) {
                $temp_score = $boys_score - 40;
                while($temp_score >= 40) {
                    $temp_score = $boys_score - 40;
                }
                $start_position_boys = "b" . strval($temp_score);
            } else {
                $start_position_boys = "b" . strval($boys_score);
            }
        }


    }

}

?>

<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Holiday Bible Club Race Game</title>
        <link rel="stylesheet" href="css/index.css">
    </head>
    <body>
        <div id="main">
            <div class="top_div">
                <button onclick="back()" id="back">Back</button>
                <h1>Holiday Bible Club Racing game</h1>
                <div>
                    <button onclick="show_final()" id="finish">Finish</button>
                </div>
            </div>
            <div id="finalize">
                <div>
                    <h1>What do you want to do?</h1>
                </div>
                <div class="button_list">
                    <button name="reset" onclick="reset_board()">Reset game</button>
                    <form action="index.php" method="POST">
                        <input type="hidden" name="girls_score" id="hiddenGirlsScore" value="<?php print $girls_score; ?>">
                        <input type="hidden" name="boys_score" id="hiddenBoysScore" value="<?php print $boys_score; ?>">
                        <input type="hidden" name="game_moves" id="hiddenGameMoves" value="<?php print $game_moves; ?>">
                        <button name="save_game" value="true">Save game</button>
                    </form>
                    <button name="declare_winner" onclick="who_won()">Who won?</button>
                </div>
            </div>
            <div id="winner_window">
                <div>
                    <h1 id="winner"></h1>
                </div>
                <div class="button_list">
                    <button name="reset" onclick="reset_board()">Reset game</button>
                    <form action="index.php" method="POST">
                        <input type="hidden" name="girls_score" id="hiddenGirlsScore2" value="<?php print $girls_score; ?>">
                        <input type="hidden" name="boys_score" id="hiddenBoysScore2" value="<?php print $boys_score; ?>">
                        <input type="hidden" name="game_moves" id="hiddenGameMoves2" value="<?php print $game_moves; ?>">
                        <button name="save_game" value="true">Save game</button>
                    </form>
                </div>
            </div>
            <div class="center_div">
                <img src="img/boys.png" alt="boy.png" border="0" id="boy" class="<?php print $start_position_boys; ?>">
                <img src="img/girls.png" alt="girl.png" border="0" id="girl" class="<?php print $start_position_girls; ?>">
                <img src="img/board.png" alt="bana.png" border="0" id="bana">
            </div>
            <div class="buttons">
                <div class="girlTeam">
                    <button onclick="show_girls()" id="btnGirl">Girls</button>
                    <div id="girlsScore"><?php print $girls_score; ?></div>
                </div>
                <div class="boyTeam">
                    <button onclick="show_boys()" id="btnBoy">Boys</button>
                    <div id="boysScore"><?php print $boys_score; ?></div>
                </div>
            </div>
            <div id="girls_buttons">
                <div>
                    <h1>Girls roll is:</h1>
                </div>
                <div>
                    <button onclick="moveGirl(1, 'move')"><img src="img/1.png" alt="1.png" border="0"></button>
                    <button onclick="moveGirl(2, 'move')"><img src="img/2.png" alt="2.png" border="0"></button>
                    <button onclick="moveGirl(3, 'move')"><img src="img/3.png" alt="3.png" border="0"></button>
                    <button onclick="moveGirl(4, 'move')"><img src="img/4.png" alt="4.png" border="0"></button>
                    <button onclick="moveGirl(5, 'move')"><img src="img/5.png" alt="5.png" border="0"></button>
                    <button onclick="moveGirl(6, 'move')"><img src="img/6.png" alt="6.png" border="0"></button>
                </div>
            </div>
            <div id="boys_buttons">
                <div>
                    <h1>Boys roll is:</h1>
                </div>
                <div>
                    <button onclick="moveBoy(1, 'move')"><img src="img/1.png" alt="1.png" border="0"></button>
                    <button onclick="moveBoy(2, 'move')"><img src="img/2.png" alt="2.png" border="0"></button>
                    <button onclick="moveBoy(3, 'move')"><img src="img/3.png" alt="3.png" border="0"></button>
                    <button onclick="moveBoy(4, 'move')"><img src="img/4.png" alt="4.png" border="0"></button>
                    <button onclick="moveBoy(5, 'move')"><img src="img/5.png" alt="5.png" border="0"></button>
                    <button onclick="moveBoy(6, 'move')"><img src="img/6.png" alt="6.png" border="0"></button>
                </div>
            </div>
            <div id="stumble">
                <div>
                    <h1>On no!</h1>
                    <p>You ran into a hurdle and stumbled. You have to move 3 steps back.</p>
                </div>
                <div>
                    <button id="oops_boys" onclick="moveBoy(-3, 'stumble')">OK</button>
                    <button id="oops_girls" onclick="moveGirl(-3, 'stumble')">Ok</button>
                </div>
            </div>
            <div id="water">
                <div>
                    <h1>You reached a water station!</h1>
                    <p>You drink some water and can manage an other step.</p>
                </div>
                <div>
                    <button id="yay_boys" onclick="moveBoy(1, 'water')">OK</button>
                    <button id="yay_girls" onclick="moveGirl(1, 'water')">Ok</button>
                </div>
            </div>
        </div>
        <script src="js/index.js"></script>
    </body>
</html>