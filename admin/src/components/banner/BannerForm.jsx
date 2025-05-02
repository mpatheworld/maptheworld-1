import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { bannerApi } from '../../services/api';
import { uploadImageToCloudinary } from '../../utils/cloudinary'; // ✅ Imported from utility

const BannerForm = ({ open, onClose, banner, onSuccess }) => {
  const [imagePreview, setImagePreview] = useState(banner?.image?.url || '');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
      link: '',
      order: 0,
      isActive: true,
    },
  });

  // Update form values when banner changes
  useEffect(() => {
    if (banner) {
      setValue('title', banner.title);
      setValue('description', banner.description);
      setValue('link', banner.link);
      setValue('order', banner.order);
      setValue('isActive', banner.isActive);
      setImagePreview(banner.image?.url || '');
    } else {
      reset();
      setImagePreview('');
    }
  }, [banner, setValue, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      let image = banner?.image || null;

      // If new image is selected, upload it to Cloudinary
      if (imageFile) {
        const imageData = await uploadImageToCloudinary(imageFile);
        if (!imageData?.url) throw new Error('Image upload failed');
        image = imageData;
      }

      const payload = {
        title: data.title,
        description: data.description,
        link: data.link,
        order: data.order,
        isActive: data.isActive,
        image, // { url, publicId }
      };

      // Create or update the banner
      if (banner) {
        await bannerApi.update(banner._id, payload);
        toast.success('Banner updated successfully');
      } else {
        await bannerApi.create(payload);
        toast.success('Banner created successfully');
      }

      onSuccess();
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setImagePreview('');
    setImageFile(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{banner ? 'Edit Banner' : 'Add New Banner'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                {...register('title', { required: 'Title is required' })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" multiline rows={3} {...register('description')} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Link" {...register('link')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Order"
                type="number"
                {...register('order', { valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch {...register('isActive')} />
                }
                label="Active"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Button variant="contained" component="label">
                  Upload Image
                  <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>
              </Box>
              {imagePreview && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Image Preview:
                  </Typography>
                  <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200 }} />
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : banner ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BannerForm;
