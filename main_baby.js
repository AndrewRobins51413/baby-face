

$(document).ready(initializeApp);
console.log('initializeApp');

var firstCardClicked = null;
var secondCardClicked = null;
var firstImageCompare = null;
var secondImageCompare = null;
var firstCardId = null;
var secondCardId = null;
var matches = 0;
var click = 0;
var picArray = ['pic1', 'pic2', 'pic3', 'pic4', 'pic5', 'pic6', 'pic7', 'pic8', 'pic9',
    'pic1', 'pic2', 'pic3', 'pic4', 'pic5', 'pic6', 'pic7', 'pic8', 'pic9'];

function initializeApp() {
    dealCards();
    // $('.card').on('click', cardClickHandler);
    
}
// When game runs, the first round goes as it should, after the re-set class:hidden does not get applied and, 
// the #cardId of the clicked is assigned to both the first clicked and second clicked cards.
// so, to fix the game, the duplicate card Id and the un-hide-abiity of the cards in the sencond round needs fixing.

function cardClickHandler(event) {

    if (firstCardClicked === null) {   //checking to see if the first card has actually been clicked
        console.log('FCC', firstCardClicked)
        firstCardClicked = $(event.currentTarget).find('.cardtop'); //assigns value to firstCardClicked
        firstCardId = $(event.currentTarget).attr('id');
        firstCardClicked.addClass('hidden');
console.log('firstId', firstCardId);
        firstImageCompare = $(event.currentTarget).find('.cardimage').css('background-image');
        click = click + 1;
    }
    else {
        if (secondCardClicked === null) {
            console.log('SCC', secondCardClicked)
            secondCardClicked = $(event.currentTarget).find('.cardtop');
            secondCardId = $(event.currentTarget).attr('id');
            secondCardClicked.addClass('hidden');
            secondImageCompare = $(event.currentTarget).find('.cardimage').css('background-image');
            click = click + 1;
            console.log('secondId', secondCardId);
        }

    }
    $("#button1").text(click);
    $("#button2").text('clicks');

    if (firstCardClicked !== null && secondCardClicked !== null) {

        if (firstImageCompare === secondImageCompare && firstCardId !== secondCardId) {
            $('#winmodal').removeClass('hidden');
            matches = matches + 1;
            console.log("matches", matches)
            $('#' + firstCardId).off(); //makes flipped card unclickable
            $('#' + secondCardId).off('click');

            setTimeout(function () {
                $('#winmodal').addClass('hidden')
                firstImageCompare = null;
                secondImageCompare = null;
                firstCardClicked = null;
                secondCardClicked = null;
            }, 500);

            $("#button3").text(matches);
            $("#button4").text('matches');
        }
        else {
            setTimeout(function () {
                firstCardClicked.removeClass('hidden');
                secondCardClicked.removeClass('hidden');
                firstImageCompare = null;
                secondImageCompare = null;
                firstCardClicked = null;
                secondCardClicked = null;
            }, 500);

        }


        var percentMatched = parseInt((matches*2 / click) * 100);

        $("#button5").text(percentMatched);
        $("#button6").text('% matched');

    }
    if (matches === 2) {        //win condition and initiate re-set
        setTimeout(reSetGame(), 1500);
    }
}

function reSetGame() {

    $('.cardcontainer').empty();
    shuffle(picArray);
    dealCards();
    $('.card').on('click', cardClickHandler);  //to return clickability to assembled card
}

function shuffle(array) {
    var currentIndex = picArray.length;
    var randomIndex = temporaryValue;
    var temporaryValue = randomIndex;
    while (0 !== currentIndex) {   // run this loop until currentIndex === 0
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;  //decrement currentIndex
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
}

function dealCards() {
    for (var i = 0; i < picArray.length; i++) {
        var tempId = 'card' + [i]
        var tempCardImage = $('<div>').addClass('cardimage').addClass(picArray[i])  //cardimage
        var tempCardTop = $('<div>').addClass('cardtop').addClass('pic12')  //cardtop - unplayed card
        var cardDiv = $('<div>',{id:tempId})   //card by #ID
        $(cardDiv).addClass('card').append(tempCardImage).append(tempCardTop); //assemble card div
        
        
        //$(cardDiv).on('click', cardClickHandler);  //to return clickability to assembled card


        $('.cardcontainer').append(cardDiv) //assemble card container
        
    }
    $('.card').on('click', cardClickHandler);

}
