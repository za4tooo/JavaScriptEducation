//const result = confirm('Are you here?');
//console.log(result);



let personalMovieDB = {
    filmCount: 0,
    lastFilmCount: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: ()=>{
       
        while(true)
        {    
            personalMovieDB.filmCount = prompt('Сколько фильмов вы уже посмотрели', '');
            if(personalMovieDB.filmCount != '' && personalMovieDB.filmCount !== null) break;    
        }
    },
    lastFilmSurvey: ()=>{
        while (personalMovieDB.lastFilmCount < 3)
        {
            let lastFilm = prompt('Последний фильм', '');
            
            if(lastFilm.length < 50 && lastFilm != '' && lastFilm != null)
            {
                personalMovieDB.lastFilmCount++;
                let grade = prompt('Его оценка', '5.0');
                personalMovieDB.movies[lastFilm] = grade;
            }
            else
            {
                alert('Ошибка ввода. Ещё раз.');
            }
        } 
    },
    areYouMovieFan: (filmCount)=> {
        switch(true){
            case filmCount < 10: 
                alert('Мало');
                break;
            case filmCount > 10 && filmCount < 30:
                alert('Норм пацан, жи есть');
                break;
            case filmCount > 30: 
                alert('Киноман');
                break;
        }
    },
    writeYourGenres: ()=>{
        let i = 1;
        while(i < 4)
        {
            let genr = prompt(`Ваш любимый жанр под номером ${i}`, '');
            if(genr.length < 50 && genr != '' && genr != null)
            {
                personalMovieDB.genres[i-1] = genr;
                i++;
            }
            else
            {
                alert("Ошибка ввода жанра. Попробуйте ещё раз");
            }
        }
        i = 1;
        personalMovieDB.genres.forEach(element => {
            console.log(`Любимый жанр #${i} - это ${element}`);
            i++;
        });
    },
    showMyDB: (personalMovieDB)=>{
        if(personalMovieDB.privat == false)
        {
            str = JSON.stringify(personalMovieDB);
            console.log(str);
        }
        else
        {
            console.log('Нет доступа к объекту');
        }
    },
    toggleVisibleDB: ()=>{
        if(personalMovieDB.privat == true)
            personalMovieDB.privat = false;
        else    
            personalMovieDB.privat = true;
    }
};


personalMovieDB.start();
personalMovieDB.areYouMovieFan(personalMovieDB.filmCount);
personalMovieDB.writeYourGenres();
personalMovieDB.lastFilmSurvey();
personalMovieDB.showMyDB(personalMovieDB);


