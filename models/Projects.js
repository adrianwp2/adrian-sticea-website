import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: false,
            trim: true,
            maxlength: [100, "Title cannot be more than 100 characters"],
        },
        slug: {
            type: String,
            required: false,
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[a-z0-9-]+$/,
                "Slug can only contain lowercase letters, numbers, and hyphens",
            ],
        },
        content: {
            type: Schema.Types.Mixed,
            required: false,
            minlength: [10, "Content must be at least 10 characters long"],
        },
        featuredImage: {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    if (!v) return true; // Allow empty
                    return /^images\/.+\.(jpg|jpeg|png|webp)$/i.test(v);
                },
                message: "Featured image must be a valid image file in the images directory",
            },
        },
        gallery: [
            {
                type: String,
                trim: true,
                validate: {
                    validator: function (v) {
                        return /^images\/.+\.(jpg|jpeg|png|webp)$/i.test(v);
                    },
                    message: "Gallery images must be valid image files in the images directory",
                },
            },
        ],
        technologies: [
            {
                type: String,
                trim: true,
            },
        ],
        githubUrl: {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    if (!v) return true; // Allow empty
                    return /^https?:\/\/github\.com\/.+/.test(v);
                },
                message: "GitHub URL must be a valid GitHub repository URL",
            },
        },
        liveUrl: {
            type: String,
            trim: true,
            validate: {
                validator: function (v) {
                    if (!v) return true; // Allow empty
                    return /^https?:\/\/.+/.test(v);
                },
                message: "Live URL must be a valid URL",
            },
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
            required: true,
        },
        publishedAt: {
            type: Date,
            default: null,
        },
        completed: {
            type: Boolean,
            default: false,
        }, 
        excerpt: {
            type: String,
            required: false,
            trim: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Indexes for better query performance
projectSchema.index({ status: 1 });
projectSchema.index({ publishedAt: -1 });
projectSchema.index({ createdAt: -1 });

// Virtual for formatted published date
projectSchema.virtual("formattedPublishedAt").get(function () {
    if (!this.publishedAt) return null;
    return this.publishedAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
});


// Pre-save middleware to set publishedAt when status changes to published
projectSchema.pre("save", function (next) {
    if (
        this.isModified("status") &&
        this.status === "published" &&
        !this.publishedAt
    ) {
        this.publishedAt = new Date();
    }
    next();
});

// Static method to find published projects
projectSchema.statics.findPublished = function () {
    return this.find({ status: "published" }).sort({ publishedAt: -1 });
};

// Static method to find projects by technology
projectSchema.statics.findByTechnology = function (technology) {
    return this.find({
        technologies: { $regex: technology, $options: "i" },
        status: "published",
    }).sort({ publishedAt: -1 });
};

// Instance method to publish a project
projectSchema.methods.publish = function () {
    this.status = "published";
    this.publishedAt = new Date();
    return this.save();
};

// Instance method to unpublish a project
projectSchema.methods.unpublish = function () {
    this.status = "draft";
    this.publishedAt = null;
    return this.save();
};

const Project =
    mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
