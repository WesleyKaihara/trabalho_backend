const z = require("zod");

const UserSchema = z.object({
  name: z.string({
    required_error: "Name must be required",
    invalid_type_error: "Name must be a string",
  })
    .min(3),
  email: z.string({
    required_error: "Description must be required",
    invalid_type_error: "Description must be a string",
  })
    .email("This is not a valid email."), 
  password: z.string({
    required_error: "Password must be required",
    invalid_type_error: "Password must be a string",
  })
    .min(8, "Must be at least 8 characters in length")
    .regex(new RegExp('.*[A-Z].*'), "One uppercase character")
    .regex(new RegExp('.*[a-z].*'), "One lowercase character")
    .regex(new RegExp('.*[0-9].*'), "One number")
    .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), "One special character"),
});

module.exports = {
  UserSchema
}