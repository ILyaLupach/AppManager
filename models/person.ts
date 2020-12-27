import mongoose, { Document } from "mongoose";
import { PersonType } from '../types';
const Schema = mongoose.Schema;

const personSchema = new Schema({
	name: String,
	surname: String,
	phone: String,
	position: String,
	avatar: { type: String, default: '' },
});

const person = mongoose.model<PersonType & Document>("person", personSchema);

export default person
