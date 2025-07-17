import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { auth } from '../../../auth.js';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    try {
        // Check authentication
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const imagesDir = path.join(process.cwd(), 'public', 'images');
        
        // Check if images directory exists
        if (!fs.existsSync(imagesDir)) {
            return NextResponse.json({ images: [] });
        }

        // Read all files from images directory
        const files = fs.readdirSync(imagesDir);
        
        // Filter for image files only
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
        });

        // Create image objects with metadata
        const images = imageFiles.map(file => {
            const filePath = path.join(imagesDir, file);
            const stats = fs.statSync(filePath);
            
            return {
                filename: `images/${file}`,
                name: file,
                size: stats.size,
                created: stats.birthtime,
                modified: stats.mtime
            };
        });

        // Sort by creation date (newest first)
        images.sort((a, b) => new Date(b.created) - new Date(a.created));

        return NextResponse.json({ images });

    } catch (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch images' 
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        // Check authentication
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Parse form data
        const formData = await request.formData();
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ 
                error: 'Invalid file type. Only JPG, PNG, and WebP images are allowed.' 
            }, { status: 400 });
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ 
                error: 'File size too large. Maximum size is 5MB.' 
            }, { status: 400 });
        }

        // Generate unique filename
        const fileExtension = path.extname(file.name);
        const uniqueName = `${uuidv4()}-${Date.now()}${fileExtension}`;
        const relativePath = `images/${uniqueName}`;
        const fullPath = path.join(process.cwd(), 'public', relativePath);

        // Ensure images directory exists
        const imagesDir = path.join(process.cwd(), 'public', 'images');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Write file to disk
        fs.writeFileSync(fullPath, buffer);

        // Return the relative path for database storage
        return NextResponse.json({ 
            filename: relativePath,
            message: 'File uploaded successfully'
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ 
            error: 'Failed to upload file' 
        }, { status: 500 });
    }
} 