
const cardsList = document.querySelectorAll(".card");   //Create a list that holds all  cards
let icons = [];                                         // to store all icones.
let twoCards = [];                                      // to but the 2 cards that the user opened.
let moves = 0 ;                                         // Number of moves
let stars = 3 ;                                         // number of stars
let seconds=0;
let minutes=0;
let TimeManager=0;
StartTimer();
restart();


//---------------------------------------
function StartTheGame()
{  
    StartTimer();
    EndTheGame();
    seconds=0;
    minutes=0;
    stars = 3;
    moves= 0;
    UpdateHTML();
    shuffleCards();    
    AllNoShow();
} 
//---------------------------------------

// to activate refresh button
function restart()
{   
    seconds=0;
    minutes=0;
    document.querySelector(".restart").addEventListener("click",StartTheGame);
}
    
//---------------------------------------

// Get the modal
function ModalDialog()
{
    let dialog= document.getElementById("Model-box");
    dialog.showModal();
    document.querySelector("#play-again").addEventListener("click",StartTheGame);
    document.querySelector("#cancel").addEventListener("click",EndTheGame);
    document.querySelector("#span-NofS").innerText = stars;
    StopTimer();

}
//---------------------------------------

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//---------------------------------------

// to count the number of moves
function NumberOfMoves()
{    moves = moves + 1;
}

//---------------------------------------

// to shuffle the cards
function shuffleCards() 
{
     icons = shuffle(icons);
     // assign icons to each card
     let i = 0;
     cardsList.forEach(cardsList => {
     let child = cardsList.children[0];
     child.className = icons[i];
     i++;})
}

//---------------------------------------

 function calculateStars()
 { 
    // NumberOfMoves();
    if (moves <= 15)
    {
        stars = 3;  
    }
    else
    if (moves <= 20)
    {
        stars = 2;
    }
    else
    {
        stars = 1;
    }
    
    UpdateHTML();

 }

 //---------------------------------------

function UpdateHTML()
{   
    // to update number of moves
    const MovesInHTML = document.querySelector(".moves");
    MovesInHTML.innerHTML= moves;

    // to update number of stats
    const StarsInHTML = document.querySelector(".stars");
    StarsInHTML.innerHTML="";
    for ( let i=0; i< stars; i++)
    {
    let s = "<li><i class='fa fa-star'></i></li>"; 
    StarsInHTML.innerHTML =StarsInHTML.innerHTML+ s;
    } 
    
}

 //---------------------------------------
    

function cardklik()
{    
    if ( twoCards.length < 2 )
 {       // if the user chose the same card 
         //it should not opened.
         // and exit the function
        if (this=== twoCards[0])
        {
             return;
        }
             else
    {
    // to open the cards
    this.classList.toggle("show");
    this.classList.toggle("open");
    // to add it to the array

    twoCards.push(this);
    console.log(twoCards); 
    }
 }

    if (twoCards.length == 2)
        
    {
        setTimeout(()=>{
            IsCardsMaching()
        },1000)
    
    } 
}

//---------------------------------------

function IsCardsMaching()
{
    // check if twoCards have 2 cards
    if (twoCards.length == 2)
    {
        let FirstCard = twoCards[0]; //
        let SecondCard = twoCards[1]; //
        let FirstChild = FirstCard.children[0].className; //
        let SecondChild = SecondCard.children[0].className;//

        if(FirstChild == SecondChild) 
        {   // to sighn them to mach class
            FirstCard.classList.add("match");
            SecondCard.classList.add("match");
            NumberOfMoves();
            calculateStars();

        } 
           else
        {
            // to remove show and open
            FirstCard.className = "card";
            SecondCard.className = "card";  
            

        NumberOfMoves();
        calculateStars();
        
   }
   // the array should be empty in the 2 cases
   twoCards = [];

}
    
   // count number of cards that is not mached 
   let cardsNotOpened = document.querySelectorAll(".card:not(.match)");
   //console.log(cardsNotOpened.length);
   if (cardsNotOpened.length ==0)
   {
   ModalDialog();
    
   }
}

//---------------------------------------

   UpdateHTML();
    // to make alll cards face down
    cardsList.forEach(cardsList=> {
    cardsList.classList.remove("open");
    cardsList.classList.remove("show"); 
    cardsList.classList.remove("match");

    // all icons names
    let element=cardsList.children[0];
    icons.push(element.className);
    
    // add event lisener
    cardsList.addEventListener("click", cardklik);


});
//---------------------------------------
function AllNoShow()
{
    cardsList.forEach(cardsList=> {
        cardsList.classList.remove("open");
        cardsList.classList.remove("show"); 
        cardsList.classList.remove("match");})
}

//---------------------------------------

function EndTheGame()
{
    document.getElementById("Model-box").close();
    
}
    


//-----------------------------------------


function StartTimer()
{
    TimeManager=setInterval(function(){
    seconds++;
     if(seconds == 60)
     {
        minutes++;
        seconds = 0;
     }
     const HTMLtime= document.querySelector(".timer");
     HTMLtime.innerHTML=" ";
     HTMLtime.innerHTML=minutes;
     HTMLtime.innerHTML= HTMLtime.innerHTML+":";
     HTMLtime.innerHTML= HTMLtime.innerHTML + seconds;

    },1000);
    

}


function StopTimer()
{
    clearInterval(TimeManager);


}