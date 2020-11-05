const colors = ['red','blue','green','yellow','rosybrown','tomato','indigo','olive','aqua','red','blue','green','yellow','rosybrown','tomato','indigo','olive','aqua']
const panel = document.querySelector('.panel');
const playBtn = document.querySelector('.panel__button');
const cards = document.querySelectorAll('.game-wrapp__tile');
const time = document.getElementById('time');
const moveCount = document.getElementById('move');

const whichClick = [];
let score = 0;
let moves =0;
const timeStart = new Date().getTime();

function startGame () {
    panel.classList.remove('open');
    //make an array
    cardsList = [...cards]
    cardsList.forEach(el => el.classList.remove('off'));
    //shuffle colors of tiles
    cardsList.forEach(function(el){
        const index = Math.floor(Math.random()*colors.length);
        el.classList.add(colors[index]);
        colors.splice(index,1);
    })
    //hide tiles
    setTimeout(function(){
        cardsList.forEach(el => {
            el.classList.add('hidden');
            el.addEventListener('click', miniGame);
        })
    },1500);
    
}

function miniGame(){
    const tile = this
    if(whichClick.length === 0){
        whichClick[0]= tile;
        tile.classList.remove('hidden');
        tile.removeEventListener('click', miniGame);
        //console.log('klik1');
    } else {
        whichClick[1] = tile;
        moves++;
        tile.classList.remove('hidden');
        cardsList.forEach(el => el.removeEventListener('click', miniGame));
        //console.log('klik2')

        setTimeout(function(){

            if(whichClick[0].classList[1] === whichClick[1].classList[1]){
                //console.log('win');
                score++;
                whichClick.forEach(el => el.classList.add('off'));  
                cardsList = cardsList.filter(el => !el.classList.contains('off'));
                cardsList.forEach(el => el.addEventListener('click', miniGame))
                if(score === 9){
                    panel.classList.add('open');
                    moveCount.innerText = `${moves}`;
                    const timeStop = new Date().getTime();
                    const minute = Math.floor((timeStop - timeStart)/1000/60);
                    const second = Math.floor((timeStop - timeStart)/1000) - minute*60;
                    time.innerText = `${minute} [min] ${second} [s]`;
                    score = 0;
                }
            } else {
                whichClick.forEach(el => el.classList.add('hidden')); 
                cardsList.forEach(el => el.addEventListener('click', miniGame))
            }
            whichClick.length = 0;

        },700)
    } 
}

playBtn.addEventListener('click', startGame);
   