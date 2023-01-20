// В контроллер подключаем модели
import {Calendar} from "../models/calendar.js";

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
            res.status(200).json(calendar)
        })
        .catch((error) => handleError(res, error))
};
