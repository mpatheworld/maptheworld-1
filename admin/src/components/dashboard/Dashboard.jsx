import { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import api from '../../services/api';
import Stats from './Stats';
import RecentActivities from './RecentActivities';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [activities, setActivities] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, activitiesRes] = await Promise.all([
                    api.get('/admin/dashboard/stats'),
                    api.get('/admin/dashboard/activities')
                ]);
                setStats(statsRes.data);
                setActivities(activitiesRes.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stats data={stats} />
                </Grid>
                <Grid item xs={12}>
                    <RecentActivities data={activities} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard; 