import express from "express";
const router = express.Router();
import user from './user.route';


router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

module.exports = router;
