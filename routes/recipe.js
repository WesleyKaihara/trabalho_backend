const express = require("express");
const router = express.Router();

const { getAllRecipesByUser, createRecipe, updateUserRecipe, deleteUserRecipe } = require('../service/recipeService');
const auth = require("../middleware/auth");

router.get("/recipes", auth, async(req,res) => {
  const userId = Number(req.user.id);

  try {
    const recipes = await getAllRecipesByUser(userId);
    res.json({ recipes })
  } catch (error) {
    console.log(err)
    res.status(404).json({ message: err.message });
  }

});

router.post("/recipe", auth, async(req,res) => {
  const userId = Number(req.user.id);

  try {
    const newRecipe = await createRecipe(req.body, userId)
    res.json(newRecipe)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: err.message });
  }

});

router.put("/recipe/:id", auth, async(req,res) => {
  const id = Number(req.params.id);
  const userId = Number(req.user.id);

  try {
    const updatedRecipe = await updateUserRecipe(id, req.body, userId);
    res.json(updatedRecipe)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: err.message });
  }

});

router.delete("/recipe/:id", auth, async(req,res) => {
  const id = Number(req.params.id);
  const userId = Number(req.user.id);
  
  try {
    const deletedRecipe = await deleteUserRecipe(id, userId);
    res.send(deletedRecipe)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: err.message });
  }

});

module.exports = router;
