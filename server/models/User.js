import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            min: 2,
            max: 50,
        },

        lastName:{
            type: String,
            required: true,
            min: 2,
            max: 50,
        },

        email:{
            type: String,
            required: true,
            max: 50,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },
        picturePath:{
            type: String,
            default:""
        },

        friends:{
            type: Array,
            default: [],
        },

        location:{
            type: String,
        },

        occupation:{
            type: String,
        },

        viewedProfile:{
            type: Number,
        },

        jwt:{
           type: String,
        },
        
        impressions:{
            type: Number,
        },

    },{
        timestamps: true
    }
)

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.matchPassword = async function (pass) {
    return bcrypt.compare(pass, this.password);
}

const User = mongoose.model("User", UserSchema);
export default User;