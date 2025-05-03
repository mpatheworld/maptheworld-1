import React, { useState, useEffect } from 'react';
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
  Switch,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import SectionForm from './SectionForm';
import Layout from '../layout/Layout';
import { sectionApi } from '../../services/api';

const SectionList = () => {
  const [sections, setSections] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingSectionId, setDeletingSectionId] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const response = await sectionApi.getAll();
      setSections(response.data);
    } catch (error) {
      console.error('Error fetching sections:', error);
      toast.error(error.message || 'Failed to fetch sections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleEdit = (section) => {
    setSelectedSection(section);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    const section = sections.find(s => s._id === id);
    if (!section) {
      toast.error('Section not found');
      return;
    }
    setSelectedSection(section);
    setDeletingSectionId(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingSectionId) {
      toast.error('No section selected for deletion');
      return;
    }

    setDeleteLoading(true);
    try {
      await sectionApi.delete(deletingSectionId);
      setSections(sections.filter(section => section._id !== deletingSectionId));
      toast.success('Section deleted successfully');
    } catch (error) {
      console.error('Error deleting section:', error);
      toast.error(error.message || 'Failed to delete section');
      fetchSections();
    } finally {
      setDeleteLoading(false);
      setConfirmDeleteOpen(false);
      setDeletingSectionId(null);
      setSelectedSection(null);
    }
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedSection(null);
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Section Management</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenForm(true)}
          >
            Add New Section
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
                  <TableCell>Title</TableCell>
                  <TableCell>Packages</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Order</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sections.map((section) => (
                  <TableRow key={section._id}>
                    <TableCell>{section.title}</TableCell>
                    <TableCell>{section.packages.length}</TableCell>
                    <TableCell>{section.description}</TableCell>
                    <TableCell>{section.order}</TableCell>
                    <TableCell>
                      <Switch
                        checked={section.isActive}
                        onChange={async () => {
                          try {
                            await sectionApi.update(section._id, {
                              ...section,
                              isActive: !section.isActive
                            });
                            fetchSections();
                          } catch (error) {
                            toast.error('Failed to update section status');
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(section)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDelete(section._id)} 
                        color="error"
                        disabled={deleteLoading && deletingSectionId === section._id}
                      >
                        {deleteLoading && deletingSectionId === section._id ? (
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

        <SectionForm
          open={openForm}
          onClose={handleCloseForm}
          section={selectedSection}
          onSuccess={fetchSections}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={confirmDeleteOpen}
          onClose={() => !deleteLoading && setConfirmDeleteOpen(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this section? This action cannot be undone.
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

export default SectionList; 