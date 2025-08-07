const Event = require("../models/eventModel");

// @desc    Fetch all events
// @route   GET /api/events
// @access  Public
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).populate("organizer", "name email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Fetch single event by ID
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "organizer",
      "name email"
    );
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
exports.createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;

  const event = new Event({
    title,
    description,
    date,
    location,
    organizer: req.user._id, // Set organizer to the logged-in admin
  });

  try {
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid event data", error: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
exports.updateEvent = async (req, res) => {
  const { title, description, date, location } = req.body;

  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      // You might want to add a check to ensure only the organizer can update
      // if (event.organizer.toString() !== req.user._id.toString()) {
      //     return res.status(401).json({ message: 'Not authorized' });
      // }

      event.title = title || event.title;
      event.description = description || event.description;
      event.date = date || event.date;
      event.location = location || event.location;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      await event.deleteOne();
      // Optional: Also delete all registrations for this event
      // await Registration.deleteMany({ event: req.params.id });
      res.json({ message: "Event removed" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
