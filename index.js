window.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('theme-button');
    const body = document.body;
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

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

    // Set default theme to 'light' if there's no saved theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        themeButton.textContent = "🌙"; // Dark Mode Icon
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        themeButton.textContent = "🌞"; // Light Mode Icon
    }

    // Set dynamic colors for X and O based on the current theme
    const getCurrentPlayerColor = (player) => {
        if (body.classList.contains('dark-mode')) {
            return player === 'X' ? '#FF3031' : '#F3B63A';
        } else {
            return player === 'X' ? '#43BE31' : '#1287A5';
        }
    };

    // Toggle theme when the button is clicked
    themeButton.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            themeButton.textContent = "🌞";
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            themeButton.textContent = "🌙";
        }

        // Update the color of the current player dynamically after theme switch
        playerDisplay.style.color = getCurrentPlayerColor(currentPlayer);
    });

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
            setTimeout(handleReset, 2000);
            return;
        }

        if (!board.includes('')) {
            announce(TIE);
            setTimeout(handleReset, 2000);
        }
    };

    const announce = (type) => {
        switch (type) {
            case PLAYERX_WON:
                announcer.innerText = '🏆🎖️Player X Wins!🎖️🏆';
                break;
            case PLAYERO_WON:
                announcer.innerText = '🏆🎖️Player O Wins!🎖️🏆';
                break;
            case TIE:
                announcer.innerText = "🤝it's Tie!";
                break;
        }
        announcer.classList.remove('hide');
    };

    const handleTileClick = (index) => {
        if (board[index] || !isGameActive) return;

        board[index] = currentPlayer;
        tiles[index].textContent = currentPlayer;
        tiles[index].classList.add(`player${currentPlayer}`);

        handleResultValidation();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        // Update the player display with the correct player and color
        playerDisplay.textContent = `${currentPlayer}`;
        playerDisplay.style.color = getCurrentPlayerColor(currentPlayer);
    };

    const handleReset = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');
        tiles.forEach(tile => {
            tile.textContent = '';
            tile.classList.remove('playerX', 'playerO');
        });
        currentPlayer = 'X';
        playerDisplay.textContent = ` X`;
        playerDisplay.style.color = getCurrentPlayerColor(currentPlayer);
    };

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => handleTileClick(index));
    });

    resetButton.addEventListener('click', handleReset);
});
