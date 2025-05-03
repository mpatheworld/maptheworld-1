import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { sectionApi } from "../../services/api";
import api from "../../services/api";
import {
  Delete as DeleteIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SectionForm = ({ open, onClose, section, onSuccess }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingPackages, setFetchingPackages] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      order: 1,
      isActive: true,
      packages: [],
    },
  });

  // Fetch packages when the form opens
  useEffect(() => {
    const fetchPackages = async () => {
      if (open) {
        try {
          setFetchingPackages(true);
          const response = await api.get("/packages");
          setPackages(response.data);
        } catch (error) {
          console.error("Error fetching packages:", error);
          toast.error("Failed to fetch packages");
        } finally {
          setFetchingPackages(false);
        }
      }
    };

    fetchPackages();
  }, [open]);

  useEffect(() => {
    if (section) {
      setValue("title", section.title);
      setValue("description", section.description);
      setValue("order", section.order);
      setValue("isActive", section.isActive);
      setValue("packages", section.packages.map((pkg) => pkg._id) || []);
    }
  }, [section, setValue]);

  const selectedPackages = watch("packages") || [];

  const handleMovePackage = (index, direction) => {
    const items = Array.from(selectedPackages);
    if (direction === 'up' && index > 0) {
      [items[index], items[index - 1]] = [items[index - 1], items[index]];
    } else if (direction === 'down' && index < items.length - 1) {
      [items[index], items[index + 1]] = [items[index + 1], items[index]];
    }
    setValue("packages", items);
  };

  const handleRemovePackage = (packageId) => {
    const updatedPackages = selectedPackages.filter((id) => id !== packageId);
    setValue("packages", updatedPackages);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        ...data,
        packages: data.packages || [],
      };
      if (section) {
        await sectionApi.update(section._id, payload);
        toast.success("Section updated successfully");
      } else {
        await sectionApi.create(payload);
        toast.success("Section created successfully");
      }

      onSuccess();
      handleClose();
    } catch (error) {
      console.error("Error submitting section:", error);
      toast.error(error.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{section ? "Edit Section" : "Add New Section"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Order"
                type="number"
                {...register("order", { valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={section?.isActive}
                    {...register("isActive")}
                  />
                }
                label="Active"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Packages
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="packages-label">Select Packages</InputLabel>
                <Select
                  labelId="packages-label"
                  multiple
                  value={selectedPackages}
                  onChange={(e) => setValue("packages", e.target.value)}
                  input={<OutlinedInput label="Select Packages" />}
                  MenuProps={MenuProps}
                  renderValue={(selected) => (
                    <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                      {selected.map((value) => {
                        const selectedPackage = packages.find(pkg => pkg._id === value);
                        return (
                          <Chip
                            key={value}
                            label={selectedPackage?.name || value}
                            onDelete={() => handleRemovePackage(value)}
                          />
                        );
                      })}
                    </Stack>
                  )}
                >
                  {fetchingPackages ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Loading packages...
                    </MenuItem>
                  ) : (
                    packages.map((pkg) => (
                      <MenuItem key={pkg._id} value={pkg._id}>
                        {pkg.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>

              {selectedPackages.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Selected Packages (Use arrows to reorder)
                  </Typography>
                  <List sx={{ width: "100%" }}>
                    {selectedPackages.map((packageId, index) => {
                      const selectedPackage = packages.find(
                        (pkg) => pkg._id === packageId
                      );
                      return (
                        <Paper
                          key={`package-${packageId}`}
                          elevation={1}
                          sx={{
                            mb: 1,
                            transition: "all 0.2s ease",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.02)",
                            },
                          }}
                        >
                          <ListItem>
                            <ListItemText
                              primary={
                                selectedPackage
                                  ? selectedPackage.name
                                  : packageId
                              }
                            />
                            <Stack direction="row" spacing={1}>
                              <IconButton
                                size="small"
                                onClick={() => handleMovePackage(index, 'up')}
                                disabled={index === 0}
                              >
                                <ArrowUpwardIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleMovePackage(index, 'down')}
                                disabled={index === selectedPackages.length - 1}
                              >
                                <ArrowDownwardIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleRemovePackage(packageId)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Stack>
                          </ListItem>
                        </Paper>
                      );
                    })}
                  </List>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : section ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SectionForm;
