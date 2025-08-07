const express = require("express");
const router = express.Router();
const {
  registerForEvent,
  getMyRegistrations,
  cancelRegistration,
} = require("../controllers/registrationController");
const { protect } = require("../middleware/authMiddleware");

// Note: The route to register is structured under events for clarity
// but managed by the registration controller.
router.post("/events/:eventId/register", protect, registerForEvent);

// Route to get a user's own registrations
router.get("/my", protect, getMyRegistrations);

// Route to cancel a specific registration by its ID
router.delete("/:id", protect, cancelRegistration);

module.exports = router;
