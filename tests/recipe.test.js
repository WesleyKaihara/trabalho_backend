const {
  getAllRecipesByUser,
  createRecipe,
  updateUserRecipe,
  deleteUserRecipe
} = require("../service/recipeService");
const prisma = require("../db/prisma.js");

jest.mock("../db/prisma.js", () => ({
  recipe: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Recipe tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be return all recipes by user successfully", async () => {
    const mockedRecipes = [
      { id: 1, name: "Recipe01" },
      { id: 2, name: "Recipe01" },
    ];

    prisma.recipe.findMany.mockResolvedValue(mockedRecipes);

    const userId = 123;
    const result = await getAllRecipesByUser(userId);

    expect(result).toEqual(mockedRecipes);
    expect(prisma.recipe.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.recipe.findMany).toHaveBeenCalledWith({
      where: { userId }
    });
  });

  it("should be created a new recipe successfully", async () => {
    const newRecipe = {
      name: "Recipe",
      description: "Description",
      preparationTime: 30,
    };
    const createdRecipe = { id: 1, ...newRecipe };

    prisma.recipe.create.mockResolvedValue(createdRecipe);

    const userId = 123;
    const result = await createRecipe(newRecipe, userId);

    expect(result).toEqual(createdRecipe);
    expect(prisma.recipe.create).toHaveBeenCalledTimes(1);
    expect(prisma.recipe.create).toHaveBeenCalledWith({
      data: {
        ...newRecipe,
        userId,
      }
    });
  });

  it("should be updating recipe successfully", async () => {
    const recipeId = 1;
    const updatedRecipe = {
      id: recipeId,
      name: "Recipe",
      description: "Description",
      preparationTime: 30,
    };
  
    prisma.recipe.findUnique.mockResolvedValue({ userId: 123 });
    prisma.recipe.update.mockResolvedValue(updatedRecipe);
  
    const userId = 123;
    const result = await updateUserRecipe(recipeId, updatedRecipe, userId);
  
    delete updatedRecipe.id;
  
    expect(result).toEqual(updatedRecipe);
    expect(prisma.recipe.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.recipe.findUnique).toHaveBeenCalledWith({
      where: { id: recipeId },
      select: { userId: true }
    });
  
    expect(prisma.recipe.update).toHaveBeenCalledTimes(1);
    expect(prisma.recipe.update).toHaveBeenCalledWith({
      where: { id: recipeId },
      data: updatedRecipe
    });
  });

  it("should be deleting recipe successfully", async () => {
    const recipeId = 1;
    const deletedRecipe = { id: recipeId, name: "Recipe" };

    prisma.recipe.findUnique.mockResolvedValue({ userId: 123 });
    prisma.recipe.delete.mockResolvedValue(deletedRecipe);

    const userId = 123;
    const result = await deleteUserRecipe(recipeId, userId);

    expect(result).toEqual(deletedRecipe);
    expect(prisma.recipe.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.recipe.findUnique).toHaveBeenCalledWith({
      where: { id: recipeId },
      select: { userId: true }
    });

    expect(prisma.recipe.delete).toHaveBeenCalledTimes(1);
    expect(prisma.recipe.delete).toHaveBeenCalledWith({
      where: { id: recipeId }
    });
  });
  
});
