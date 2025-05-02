import { Grid, Paper, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const ActivityList = ({ title, items }) => (
    <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <List>
                {items.map((item) => (
                    <ListItem key={item._id}>
                        <ListItemText
                            primary={item.name || item.title}
                            secondary={formatDate(item.updatedAt)}
                        />
                        <Chip
                            label={item.isActive ? 'Active' : 'Inactive'}
                            color={item.isActive ? 'success' : 'error'}
                            size="small"
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    </Grid>
);

const RecentActivities = ({ data }) => {
    if (!data) return null;

    return (
        <Grid container spacing={3}>
            <ActivityList
                title="Recent Packages"
                items={data.packages}
            />
            <ActivityList
                title="Recent Sections"
                items={data.sections}
            />
        </Grid>
    );
};

export default RecentActivities; 