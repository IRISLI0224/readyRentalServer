const bcrypt = require('bcryptjs');
// 加密
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});
//DELETE PASSWORD
userSchema.methods.toJSON = function () {

    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

//module.exports = mongoose.model('User', userSchema);