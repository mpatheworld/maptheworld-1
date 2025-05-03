import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
  Chip,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  Breadcrumbs,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  Star as StarIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Layout from "../layout/Layout";

const Packages = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    state: "",
    section: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [error, setError] = useState(null);

  // Fetch packages
  const fetchPackages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Build query params for filtering
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (filters.category) params.append("category", filters.category);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.state) params.append("state", filters.state);
      if (filters.section) params.append("section", filters.section);

      const response = await api.get(`/packages?${params.toString()}`);

      // Normalize data to ensure all required fields exist
      const normalizedPackages = response.data.map((pkg) => ({
        _id: pkg._id || "",
        name: pkg.name || "Unnamed Package",
        images: pkg.images || [],
        duration: pkg.duration || "",
        price: pkg.price || 0,
        location: pkg.location || "",
        state: pkg.state || "",
        category: pkg.category || "",
        section: pkg.section || "",
        isActive: typeof pkg.isActive === "boolean" ? pkg.isActive : true,
        featured: typeof pkg.featured === "boolean" ? pkg.featured : false,
      }));

      setPackages(normalizedPackages);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setError("Failed to fetch packages. Please try again later.");
      showSnackbar("Failed to fetch packages", "error");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filters]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // Package actions menu
  const handleMenuOpen = (event, packageId) => {
    console.log("Menu opened for package:", packageId);
    if (!packageId) {
      console.error("No package ID provided to handleMenuOpen");
      return;
    }
    setAnchorEl(event.currentTarget);
    setSelectedPackageId(packageId);
  };

  const handleMenuClose = () => {
    console.log("Menu closed, clearing selectedPackageId");
    setAnchorEl(null);
    setSelectedPackageId(null);
  };

  // Delete package
  const handleDeleteClick = () => {
    console.log("Delete clicked, selectedPackageId:", selectedPackageId);
    if (!selectedPackageId) {
      showSnackbar("No package selected for deletion", "error");
      handleMenuClose();
      return;
    }
    setDeleteDialogOpen(true);
    // Don't close the menu yet to maintain the state
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!selectedPackageId) {
        console.error("Cannot delete: No package ID selected");
        showSnackbar("No package selected for deletion", "error");
        setDeleteDialogOpen(false);
        return;
      }

      console.log(`Deleting package with ID: ${selectedPackageId}`);
      const response = await api.delete(`/packages/${selectedPackageId}`);
      console.log("Delete response:", response.data);

      // Show success message
      showSnackbar("Package deleted successfully", "success");

      // Refresh package list
      fetchPackages();
    } catch (error) {
      console.error("Error deleting package:", error);
      let errorMessage = "Failed to delete package";

      if (error.message) {
        errorMessage = error.message;
      }

      showSnackbar(errorMessage, "error");
    } finally {
      setDeleteDialogOpen(false);
      // Close the menu and clear the selected package
      handleMenuClose();
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  // Toggle package active status
  const handleToggleActive = async (packageId, currentStatus) => {
    try {
      console.log(
        `Toggling active status for package ${packageId} from ${currentStatus} to ${!currentStatus}`
      );

      const response = await api.patch(`/packages/${packageId}/status`, {
        isActive: !currentStatus,
      });

      console.log("Toggle status response:", response.data);

      // Show success message
      showSnackbar(
        `Package ${currentStatus ? "deactivated" : "activated"} successfully`,
        "success"
      );

      // Refresh package list
      fetchPackages();
    } catch (error) {
      console.error("Error updating package status:", error);
      let errorMessage = "Failed to update package status";

      if (error.message) {
        errorMessage = error.message;
      }

      showSnackbar(errorMessage, "error");
    } finally {
      handleMenuClose();
    }
  };

  // Featured toggle
  const handleToggleFeatured = async (packageId, currentStatus) => {
    try {
      console.log(
        `Toggling featured status for package ${packageId} from ${currentStatus} to ${!currentStatus}`
      );

      const response = await api.patch(`/packages/${packageId}/featured`, {
        featured: !currentStatus,
      });

      console.log("Toggle featured response:", response.data);

      // Show success message
      showSnackbar(
        `Package ${currentStatus ? "removed from" : "marked as"} featured`,
        "success"
      );

      // Refresh package list
      fetchPackages();
    } catch (error) {
      console.error("Error updating featured status:", error);
      let errorMessage = "Failed to update featured status";

      if (error.message) {
        errorMessage = error.message;
      }

      showSnackbar(errorMessage, "error");
    } finally {
      handleMenuClose();
    }
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter handlers
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      state: "",
      section: "",
    });
    setSearchTerm("");
  };

  // Snackbar
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // Calculate displayed packages after pagination
  const displayedPackages = packages.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        {/* Show error if any */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Breadcrumbs and title */}
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Dashboard
            </Link>
            <Typography color="text.primary">Packages</Typography>
          </Breadcrumbs>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Packages</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate("/addpackage")}
            >
              Add New Package
            </Button>
          </Box>
        </Box>

        {/* Search and filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setSearchTerm("")}
                      >
                        <RefreshIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
                sx={{ mr: 1 }}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={resetFilters}
              >
                Reset
              </Button>
            </Grid>

            {showFilters && (
              <>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      label="Category"
                    >
                      <MenuItem value="">All Categories</MenuItem>
                      <MenuItem value="budget-friendly">
                        Budget Friendly
                      </MenuItem>
                      <MenuItem value="trending">Trending</MenuItem>
                      <MenuItem value="short-trips">Short Trips</MenuItem>
                      <MenuItem value="luxury">Luxury</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="section-label">Section</InputLabel>
                    <Select
                      labelId="section-label"
                      name="section"
                      value={filters.section}
                      onChange={handleFilterChange}
                      label="Section"
                    >
                      <MenuItem value="">All Sections</MenuItem>
                      <MenuItem value="trending">Trending</MenuItem>
                      <MenuItem value="popular">Popular</MenuItem>
                      <MenuItem value="featured">Featured</MenuItem>
                      <MenuItem value="new">New Destinations</MenuItem>
                      <MenuItem value="seasonal">Seasonal</MenuItem>
                      <MenuItem value="offers">Special Offers</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Min Price"
                    name="minPrice"
                    type="number"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Max Price"
                    name="maxPrice"
                    type="number"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="state-label">State</InputLabel>
                    <Select
                      labelId="state-label"
                      name="state"
                      value={filters.state}
                      onChange={handleFilterChange}
                      label="State"
                    >
                      <MenuItem value="">All States</MenuItem>
                      <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                      <MenuItem value="Kerala">Kerala</MenuItem>
                      <MenuItem value="Goa">Goa</MenuItem>
                      <MenuItem value="Himachal Pradesh">
                        Himachal Pradesh
                      </MenuItem>
                      <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                      {/* Add more states as needed */}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>

        {/* Packages table */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="packages table">
            <TableHead>
              <TableRow>
                <TableCell>Package</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : displayedPackages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No packages found
                  </TableCell>
                </TableRow>
              ) : (
                displayedPackages.map((pkg) => (
                  <TableRow key={pkg._id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {pkg.images && pkg.images.length > 0 && (
                          <Box
                            component="img"
                            src={pkg.images[0]}
                            alt={pkg.name}
                            sx={{
                              width: 60,
                              height: 40,
                              borderRadius: 1,
                              mr: 2,
                              objectFit: "cover",
                            }}
                          />
                        )}
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {pkg.name}
                            {pkg.featured && (
                              <StarIcon
                                fontSize="small"
                                color="warning"
                                sx={{ ml: 0.5, verticalAlign: "text-top" }}
                              />
                            )}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {pkg.location || "No location set"}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{pkg.state || "Not Set"}</TableCell>
                    <TableCell>{pkg.duration || "Not Set"}</TableCell>
                    <TableCell>₹{pkg.price || "0"}</TableCell>
                    <TableCell>
                      <Chip
                        label={
                          pkg.category && typeof pkg.category === "string"
                            ? pkg.category.replace("-", " ")
                            : "Not Set"
                        }
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          pkg.section && typeof pkg.section === "string"
                            ? pkg.section
                            : "Not Set"
                        }
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={pkg.isActive ? "Active" : "Inactive"}
                        size="small"
                        color={pkg.isActive ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Package">
                        <IconButton
                          size="small"
                          onClick={() =>
                            window.open(`/packages/${pkg._id}`, "_blank")
                          }
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/editpackage/${pkg._id}`)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="More Actions">
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, pkg._id)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={packages.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
      >
        {selectedPackageId && packages && packages.length > 0 ? (
          (() => {
            const selectedPackage = packages.find(
              (pkg) => pkg._id === selectedPackageId
            );

            if (!selectedPackage) {
              console.error(
                `Package with ID ${selectedPackageId} not found in list`
              );
              return (
                <MenuItem onClick={handleMenuClose}>Package not found</MenuItem>
              );
            }

            return (
              <>
                {selectedPackage.isActive ? (
                  <MenuItem
                    onClick={() => handleToggleActive(selectedPackageId, true)}
                  >
                    Deactivate
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => handleToggleActive(selectedPackageId, false)}
                  >
                    Activate
                  </MenuItem>
                )}

                {selectedPackage.featured ? (
                  <MenuItem
                    onClick={() =>
                      handleToggleFeatured(selectedPackageId, true)
                    }
                  >
                    Remove Featured
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() =>
                      handleToggleFeatured(selectedPackageId, false)
                    }
                  >
                    Mark as Featured
                  </MenuItem>
                )}

                <MenuItem
                  onClick={handleDeleteClick}
                  sx={{ color: "error.main" }}
                >
                  Delete
                </MenuItem>
              </>
            );
          })()
        ) : (
          <MenuItem onClick={handleMenuClose}>No actions available</MenuItem>
        )}
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selectedPackageId && packages && packages.length > 0
              ? (() => {
                  const selectedPackage = packages.find(
                    (pkg) => pkg._id === selectedPackageId
                  );
                  if (selectedPackage) {
                    return `Are you sure you want to delete package "${selectedPackage.name}"? This action cannot be undone.`;
                  } else {
                    return "Package not found. It may have been deleted already.";
                  }
                })()
              : "Are you sure you want to delete this package? This action cannot be undone."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            autoFocus
            disabled={
              !selectedPackageId ||
              !packages.find((pkg) => pkg._id === selectedPackageId)
            }
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Packages;
