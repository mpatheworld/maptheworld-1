const Enquiry = require("../models/Enquiry");

// Create a new enquiry
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all enquiries
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single enquiry
exports.getEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update enquiry status
exports.updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, notes: req.body.notes },
      { new: true, runValidators: true }
    );
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.json(enquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an enquiry
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
