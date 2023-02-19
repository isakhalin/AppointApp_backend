import express from 'express';
import {
    getCalendar,
    addEvent,
    removeEvent,
    editEvent
} from '../controllers/index.js';

export const router = express.Router();

// Возвращаем на клиент календарь
router.get('/api/v1/getCalendar', getCalendar);

// Метод записывает в БД новое мероприятие
router.post('/api/v1/calendar/add/:year/:month/:day', addEvent);

// Метод удаляет из БД мероприятие
router.delete('/api/v1/calendar/remove/:year/:month/:day/:id', removeEvent);

// Метод изменяет мероприятие в БД
router.put('/api/v1/calendar/edit/:year/:month/:day', editEvent);