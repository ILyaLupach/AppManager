import mongoose, { Document } from "mongoose";
import { TasksType } from '../types';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	name: { type: [String], required: true },
	date: { type: Date, default: Date.now },
	start: Date,
	finish: Date,
	position: { type: String, required: true },
	object: { type: String, required: true },
	failure: { type: String, required: true },
	fix: { type: String, required: true },
	mark: Boolean,
	files: { type: Schema.Types.Mixed, default: [] },
})

const tasks = mongoose.model<TasksType & Document>("tasks", taskSchema);

export default tasks
