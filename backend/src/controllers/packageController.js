const Package = require("../models/Package");

// Create a new package
exports.createPackage = async (req, res) => {
  try {
    // Ensure category has a valid value
    const validCategories = [
      "budget-friendly",
      "trending",
      "short-trips",
      "luxury",
    ];
    if (req.body.category && !validCategories.includes(req.body.category)) {
      req.body.category = "budget-friendly";
    } else if (!req.body.category) {
      req.body.category = "budget-friendly";
    }

    const package = new Package(req.body);
    await package.save();

    res.status(201).json(package);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all packages with filtering and sorting
exports.getPackages = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, duration, location } = req.query;
    let query = {};

    // Apply filters
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (duration) query.duration = duration;
    if (location) query.location = { $regex: location, $options: "i" };

    const packages = await Package.find(query)
      .populate("similarPackages", "name images price duration description")
      .sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single package with all details
exports.getPackage = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id).populate(
      "similarPackages",
      "name images price duration description"
    );
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a package
exports.updatePackage = async (req, res) => {
  try {
    // Make a copy of the request body to avoid modifying the original
    const updateData = { ...req.body };

    // Ensure category has a valid value
    const validCategories = [
      "budget-friendly",
      "trending",
      "short-trips",
      "luxury",
    ];
    if (updateData.category && !validCategories.includes(updateData.category)) {
      updateData.category = "budget-friendly";
    } else if (!updateData.category) {
      updateData.category = "budget-friendly";
    }

    // First, ensure the category field exists for packages created before the category field was required
    const existingPackage = await Package.findById(req.params.id);
    if (!existingPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    const updateResult = await Package.updateOne(
      { _id: req.params.id },
      {
        $set: {
          ...updateData,
          category: updateData.category, // Explicitly set the category
        },
      }
    );

    // Get the updated package
    const updatedPackage = await Package.findById(req.params.id);

    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a package
exports.deletePackage = async (req, res) => {
  try {
    // Check if the ID is valid before attempting to find the package
    if (
      !req.params.id ||
      req.params.id === "null" ||
      req.params.id === "undefined"
    ) {
      return res.status(400).json({ message: "Invalid package ID provided" });
    }

    // First, check if the package exists
    const packageExists = await Package.findById(req.params.id);
    if (!packageExists) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Delete the package using deleteOne for more reliability
    const deleteResult = await Package.deleteOne({ _id: req.params.id });

    if (deleteResult.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Package not found or could not be deleted" });
    }

    res.json({
      message: "Package deleted successfully",
      deletedPackageId: req.params.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a review to a package
exports.addReview = async (req, res) => {
  try {
    const { name, image, rating, review } = req.body;
    const package = await Package.findById(req.params.id);

    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }

    package.reviews.push({
      name,
      image,
      rating,
      review,
      date: Date.now(),
    });

    await package.save();
    res.json(package);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update package status
exports.updateStatus = async (req, res) => {
  try {
    // Check if isActive field is provided
    if (typeof req.body.isActive !== "boolean") {
      return res
        .status(400)
        .json({ message: "isActive field must be a boolean" });
    }

    // First, check if the package exists
    const existingPackage = await Package.findById(req.params.id);
    if (!existingPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Update status using updateOne for more reliability
    const updateResult = await Package.updateOne(
      { _id: req.params.id },
      { $set: { isActive: req.body.isActive, updatedAt: Date.now() } }
    );

    if (updateResult.modifiedCount === 0) {
      return res
        .status(400)
        .json({ message: "Package status could not be updated" });
    }

    // Get the updated package to return to the client
    const updatedPackage = await Package.findById(req.params.id);

    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get packages by category
exports.getPackagesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const packages = await Package.find({ category, isActive: true })
      .populate("similarPackages", "name images price duration description")
      .sort({ price: 1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search packages
exports.searchPackages = async (req, res) => {
  try {
    const { query } = req.query;
    const packages = await Package.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
      isActive: true,
    }).populate("similarPackages", "name images price duration description");

    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get featured packages
exports.getFeaturedPackages = async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .populate("similarPackages", "name images price duration description");
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update package featured status
exports.updateFeatured = async (req, res) => {
  try {
    // Check if featured field is provided
    if (typeof req.body.featured !== "boolean") {
      return res
        .status(400)
        .json({ message: "featured field must be a boolean" });
    }

    // First, check if the package exists
    const existingPackage = await Package.findById(req.params.id);
    if (!existingPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Update featured status using updateOne for more reliability
    const updateResult = await Package.updateOne(
      { _id: req.params.id },
      { $set: { featured: req.body.featured, updatedAt: Date.now() } }
    );

    if (updateResult.modifiedCount === 0) {
      return res
        .status(400)
        .json({ message: "Package featured status could not be updated" });
    }

    // Get the updated package to return to the client
    const updatedPackage = await Package.findById(req.params.id);

    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
