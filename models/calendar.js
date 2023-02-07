// 1. Подключаем мангус
// 2. Создаем конструктор схемы из объекта мангус
// 3. Создаем объект схемы с помощью конструктора схемы
// 4. Создаем модель на основе объекта схемы

// Достаем конструктор схемы из монгуса
import mongoose from "mongoose";

const Schema = mongoose.Schema;

//Создаем объект схемы конструктором Schema из монгуса
const calendarSchema = new Schema({
        data: {
            type: Object
        }
    }
);

// Создаем модель. Принимаем имя модели, объект схемы и имя коллекции (с этим именем будет создана коллекция в БД)
export const Calendar = mongoose.model('Calendar', calendarSchema, 'calendar');