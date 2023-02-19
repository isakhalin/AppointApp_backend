import express from 'express';

// Подключение контроллеров
import {
    getCalendar,
    addEvent,
    removeEvent,
    editEvent
} from '../controllers';

export const router = express.Router(); // Создаем экземпляр роутера

// Возвращаем на клиент календарь
router.get('/api/v1/getCalendar', getCalendar);

// Метод записывает в БД новое мероприятие
router.post('/api/v1/calendar/add/:year/:month/:day', addEvent);

// Метод удаляет из БД мероприятие
router.delete('/api/v1/calendar/remove/:year/:month/:day/:id', removeEvent);

// Метод изменяет мероприятие в БД
router.put('/api/v1/calendar/edit/:year/:month/:day', editEvent);