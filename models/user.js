import {Schema, model, models} from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already registered'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username is already taken'],
        match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],
    },
    image: {
        type: String,
        default: '/assets/images/default-profile.jpg',
    },
});

const User = models.User || model('User', userSchema);

export default User;
