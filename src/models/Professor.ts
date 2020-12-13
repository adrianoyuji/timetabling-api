import mongoose, { Document, Schema } from "mongoose";

interface Workload extends Document {
  min: number;
  max: number;
}

interface Preferences extends Document {
  subjects: Array<any>;
  schedule: Object;
}

interface IProfessor extends Document {
  name: string;
  email: string;
  code: string;
  workload: Workload;
  preferences: Preferences;
  active: boolean;
  courses: Array<any>;
  user_id: string;
}

const ProfessorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    code: { type: String, required: true },
    workload: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    preferences: {
      subjects: { type: Array },
      schedule: { type: Object },
    },
    active: { type: Boolean, required: true },
    courses: { type: Array },
    user_id: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Professor ||
  mongoose.model<IProfessor>("Professor", ProfessorSchema);
