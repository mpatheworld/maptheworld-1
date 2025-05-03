import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Grid,
  Container,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Breadcrumbs,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../services/api";
import Layout from "../layout/Layout";
import { uploadImageToCloudinary } from "../../utils/cloudinary";
import { indianStates } from "../../utils/package_data";

const LOCAL_STORAGE_KEY = "packageFormData";

const AddPackages = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get id from URL if editing
  const isEditMode = Boolean(id);

  const [pageTitle, setPageTitle] = useState(
    isEditMode ? "Edit Package" : "Add New Package"
  );
  const [originalData, setOriginalData] = useState(null); // Store original data for comparison

  // Default empty package state
  const defaultPackageData = {
    name: "",
    description: "",
    images: [],
    duration: "",
    price: "",
    location: "",
    state: "Kerala",
    section: "trending",
    highlights: [],
    facilities: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    knowBeforeYouGo: [],
    category: "budget-friendly",
    isActive: true,
    bookingPolicy: "",
    cancellationPolicy: "",
    refundPolicy: "",
    termsAndConditions: "",
    contactInfo: "",
    featured: false,
    reviews: [],
    similarPackages: [],
  };

  const [packageData, setPackageData] = useState(defaultPackageData);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode); // Set to true when in edit mode
  const [newHighlight, setNewHighlight] = useState("");
  const [newFacility, setNewFacility] = useState("");
  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");
  const [newKnowBeforeYouGo, setNewKnowBeforeYouGo] = useState("");
  const [availablePackages, setAvailablePackages] = useState([]);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(!isEditMode); // Disable auto-save in edit mode
  const [lastSaved, setLastSaved] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // State for review item
  const [newReviewItem, setNewReviewItem] = useState({
    name: "",
    image: "",
    rating: 5,
    review: "",
  });

  // State for itinerary item
  const [newItineraryItem, setNewItineraryItem] = useState({
    day: "",
    title: "",
    description: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Fetch package data if in edit mode
  useEffect(() => {
    const fetchPackageData = async () => {
      if (isEditMode) {
        try {
          setInitialLoading(true);
          const response = await api.get(`/packages/${id}`);
          console.log("Fetched package data:", response.data);
          console.log("Category from API:", response.data.category);

          // Ensure the category is properly initialized
          const packageWithCategory = {
            ...response.data,
            category: response.data.category || "budget-friendly", // Provide a fallback value
          };

          console.log(
            "Setting package data with category:",
            packageWithCategory.category
          );
          setPackageData(packageWithCategory);
          setOriginalData(packageWithCategory);

          // Set image previews for existing images
          if (
            packageWithCategory.images &&
            packageWithCategory.images.length > 0
          ) {
            setImagePreviews(packageWithCategory.images);
          }

          setSnackbarMessage("Package data loaded successfully");
          setSnackbarSeverity("info");
          setSnackbarOpen(true);
        } catch (error) {
          console.error("Error fetching package data:", error);
          setSnackbarMessage("Failed to load package data");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          navigate("/packages"); // Redirect if package not found
        } finally {
          setInitialLoading(false);
        }
      } else {
        // For add mode, try to load from local storage
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            // Ensure the category is set even for saved data
            const dataWithCategory = {
              ...parsedData,
              category: parsedData.category || "budget-friendly",
            };
            setPackageData(dataWithCategory);
            setSnackbarMessage("Loaded previously saved data");
            setSnackbarSeverity("info");
            setSnackbarOpen(true);
          } catch (error) {
            console.error("Error loading saved data:", error);
            setSnackbarMessage("Failed to load saved data");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
          }
        }
      }
    };

    fetchPackageData();
  }, [id, isEditMode, navigate]);

  // Fetch available packages for similar packages selection
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/packages");
        // Filter out the current package if in edit mode
        const filteredPackages = isEditMode
          ? response.data.filter((pkg) => pkg._id !== id)
          : response.data;
        setAvailablePackages(filteredPackages);
      } catch (error) {
        console.error("Error fetching packages:", error);
        setSnackbarMessage("Failed to load existing packages");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    };

    fetchPackages();
  }, [id, isEditMode]);

  // Function to convert File to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to convert base64 to File
  const base64ToFile = async (base64String, filename) => {
    try {
      const res = await fetch(base64String);
      const blob = await res.blob();

      // Extract the MIME type from the base64 string
      const mimeType = base64String.split(",")[0].split(":")[1].split(";")[0];

      // Create a new File with the correct MIME type
      return new File([blob], filename, { type: mimeType });
    } catch (error) {
      console.error("Error converting base64 to file:", error);
      throw error;
    }
  };

  // Save form data including images to localStorage
  const saveFormData = async () => {
    try {
      // Convert image files to base64
      const imageData = await Promise.all(
        imageFiles.map(async (file, index) => ({
          name: file.name,
          type: file.type, // Store the MIME type
          data: await fileToBase64(file),
        }))
      );

      const dataToSave = {
        ...packageData,
        imageData, // Store base64 images with their types
      };

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
      setLastSaved(new Date());
      setSnackbarMessage("Syncing data...");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error saving form data:", error);
      setSnackbarMessage("Failed to save form data");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Load saved data including images
  const loadSavedData = async () => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const { imageData, ...restData } = parsedData;

        // Set package data
        setPackageData(restData);

        // Convert base64 images back to files and set previews
        if (imageData && imageData.length > 0) {
          const files = await Promise.all(
            imageData.map((item) => base64ToFile(item.data, item.name))
          );
          setImageFiles(files);
          setImagePreviews(imageData.map((item) => item.data));
        }

        setSnackbarMessage("Loaded previously saved data");
        setSnackbarSeverity("info");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error loading saved data:", error);
        setSnackbarMessage("Failed to load saved data");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  // Auto-save data immediately when changes occur (only in add mode)
  useEffect(() => {
    if (!autoSaveEnabled || isEditMode) return;

    // Only save if there's actual data to save
    if (packageData.name || imageFiles.length > 0) {
      saveFormData();
    }
  }, [packageData, imageFiles, autoSaveEnabled, isEditMode]);

  // Load saved data on component mount (only in add mode)
  useEffect(() => {
    if (!isEditMode) {
      loadSavedData();
    }
  }, [isEditMode]);

  // Clear saved data function
  const clearSavedData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setLastSaved(null);
    setImageFiles([]);
    setImagePreviews([]);
    setSnackbarMessage("Saved data cleared");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);
  };

  // Reset form function
  const resetForm = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the form? All unsaved data will be lost."
      )
    ) {
      if (isEditMode && originalData) {
        setPackageData(originalData);
      } else {
        setPackageData(defaultPackageData);
      }

      // Clear image states
      setImageFiles([]);
      setImagePreviews([]);

      // Clear other form states
      setNewHighlight("");
      setNewFacility("");
      setNewInclusion("");
      setNewExclusion("");
      setNewKnowBeforeYouGo("");
      setNewItineraryItem({
        day: "",
        title: "",
        description: "",
      });
      setNewReviewItem({
        name: "",
        image: "",
        rating: 5,
        review: "",
      });

      if (!isEditMode) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setLastSaved(null);
      }

      setSnackbarMessage("Form has been reset");
      setSnackbarSeverity("info");
      setSnackbarOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing field: ${name} to value: ${value}`);

    // Special handling for category changes
    if (name === "category") {
      console.log(`Category selected: ${value}`);
      console.log("Category selection event:", e);
    }

    setPackageData({
      ...packageData,
      [name]: value,
    });

    // For debugging category specifically
    if (name === "category") {
      console.log(`Category changed to: ${value}`);
      console.log("Updated packageData will be:", {
        ...packageData,
        category: value,
      });

      // Force a log of the current state after a small delay to ensure state update
      setTimeout(() => {
        console.log("Package data after category change:", packageData);
      }, 100);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImageFiles = [...imageFiles];
    const newImagePreviews = [...imagePreviews];

    // Validate each file
    for (const file of files) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        setSnackbarMessage("Only image files are allowed");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        continue;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSnackbarMessage("Image size should be less than 5MB");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        continue;
      }

      newImageFiles.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result);
        setImagePreviews([...newImagePreviews]);
      };
      reader.readAsDataURL(file);
    }

    setImageFiles(newImageFiles);
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setPackageData({
        ...packageData,
        highlights: [...packageData.highlights, newHighlight.trim()],
      });
      setNewHighlight("");
    }
  };

  const handleAddFacility = () => {
    if (newFacility.trim()) {
      setPackageData({
        ...packageData,
        facilities: [...packageData.facilities, newFacility.trim()],
      });
      setNewFacility("");
    }
  };

  const handleAddInclusion = () => {
    if (newInclusion.trim()) {
      setPackageData({
        ...packageData,
        inclusions: [...packageData.inclusions, newInclusion.trim()],
      });
      setNewInclusion("");
    }
  };

  const handleAddExclusion = () => {
    if (newExclusion.trim()) {
      setPackageData({
        ...packageData,
        exclusions: [...packageData.exclusions, newExclusion.trim()],
      });
      setNewExclusion("");
    }
  };

  const handleAddKnowBeforeYouGo = () => {
    if (newKnowBeforeYouGo.trim()) {
      setPackageData({
        ...packageData,
        knowBeforeYouGo: [
          ...packageData.knowBeforeYouGo,
          newKnowBeforeYouGo.trim(),
        ],
      });
      setNewKnowBeforeYouGo("");
    }
  };

  const handleAddItineraryItem = () => {
    if (
      newItineraryItem.day &&
      newItineraryItem.title &&
      newItineraryItem.description
    ) {
      setPackageData({
        ...packageData,
        itinerary: [...packageData.itinerary, { ...newItineraryItem }],
      });
      setNewItineraryItem({
        day: "",
        title: "",
        description: "",
      });
    }
  };

  const handleItineraryItemChange = (e) => {
    const { name, value } = e.target;
    setNewItineraryItem({
      ...newItineraryItem,
      [name]: value,
    });
  };

  const handleAddReview = () => {
    if (newReviewItem.name && newReviewItem.review) {
      setPackageData({
        ...packageData,
        reviews: [...packageData.reviews, { ...newReviewItem }],
      });
      setNewReviewItem({
        name: "",
        image: "",
        rating: 5,
        review: "",
      });
    }
  };

  const handleReviewItemChange = (e) => {
    const { name, value } = e.target;
    setNewReviewItem({
      ...newReviewItem,
      [name]: value,
    });
  };

  const handleRemoveImage = (index) => {
    const newImageFiles = [...imageFiles];
    const newImagePreviews = [...imagePreviews];

    // Remove from both arrays
    newImageFiles.splice(index, 1);
    newImagePreviews.splice(index, 1);

    // If in edit mode, also update the packageData.images array
    if (isEditMode) {
      const updatedImages = [...packageData.images];
      updatedImages.splice(index, 1);
      setPackageData({
        ...packageData,
        images: updatedImages,
      });
    }

    setImageFiles(newImageFiles);
    setImagePreviews(newImagePreviews);
  };

  const handleRemoveHighlight = (index) => {
    const updatedHighlights = [...packageData.highlights];
    updatedHighlights.splice(index, 1);
    setPackageData({
      ...packageData,
      highlights: updatedHighlights,
    });
  };

  const handleRemoveFacility = (index) => {
    const updatedFacilities = [...packageData.facilities];
    updatedFacilities.splice(index, 1);
    setPackageData({
      ...packageData,
      facilities: updatedFacilities,
    });
  };

  const handleRemoveInclusion = (index) => {
    const updatedInclusions = [...packageData.inclusions];
    updatedInclusions.splice(index, 1);
    setPackageData({
      ...packageData,
      inclusions: updatedInclusions,
    });
  };

  const handleRemoveExclusion = (index) => {
    const updatedExclusions = [...packageData.exclusions];
    updatedExclusions.splice(index, 1);
    setPackageData({
      ...packageData,
      exclusions: updatedExclusions,
    });
  };

  const handleRemoveKnowBeforeYouGo = (index) => {
    const updatedKnowBeforeYouGo = [...packageData.knowBeforeYouGo];
    updatedKnowBeforeYouGo.splice(index, 1);
    setPackageData({
      ...packageData,
      knowBeforeYouGo: updatedKnowBeforeYouGo,
    });
  };

  const handleRemoveItineraryItem = (index) => {
    const updatedItinerary = [...packageData.itinerary];
    updatedItinerary.splice(index, 1);
    setPackageData({
      ...packageData,
      itinerary: updatedItinerary,
    });
  };

  const handleRemoveReview = (index) => {
    const updatedReviews = [...packageData.reviews];
    updatedReviews.splice(index, 1);
    setPackageData({
      ...packageData,
      reviews: updatedReviews,
    });
  };

  const handleAddSimilarPackage = (packageId) => {
    if (!packageId) return;

    // If it's already an object with an _id, use the _id
    const idToAdd =
      typeof packageId === "object" && packageId._id
        ? packageId._id
        : packageId;

    // Check if this package is already in the list
    if (
      !packageData.similarPackages.some(
        (id) => (typeof id === "object" && id._id === idToAdd) || id === idToAdd
      )
    ) {
      setPackageData({
        ...packageData,
        similarPackages: [...packageData.similarPackages, idToAdd],
      });
    }
  };

  const handleRemoveSimilarPackage = (index) => {
    const updatedSimilarPackages = [...packageData.similarPackages];
    updatedSimilarPackages.splice(index, 1);
    setPackageData({
      ...packageData,
      similarPackages: updatedSimilarPackages,
    });
  };

  // Validate form data before submission
  const validateForm = () => {
    const requiredFields = [
      "name",
      "description",
      "price",
      "state",
      "duration",
      "location",
    ];

    const errors = [];

    requiredFields.forEach((field) => {
      if (!packageData[field]) {
        errors.push(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        );
      }
    });

    if (packageData.images.length === 0 && imagePreviews.length === 0) {
      errors.push("At least one image is required");
    }

    if (packageData.highlights.length === 0) {
      errors.push("At least one highlight is required");
    }

    if (packageData.itinerary.length === 0) {
      errors.push("At least one itinerary item is required");
    }

    if (packageData.inclusions.length === 0) {
      errors.push("At least one inclusion is required");
    }

    if (errors.length > 0) {
      setSnackbarMessage(
        `Please correct the following errors: ${errors.join(", ")}`
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setUploadingImages(true);

    try {
      // Upload all images to Cloudinary
      const uploadedImages = [];

      // In edit mode, use the updated images array from packageData
      if (isEditMode) {
        uploadedImages.push(...packageData.images);
      }

      // Then upload new images
      for (const file of imageFiles) {
        try {
          console.log("Uploading file:", file.name, file.type, file.size);
          const imageData = await uploadImageToCloudinary(file);
          console.log("Upload successful:", imageData);
          uploadedImages.push(imageData.url);
        } catch (error) {
          console.error("Error uploading image:", error);
          setSnackbarMessage(
            `Failed to upload image ${file.name}: ${error.message}`
          );
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          return;
        }
      }

      // Format the data for submission
      const formattedData = {
        ...packageData,
        images: uploadedImages,
        price: Number(packageData.price),
        similarPackages: packageData.similarPackages.map((pkg) =>
          typeof pkg === "object" && pkg._id ? pkg._id : pkg
        ),
      };

      let response;

      if (isEditMode) {
        response = await api.put(`/packages/${id}`, formattedData);
        setSnackbarMessage("Package updated successfully!");
      } else {
        response = await api.post("/packages", formattedData);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setSnackbarMessage("Package created successfully!");
      }

      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate("/packages");
      }, 1500);
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} package:`,
        error
      );
      setSnackbarMessage(
        error.message || `Failed to ${isEditMode ? "update" : "create"} package`
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  // Add the functions that were removed
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  // First, add a function to find the package name by ID
  const getPackageNameById = (packageId) => {
    const foundPackage = availablePackages.find((pkg) => pkg._id === packageId);
    return foundPackage ? foundPackage.name : `Package ${packageId}`;
  };

  // Show loading spinner while fetching data in edit mode
  if (initialLoading) {
    return (
      <Layout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading package data...
          </Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumbs */}
      <Box sx={{ p: 3 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 2 }}
        >
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Dashboard
          </Link>
          <Link
            to="/packages"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Packages
          </Link>
          <Typography color="text.primary">
            {isEditMode ? "Edit Package" : "Add New Package"}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h4" component="h1">
              {pageTitle}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {!isEditMode && (
                <>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={autoSaveEnabled}
                        onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Auto Save"
                  />
                  <Button
                    variant="outlined"
                    onClick={saveFormData}
                    sx={{ ml: 2 }}
                    disabled={!packageData.name}
                  >
                    Save Progress
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={clearSavedData}
                    sx={{ ml: 2 }}
                    disabled={!lastSaved}
                  >
                    Clear Saved Data
                  </Button>
                </>
              )}
            </Box>
          </Box>
          {lastSaved && !isEditMode && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Last saved: {lastSaved.toLocaleString()}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  Basic Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Package Name"
                  name="name"
                  value={packageData.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Description"
                  name="description"
                  value={packageData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="state-label">State</InputLabel>
                  <Select
                    labelId="state-label"
                    id="state"
                    name="state"
                    value={packageData.state}
                    label="State"
                    onChange={handleChange}
                  >
                    {indianStates.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Duration"
                  name="duration"
                  value={packageData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 7 Days / 6 Nights"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Price (₹)"
                  name="price"
                  type="number"
                  value={packageData.price}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Location"
                  name="location"
                  value={packageData.location}
                  onChange={handleChange}
                  placeholder="e.g. Rajasthan, India"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="category-label">Category</InputLabel>
                  {console.log("Current category value:", packageData.category)}
                  <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    value={packageData.category || "budget-friendly"}
                    label="Category"
                    onChange={handleChange}
                  >
                    <MenuItem value="budget-friendly">Budget Friendly</MenuItem>
                    <MenuItem value="trending">Trending</MenuItem>
                    <MenuItem value="short-trips">Short Trips</MenuItem>
                    <MenuItem value="luxury">Luxury</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="section-label">Section</InputLabel>
                  <Select
                    labelId="section-label"
                    id="section"
                    name="section"
                    value={packageData.section}
                    label="Section"
                    onChange={handleChange}
                  >
                    <MenuItem value="trending">Trending</MenuItem>
                    <MenuItem value="popular">Popular</MenuItem>
                    <MenuItem value="featured">Featured</MenuItem>
                    <MenuItem value="new">New Destinations</MenuItem>
                    <MenuItem value="seasonal">Seasonal</MenuItem>
                    <MenuItem value="offers">Special Offers</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={packageData.isActive}
                      onChange={(e) =>
                        setPackageData({
                          ...packageData,
                          isActive: e.target.checked,
                        })
                      }
                      name="isActive"
                      color="primary"
                    />
                  }
                  label="Is Active"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={packageData.featured}
                      onChange={(e) =>
                        setPackageData({
                          ...packageData,
                          featured: e.target.checked,
                        })
                      }
                      name="featured"
                      color="primary"
                    />
                  }
                  label="Featured"
                />
              </Grid>

              {/* Images Section */}
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                  Images
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Button variant="contained" component="label">
                    Upload Images
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Button>
                </Box>

                {imagePreviews.length > 0 && (
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}
                  >
                    {imagePreviews.map((preview, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: "relative",
                          width: 200,
                          height: 150,
                        }}
                      >
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 4,
                          }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.7)",
                            },
                          }}
                          onClick={() => handleRemoveImage(index)}
                        >
                          <DeleteIcon sx={{ color: "white" }} />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}

                {uploadingImages && (
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <CircularProgress size={24} sx={{ mr: 2 }} />
                    <Typography>Uploading images...</Typography>
                  </Box>
                )}
              </Grid>

              {/* Highlights Section */}
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                  Highlights
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Add Highlight"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddHighlight())
                    }
                  />
                  <IconButton
                    color="primary"
                    onClick={handleAddHighlight}
                    sx={{ ml: 1 }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {packageData.highlights.map((highlight, index) => (
                    <Chip
                      key={index}
                      label={highlight}
                      onDelete={() => handleRemoveHighlight(index)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>

              {/* Facilities Section */}
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                  Facilities
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Add Facility"
                    value={newFacility}
                    onChange={(e) => setNewFacility(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddFacility())
                    }
                  />
                  <IconButton
                    color="primary"
                    onClick={handleAddFacility}
                    sx={{ ml: 1 }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {packageData.facilities.map((facility, index) => (
                    <Chip
                      key={index}
                      label={facility}
                      onDelete={() => handleRemoveFacility(index)}
                      color="info"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>

              {/* Itinerary Section */}
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                  Itinerary
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Day"
                  name="day"
                  value={newItineraryItem.day}
                  onChange={handleItineraryItemChange}
                  placeholder="e.g. Day 1"
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={newItineraryItem.title}
                  onChange={handleItineraryItemChange}
                  placeholder="e.g. Arrival in Bali"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={newItineraryItem.description}
                  onChange={handleItineraryItemChange}
                  multiline
                  rows={2}
                  placeholder="Describe the day's activities"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddItineraryItem}
                  disabled={
                    !newItineraryItem.day ||
                    !newItineraryItem.title ||
                    !newItineraryItem.description
                  }
                >
                  Add Itinerary Item
                </Button>
              </Grid>

              {packageData.itinerary.length > 0 && (
                <Grid item xs={12}>
                  {packageData.itinerary.map((item, index) => (
                    <Paper
                      key={index}
                      sx={{ p: 2, mt: 1, position: "relative" }}
                      variant="outlined"
                    >
                      <IconButton
                        size="small"
                        sx={{ position: "absolute", top: 5, right: 5 }}
                        onClick={() => handleRemoveItineraryItem(index)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.day}: {item.title}
                      </Typography>
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                    </Paper>
                  ))}
                </Grid>
              )}

              {/* Inclusions Section */}
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                  Inclusions
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Add Inclusion"
                    value={newInclusion}
                    onChange={(e) => setNewInclusion(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddInclusion())
                    }
                  />
                  <IconButton
                    color="primary"
                    onClick={handleAddInclusion}
                    sx={{ ml: 1 }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {packageData.inclusions.map((inclusion, index) => (
                    <Chip
                      key={index}
                      label={inclusion}
                      onDelete={() => handleRemoveInclusion(index)}
                      color="success"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>

              {/* Exclusions Section */}
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                  Exclusions
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Add Exclusion"
                    value={newExclusion}
                    onChange={(e) => setNewExclusion(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddExclusion())
                    }
                  />
                  <IconButton
                    color="primary"
                    onClick={handleAddExclusion}
                    sx={{ ml: 1 }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {packageData.exclusions.map((exclusion, index) => (
                    <Chip
                      key={index}
                      label={exclusion}
                      onDelete={() => handleRemoveExclusion(index)}
                      color="error"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>

              {/* Know Before You Go Section */}
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                  Know Before You Go
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Add Know Before You Go Item"
                    value={newKnowBeforeYouGo}
                    onChange={(e) => setNewKnowBeforeYouGo(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddKnowBeforeYouGo())
                    }
                  />
                  <IconButton
                    color="primary"
                    onClick={handleAddKnowBeforeYouGo}
                    sx={{ ml: 1 }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {packageData.knowBeforeYouGo.map((item, index) => (
                    <Chip
                      key={index}
                      label={item}
                      onDelete={() => handleRemoveKnowBeforeYouGo(index)}
                      color="warning"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>

              {/* Policies Section */}
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                  Policies and Contact Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Booking Policy"
                  name="bookingPolicy"
                  value={packageData.bookingPolicy}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  placeholder="Enter booking policy details"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cancellation Policy"
                  name="cancellationPolicy"
                  value={packageData.cancellationPolicy}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  placeholder="Enter cancellation policy details"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Refund Policy"
                  name="refundPolicy"
                  value={packageData.refundPolicy}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  placeholder="Enter refund policy details"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Terms and Conditions"
                  name="termsAndConditions"
                  value={packageData.termsAndConditions}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  placeholder="Enter terms and conditions"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contact Information"
                  name="contactInfo"
                  value={packageData.contactInfo}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  placeholder="Enter contact information for this package"
                />
              </Grid>

              {/* Reviews Section */}
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                  Customer Reviews
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reviewer Name"
                  name="name"
                  value={newReviewItem.name}
                  onChange={handleReviewItemChange}
                  placeholder="e.g. John Smith"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Reviewer Image URL"
                  name="image"
                  value={newReviewItem.image}
                  onChange={handleReviewItemChange}
                  placeholder="e.g. https://example.com/profile.jpg"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="rating-label">Rating</InputLabel>
                  <Select
                    labelId="rating-label"
                    name="rating"
                    value={newReviewItem.rating}
                    label="Rating"
                    onChange={handleReviewItemChange}
                  >
                    <MenuItem value={1}>1 Star</MenuItem>
                    <MenuItem value={2}>2 Stars</MenuItem>
                    <MenuItem value={3}>3 Stars</MenuItem>
                    <MenuItem value={4}>4 Stars</MenuItem>
                    <MenuItem value={5}>5 Stars</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Review Text"
                  name="review"
                  value={newReviewItem.review}
                  onChange={handleReviewItemChange}
                  multiline
                  rows={3}
                  placeholder="Enter the customer's review here"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddReview}
                  disabled={!newReviewItem.name || !newReviewItem.review}
                >
                  Add Review
                </Button>
              </Grid>

              {packageData.reviews.length > 0 && (
                <Grid item xs={12}>
                  {packageData.reviews.map((item, index) => (
                    <Paper
                      key={index}
                      sx={{ p: 2, mt: 1, position: "relative" }}
                      variant="outlined"
                    >
                      <IconButton
                        size="small"
                        sx={{ position: "absolute", top: 5, right: 5 }}
                        onClick={() => handleRemoveReview(index)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.name}
                        </Typography>
                        <Box sx={{ ml: 2, display: "flex" }}>
                          {[...Array(item.rating)].map((_, i) => (
                            <span key={i} style={{ color: "#FFD700" }}>
                              ★
                            </span>
                          ))}
                        </Box>
                      </Box>
                      <Typography variant="body2">{item.review}</Typography>
                    </Paper>
                  ))}
                </Grid>
              )}

              {/* Similar Packages Section */}
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                  Similar Packages
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="similar-package-label">
                    Select Similar Package
                  </InputLabel>
                  <Select
                    labelId="similar-package-label"
                    label="Select Similar Package"
                    value=""
                    onChange={(e) => handleAddSimilarPackage(e.target.value)}
                  >
                    {availablePackages
                      .filter((pkg) => pkg._id !== packageData._id)
                      .map((pkg) => (
                        <MenuItem key={pkg._id} value={pkg._id}>
                          {pkg.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              {packageData.similarPackages.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Selected Similar Packages:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {packageData.similarPackages.map((packageId, index) => (
                      <Chip
                        key={index}
                        label={
                          typeof packageId === "object"
                            ? packageId.name || "Unknown Package"
                            : getPackageNameById(packageId)
                        }
                        onDelete={() => handleRemoveSimilarPackage(index)}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Grid>
              )}

              {/* Submit Section */}
              <Grid
                item
                xs={12}
                sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/packages")}
                    sx={{ mr: 2 }}
                  >
                    Cancel
                  </Button>
                  <Button variant="outlined" color="error" onClick={resetForm}>
                    {isEditMode ? "Reset Changes" : "Reset Form"}
                  </Button>
                  {process.env.NODE_ENV === "development" && (
                    <Button
                      variant="outlined"
                      color="info"
                      onClick={() => {
                        console.log("Current Form State:", packageData);
                        console.log("Category Value:", packageData.category);
                        alert(`Current Category: ${packageData.category}`);
                      }}
                      sx={{ ml: 2 }}
                    >
                      Debug State
                    </Button>
                  )}
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={
                    loading || !packageData.name || !packageData.description
                  }
                >
                  {loading
                    ? "Saving..."
                    : isEditMode
                    ? "Update Package"
                    : "Save Package"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default AddPackages;
