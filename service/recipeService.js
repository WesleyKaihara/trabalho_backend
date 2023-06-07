const prisma = require("../db/prisma");

const getAllRecipesByUser = (userId) => {
  return prisma.recipe.findMany({
    where: { userId },
    select: {
      name: true,
      description: true,
      preparationTime: true,
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
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

  return prisma.recipe.updateMany({
    where: { 
      id,
      userId
    },
    data: { 
      name,
      description,
      preparationTime
    }
  });

}

const deleteUserRecipe = async(recipeId, userId) => {
  const id = Number(recipeId);

  return prisma.recipe.deleteMany({
    where: { id, userId }
  });
}

module.exports = {
  getAllRecipesByUser,
  createRecipe,
  updateUserRecipe,
  deleteUserRecipe,
}