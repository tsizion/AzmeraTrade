const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const adminSchema = new mongoose.Schema(
  {
    // Existing fields...
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: [true, "Phone number is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["Super Admin", "Admin"],
      default: "Admin",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// For checking the correctness of the Admin password for logging them in.
adminSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

adminSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  return crypto.createHash("sha256").update(resetToken).digest("hex");
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
