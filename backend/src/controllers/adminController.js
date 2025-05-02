const Admin = require("../models/Admin");
const Package = require("../models/Package");
const Section = require("../models/Section");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcryptjs");

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({ message: "Account is inactive" });
    }

    // Verify password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      config.jwtSecret,
      { expiresIn: "1d" }
    );

    // Return admin data and token
    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const [totalPackages, activePackages, totalSections, activeSections] =
      await Promise.all([
        Package.countDocuments(),
        Package.countDocuments({ isActive: true }),
        Section.countDocuments(),
        Section.countDocuments({ isActive: true }),
      ]);

    res.json({
      packages: {
        total: totalPackages,
        active: activePackages,
      },
      sections: {
        total: totalSections,
        active: activeSections,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get recent activities
exports.getRecentActivities = async (req, res) => {
  try {
    const recentPackages = await Package.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("name updatedAt isActive");

    const recentSections = await Section.find()
      .sort({ updatedAt: -1 })
      .limit(5)
      .select("title updatedAt isActive");

    res.json({
      packages: recentPackages,
      sections: recentSections,
    });
  } catch (error) {
    console.error("Recent activities error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new admin (superadmin only)
exports.createAdmin = async (req, res) => {
  try {
    // Check if user is superadmin
    if (req.admin.role !== "superadmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { username, email, password, role } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { username }],
    });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = new Admin({
      username,
      email,
      password,
      role: role || "admin",
    });

    await admin.save();
    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Create admin error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update admin status (superadmin only)
exports.updateAdminStatus = async (req, res) => {
  try {
    // Check if user is superadmin
    if (req.admin.role !== "superadmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const { isActive } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      message: "Admin status updated successfully",
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
      },
    });
  } catch (error) {
    console.error("Update admin status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all admins (superadmin only)
exports.getAdmins = async (req, res) => {
  try {
    // Check if user is superadmin
    if (req.admin.role !== "superadmin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const admins = await Admin.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(admins);
  } catch (error) {
    console.error("Get admins error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
