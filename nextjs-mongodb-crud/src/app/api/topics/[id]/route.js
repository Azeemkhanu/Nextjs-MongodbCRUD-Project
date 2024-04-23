import { NextResponse } from "next/server";
import connectDB from "../../../../lib/connectDB"
import Topic from "../../../../models/topic";

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const { newTitle: title, newDescription: description } = await req.json();
        
        // Check if required fields are present
        if (!title && !description) {
            return NextResponse.json({ error: "No fields to update" }, { status: 400 });
        }
        
        await connectDB();
        const updatedTopic = await Topic.findByIdAndUpdate(id, { title, description }, { new: true });

        // Check if topic with given ID exists
        if (!updatedTopic) {
            return NextResponse.json({ error: "Topic not found" }, { status: 404 });
        }

        return NextResponse.json({updatedTopic }, { status: 200 });
    } catch (error) {
        console.error("Error updating topic:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req , {params}) {
    const {id} = params;
    await connectDB();
    const topic = await Topic.findOne({_id :id})
    return NextResponse.json({topic}, { status: 200 });
}



