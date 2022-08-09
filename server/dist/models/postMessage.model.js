const mongoose = require('./index.ts');
const postSchema = new mongoose.Schema({
    creator: String,
    title: String,
    message: String,
    tag: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    comments: [
        {
            id: String,
            comment: String,
            userId: String,
        }
    ]
}, { timestamps: true });
module.exports = mongoose.model('Post', postSchema);
//# sourceMappingURL=postMessage.model.js.map