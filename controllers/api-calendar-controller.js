// В контроллер подключаем модели
import {Calendar} from '../models/calendar.js';

/** Обработчик исключений
 * @param res Ссылка на метод отправки ответа клиенту
 * @param error Отправляемая ошибка
 */
const handleError = (res, error) => {
    console.log("HandleError: Something went wrong: ", error);
    res.status(500).json(error.message);
};

// Получаем весь календарь из MongoDB
export const getCalendar = (req, res) => {
    Calendar
        .find()
        .then((calendar) => {
            res.status(200).json(calendar[0].data);
        })
        .catch((error) => handleError(res, error));
};

export const addEvent = (req, res) => {
    const vks = req.body;
    const year = req.params.year;
    const month = req.params.month;
    const day = req.params.day;

    Calendar
        .findOne({})
        .then(async (calendar) => {
            let tempCalendar = calendar.toObject().data;

            if (!tempCalendar[year]) {
                tempCalendar[year] = {};
            }
            if (!tempCalendar[year][month]) {
                tempCalendar[year][month] = {};
            }
            if (!tempCalendar[year][month][day]) {
                tempCalendar[year][month][day] = [];
            }

            tempCalendar[year][month][day].push(vks);
            calendar.data = tempCalendar;
            await calendar.save();
            res.status(200).json(calendar);
        })
        .catch((error) => handleError(res, error));
};

export const removeEvent = (req, res) => {
    const year = req.params.year;
    const month = req.params.month;
    const day = req.params.day;
    const id = req.params.id;

    Calendar
        .findOne({})
        .then(async (calendar) => {
            let tempCalendar = calendar.toObject().data;
            tempCalendar[year][month][day] = tempCalendar[year][month][day].filter((el) => el.id !== id);
            calendar.data = tempCalendar;
            await calendar.save();
            res.status(200).json(calendar);
        })
        .catch((error) => handleError(res, error));
};

export const editEvent = (req, res) => {
    const event = req.body;
    const year = req.params.year;
    const month = req.params.month;
    const day = req.params.day;

    Calendar
        .findOne({})
        .then(async (calendar) => {
            let tempCalendar = calendar.toObject().data;
            tempCalendar[year][month][day] = tempCalendar[year][month][day].map((el) => {
                if (el.id !== event.id) {
                    return el;
                } else {
                    return event;
                }
            })
            calendar.data = tempCalendar;
            await calendar.save();
            res.status(200).json(calendar);
        })
        .catch((error) => handleError(res, error));
};