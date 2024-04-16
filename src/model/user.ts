import mongoose, { Schema, Document } from "mongoose";


export interface Message extends Document{
    content : String;
    createdAt : Date;
    updatedAt : Date;
}

const MessageSchema:Schema<Message> = new Schema({
    content : {
        type : String,
        required : true,
        default:Date.now
    }
})


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified:boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true,"Username is required"]
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true,"Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true,"Verify Code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true,"Verify Code Expriry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true // Assuming users are accepting messages by default
    },
    messages: [MessageSchema],
    }
);

const MessageModel = mongoose.model<Message>("Message", MessageSchema);
const UserModel = mongoose.model<User>("User", UserSchema);

export { MessageModel, UserModel };
