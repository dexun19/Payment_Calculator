import { navigateTo } from '../router';

export function inputPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Payment Calculator</h1>\
    <h4> By: De Xun</h4>
    <h4> Last Modified: 22/09/2025</h4>
    <button id="addPlayer">Add Player</button>
    <form id="playerForm">
      <div id="playerInputs"></div>
      <p id="errorMessage" style="color: red; display: none;"></p>
      <button type="submit">Submit</button>
    </form>
  `;

  let playerCount = 0;
  const playerInputs = document.getElementById('playerInputs');
  const addPlayerButton = document.getElementById('addPlayer');
  const errorMessage = document.getElementById('errorMessage');

  // Add a new player input field
  addPlayerButton.addEventListener('click', () => {
    playerCount++;
    const playerDiv = document.createElement('div');
    playerDiv.innerHTML = `
      <label>Player ${playerCount} Win/Loss Amount(Positive = Gain, Negative = Loss): </label>
      <input type="number" name="Player ${playerCount}" />
    `;
    playerInputs.appendChild(playerDiv);
  });

  // Handle form submission
  document.getElementById('playerForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from submitting normally

    // Check if at least 2 players are added
    if (playerCount < 2) {
      errorMessage.style.display = 'block'; // Show error message
      errorMessage.innerHTML = 'Please add at least 2 players.';
      return; // Stop the form submission
    }

    // Gather form data
    const formData = new FormData(event.target);
    const playersData = Array.from(formData.entries()).map(([key, value]) => ({
      player: key,
      value: Number(value),
    }));

    
    // Check if all players have 0 nett wins and losses
    let playerWithNonZeroNet = false;
    playersData.forEach((player) => {
      if (player.value !== 0) {
        playerWithNonZeroNet = true;
      }
    });

    if (!playerWithNonZeroNet) {
      errorMessage.style.display = 'block'; // Show error message
      errorMessage.innerHTML = 'Please add at least 1 player with non-zero gain/loss.';
      return;
    }

    // Hide the error message if it passes the validation
    errorMessage.style.display = 'none';

    // Save players data to localStorage
    localStorage.setItem('playersData', JSON.stringify(playersData));

    // Navigate to results page
    navigateTo('/results');
  });
}
