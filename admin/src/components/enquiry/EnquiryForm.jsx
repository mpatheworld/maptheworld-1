import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
} from "@mui/material";
import {
  EmailOutlined,
  OpenInBrowser,
  PhoneOutlined,
  WhatsApp,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../services/api";

const EnquiryForm = ({ open, onClose, enquiry, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      status: "pending",
      notes: "",
    },
  });

  // Update form values when enquiry changes
  React.useEffect(() => {
    if (enquiry) {
      setValue("status", enquiry.status || "pending");
      setValue("notes", enquiry.notes || "");
    } else {
      reset();
    }
  }, [enquiry, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await api.put(`/enquiries/${enquiry._id}`, data);
      toast.success("Enquiry updated successfully");
      onSuccess();
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update enquiry");
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
      <DialogTitle>Enquiry Details</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {enquiry?.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneOutlined />
                <Link
                  href={`tel:${enquiry?.phone}`}
                  target="_blank"
                  sx={{ textDecoration: "none" }}
                >
                  {enquiry?.phone}
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailOutlined />
                <Link
                  href={`mailto:${enquiry?.email}`}
                  target="_blank"
                  sx={{ textDecoration: "none" }}
                >
                  {enquiry?.email}
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WhatsApp />
                <Link
                  href={`https://wa.me/${enquiry?.phone}`}
                  target="_blank"
                  sx={{ textDecoration: "none" }}
                >
                  {enquiry?.phone}
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Enquiry Generated Source :{enquiry?.source}
              </Typography>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
                href={import.meta.env.VITE_CLIENT_DOMAIN_NAME + enquiry?.path}
                target="_blank"
                variant="body1"
                sx={{ whiteSpace: "pre-wrap" }}
              >
                <OpenInBrowser /> {enquiry?.path}
              </Link>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle1" gutterBottom>
                Time :{" "}
                {new Date(enquiry?.createdAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}{" "}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subtitle1" gutterBottom>
                Date : {new Date(enquiry?.createdAt).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Message :
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                {enquiry?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  defaultValue={enquiry?.status}
                  label="Status"
                  {...register("status")}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                {...register("notes")}
                placeholder="Add any notes or follow-up information here..."
              />
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
            {loading ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EnquiryForm;
