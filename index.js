window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    const container = document.querySelector('.container');
    const loadingMessage = document.createElement('div');
    loadingMessage.classList.add('loading-message');
    loadingMessage.innerText = 'Loading...';

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes('')) announce(TIE);
    };

    const announce = (type) => {
        switch (type) {
            case PLAYERX_WON:
                announcer.innerHTML = '🎉 Player <span class="playerX celebration">X</span> Won!';
                announcer.classList.add('green');
                break;
            case PLAYERO_WON:
                announcer.innerHTML = '🎉 Player <span class="playerO celebration">O</span> Won!';
                announcer.classList.add('red');
                break;
            case TIE:
                announcer.innerHTML = '🤝 It\'s a Tie!';
                announcer.classList.add('blue');
                break;
        }
        announcer.classList.remove('hide');
        setTimeout(() => {
            displayLoadingMessage(); 
        }, 2000); 
    };

    const displayLoadingMessage = () => {
        document.body.appendChild(loadingMessage);
        setTimeout(() => {
            loadingMessage.remove(); 
            showNewMatchMessage(); 
        }, 1000); 
    };

    const showNewMatchMessage = () => {
        const newMatchMessage = document.createElement('div');
        newMatchMessage.classList.add('new-match-message');
        newMatchMessage.innerText = 'Starting a new match...';
        document.body.appendChild(newMatchMessage);

        setTimeout(() => {
            newMatchMessage.remove(); 
            resetBoard(); 
        }, 2000); 
    };

    const isValidAction = (tile) => {
        return tile.innerText === '';
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    };

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            if (isGameActive) changePlayer();
        }
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');
        announcer.classList.remove('green', 'red', 'blue');

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.className = 'tile';
        });

        if (currentPlayer === 'O') changePlayer();
    };

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', () => {
      
        displayLoadingMessage();
    });
});
