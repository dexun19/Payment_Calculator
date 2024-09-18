export function calculateAmount(playersData) {
    try {
        // Validation
        if (playersData.length <= 0) {
            return 'Total amount of players are invalid.';
        }

        const paymentResult = validateTotalNett(playersData);
        return paymentResult;
    } catch (err) {
        console.log(`Error: ${err}`);
    }

}

//* Validation for total nett for each player
function validateTotalNett(playersData = []) {
    let settledAmount = 0;
    let totalNett = [];
    playersData.forEach((player) => {
        totalNett.push(player.value); 
    })

    totalNett.forEach((nett) => {
        // Validation
        if (isNaN(nett)) {
            return `Invalid total nett is inputted. Input was ${nett}`;
        }
        console.log(nett);
        settledAmount += nett;
    })

    // To ensure the total amount after settling is correct(e.g. 50 + 20 + (-15) + (-55)).
    const paymentResult = settledAmount !== 0 ?
     console.log('Incorrect total amount to be settled. Try again.') 
    : cancelOut(totalNett);

    return paymentResult
}


//* Function to cancel positive and negative player's nett
function cancelOut(totalNett) {
    let positiveIndex = 0;
    let negativeIndex = 0;
    let moneyNotSettled = true;
    let information = "";

    while (moneyNotSettled) {
        let positive;
        let negative;

        // Declare latest positive and negative player's nett
        for (let i = 0 ; i <= totalNett.length ; i++) {
            if (totalNett[i] > 0 && positive == undefined) {
                positive = totalNett[i];
                positiveIndex = i;
            }
            else if (totalNett[i] < 0 && negative == undefined) {
                negative = totalNett[i];
                negativeIndex = i;
            }

            // Validate the input to ensure theres at least 1 positive and negative value.
            if (positive !== undefined && negative !== undefined) {
                break;
            }

        }

        const payment = cancellation(totalNett, positiveIndex, negativeIndex);             // Calling of function
        information += payment;


        // Check if there are still money to be settled for any player. If it does, continue. Else, the while loop ends.
        let amountPending = false;
        for (let i = 0 ; i < totalNett.length ; i++) {
            if (totalNett[i] !== 0) {
                amountPending = true;
                break;
            }
        }
        amountPending ? moneyNotSettled = true : moneyNotSettled = false;



    }

    // After settling all the amount
    information += '\nAll player amount has been settled. Have a good day!';

    return information;
}

//* Cancellation method now + logging of information of cancellation(e.g. player 1 pays player 2 etc.)
function cancellation(totalNett, positiveIndex, negativeIndex) {

    const positive = totalNett[positiveIndex];
    const negative = totalNett[negativeIndex];
    let cancelAmount = Math.min(positive, Math.abs(negative));  // Determine cancellation amount

    totalNett[positiveIndex] -= cancelAmount;  // Reduce positive number
    totalNett[negativeIndex] += cancelAmount;  // Reduce (increase) negative number

    // Log the cancellation
    return `Player ${negativeIndex + 1} has to pay Player ${positiveIndex + 1} $${cancelAmount}.\n`;
}