const Registration = require("../models/registrationModel");
const Event = require("../models/eventModel");

// @desc    Register current user for an event
// @route   POST /api/events/:eventId/register
// @access  Private
exports.registerForEvent = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user._id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // The unique index in the model already prevents duplicates,
    // but this provides a clearer error message.
    const existingRegistration = await Registration.findOne({
      event: eventId,
      user: userId,
    });
    if (existingRegistration) {
      return res
        .status(400)
        .json({ message: "You are already registered for this event" });
    }

    const registration = await Registration.create({
      event: eventId,
      user: userId,
    });

    res.status(201).json(registration);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

// @desc    Get all registrations for the logged-in user
// @route   GET /api/registrations/my
// @access  Private
exports.getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      user: req.user._id,
    }).populate("event", "title date location"); // Populate event details

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Cancel a registration
// @route   DELETE /api/registrations/:id
// @access  Private
exports.cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // Check if the logged-in user is the owner of the registration
    if (registration.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to cancel this registration" });
    }

    await registration.deleteOne();
    res.json({ message: "Registration cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
