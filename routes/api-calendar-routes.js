import express from 'express';

// Подключение контроллеров
import {
    getCalendar,
    addVks,
    removeVks,
    editVks
} from '../controllers/api-calendar-controller.js';

export const router = express.Router(); // Создаем экземпляр роутера

// Возвращаем на клиент календарь
router.get('/api/v1/getCalendar', getCalendar);

// Метод записывает в БД новое мероприятие
router.post('/api/v1/calendar/add/:year/:month/:day', addVks);

// Метод удаляет из БД мероприятие
router.delete('/api/v1/calendar/remove/:year/:month/:day/:id', removeVks);

// // Возвращаем на клиент все апликейшены из контроллера
// router.get('/api/allapplications', getAllApplications);
//
// // Передаем апликейшен в контроллер для его записи в БД
// router.post('/api/application', postApplication);
//
// // Изменяем в апликейшене флаг isComplete в БД
// router.patch('/api/application/:id', updateApplication);
//
// // Передаем апликейшен в контроллер для уго удаления из БД
// router.delete('/api/application/:id', deleteApplication);