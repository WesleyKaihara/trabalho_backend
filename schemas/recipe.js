const z = require("zod");

const RecipeSchema = z.object({
  name: z.string({
    required_error: "Name must be required",
    invalid_type_error: "Name must be a string",
  }),
  description: z.string({
    required_error: "Description must be required",
    invalid_type_error: "Description must be a string",
  }), 
  preparationTime: z.number({
    required_error: "preparationTime must be required",
  }).min(0),
});

module.exports = {
  RecipeSchema
}