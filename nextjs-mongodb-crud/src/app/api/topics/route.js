import { NextResponse } from "next/server";
import connectDB from "../../../lib/connectDB"
import Topic from "../../../models/topic";

export async function GET(req) {
    try {
        await connectDB();
        const allTopics = await Topic.find();

        return NextResponse.json({ topics: allTopics }, { status: 200 });
    } catch (error) {
        console.error("Error fetching topics:", error);
        return NextResponse.error({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        // Parse request body
        const body = await req.json();

        // Check if required fields are present
        if (!body.title || !body.description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Connect to MongoDB
        await connectDB();

        // Create a new topic
        const result = await Topic.create({
            title: body.title,
            description: body.description
        });

        // Return success response
        return NextResponse.json({ result }, { status: 201 });
    } catch (error) {
        console.error("Error:", error.message);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}


export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "ID parameter is missing" }, { status: 400 });
        }
        
        await connectDB();
        const deletedTopic = await Topic.findByIdAndDelete(id);
        
        if (!deletedTopic) {
            return NextResponse.json({ error: "Topic not found" }, { status: 404 });
        }
        
        return NextResponse.json({ message: "Topic Deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting topic:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


