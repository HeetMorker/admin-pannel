const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({ 
    name: { 
        type: String, 
        required: true
    }, 
    email: { 
        type: String, 
        required: true,
        unique: true
    }, 
    password: { 
        type: String, 
        required: true
    }, 
    profilePic: String,
    country: String,
    languages: String, 
    hobbies: [String],
    tech: [String],
    dob: Date,
    bio: String, 
    gender: String, 
    plan: String,
    sendEmails: Boolean,
    agreeTerms: { 
        type: Boolean, 
        required: true 
    } 
});

module.exports = mongoose.model('User', UserSchema);
