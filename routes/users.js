const express = require("express");
const { getAllUsers, createUser, updateUser, deleteUser } = require('../service/userService');
const router = express.Router();
const auth = require("../middleware/auth")

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
    const newUser = await createUser(req.body);
    res.json(newUser);
  } catch (error) {
    console.log("Unable to register user!!");
    res.status(404).send();
  }

});

router.put("/user/:id", async(req,res) => {
  const userId = Number(req.params.id);

  try {
    const updatedUser = await updateUser(userId,req.body);
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