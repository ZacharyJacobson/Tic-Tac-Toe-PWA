main();

//core logic class
class GameLogic{
	constructor() {
		this.currentPlayer = "X";
	}
	//flip the current turn
	nextTurn() {
		if(this.currentPlayer == "X") this.currentPlayer = "O";
		else this.currentPlayer = "X";
	}
	//check every win condition
	checkForWins() {
		//check both players
		const players = ["X", "O"]
		
		//check rows
		for(let row = 0; row < 3; row++) {
			const cols = [0, 1, 2]
			const rows = [row, row, row]
			if(this.checkTiles(cols, rows)) return true
		}
		//check columns
		for(let col = 0; col < 3; col++) {
			const cols = [col, col, col]
			const rows = [0, 1, 2]
			if(this.checkTiles(cols, rows)) return true
		}
		//check diagonals
		for(let orientation = -1; orientation < 2; orientation += 2) {
			const cols = [0, 1, 2]
			const rows = [1 + orientation, 1, 1 - orientation]
			if(this.checkTiles(cols, rows)) return true
		}
		//check stalemate
		let allClaimed = true;
		for(let row = 0; row < 3; row++) {
			for(let col = 0; col < 3; col++) {
				let claimedBy = document.getElementById(tileID(col, row)).getAttribute("claimedBy");
				if(claimedBy != "X" && claimedBy != "O") allClaimed = false;
			}
		}
		if(allClaimed) {
			for(let row = 0; row < 3; row++) {
				for(let col = 0; col < 3; col++) {
					document.getElementById(tileID(col, row)).setAttribute("style", "border-color: #FF0000;");
				}
			}
			return true;
		}
		//no win condition found
		return false;
	}
	//return the state of a tile
	checkTiles(cols, rows) {
		const players = ["X", "O"]
		for(const player of players) {
			let win = true
			cols.forEach((col, index) => {
				let row = rows[index]
				if(document.getElementById(tileID(col, row)).getAttribute("claimedBy") != player) win = false;
			});
			if(win) {
				cols.forEach((col, index) => {
					let row = rows[index]
					document.getElementById(tileID(col, row)).setAttribute("style", "border-color: #00FF00;");
				});
				return true;
			}
		}
		return false;
	}
}

//global game logic accessible at all times
gameLogic = new GameLogic();

//create the board and its logic
function main() {
	board = document.getElementById("board");
	createTiles(board);
}

//set up every tile
function createTiles(board) {
	for(let col = 0; col < 3; col++) {
		for(let row = 0; row < 3; row++) {
			board.appendChild(createTile(col, row));
		}
	}
}

//create an individual tile
function createTile(col, row) {
	tile = document.createElement("div");
	tile.classList.add("tile");
	tile.id = tileID(col, row);
	//attach a listener to each tile
	tile.addEventListener("click", function handleClick(event) {
		if(this.getAttribute("claimedBy") != "X" && this.getAttribute("claimedBy") != "O" && (!gameLogic.checkForWins())) {
			this.setAttribute("claimedBy", gameLogic.currentPlayer);
			gameLogic.nextTurn();
			if(gameLogic.checkForWins()) {
				
			}
		}
	});
	return tile;
}

//uniform name for each tile
function tileID(col, row) {
	return "tile" + col + "," + row;
}