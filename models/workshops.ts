import mongoose, { Document } from "mongoose";
import { WorkshopsType } from '../types';
const Schema = mongoose.Schema;

const workshopSchema = new Schema({
	name: String,
	object: [String]
})

const workshop = mongoose.model<WorkshopsType & Document>("workshop", workshopSchema);

export default workshop
