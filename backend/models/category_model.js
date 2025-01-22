const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    slug: {
        type: String,
        unique: true
    }
});

// Function to replace Turkish characters with ASCII equivalents
const convertToSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/ /g, "-")   // Replace spaces with hyphens
        .replace(/[^\w-]+/g, ""); // Remove special characters
};

// Function to generate a unique slug
categorySchema.pre("save", async function (next) {
    if (!this.isModified("title")) {
        return next(); // Skip slug generation if title hasn't changed
    }

    let baseSlug = convertToSlug(this.title); // Convert title to slug format
    let uniqueSlug = baseSlug;
    let count = 1;

    // Check if the slug already exists
    while (await mongoose.model("Category").exists({ slug: uniqueSlug })) {
        uniqueSlug = `${baseSlug}-${count}`;
        count++;
    }

    this.slug = uniqueSlug;
    next();
});

// Ensure slug is updated if title is changed after document is created
categorySchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    if (update.title) {
        let baseSlug = convertToSlug(update.title);
        let uniqueSlug = baseSlug;
        let count = 1;

        // Check if the slug already exists
        while (await mongoose.model("Category").exists({ slug: uniqueSlug })) {
            uniqueSlug = `${baseSlug}-${count}`;
            count++;
        }

        // Update slug with the newly generated unique slug
        update.slug = uniqueSlug;
    }
    next();
});


module.exports = mongoose.model("Category", categorySchema);
