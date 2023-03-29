window.addEventListener('DOMContentLoaded', () =>{
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab =>{
            tab.classList.remove('tabheader__item_active')
        });
    }
    
    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
   hideTabContent();
   showTabContent();    

   tabsParent.addEventListener('click', (e) => {
        const t = e.target;
        if(t && t.classList.contains('tabheader__item'))
        {
            tabs.forEach((item, i)=> {
                if(t == item){
                    hideTabContent();
                    showTabContent(i);  
                }
            });
        }
   });
   //Timer
   const deadline = '2023-03-30';

   function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        	if(seconds <= 0)
            {
                return {
                    'total': 0,
                    'days': 0,
                    'hours': 0,
                    'minutes': 0,
                    'seconds': 0
                }
            }
            else
            {
                return {
                    'total': t,
                    'days': days,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds
            }
    
    };
   }
   
   function getZero(num){
        if(num >= 0 && num < 10)
        {
            return `0${num}`;
        } 
        else
        {
            return num;
        }
   }

   function setClock(selector, endtime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); 

        function updateClock(){
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
   }
   setClock('.timer', deadline);

   const modalTrigger = document.querySelectorAll('[data-modal]'),
         modal = document.querySelector('.modal'),
         modalCloseBtn = document.querySelectorAll('[data-close]');    

    modalTrigger.forEach(btn =>{
        btn. addEventListener('click', openModal); 
    });   
    
    modalCloseBtn.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            closeModal();            
        });
    });   
    

    modal.addEventListener('click', (e) => {
        if(e.target === modal)
        {
            closeModal();
        }
    }); 

    document.addEventListener('keydown', (e) =>{
        if(e.code === "Escape" && modal.classList.contains('show'))
        {
            closeModal();
        }
    });

    function openModal()
    {
        modal.classList.add('show');
        modal.classList.remove('hide'); 
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal()
    {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    const modalTimerId = setTimeout(openModal, 3000);

    function showModelByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)
        {
            openModal();
            window.removeEventListener('scroll', showModelByScroll);
        }
    }

    window.addEventListener('scroll', showModelByScroll);

    //Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent= document.querySelector(parentSelector);
            this.transfer = 70; 
            this.changeToRUB();
        }
        changeToRUB(){
            this.price = this.price * this.transfer; 
        }
        render(){
            const element = document.createElement('div');
            element.innerHTML = `<div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб./день</div>
            </div>
        </div>`;

        this.parent.append(element);
        }
    }
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

});

