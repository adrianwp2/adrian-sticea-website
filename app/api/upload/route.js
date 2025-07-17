import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { auth } from '../../../auth.js';

// Configure multer for file upload
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadDir = path.join(process.cwd(), 'public', 'images');
            // Create directory if it doesn't exist
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            // Generate unique filename
            const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
            cb(null, uniqueName);
        }
    }),
    fileFilter: (req, file, cb) => {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPG, PNG, and WebP images are allowed.'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    }
});

// Helper function to run multer
const runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};

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
        const type = formData.get('type'); // 'featured' or 'gallery'
        const projectId = formData.get('projectId');

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        if (!type || !['featured', 'gallery'].includes(type)) {
            return NextResponse.json({ error: 'Invalid upload type' }, { status: 400 });
        }

        if (!projectId) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
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

// Handle OPTIONS request for CORS
export async function OPTIONS() {
    return new NextResponse(null, { status: 200 });
}
