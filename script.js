function ticTacToe() {
  const startGameButton = document.getElementById("start-game");
  const restartGameButton = document.getElementById("restart-game");
  const gameBoardCells = document.getElementsByClassName("cell");
  let player1 = null;
  let player2 = null;
  let currentPlayer = null;

  startGameButton.addEventListener("click", startGame);
  restartGameButton.addEventListener("click", restartGame);

  function startGame() {
    document.querySelector("dialog").showModal();
    const playerOneName = document.getElementById("player1-name").value;
    const playerOneSymbol = !!document.getElementById("player1-symbol").value ? document.getElementById("player1-symbol").value : 'X';
    const playerTwoName = document.getElementById("player2-name").value;
    const playerTwoSymbol = playerOneSymbol == 'X' ? 'O' : 'X';
    player1 = player(playerOneName, playerOneSymbol);
    player2 = player(playerTwoName, playerTwoSymbol);
    currentPlayer = player1;
    for (const cell of gameBoardCells) {
      cell.addEventListener("click", drawSymbol);
    };
  }

  function restartGame() {
    for (const cell of gameBoardCells) {
      cell.innerText = '';
    }
    noticeHeader.innerText = '';
    game.board = [[null, null, null], [null, null, null], [null, null, null]]
    ticTacToe();
  }
  
  function player(name, symbol) {  
    return { name, symbol };
  }

  const gameBoard = function() {
    this.board = [[null, null, null], [null, null, null], [null, null, null]];

    this.gameOver = () => {
      return checkHorizontal(this.board) || checkVertical(this.board) || checkDiagonal(this.board);
    }

    this.empty = (cell) => {
      return !!cell
    }

    function checkHorizontal(board) {
      for (const row of board) {
        if (row.every((cell) => cell === row[0] && !!cell)) {
          return row[0];
        }
      }
      return false;
    }

    function checkVertical(board) {
      for (let i = 0; i < board.length; i++) {
        if ([board[0][i], board[1][i], board[2][i]].every((cell) => cell === board[0][i] && !!cell)) {
          return board[0][i];
        }
      }
      return false;
    }

    function checkDiagonal(board) {
      if ([board[0][0], board[1][1], board[2][2]].every((cell) => cell === board[1][1] && !!cell)) {
        return board[1][1];
      }
      else if ([board[0][2], board[1][1], board[2][0]].every((cell) => cell === board[1][1] && !!cell)) {
        return board[1][1];
      }
      return false;
    }

    this.tie = () => {
      return this.board.flat().every((cell) => cell == 'X' || cell == 'O');
    }
  }

  const noticeHeader = document.getElementById("notice");
  const game = new gameBoard();

  function drawSymbol(e) {
    const cellId = e.currentTarget.id;
    const x = parseInt(cellId[0]);
    const y = parseInt(cellId[1]);
    if (game.empty(game.board[x][y])) {
      return
    }
    else {
      game.board[x][y] = currentPlayer.symbol;
      document.getElementById(cellId).innerText = currentPlayer.symbol;
      if (game.gameOver()) {
        noticeHeader.innerText = `Game Over! ${currentPlayer.name} wins!`;
      }
      else if (game.tie()) {
        noticeHeader.innerText = `Game Over! It's a tie!`;
      }
      else {
        changePlayer();
        noticeHeader.innerText = `${currentPlayer.name}'s turn!`
      }
    }

    function changePlayer() {
      currentPlayer = currentPlayer == player1 ? player2 : player1;
    }
  }
};

ticTacToe();