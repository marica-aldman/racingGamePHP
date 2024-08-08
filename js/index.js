const girls_board = [["g40", ""], 
			["g1", ""], 
			["g2", ""], 
			["g3", ""], 
			["g4", ""], 
			["g5", ""], 
			["g6", "water"], 
			["g7", ""], 
			["g8", ""], 
			["g9", ""], 
			["g10", ""], 
			["g11", ""], 
			["g12", ""], 
			["g13", ""], 
			["g14", "stumble"], 
			["g15", ""], 
			["g16", ""], 
			["g17", "water"], 
			["g18", ""], 
			["g19", ""], 
			["g20", ""], 
			["g21", ""], 
			["g22", "stumble"], 
			["g23", ""], 
			["g24", ""], 
			["g25", "water"], 
			["g26", ""], 
			["g27", ""], 
			["g28", ""], 
			["g29", ""], 
			["g30", "stumble"], 
			["g31", ""], 
			["g32", ""], 
			["g33", ""], 
			["g34", ""], 
			["g35", "water"], 
			["g36", ""], 
			["g37", "stumble"], 
			["g38", ""], 
			["g39", ""]];

const boys_board= [["b40", ""], 
			["b1", ""], 
			["b2", ""], 
			["b3", ""], 
			["b4", ""], 
			["b5", ""], 
			["b6", "water"], 
			["b7", ""], 
			["b8", ""], 
			["b9", ""], 
			["b10", ""], 
			["b11", ""], 
			["b12", ""], 
			["b13", ""], 
			["b14", "stumble"], 
			["b15", ""], 
			["b16", ""], 
			["b17", "water"], 
			["b18", ""], 
			["b19", ""], 
			["b20", ""], 
			["b21", ""], 
			["b22", "stumble"], 
			["b23", ""], 
			["b24", ""], 
			["b25", "water"], 
			["b26", ""], 
			["b27", ""], 
			["b28", ""], 
			["b29", ""], 
			["b30", "stumble"], 
			["b31", ""], 
			["b32", ""], 
			["b33", ""], 
			["b34", ""], 
			["b35", "water"], 
			["b36", ""], 
			["b37", "stumble"], 
			["b38", ""], 
			["b39", ""]];

let order = [];
let recorded_score_girls = document.getElementById("hiddenGirlsScore");

let girls_score = parseInt(recorded_score_girls.value);

let recorded_score_boys = document.getElementById("hiddenBoysScore");
let boys_score = parseInt(recorded_score_boys.value);

function show_girls() {
	let boys = document.getElementById("btnBoy");
	let girls_window = document.getElementById("girls_buttons");
	if (girls_window.style.display == "none" || girls_window.style.display == "") {
		girls_window.style.display = "block";
	// make it impossible to roll for boys at the same time
		boys.disabled = true;
	} else {
		girls_window.style.display = "none";
	// make it possible to roll for boys to roll again
		boys.disabled = false;
	}
}

function show_boys() {
	let girls = document.getElementById("btnGirl");
	let boys_window = document.getElementById("boys_buttons");
	if (boys_window.style.display == "none" || boys_window.style.display == "") {
		boys_window.style.display = "block";
		// make it impossible to roll for girls at the same time
		girls.disabled = true;
	} else {
		boys_window.style.display = "none";
	// make it possible to roll for girls again
		girls.disabled = false;
	}
}

function show_final() {
	let final_window = document.getElementById("finalize");
	if (final_window.style.display == "none" || final_window.style.display == "") {
		final_window.style.display = "block";
	} else {
		final_window.style.display = "none";
	}
}

function show_winner() {
	
	let final = document.getElementById("finalize");
	if(final.style.display == "block") {
		show_final();
	}
	let winner_window = document.getElementById("winner_window");
	if (winner_window.style.display == "none" || winner_window.style.display == "") {
		winner_window.style.display = "block";
	} else {
		winner_window.style.display = "none";
	}
}

function show_oops(theTeam) {
	let last = order[order.length - 1];
	var button_active;
	var button_not_active;
	if(theTeam == "girls") {
		button_active = document.getElementById("oops_girls");
		button_not_active = document.getElementById("oops_boys");
	} else {
		button_active = document.getElementById("oops_boys");
		button_not_active = document.getElementById("oops_girls");
	}
	
	button_active.style.display = "block";
	button_not_active.style.display = "none";

	let stumble = document.getElementById("stumble");
	if (stumble.style.display == "none" || stumble.style.display == "") {
		stumble.style.display = "block";
	} else {
		stumble.style.display = "none";
	}
}

function show_yay(the_team) {
	if(the_team == "girls") {
		button_active = document.getElementById("yay_girls");
		button_not_active = document.getElementById("yay_boys");
	} else {
		button_active = document.getElementById("yay_boys");
		button_not_active = document.getElementById("yay_girls");
	}
	
	button_active.style.display = "block";
	button_not_active.style.display = "none";

	let water = document.getElementById("water");
	if (water.style.display == "none" || water.style.display == "") {
		water.style.display = "block";
	} else {
		water.style.display = "none";
	}
}

function moveGirl(the_move, kind_of_move) {
	// get the marker
	let girl = document.getElementById("girl");
	let girl_current_class = girl.classList[0];
    // where are we on the board
	var girl_current_pos = 0;
	var i = 0;
	for(i=0; i < girls_board.length; i++ ) {
		if(girls_board[i][0] == girl_current_class) {
			girl_current_pos = i;
		}
	}
    // calculate the next position	
	let girl_next_pos = girl_current_pos + the_move;
    // calculate the score and edit it
    let diff_pos = girl_next_pos - girl_current_pos;
    girls_score = girls_score + diff_pos;
    let hidden_score_girls = document.getElementById("hiddenGirlsScore");
    hidden_score_girls.value = girls_score;
    let hidden_score_girls2 = document.getElementById("hiddenGirlsScore2");
    hidden_score_girls2.value = girls_score;
    let score_girls = document.getElementById("girlsScore");
    score_girls.innerHTML = girls_score;

	if (girl_next_pos > 39) {
		girl_next_pos = girl_next_pos - 40;
	}
	
	let girl_next_class = girls_board[girl_next_pos][0];

    //move the marker
	girl.classList.remove(girl_current_class);
	girl.classList.add(girl_next_class);

	// if the girls roll window is open close it and add the move to the order array for the back button, this applies for regular move, back, water stations and stumble blocks
    // don't forget to update hidden order data
    let gameData = document.getElementById("hiddenGameMoves");
    let gameData2 = document.getElementById("hiddenGameMoves2");

	if(kind_of_move != "back") {
		order.push(["girls", diff_pos]);
		show_girls();
        data = order.toString();
        gameData.value = data;
        gameData2.value = data;
	}
	if(kind_of_move == "water") {
		order.push(["girls", diff_pos]);
		show_yay("girls");
		show_girls();
        data = order.toString();
        gameData.value = data;
        gameData2.value = data;
	}
	if(kind_of_move == "stumble") {
		order.push(["girls", diff_pos]);
		show_oops("girls");
		show_girls();
        data = order.toString();
        gameData.value = data;
        gameData2.value = data;
	}
	
	// check if the position they landed is a water station or stumble block then open window after a couple of seconds
	
	if(girls_board[girl_next_pos][1] == "water") {
		setTimeout( function() { show_yay("girls")}, 1000);
	} else if (girls_board[girl_next_pos][1] == "stumble") {
		setTimeout( function() { show_oops("girls")}, 1000);
	}
	
}

function moveBoy(the_move, kind_of_move) {
	// get the marker
		let boy = document.getElementById("boy");
		let boy_current_class = boy.classList[0];
// where are we on the board
	var boy_current_pos = 0;
	var i = 0;
	for(i=0; i < boys_board.length; i++ ) {
		if(boys_board[i][0] == boy_current_class) {
			boy_current_pos = i;
		}
	}
    // calculate the score and edit it
	let boy_next_pos = boy_current_pos + the_move;
	let diff_pos = boy_next_pos - boy_current_pos;
	boys_score = boys_score + diff_pos;
    console.log(diff_pos);
    console.log(boys_score);
	let hidden_score_boys = document.getElementById("hiddenBoysScore");
	hidden_score_boys.value = boys_score;
	let hidden_score_boys2 = document.getElementById("hiddenBoysScore2");
	hidden_score_boys2.value = boys_score;
	let score_boys = document.getElementById("boysScore");
	score_boys.innerHTML = boys_score;
    console.log(boys_score);
// calculate the next position on the board
    if (boy_next_pos > 39) {
        boy_next_pos = boy_next_pos - 40;
    }
    let boy_next_class = boys_board[boy_next_pos][0];
		
//move the marker
	boy.classList.remove(boy_current_class);
	boy.classList.add(boy_next_class);
	

	// if the boys roll window is open close it and add the move to the order array for the back button
    // don't forget to update hidden order data
    let gameData = document.getElementById("hiddenGameMoves");
    let gameData2 = document.getElementById("hiddenGameMoves2");
	if(kind_of_move == "water") {
		order.push(["boys", diff_pos]);
		show_yay("boys");
        data = order.toString();
        gameData.value = data;
        gameData2.value = data;
	} else if(kind_of_move == "stumble") {
		order.push(["boys", diff_pos]);
		show_oops("boys");
        data = order.toString();
        gameData.value = data;
        gameData2.value = data;
	} else if(kind_of_move != "back") {
		order.push(["boys", diff_pos]);
		show_boys();
        data = order.toString();
        gameData.value = data;
        gameData2.value = data;
	}
	
	// check if the position they landed is a water station or stumble block then open window after a couple of seconds
	
	if(boys_board[boy_next_pos][1] == "water") {
		setTimeout( function() { show_yay("boys")}, 1000);
	} else if (boys_board[boy_next_pos][1] == "stumble") {
		setTimeout( function() { show_oops("boys")}, 1000);
	}
}

function back(){
	let previous_move = order.pop();
	if(previous_move) {
		let the_move = 0 - previous_move[1];
		if (previous_move[0] == "girls") {
			moveGirl(the_move, "back");
		} else {
			moveBoy(the_move, "back");
		}	
	}
	
}

function reset_board() {
	//reset score
	girls_score = 0;
	boys_score = 0;
	//reset markers
	let girl = document.getElementById("girl");
	let boy = document.getElementById("boy");
		let girl_current_class = girl.classList[0];
		let boy_current_class = boy.classList[0];
		girl.classList.remove(girl_current_class);
		girl.classList.add("g40");
		boy.classList.remove(boy_current_class);
		boy.classList.add("b40");
	//reset hidden values
// calculate the score and edit it
	let hidden_score_boys = document.getElementById("hiddenBoysScore");
	hidden_score_boys.value = "0";
	let hidden_score_girls = document.getElementById("hiddenGirlsScore");
	hidden_score_girls.value = "0";
	let score_boys = document.getElementById("boysScore");
	score_boys.innerHTML = "0";
	let score_girls = document.getElementById("girlsScore");
	score_girls.innerHTML = "0";
    let gameData = document.getElementById("hiddenGameMoves");
    let gameData2 = document.getElementById("hiddenGameMoves2");
    gameData.value = "";
    gameData2.value = "";
	
	//make sure all windows are hidden that should be
	let girls_roll = document.getElementById("girls_buttons");
	
	if(girls_roll.style.display == "block") {
		show_girls();
	}
	
	let boys_roll = document.getElementById("boys_buttons");
	
	if(boys_roll.style.display == "block") {
		show_boys();
	}
	let finalize = document.getElementById("finalize");
	if(finalize.style.display == "block") {
		show_final();
	}
	
	let winner_window = document.getElementById("winner_window");
	if(winner_window.style.display == "block") {
		show_winner();
	}
}

function who_won() {
	show_winner();
		let winner = document.getElementById("winner");
	if(girls_score > boys_score) {
		winner.innerHTML = "The Girl's Team Wins!";
	} else if(girls_score < boys_score) {
		winner.innerHTML = "The Boy's Team Wins!";
	} else {
		winner.innerHTML = "It's a tie!";
	}
}