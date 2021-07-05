/*
c = clubs(paus(também conhecido como zap));
h = hearts(copas);
s = spades(espada);
d = diamonds(ouro);
'cardsMap': {'2c':2, '2h':2, '2s':2, '2d':2, '3c':3, '3h':3, '3s':3, '3d':3, '4c':4, '4h':4, '4s':4, '4d':4, '5c':5, '5h':5, '5s':5, '5d':5, '6c':6, '6h':6, '6s':6, '6d':6, '7c':7, '7h':7, '7s':7, '7d':7, '8c':8, '8h':8, '8s':8, '8d':8, '9c':9, '9h':9, '9s':9, '9d':9, '10c':10, '10h':10, '10s':10, '10d':10, 'Qc':10, 'Qh':10, 'Qs':10, 'Qd':10, 'Jc':10, 'Jh':10, 'Js':10, 'Jd':10, 'Kc':10, 'Kh':10, 'Ks':10, 'Kd':10, 'Ac':[1, 11], 'Ah':[1, 11], 'As':[1, 11], 'Ad':[1, 11]},
*/

let blackjackGame = {
    'you':{'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer':{'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2c', '2h', '2s', '2d', '3c', '3h', '3s', '3d', '4c', '4h', '4s', '4d', '5c', '5h', '5s', '5d', '6c', '6h', '6s', '6d', '7c', '7h', '7s', '7d', '8c', '8h', '8s', '8d', '9c', '9h', '9s', '9d', '10c', '10h', '10s', '10d', 'Qc', 'Qh', 'Qs', 'Qd', 'Jc', 'Jh', 'Js', 'Jd', 'Kc', 'Kh', 'Ks', 'Kd', 'Ac', 'Ah', 'As', 'Ad'],
    'cardsMap': {'2c':2, '2h':2, '2s':2, '2d':2, '3c':3, '3h':3, '3s':3, '3d':3, '4c':4, '4h':4, '4s':4, '4d':4, '5c':5, '5h':5, '5s':5, '5d':5, '6c':6, '6h':6, '6s':6, '6d':6, '7c':7, '7h':7, '7s':7, '7d':7, '8c':8, '8h':8, '8s':8, '8d':8, '9c':9, '9h':9, '9s':9, '9d':9, '10c':10, '10h':10, '10s':10, '10d':10, 'Qc':10, 'Qh':10, 'Qs':10, 'Qd':10, 'Jc':10, 'Jh':10, 'Js':10, 'Jd':10, 'Kc':10, 'Kh':10, 'Ks':10, 'Kd':10, 'Ac':[1, 11], 'Ah':[1, 11], 'As':[1, 11], 'Ad':[1, 11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']


const hitSound = new Audio('midia/sounds/swish.m4a');
const winSound = new Audio('midia/sounds/cash.mp3');
const lossSound = new Audio('midia/sounds/aww.mp3');
const drawSound = new Audio('midia/sounds/derp.mp4');


document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic); 

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal); 

function blackjackHit() {
    if (blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}




function randomCard() {
    let randomIndex = Math.floor(Math.random() * 52);
    return blackjackGame['cards'][randomIndex];
}


function showCard(card, activePlayer) {
    if (activePlayer['score'] <=21) {
        let cardImage = document.createElement('img');
        cardImage.src = `midia/cards/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    } 
}


function blackjackDeal() {


    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;


        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (i=0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (i=0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';
        
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').style.color = 'white';

        document.querySelector('#blackjack-result').textContent = 'Bora jogar!';
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
    }
}

function updateScore(card, activePlayer) {
    if (card === 'Ac' || card === 'Ah' || card === 'As' || card === 'Ad') {
        if (activePlayer['score']+blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}




 function showScore(activePlayer) {
    if (activePlayer['score']>21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
    


async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {

        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
    
}



function computeWinner() {
    let winner;

    if(YOU['score'] <= 21) {
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;

        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;

        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }

    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;


    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }

    console.log(blackjackGame);
    return winner;
}


function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] ===true) {

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'Você ganhou!!';
            messageColor = 'green';
            winSound.play();

        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'Você perdeu...';
            messageColor = 'red';
            lossSound.play();

        }else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'Opa, foi um empate!';
            messageColor = 'black';
            drawSound.play();
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}


document.getElementById("redo-btn").addEventListener("click", function() {
    document.getElementsByClassName("popup")[0].classList.add("active");
});

document.getElementById("no").addEventListener("click", function() {
    document.getElementsByClassName("popup")[0].classList.remove("active");
});

