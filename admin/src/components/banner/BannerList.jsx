import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CardMedia,
  Grid,
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
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import BannerForm from './BannerForm';
import Layout from '../layout/Layout';
import { bannerApi } from '../../services/api';
import { deleteImageFromCloudinary } from '../../utils/cloudinary';

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingBannerId, setDeletingBannerId] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await bannerApi.getAll();
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast.error(error.message || 'Failed to fetch banners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    const banner = banners.find(b => b._id === id);
    if (!banner) {
      toast.error('Banner not found');
      return;
    }
    setSelectedBanner(banner);
    setDeletingBannerId(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingBannerId || !selectedBanner) {
      toast.error('No banner selected for deletion');
      return;
    }

    setDeleteLoading(true);
    try {
      // First try to delete the image from Cloudinary
      if (selectedBanner.image?.publicId) {
        try {
          await deleteImageFromCloudinary(selectedBanner.image.publicId);
        } catch (cloudinaryError) {
          console.error('Error deleting image from Cloudinary:', cloudinaryError);
          // Continue with banner deletion even if image deletion fails
        }
      }

      // Then delete the banner from our backend
      await bannerApi.delete(deletingBannerId);
      setBanners(banners.filter(banner => banner._id !== deletingBannerId));
      toast.success('Banner deleted successfully');
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error(error.message || 'Failed to delete banner');
      // Refresh the banner list to ensure UI is in sync with backend
      fetchBanners();
    } finally {
      setDeleteLoading(false);
      setConfirmDeleteOpen(false);
      setDeletingBannerId(null);
      setSelectedBanner(null);
    }
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedBanner(null);
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Banner Management</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenForm(true)}
          >
            Add New Banner
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell>Order</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {banners.map((banner) => (
                  <TableRow key={banner._id}>
                    <TableCell>
                      <CardMedia
                        component="img"
                        sx={{ width: 100, height: 60, objectFit: 'cover' }}
                        image={banner.image.url}
                        alt={banner.title}
                      />
                    </TableCell>
                    <TableCell>{banner.title}</TableCell>
                    <TableCell>{banner.description}</TableCell>
                    <TableCell>{banner.link}</TableCell>
                    <TableCell>{banner.order}</TableCell>
                    <TableCell>{banner.isActive ? 'Active' : 'Inactive'}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(banner)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDelete(banner._id)} 
                        color="error"
                        disabled={deleteLoading && deletingBannerId === banner._id}
                      >
                        {deleteLoading && deletingBannerId === banner._id ? (
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

        <BannerForm
          open={openForm}
          onClose={handleCloseForm}
          banner={selectedBanner}
          onSuccess={fetchBanners}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={confirmDeleteOpen}
          onClose={() => !deleteLoading && setConfirmDeleteOpen(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this banner? This action cannot be undone.
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
              {deleteLoading ? <CircularProgress size={24} /> : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default BannerList;
