import mongoose from 'mongoose';

// describes the properties needed
// to create a new User.
interface UserAttrs {
  email: string;
  password: string;
}

// describes the properties
// that a user model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): any;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Add custom method build to schema
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<any, UserModel>('User', userSchema);

export { User };
