/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const ad = document.querySelectorAll('.promo__adv img'),
    promo = document.querySelector('.promo__bg'),
    genre = promo.querySelector('.promo__genre'),
    add = document.querySelector('.adding__input'),
    btn = document.querySelector('button'),
    checkFavFilm = document.getElementById("add-favorite"),
    promoList = document.querySelector('.promo__interactive-list');
 
ad.forEach(item => {
    item.remove();
});

const addFilm = (e) => {
    e.preventDefault();    
    if(add.value.length > 21){
        
        movieDB.movies.push(add.value.substr(0, 21) + "...");  
    }
    else{
        movieDB.movies.push(add.value);  
    }     
    if (checkFavFilm.checked)
    {
        alert("Фильм добавлен в избранное");
    }    
    recalc();    
    add.value = "";
};

btn.addEventListener('click', addFilm);

const delElem = (e) => {    
    let text = (e.target.parentNode.textContent);    
    
    movieDB.movies.forEach(movie => {
       if(text.indexOf(movie) >= 0)
       {
        //console.log(movieDB.movies.indexOf(movie));
        delete movieDB.movies[movieDB.movies.indexOf(movie)];
       }
    });    
    recalc();
};


function recalc() {
    promoList.innerHTML = "";
    movieDB.movies.sort();
    movieDB.movies.forEach((film, i) =>{
        promoList.innerHTML += `
        <li class="promo__interactive-item">${i+1 + ". " +film}
            <div class="delete"></div>
        </li>
        `;
    });
    const dels = document.querySelectorAll('.delete');
    dels.forEach(del =>{
        del.addEventListener('click', delElem);
    });
}
recalc();

genre.textContent = "Драма";
promo.style.backgroundImage = 'url("img/bg.jpg")';







