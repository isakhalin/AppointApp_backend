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

export const addVKS = async (req, res) => {
    let vks = req.body;
    console.log('vks', vks)
    let getCalendarAndReplace = async (vks)=> {
        const searchElement = await Calendar.find();
        const nativeObject = searchElement[0].toObject();
        nativeObject['2023']['2']['1'].push(vks)
        console.log('nativeObject',nativeObject)
        const test = await Calendar.findOne({_id:nativeObject._id})
        console.log('test', test)
        // return nativeObject
        return await Calendar.findOneAndReplace({}, {test:test}, {new:true})
        // return Calendar.findOneAndReplace({_id:nativeObject._id}, {test:'test'}, {new:true})
    }
    let calendar = await getCalendarAndReplace(vks)
    console.log('calendar',calendar)
            res.status(200).json(calendar);

    // Calendar
    //     .findByIdAndUpdate("63c7a79439a36df3e33b5f8f", (vks)=>{
    //
    //     }, {new: true})
    //     .then(async (calendar) => {
    //         let tempCalendar = calendar.toObject();
    //         let vks = req.body;
    //         tempCalendar['2023']['2']['1'].push(vks)
    //         console.log(tempCalendar)
    //         // calendar = tempCalendar;
    //         // calendar = await calendar.save()
    //         // calendar[0]['2023']['2']['1'].push(vks);
    //         // calendar[0].toObject()['2023']['2']['1'].push(vks);
    //         // calendar = await calendar.save();
    //         res.status(200).json(tempCalendar);
    //     })
    //     .catch((error) => handleError(res, error))
}
