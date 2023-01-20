import express from 'express';
import mongoose from 'mongoose';    // Библиотека для взаимодействия с MongoDB
import 'dotenv/config';         // Библиотека для работы с .env (хранение информации о подключении к БД)
import morgan from 'morgan';    // Подключаем библиотеку логгера
import cors from 'cors';        // Модуль для управления разрешениями доступа к бекенду
import {createPath} from "./helpers/create-path.js";

// Роуты
import {router as calendarApiRoutes} from "./routes/api-calendar-routes.js";

// Запуск сервера
const app = express();
app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`Server listening on port ${process.env.PORT}`);
})

// Подключение к MongoDB
mongoose
    .connect(process.env.DB_URL)
    .then((data) => console.log("Connecting to MongoDB successful"))
    .catch((error) => console.log(error));

///// Мидлвар для парсинга входящего запроса из формы (данные в виде строк).
// Используется для получения данных из форм фронта
app.use(express.urlencoded({extended: false}));
app.use(express.json());    // Мидлвар для обработки json
app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); // Логгер. Логирует в консоль
app.use(express.static('build'));   //Каталог, который будет доступным на чтение всем по HTTP.

// Разрешения для CORS-политики
const whitelist = [
    'http://localhost:3000',
    'http://172.16.255.31:3000'
];

app.use(cors({
    credentials: true,
    origin: whitelist
}));

// Подключение модулей с роутами
app.use(calendarApiRoutes);

//// Корневой маршрут. Тут не нужен т.к. експресс по умолчанию отдает index.html из папки 'build'
// app.get('/', (req, res) => {
//     res.sendFile(createPath());
// });

// Обработка неучтенных маршрутов
app.use((req, res) => {
    res.sendFile(createPath()); // Вызываем метод createPath, который возвращает index.html
})