// 1. Подключаем мангус
// 2. Создаем конструктор схемы из объекта мангус
// 3. Создаем объект схемы с помощью конструктора схемы
// 4. Создаем модель на основе объекта схемы

// Достаем конструктор схемы из монгуса
import mongoose from "mongoose";

const Schema = mongoose.Schema;

//Создаем объект схемы конструктором Schema из монгуса
const calendarSchema = new Schema({
        type: Object,
});

const monthSchema = new Schema({
   type: Object,
});

const daySchema = new Schema({
    type: Array,
});
