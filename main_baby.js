

$(document).ready(initializeApp);
console.log('initializeApp');

var firstCardClicked = null;
var secondCardClicked = null;
var firstImageCompare = null;
var secondImageCompare = null;
var firstCardId = null;
var matches = 0;
var click = 0;

function initializeApp(){
    $('.card').on('click', cardClickHandler);
}

function cardClickHandler(event){
    
if (firstCardClicked === null){   //checking to see if the first card has actually been clicked
    firstCardClicked = $(event.currentTarget).find('.cardtop'); //assigns value to firstCardClicked
    firstCardId = $(event.currentTarget).attr('id');
    firstCardClicked.addClass('hidden');
    
    firstImageCompare = $(event.currentTarget).find('.cardimage').css('background-image');
    click = click + 1;
}
else{
    if(secondCardClicked === null){
        secondCardClicked = $(event.currentTarget).find('.cardtop');
        secondCardId = $(event.currentTarget).attr('id');
        secondCardClicked.addClass('hidden');
        secondImageCompare = $(event.currentTarget).find('.cardimage').css('background-image');
        click = click+1;
    }
}
console.log("firstCardClicked", firstCardClicked);
console.log('firstCardId', firstCardId);
console.log('secondCardId', secondCardId);

if (firstCardClicked !== null && secondCardClicked !== null){

if(firstImageCompare === secondImageCompare && firstCardId !== secondCardId){
    $('#winmodal').removeClass('hidden');
    matches = matches + 1;
console.log("matches", matches)
    
    setTimeout(function(){
        $('#winmodal').addClass('hidden')
        firstImageCompare = null;
        secondImageCompare = null;
        firstCardClicked = null;
        secondCardClicked = null;
        }, 500);
    

console.log("SIC2", secondImageCompare)
console.log('FIC2',firstImageCompare);
    }
    else{
        setTimeout(function(){
            console.log('time')
        firstCardClicked.removeClass('hidden');
        secondCardClicked.removeClass('hidden');
        firstImageCompare = null;
        secondImageCompare = null;
        firstCardClicked = null;
        secondCardClicked = null;
        }, 500);
        
console.log("SIC3", secondImageCompare)
console.log('FIC3',firstImageCompare);
        }
    }
}
// re-set the game and shuffle the cards

function reSetGame() {

    var picArray = ['pic1', 'pic3', 'pic4', 'pic5', 'pic6', 'pic7', 'pic8', 'pic9', 'pic10',
        'pic1', 'pic3', 'pic4', 'pic5', 'pic6', 'pic7', 'pic8', 'pic9', 'pic10'];

        shuffle(picArray);

        console.log(array)

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -=1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue
        }
        return array
    }
    
for (var i = 1; i<=18; i++) {
    var tempId = '#' + 'card' + [i]
    var tempClass = picArray[i]
    $(tempId).addClass(tempClass);

    }
}


if (matches === 9) {
    reSetGame()
}