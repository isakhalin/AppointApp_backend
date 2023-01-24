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
            res.status(200).json(calendar[0].data)
        })
        .catch((error) => handleError(res, error))
};

export const addVKS = async (req, res) => {
    let vks = req.body;
    let year = req.params.year
    let month = req.params.month
    let day = req.params.day
    console.log('vks', vks)
    // let getCalendarAndReplace = async (vks)=> {
    //     const searchElement = await Calendar.find();
    //     const nativeObject = searchElement[0].toObject();
    //     nativeObject['2023']['2']['1'].push(vks)
    //     console.log('nativeObject',nativeObject)
    //     const test = await Calendar.findOne({_id:nativeObject._id})
    //     console.log('test', test)
    //     // return nativeObject
    //     return await Calendar.create(vks)
    //     // return await Calendar.findOneAndReplace({}, {test:test}, {new:true})
    //     // return Calendar.findOneAndReplace({_id:nativeObject._id}, {test:'test'}, {new:true})
    // }
    // let calendar = await getCalendarAndReplace(vks)
    // console.log('calendar',calendar)
    //         res.status(200).json(calendar);

    Calendar
        .findOne({})
        .then(async (calendar) => {
            let tempCalendar = calendar.toObject().data;
            // let vks = req.body;
            tempCalendar[year][month][day].push(vks)
            calendar.data = tempCalendar;
            await calendar.save();
            res.status(200).json(calendar);
        })
        .catch((error) => handleError(res, error));
}

export const removeVKS = async (req, res) => {
    let vks = req.body;
    let year = req.params.year
    let month = req.params.month
    let day = req.params.day
    console.log('vks', vks)
    Calendar
        .findOne({})
        .then(async (calendar) => {
            let tempCalendar = calendar.toObject().data;
            // let vks = req.body;
            tempCalendar[year][month][day].push(vks)
            calendar.data = tempCalendar;
            await calendar.save();
            res.status(200).json(calendar);
        })
        .catch((error) => handleError(res, error));
}
