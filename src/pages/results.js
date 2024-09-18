import { navigateTo } from '../router';
import { calculateAmount } from '../process/calculate';

export function resultsPage() {
  const app = document.getElementById('app');
  const playersData = JSON.parse(localStorage.getItem('playersData')) || [];

  // Declaration of html content
  app.innerHTML = `
    <h1>Results</h1>
    <button id="backButton">Go Back</button>
    <ul id="resultsList"></ul>
    <div id="paymentResult"></div>
  `;

  // Addition of different players data
  const resultsList = document.getElementById('resultsList');
  playersData.forEach(player => {
    const listItem = document.createElement('li');
    listItem.textContent = `${player.player}: ${player.value}`;
    resultsList.appendChild(listItem);
  });

  const paymentResult = calculateAmount(playersData);

  // Replace '\n' with <br> to be added to HTML while inserting the payment result
  document.getElementById('paymentResult').innerHTML = paymentResult.replace(/\n/g, '<br>');

  document.getElementById('backButton').addEventListener('click', () => {
    navigateTo('/input'); // Navigate using clean URL
  });
}
