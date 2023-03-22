const btns = document.querySelectorAll('button'),
      overlay = document.querySelector('.overlay');

const delElem = (e) => {
    console.log(e.target);
    console.log(e.type);  
};

btns.forEach(btn =>{
    btn.addEventListener('click', delElem);
});




// btn.addEventListener('click', delElem); 
// overlay.addEventListener('click', delElem);   