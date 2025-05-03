import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  Link,
} from "@mui/material";
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  EmailOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
import EnquiryForm from "./EnquiryForm";
import api from "../../services/api";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingEnquiryId, setDeletingEnquiryId] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await api.get("/enquiries");
      setEnquiries(response.data);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      toast.error(error.message || "Failed to fetch enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleView = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    setDeletingEnquiryId(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingEnquiryId) {
      toast.error("No enquiry selected for deletion");
      return;
    }

    setDeleteLoading(true);
    try {
      await api.delete(`/enquiries/${deletingEnquiryId}`);
      setEnquiries(
        enquiries.filter((enquiry) => enquiry._id !== deletingEnquiryId)
      );
      toast.success("Enquiry deleted successfully");
    } catch (error) {
      console.error("Error deleting enquiry:", error);
      toast.error(error.message || "Failed to delete enquiry");
    } finally {
      setDeleteLoading(false);
      setConfirmDeleteOpen(false);
      setDeletingEnquiryId(null);
    }
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedEnquiry(null);
  };

  const filteredEnquiries = enquiries.filter(
    (enquiry) =>
      enquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4">Enquiry Management</Typography>
          <TextField
            placeholder="Search enquiries..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEnquiries.map((enquiry) => (
                  <TableRow key={enquiry?._id}>
                    <TableCell>{enquiry?.name}</TableCell>
                    <TableCell>
                      <Link
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        target="_blank"
                        href={`mailto:${enquiry?.email}`}
                      >
                        <EmailOutlined />
                        {enquiry?.email}{" "}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        target="_blank"
                        href={`tel:${enquiry?.phone}`}
                      >
                        <PhoneOutlined />
                        {enquiry?.phone}{" "}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {new Date(enquiry?.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(enquiry?.createdAt).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </TableCell>
                    <TableCell>{enquiry?.status || "Pending"}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleView(enquiry)}
                        color="primary"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(enquiry._id)}
                        color="error"
                        disabled={
                          deleteLoading && deletingEnquiryId === enquiry._id
                        }
                      >
                        {deleteLoading && deletingEnquiryId === enquiry._id ? (
                          <CircularProgress size={24} />
                        ) : (
                          <DeleteIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <EnquiryForm
          open={openForm}
          onClose={handleCloseForm}
          enquiry={selectedEnquiry}
          onSuccess={fetchEnquiries}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={confirmDeleteOpen}
          onClose={() => !deleteLoading && setConfirmDeleteOpen(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this enquiry? This action cannot
              be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setConfirmDeleteOpen(false)}
              color="primary"
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              color="error"
              disabled={deleteLoading}
            >
              {deleteLoading ? <CircularProgress size={24} /> : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default EnquiryList;
