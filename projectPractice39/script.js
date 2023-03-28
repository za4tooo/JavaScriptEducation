const btn = document.querySelector('.btn');

let timeId,
i = 0;



function myAnimation(){
    const elem = document.querySelector('.box');
    let pos = 0;

    const id = setInterval(frame, 10);
    function frame(){
        if(pos==300){
            clearInterval(id);
        }
        else{
            pos++;
            elem.style.top = pos + "px";
            elem.style.left = pos + 'px';
        }
    }
}


function logger (){
    if(i===3)
    {
        clearInterval(timeId); 
    }
    console.log('text');
    i++;
}
btn.addEventListener('click', myAnimation);


// let id = setTimeout(function log(){
//     console.log('Hello');
//     id = setTimeout(log, 500);
// }, 500);