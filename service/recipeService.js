const prisma = require("../db/prisma");

const getAllRecipesByUser = (userId) => {
  return prisma.recipe.findMany({
    where: { userId }
  });
}

const createRecipe = ({ name, description, preparationTime }, userId) => {
  return prisma.recipe.create({
    data: {
      name,
      description,
      preparationTime,
      userId,
    }
  });
}

const updateUserRecipe = async(recipeId, { name, description, preparationTime }, userId) => {
  const id = Number(recipeId);

  const recipe = await prisma.recipe.findUnique({
    where: { id },
    select: { userId: true }
  });

  if (!recipe) throw new Error("Recipe Not Found");
  if (recipe.userId !== userId) throw new Error("Not Authorized");

  return prisma.recipe.update({
    where: { id },
    data: { 
      name,
      description,
      preparationTime
    }
  });

}

const deleteUserRecipe = async(recipeId, userId) => {
  const id = Number(recipeId);

  const recipe = await prisma.recipe.findUnique({
    where: { id },
    select: { userId: true }
  });

  if (!recipe) throw new Error("Recipe Not Found");
  if (recipe.userId !== userId) throw new Error("Not Authorized");

  return prisma.recipe.delete({
    where: { id }
  });
}

module.exports = {
  getAllRecipesByUser,
  createRecipe,
  updateUserRecipe,
  deleteUserRecipe,
}