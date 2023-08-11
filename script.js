var squares=document.querySelectorAll('.squares');
var square=document.querySelector('.square');
var pointsX=document.querySelector('#pointsx');
var pointsO=document.querySelector('#pointso');
var rounds=document.querySelector('#rounds');
var result=document.querySelector('.result');
var turn=document.querySelector('.turn');
var reset=document.querySelector('.reset');
var eachwon=false;

var winningConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
var emptyArray=["","","","","","","","",""]
var Xpoint=0;
var Opoint=0;
var round=1;
var player='X';
initial();
function initial(){
    
    turn.textContent=`${player} 's turn`;
    squares.forEach((square) =>{
        square.addEventListener('click', function(){
            if(!eachwon){
                boxClicked(this);
            }
            else{
                return;
            }
            
        })
    })
    
    }

function boxClicked(attr){
    var clicked=attr.getAttribute('clicked');
    if(attr.textContent==''){
        emptyArray[clicked]=player;
        displayEnteredValue(attr);
        winning(player);
        changePlayer()
    }
    
    
    
}
function displayEnteredValue(val){
    let dis=(player=="X")?`O's turn`:`X 's turn`;
    turn.textContent=dis;
    val.textContent=player;
   
}
function changePlayer(){
    player=(player=="X")?"O":"X";
}

function winning(player){
    // debugger;
    var won=false;
    for(let i=0;i<winningConditions.length;i++){
        const conditionCheck= winningConditions[i];
        const a=emptyArray[conditionCheck[0]];
        const b=emptyArray[conditionCheck[1]];
        const c=emptyArray[conditionCheck[2]];
        if(a=='' || b=='' || c==''){
            continue;
        }
        if(a==b && b==c){
            eachwon=true;
            won=true;
            break;
        }
        
    }
    if(won){
        if(player=='X'){
            Xpoint++;
            pointsX.textContent=Xpoint;
            
            
        }
        else if(player=="O"){
            Opoint++;
            pointsO.textContent=Opoint;
            
        }
        reset.textContent='NEXT';
        result.textContent=`${player} wins`;
        round+=1;
        rounds.textContent=round;

        if(rounds.textContent=='4'){
            if(Xpoint>Opoint){
                square.innerHTML=`<img src="images/won.jpg" class="wonImage">
                <h2 class="wontext">X wins final</h2>
                <h2 class="wonPoint">Points : ${Xpoint}</h2> `;
                result.textContent=`X is the Winner`;
                reset.textContent='RESET'
                turn.textContent=(player=="X")? "O ' s turn":"X ' s turn";
                setTimeout(() => {
                    resetting2();
                }, 1000);
                
            }
            else if(Opoint>Xpoint){
                square.innerHTML=`<img src="images/won.jpg" class="wonImage">
                <h2 class="wontext">O wins final</h2>
                <h2 class="wonPoint">Points : ${Opoint}</h2> `;
                result.textContent=`O is the Winner`;
                reset.textContent='RESET';
                setTimeout(() => {
                    resetting2();
                }, 1000);
                
            }
            else if((Opoint==0 && Xpoint==0)){
                // result.textContent=`DRAW`;
                // reset.textContent='RESET';
                square.innerHTML=`<img src="images/oops.jpg" class="wonImage">
                <h2 class="wontext">No one wins</h2>`;
                result.textContent=`No one wins`;
                reset.textContent='RESET';
                setTimeout(() => {
                    resetting2();
                }, 1000);
                
            }
            
        }
        
    }
    else if(!emptyArray.includes('') && !won){
        emptyArray=["","","","","","","","",""];
        squares.forEach((box) => {
            box.textContent='';
        })
        round+=1;
        rounds.textContent=round;
        result.textContent='DRAW';
        turn.textContent='';
        reset.textContent='RESET';
      }
    
}
reset.addEventListener('click', ()=>{
    resetting();
})
function resetting(){
    eachwon=false;
    player="X";
    turn.textContent=`${player} 's turn`;
    squares.forEach((box) => {
        box.textContent='';
    })
    emptyArray=["","","","","","","","",""];
    result.textContent='';
    
    
}
function resetting2(){
    eachwon=false;
    squares.forEach((box) => {
        box.textContent='';
    })
    emptyArray=["","","","","","","","",""];
    round=1;
    Xpoint=0;
    Opoint=0;
    rounds.textContent='1';
    pointsX.textContent=Xpoint;
    pointsO.textContent=Opoint;
    result.textContent=''
    
}

















// console.log(points);
console.log(rounds);
window.addEventListener('offline',()=>{
    alert("offline");
})
window.addEventListener('online',()=>{
    alert("online");
})