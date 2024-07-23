import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    profilePicture: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1434117817/vector/account-avatar-pixel-perfect-flat-gradient-two-color-ui-icon.jpg?s=612x612&w=0&k=20&c=16IxOGq5lWf-nOO2_qabzd-CyXeu57nNoRjt8AZBkB0=",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
