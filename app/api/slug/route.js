import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Project from "../../../models/Projects";

export async function POST(request) {
    try {
        // Ensure mongoose is connected
        if (!mongoose.connection.readyState) {
            mongoose.connect(process.env.MONGODB_URI, {
                dbName: process.env.MONGODB_DB || "adrian-site",
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
        
        const { title, currentSlug, projectId } = await request.json();
        
        if (!title) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }

        // Generate base slug from title
        let baseSlug = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/-+/g, "-") // Replace multiple hyphens with single
            .trim("-"); // Remove leading/trailing hyphens

        // If no base slug generated, use a default
        if (!baseSlug) {
            baseSlug = "project";
        }

        // Check if the base slug already exists
        let slug = baseSlug;
        let counter = 1;
        
        // Build query to exclude current project if editing
        const query = { slug: slug };
        if (projectId) {
            query._id = { $ne: projectId };
        }

        // Keep checking until we find a unique slug
        while (await Project.findOne(query)) {
            slug = `${baseSlug}-${counter}`;
            query.slug = slug;
            counter++;
        }

        // If we're checking for a specific slug (manual edit), also check if it's unique
        if (currentSlug && currentSlug !== slug) {
            const existingProject = await Project.findOne({ 
                slug: currentSlug,
                ...(projectId && { _id: { $ne: projectId } })
            });
            if (existingProject) {
                // The manually entered slug already exists, generate a unique one
                let manualSlug = currentSlug;
                let manualCounter = 1;
                while (await Project.findOne({ 
                    slug: manualSlug,
                    ...(projectId && { _id: { $ne: projectId } })
                })) {
                    manualSlug = `${currentSlug}-${manualCounter}`;
                    manualCounter++;
                }
                slug = manualSlug;
            } else {
                slug = currentSlug;
            }
        }

        return NextResponse.json({ slug });
    } catch (error) {
        console.error("Slug generation error:", error);
        return NextResponse.json(
            { error: "Failed to generate slug" },
            { status: 500 }
        );
    }
} 