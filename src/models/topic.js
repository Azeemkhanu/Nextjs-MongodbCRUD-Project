import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
    {
        title : {
            type : String,
            required: true,
            trim: true
        },
        description : {
            type : String,
            required: true,
            trim: true
        }
    },
    {
        timestamps : true
    }

);


const Topic = mongoose.models.Topic || mongoose.model("Topic" , topicSchema);
export default Topic
