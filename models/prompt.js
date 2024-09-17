import {Schema, model, models} from 'mongoose';

const promptSchema = new Schema({
    prompt: {
        type: String,
        required: [true, 'Prompt is required'],
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    tag: {
        type: String,
        required: [true, 'Tag is required'],
    },
});

const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt;
