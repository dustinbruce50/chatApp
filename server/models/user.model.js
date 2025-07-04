const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type:String, required: true, unique:true},
    password: {type: String, required: true},
});

userSchema.pre('save', async function (next){
    if(this.isModified('password')){
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch(err){
        return next(err);
    }
});


const User = mongoose.model('User', userSchema);
module.exports= User;