const Section = require('../models/Section');
const Package = require('../models/Package');

// Get all sections with populated packages
exports.getSections = async (req, res) => {
    try {
        const sections = await Section.find()
            .populate('packages', 'name image price duration location')
            .sort({ order: 1, createdAt: -1 });
        res.json(sections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get active sections with populated packages
exports.getActiveSections = async (req, res) => {
    try {
        const sections = await Section.find({ isActive: true })
            .populate('packages', 'name image price duration location')
            .sort({ order: 1, createdAt: -1 });
        res.json(sections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single section with populated packages
exports.getSection = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id)
            .populate('packages', 'name image price duration location');
        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.json(section);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new section with packages
exports.createSection = async (req, res) => {
    try {
        const { packages, ...sectionData } = req.body;
        
        // Validate packages if provided
        if (packages && packages.length > 0) {
            const validPackages = await Package.find({ _id: { $in: packages } });
            if (validPackages.length !== packages.length) {
                return res.status(400).json({ message: 'One or more packages not found' });
            }
        }

        const section = new Section({
            ...sectionData,
            packages: packages || []
        });
        
        await section.save();
        res.status(201).json(section);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a section with packages
exports.updateSection = async (req, res) => {
    try {
        const { packages, ...updateData } = req.body;
        
        // Validate packages if provided
        if (packages && packages.length > 0) {
            const validPackages = await Package.find({ _id: { $in: packages } });
            if (validPackages.length !== packages.length) {
                return res.status(400).json({ message: 'One or more packages not found' });
            }
        }

        const section = await Section.findByIdAndUpdate(
            req.params.id,
            { 
                ...updateData,
                packages: packages || undefined,
                updatedAt: Date.now() 
            },
            { new: true, runValidators: true }
        ).populate('packages', 'name image price duration location');

        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.json(section);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add packages to a section
exports.addPackages = async (req, res) => {
    try {
        const { packageIds } = req.body;
        
        // Validate packages
        const validPackages = await Package.find({ _id: { $in: packageIds } });
        if (validPackages.length !== packageIds.length) {
            return res.status(400).json({ message: 'One or more packages not found' });
        }

        const section = await Section.findByIdAndUpdate(
            req.params.id,
            { 
                $addToSet: { packages: { $each: packageIds } },
                updatedAt: Date.now() 
            },
            { new: true, runValidators: true }
        ).populate('packages', 'name image price duration location');

        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.json(section);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Remove packages from a section
exports.removePackages = async (req, res) => {
    try {
        const { packageIds } = req.body;

        const section = await Section.findByIdAndUpdate(
            req.params.id,
            { 
                $pull: { packages: { $in: packageIds } },
                updatedAt: Date.now() 
            },
            { new: true, runValidators: true }
        ).populate('packages', 'name image price duration location');

        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.json(section);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update section status
exports.updateStatus = async (req, res) => {
    try {
        const { isActive } = req.body;
        const section = await Section.findByIdAndUpdate(
            req.params.id,
            { isActive },
            { new: true }
        ).populate('packages', 'name image price duration location');
        
        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.json(section);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update section order
exports.updateOrder = async (req, res) => {
    try {
        const { order } = req.body;
        const section = await Section.findByIdAndUpdate(
            req.params.id,
            { order },
            { new: true }
        ).populate('packages', 'name image price duration location');
        
        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.json(section);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a section
exports.deleteSection = async (req, res) => {
    try {
        const section = await Section.findByIdAndDelete(req.params.id);
        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.json({ message: 'Section deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 