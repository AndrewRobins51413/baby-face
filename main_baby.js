

$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var firstImageCompare = null;
var secondImageCompare = null;
var firstCardId = null;
var secondCardId = null;
var totalGames = 0;
var matches = 0;
var click = 0;
var picArray = ['pic1', 'pic2', 'pic3', 'pic4', 'pic5', 'pic6', 'pic7', 'pic8', 'pic9',
    'pic1', 'pic2', 'pic3', 'pic4', 'pic5', 'pic6', 'pic7', 'pic8', 'pic9'];

function initializeApp() {
    reSetGame();
}

function reSetGame() {
    $('#winmodal').addClass('hidden');
    $('.cardcontainer').empty();
    shuffle(picArray);
    dealCards();
    totalGames = totalGames + 1;
}

function cardClickHandler(event) {

    if (firstCardClicked === null) {   //checking to see if the first card has actually been clicked
        firstCardClicked = $(event.currentTarget).find('.cardtop'); //assigns value to firstCardClicked
        firstCardId = $(event.currentTarget).attr('id');
        firstCardClicked.addClass('hidden');
        firstCardClicked.addClass('clicked');
        firstImageCompare = $(event.currentTarget).find('.cardimage').css('background-image');
        click = click + 1;
    }
    else {
        if (secondCardClicked === null) {
            secondCardClicked = $(event.currentTarget).find('.cardtop');
            secondCardId = $(event.currentTarget).attr('id');
            secondCardClicked.addClass('hidden');
            secondCardClicked.addClass('clicked');
            $('div.cardcontainer > div').addClass('clicked');
            secondImageCompare = $(event.currentTarget).find('.cardimage').css('background-image');
            click = click + 1;
        }
    }
    $("#button1").text(click);
    $("#button2").text('clicks');

    if (firstCardClicked !== null && secondCardClicked !== null) {

        if (firstImageCompare === secondImageCompare && firstCardId !== secondCardId) {
            $('#matchmodal').removeClass('hidden');
            matches = matches + 1;
            $('#' + firstCardId).off(); //makes flipped card unclickable
            $('#' + secondCardId).off('click');

            setTimeout(function () {
                $('#matchmodal').addClass('hidden')
                $('div.cardcontainer > div').removeClass('clicked');
                firstImageCompare = null;
                secondImageCompare = null;
                firstCardClicked = null;
                secondCardClicked = null;
            }, 2500);

            $("#button3").text(matches);
            $("#button4").text('matches');
        }
        else {
            setTimeout(function () {
                firstCardClicked.removeClass('hidden');
                secondCardClicked.removeClass('hidden');
                $('div.cardcontainer > div').removeClass('clicked');
                firstImageCompare = null;
                secondImageCompare = null;
                firstCardClicked = null;
                secondCardClicked = null;
            }, 500);

        }


        //var percentMatched = parseInt((matches*2 / click) * 100);

        $("#button5").text(totalGames);
        $("#button6").text('Game Number');

    }
    if (matches === 9) {        //win condition and initiate re-set
        $("#winmodal").removeClass("hidden");
        setTimeout(function () {
            reSetGame()},4500);
    }
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
    matches = 0;
    for (var i = 0; i < picArray.length; i++) {
        var tempId = 'card' + [i]
        var tempCardImage = $('<div>').addClass('cardimage').addClass(picArray[i])  //cardimage
        var tempCardTop = $('<div>').addClass('cardtop').addClass('pic12')  //cardtop - unplayed card
        var cardDiv = $('<div>',{id:tempId})   //card by #ID
        $(cardDiv).addClass('card').append(tempCardImage).append(tempCardTop); //assemble card div

        $('.cardcontainer').append(cardDiv) //assemble card container

    }

    firstImageCompare = null;
    secondImageCompare = null;
    firstCardClicked = null;
    secondCardClicked = null;
    firstCardId = null;
    secondCardId = null;
    $('.card').on('click', cardClickHandler);

}
