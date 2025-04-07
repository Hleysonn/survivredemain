import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const discussionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['CATACLYSMES', 'CRISES', 'SURVIE']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  replies: [replySchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware pour générer automatiquement le preview
discussionSchema.pre('save', function(next) {
  if (this.content) {
    this.preview = this.content.substring(0, 150) + (this.content.length > 150 ? '...' : '');
  }
  next();
});

export const Discussion = mongoose.model('Discussion', discussionSchema); 