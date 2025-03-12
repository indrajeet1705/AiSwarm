import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  task: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String } // Use "image" instead of "photo"
});

const Agent = mongoose.model("Agent", AgentSchema);
export default Agent;
