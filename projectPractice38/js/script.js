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
         modal = document.querySelector('.modal');
        

    modalTrigger.forEach(btn =>{
        btn. addEventListener('click', openModal); 
    });   
            
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close')== '')
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
    const modalTimerId = setTimeout(openModal, 50000);

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
        constructor(src, alt, title, description, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent= document.querySelector(parentSelector);
            this.transfer = 70; 
            this.changeToRUB();
        }
        changeToRUB(){
            this.price = this.price * this.transfer; 
        }
        render(){
            const element = document.createElement('div');            

            if(this.classes.length ===0)
            {
                this.element = 'menu__item';
                element.classList.add(this.element);
            }
            else
            {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб./день</div>
            </div>
            `;

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
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        7,
        '.menu .container'
    ).render();
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        13,
        '.menu .container'
    ).render();

    //Forms

    const forms = document.querySelectorAll('form');

    const message =  {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо. Скоро мы вам ответим!',
        fail: 'Что-то поошло не так'
    };


    forms.forEach(item => {
        postData(item);
    });

    function postData(form){
        form.addEventListener('submit', (e)=>{
             e.preventDefault();

             const statusMessage = document.createElement('img');
             statusMessage.src = message.loading;
             statusMessage.style.cssText= `
             display: block;
             margin: 0 auto;
             `;
             //form.append(statusMessage);
             form.insertAdjacentElement('afterend', statusMessage);

             const req = new XMLHttpRequest();
             req.open('POST', 'js/server.php');

             req.setRequestHeader('Content-type', 'application/json');
             const formData = new FormData(form);

             const object = {};
             formData.forEach(function(value, key){
                object[key] = value;
             });

             const json = JSON.stringify(object);

             req.send(json);
             req.addEventListener('load', () => {
                if(req.status === 200)
                {
                    console.log(req.response);
                    showThanksModal(message.success);
                    form.reset();
                    setTimeout(()=> {
                        statusMessage.remove();
                    }, 2000);
                }
                else
                {
                    showThanksModal(message.fail);
                }
             });
        });
    }

    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                 <div class="modal__close" data-close>&times;</div>
                 <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

});

