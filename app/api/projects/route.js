import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Project from "@/models/Projects";
import { auth } from "@/auth";

// Ensure mongoose is connected
if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: process.env.MONGODB_DB || "adrian-site",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export async function GET(request ) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");
        let filter = {};
        if (status) {
            filter.status = status;
        }
        const projects = await Project.find(filter).sort({ createdAt: -1 });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(req) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const data = await req.json();

        // Create new project logic 
        if (Object.keys(data).length === 1 && data.status === "draft") {
            const project = new Project({
                status: "draft"
            });
            await project.save();
            return NextResponse.json(project, { status: 201 });
        }

        const {
            title,
            slug,
            content,
            technologies = "",
            githubUrl = "",
            liveUrl = "",
            status = "draft",
        } = data;
        const techArray = typeof technologies === "string"
            ? technologies.split(",").map(t => t.trim()).filter(Boolean)
            : Array.isArray(technologies) ? technologies : [];
        const project = new Project({
            title,
            slug,
            content,
            technologies: techArray,
            githubUrl,
            liveUrl,
            status,
        });
        await project.save();
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message || "Failed to create project" }, { status: 400 });
    }
} 