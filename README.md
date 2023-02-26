<h3 align="center">Movies Explorer</h3>

---

<p align="center"> <i>Movies Explorer Api</i> – дипломный проект по курсу веб-разработки образовательной платформы Яндекс Практикума.
    <br>
    В этом проекте создавалось API для для приложения Movies Explorer. Проект представляет собой сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.
</p>

## Стек

* Node.js
* Express.js
* MongoDB

### Роуты

* ```POST /signup``` - регистрация
* ```POST /signin``` - авторизация
***
* ```GET /users/me``` - возвращает информацию о пользователе (email и имя)
* ```PATCH /users/me``` - обновляет информацию о пользователе (email и имя)
***
* ```GET /movies``` - возвращает все сохранённые текущим  пользователем фильмы
* ```POST /movies``` - сохраняет фильм
* ```DELETE /movies/:movieId``` - удаляет сохранённый фильм по id

## Ссылка на фронтенд<br>
https://nmovies-films.students.nomoredomainssbs.ru/

## Ссылка на бэкенд<br>
https://api.nmovies-films.students.nomoredomainssbs.ru/

## Ссылка на макет<br>
https://disk.yandex.ru/d/-GHW9zEe6RTAPg
