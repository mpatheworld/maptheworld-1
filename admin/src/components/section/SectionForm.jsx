import React, { useEffect } from 'react';
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
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { sectionApi } from '../../services/api';

const SectionForm = ({ open, onClose, section, onSuccess }) => {
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
      identifier: '',
      order: 0,
      isActive: true,
      filterCriteria: {
        priceRange: {
          min: '',
          max: ''
        },
        duration: {
          min: '',
          max: ''
        },
        sortBy: {
          field: 'price',
          order: 'asc'
        }
      },
      limit: 6
    }
  });

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (section) {
      setValue('title', section.title);
      setValue('description', section.description);
      setValue('identifier', section.identifier);
      setValue('order', section.order);
      setValue('isActive', section.isActive);
      setValue('filterCriteria', section.filterCriteria || {
        priceRange: { min: '', max: '' },
        duration: { min: '', max: '' },
        sortBy: { field: 'price', order: 'asc' }
      });
      setValue('limit', section.limit || 6);
    }
  }, [section, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Clean up empty values in filterCriteria
      const filterCriteria = {
        priceRange: {
          min: data.filterCriteria.priceRange.min || undefined,
          max: data.filterCriteria.priceRange.max || undefined
        },
        duration: {
          min: data.filterCriteria.duration.min || undefined,
          max: data.filterCriteria.duration.max || undefined
        },
        sortBy: data.filterCriteria.sortBy
      };

      const payload = {
        ...data,
        filterCriteria
      };

      if (section) {
        await sectionApi.update(section._id, payload);
        toast.success('Section updated successfully');
      } else {
        await sectionApi.create(payload);
        toast.success('Section created successfully');
      }

      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error submitting section:', error);
      toast.error(error.message || 'Operation failed');
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
      <DialogTitle>{section ? 'Edit Section' : 'Add New Section'}</DialogTitle>
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
              <TextField
                fullWidth
                label="Identifier"
                {...register('identifier', { 
                  required: 'Identifier is required',
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message: 'Identifier can only contain lowercase letters, numbers, and hyphens'
                  }
                })}
                error={!!errors.identifier}
                helperText={errors.identifier?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                {...register('description', { required: 'Description is required' })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
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
              <Typography variant="subtitle1" gutterBottom>
                Filter Criteria
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Min Price"
                type="number"
                {...register('filterCriteria.priceRange.min', { valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Max Price"
                type="number"
                {...register('filterCriteria.priceRange.max', { valueAsNumber: true })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Min Duration (days)"
                type="number"
                {...register('filterCriteria.duration.min', { valueAsNumber: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Max Duration (days)"
                type="number"
                {...register('filterCriteria.duration.max', { valueAsNumber: true })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Sort By"
                {...register('filterCriteria.sortBy.field')}
              >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="duration">Duration</MenuItem>
                <MenuItem value="createdAt">Created Date</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Sort Order"
                {...register('filterCriteria.sortBy.order')}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Display Limit"
                type="number"
                {...register('limit', { 
                  valueAsNumber: true,
                  min: { value: 1, message: 'Limit must be at least 1' },
                  max: { value: 50, message: 'Limit cannot exceed 50' }
                })}
                error={!!errors.limit}
                helperText={errors.limit?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : section ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SectionForm; 