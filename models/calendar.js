import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
    data: {
      type: Object
    }
  }
);

export const Calendar = mongoose.model('Calendar', calendarSchema, 'calendar');