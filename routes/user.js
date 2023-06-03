const express = require("express");
const { getAllUsers, createUser, updateUser, deleteUser } = require('../service/userService');
const router = express.Router();
const auth = require("../middleware/auth");
const { UserSchema } = require('../schemas/user');

router.get("/users", auth, async(req,res) => {

  try {
    const users = await getAllUsers();
    res.json({ users });
  } catch (error) {
    console.log("Unable to list users!!");
    res.status(404).send();
  }

});

router.post("/user", async(req,res) => {
  
  try {
    const userBody = UserSchema.parse(req.body);
    
    const newUser = await createUser(userBody);
    res.json(newUser);
  } catch (err) {
    console.log("Unable to register user!!");
    res.status(404).json(err);
  }

});

router.put("/user/:id", async(req,res) => {
  const userId = Number(req.params.id);

  try {
    const userBody = UserSchema.parse(req.body);

    const updatedUser = await updateUser(userId, userBody);
    res.json(updatedUser);
  } catch (err) {
    console.log("Unable to update this user!!");
    res.status(404).send();
  }

});

router.delete("/user/:id", async(req,res) => {
  const userId = Number(req.params.id);

  try {
    const deletedUser = await deleteUser(userId);
    res.json(deletedUser); 
  } catch (err) {
    console.log("Unable to delete this user!!");
    res.status(404).send();
  }
});

module.exports = router;