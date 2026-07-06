const board = document.getElementById('board');
const statusText = document.getElementById('status');
let activeTurn = 'white';
let activeSelection = null;

function getTeam(squareElement) {
    if (squareElement.classList.contains('white-piece')) return 'white';
    if (squareElement.classList.contains('black-piece')) return 'black';
    return null;
}

board.addEventListener('click', (e) => {
    const square = e.target.closest('.square');
    if (!square) return;

    const targetTeam = getTeam(square);
    if (targetTeam === activeTurn) {
        if (activeSelection) {
            activeSelection.classList.remove('selected');
        }
        activeSelection = square;
        square.classList.add('selected');
        return;
    }

    if (activeSelection) {
        square.textContent = activeSelection.textContent;
        square.className = activeSelection.className;
        square.classList.remove('selected');

        activeSelection.textContent = '';
        const prevRow = parseInt(activeSelection.dataset.row);
        const prevCol = parseInt(activeSelection.dataset.col);
        activeSelection.className = `square ${ (prevRow + prevCol) % 2 === 0 ? 'light' : 'dark' }`;

        activeSelection = null;

        activeTurn = activeTurn === 'white' ? 'black' : 'white';
        statusText.textContent = `${activeTurn.charAt(0).toUpperCase() + activeTurn.slice(1)}'s Turn`;
    }
});
