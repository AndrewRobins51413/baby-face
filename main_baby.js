

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
    $("#button1").text(click,);
    $("#button2").text('clicks');
// console.log("firstCardClicked", firstCardClicked);
// console.log('firstCardId', firstCardId);
// console.log('secondCardId', secondCardId);

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
    
        $("#button3").text(matches);
        $("#button4").text('matches');
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
        
        }
        

        var percentMatched = parseInt((matches/click)*100);

        $("#button5").text(percentMatched);
        $("#button6").text('% matched');

    }
    if (matches === 9) {
        // clearBoard()
        reSetGame()
    }
}
// re-set the game and shuffle the cards

// function clearBoard(){
//     for(var i=1; i<=length.picArray; i++){
//     var clearIndex = '#' + 'card' + [i]
//     var picIndex = '.pic' + [i]
//     $(clearIndex > '.cardimage').removeClass(picIndex);
//     console.log('clearIndex', clearIndex);
//     }
// }



function reSetGame() {

var picArray = ['pic1', 'pic3', 'pic4', 'pic5', 'pic6', 'pic7', 'pic8', 'pic9', 'pic10',
        'pic1', 'pic3', 'pic4', 'pic5', 'pic6', 'pic7', 'pic8', 'pic9', 'pic10'];

        shuffle(picArray);

        function shuffle(array) {
            var currentIndex = picArray.length;
            var randomIndex = temporaryValue;
            var temporaryValue = randomIndex;
            while (0 !== currentIndex) {   // run this loop until currentIndex === 0
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -=1;  //decrement currentIndex
                console.log('randomIndex', randomIndex)
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue
            }
            console.log('reSetArray', picArray);
        }



for (var i = 1; i<=18; i++) {
    var tempId = '#card' + [i]
    console.log(tempId);
    var tempClass = picArray[i]
    $(tempId > 'div').find('.cardimage').addClass(tempClass);
    $(tempId > 'div').find('.cardtop').removeClass('hidden')
    }
}


