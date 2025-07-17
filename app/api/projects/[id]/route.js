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

// GET - Fetch a single project by ID
export async function GET(req, { params }) {
    try {
        const { id } = params;
        const project = await Project.findById(id);
        
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
    }
}

// PUT - Update a project
export async function PUT(req, { params }) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = params;
        const data = await req.json();
        
        const {
            title,
            slug,
            content,
            technologies = "",
            githubUrl = "",
            liveUrl = "",
            status = "draft",
            completed = false,
            excerpt = "",
        } = data;

        const techArray = typeof technologies === "string"
            ? technologies.split(",").map(t => t.trim()).filter(Boolean)
            : Array.isArray(technologies) ? technologies : [];

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {
                title,
                slug,
                content,
                technologies: techArray,
                githubUrl,
                liveUrl,
                status,
                completed,
                excerpt,
            },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json(updatedProject);
    } catch (error) {
        return NextResponse.json({ error: error.message || "Failed to update project" }, { status: 400 });
    }
}

// DELETE - Delete a project
export async function DELETE(req, { params }) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = params;
        const deletedProject = await Project.findByIdAndDelete(id);
        
        if (!deletedProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Project deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
} 