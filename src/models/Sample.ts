import * as mongoose from "mongoose";

// student schema
const SampleSchema = new mongoose.Schema({
  test: String
});

// declare model
mongoose.model("Sample", SampleSchema);
