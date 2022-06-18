const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        createdAt: {
            type: Date,
            default: Date.now
        },

        username: {
            type: String,
            required: true
        },

        reactionbody: {
            type: String,
            maxlength:280,
            required: true
        }
    },

    {
        toJSON: {
            getters: true
        },

        id: false,
    }
);
