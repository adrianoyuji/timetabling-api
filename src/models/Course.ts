import mongoose, { Document, Schema } from "mongoose";

interface Periods {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
}

interface Subject {
  subject_id: string;
  name: string;
  type: string;
  workload: number;
  active: boolean;
  semester: number;
}

interface ICourse extends Document {
  name: string;
  tag: string;
  periods: Periods;
  semesters: number;
  subjects: Array<Subject>;
  user_id: string;
}

const CourseSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    tag: { type: String, required: true },
    periods: {
      morning: { type: Boolean, required: true },
      afternoon: { type: Boolean, required: true },
      evening: { type: Boolean, required: true },
    },
    semesters: { type: Number, required: true },
    subjects: { type: Array },
    user_id: { type: String, required: true },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.models.Course ||
  mongoose.model<ICourse>("Course", CourseSchema);
