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
    updateMany: jest.fn(),
    deleteMany: jest.fn(),
  },
}));

describe("Recipe tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be return all recipes by user successfully", async () => {
    const mockedRecipes = [
      {
        "name": "recipe01",
        "description": "recipe01 description",
        "preparationTime": 1.5,
        "user": {
          "name": "user01",
          "email": "user01@email.com"
        }
      },
      {
        "name": "recipe02",
        "description": "recipe02 description",
        "preparationTime": 2.5,
        "user": {
          "name": "user02",
          "email": "user02@email.com"
        }
      },
    ];

    prisma.recipe.findMany.mockResolvedValue(mockedRecipes);

    const userId = 123;
    const result = await getAllRecipesByUser(userId);

    expect(result).toEqual(mockedRecipes);
    expect(prisma.recipe.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.recipe.findMany).toHaveBeenCalledWith({
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
  
    prisma.recipe.updateMany.mockResolvedValue(updatedRecipe);
  
    const userId = 123;
    const result = await updateUserRecipe(recipeId, updatedRecipe, userId);
  
    delete updatedRecipe.id;
  
    expect(result).toEqual(updatedRecipe);  
    expect(prisma.recipe.updateMany).toHaveBeenCalledTimes(1);
    expect(prisma.recipe.updateMany).toHaveBeenCalledWith({
      where: { id: recipeId, userId },
      data: updatedRecipe
    });
  });

  it("should be deleting recipe successfully", async () => {
    const recipeId = 1;
    const deletedRecipe = { id: recipeId, name: "Recipe" };

    prisma.recipe.deleteMany.mockResolvedValue(deletedRecipe);

    const userId = 123;
    const result = await deleteUserRecipe(recipeId, userId);

    expect(result).toEqual(deletedRecipe);
    expect(prisma.recipe.deleteMany).toHaveBeenCalledTimes(1);
    expect(prisma.recipe.deleteMany).toHaveBeenCalledWith({
      where: { id: recipeId, userId }
    });
  });
  
});
