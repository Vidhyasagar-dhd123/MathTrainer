const getOperator = document.getElementById("arithmetic");
const task = document.getElementById('task')
const start = document.getElementById('start')

const problem = document.getElementById('problem')
const timer = document.getElementById('timer')
const list = document.getElementById('list');
const ans = document.getElementById('ans')
const counter = document.getElementById('counter')

let buttonFlag=0;

let level ;
let timeCount;
let op='+';
list.addEventListener('input',(event)=>{
    switch(event.target.value){
        case "Easy" : level= 10; break;
        case "Medium" : level= 100; break;
        case "Hard" : level= 1000; break;
        case "Challenging" :level= 10000; break;
        default : level = 10; break;
    }
})

function getDivOp(op1,level){
    let op = getSmallOp(op1,level/10);
    if(op1%op==0 && op!=1){
        return op;
    }
    else{
        
        while((op1%op)!=0){
            
            op++;
        }
        if(op1==op || op==1)
        {
            op= getDivOp(op1,level)
            return op;
        }
        else
        return op;
    }
    
}


function getSmallOp(op1,level){
    let op = getRandOp(level)+1;
    if(op<op1 && op>0){
        return op;
    }
    else{
        op=getSmallOp(op1,level);
        return op;
    }
}
getOperator.addEventListener('input',(event)=>{
    switch(event.target.value){
        case "+" : {op= '+'; 
        task.innerText = `Check your Addition speed`;break;}
        case "*" : {op= '*';
        task.innerText = `Check your Multiplication speed`;
        break;}
        case "-" : {op= '-'; 
        task.innerText = `Check your Substraction speed`;
        break;}
        case "/" :{op= '/';
        task.innerText = `Check your Division speed`;
        break;}
        default : op = '+'; break;
    }
})

function getRandOp(key){
    return (Math.floor(Math.random()*key))
}



start.onclick=()=>{if(!buttonFlag){
    buttonFlag = 1;
    start.innerHTML = "Stop"
    window.clearInterval(timeCount)
        mainFunction(10)
        timer.style.fontSize ="30px";
    flag = 1;
    let count = 0;
    timeCount = window.setInterval(()=>{
        if(count%100<10){
            timer.innerText =`${Math.floor(count/6000)}:${Math.floor((count/100)%60)}:0${count%100}`
            count++;
            
        }
        else{
            timer.innerText=`${Math.floor(count/6000)}:${Math.floor((count/100)%60)}:${count%100}`
            count++;
            
        }
    },10)
}

else{

    window.clearInterval(timeCount)
    start.innerHTML = "Start"

buttonFlag = 0;
}
}
function mainFunction(i){
    document.querySelector('#mtr').value=10-i;
    counter.innerHTML = `${i}/10`;
    ans.focus();
    let wordLength=0;
    if(i>0){
        
        let op1 ;
        let op2;
        if(op=='-'){
            op1 = getRandOp(level*10||100)+1;
            op2 = getSmallOp(op1,level*10||100);
        }
        else if(op=='/'){
            op1 = getRandOp(level*10||100)+1;
            op2 = getDivOp(op1,level*10||100);
        }
        else{
            op1 = getRandOp(level||10)+1;
            op2 = getRandOp(level||10)+1;
        }
       
        problem.innerHTML=`${op1 }${op}${ op2}`
        ans.oninput = () =>{
            wordLength++;
            if(wordLength>=(level/10)+2 && ans.value!=eval(op1+op+op2)){
                ans.value=''
                wordLength=0;}
                else{
            if(ans.value==eval(op1+op+op2)){
                    wordLength=0;
                    ans.value=''
                i--;
                mainFunction(i);
                }
            }
        }
    }
    else{
        buttonFlag = 0;
        start.innerHTML = "Start"
        window.clearInterval(timeCount)
        timer.style.fontSize ="240%";
        problem.innerHTML="<h1>Finished</h1>"
        return;
    }
}