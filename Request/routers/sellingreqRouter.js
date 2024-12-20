const express = require("express");
const router = express.Router();
const {
  Create,
  ReadAll,
  ReadOne,
  Update,
  Delete,
  GetPendingRequests,
  AcceptRequest,
} = require("../controllers/sellingrequest");
const { protectAgent } = require("../../middleware/authorization");

router.post("/", Create); // Protecting the Create route
router.get("/Pending", GetPendingRequests); // Protecting the Create route
router.get("/", ReadAll);
router.get("/:id", ReadOne);
router.post("/AcceptRequest/:id", protectAgent, AcceptRequest); // Protecting the Create route

router.patch("/:id", Update);
router.delete("/:id", Delete);

module.exports = router;
