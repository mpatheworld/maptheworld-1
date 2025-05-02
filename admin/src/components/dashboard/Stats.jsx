import { Grid, Paper, Typography, Box } from '@mui/material';
import {
    Flight as PackageIcon,
    ViewList as SectionIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
    <Paper
        sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 140,
        }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {icon}
            <Typography color="text.secondary" sx={{ ml: 1 }}>
                {title}
            </Typography>
        </Box>
        <Typography component="p" variant="h4">
            {value}
        </Typography>
    </Paper>
);

const Stats = ({ data }) => {
    if (!data) return null;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    title="Total Packages"
                    value={data.packages.total}
                    icon={<PackageIcon color="primary" />}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    title="Active Packages"
                    value={data.packages.active}
                    icon={<PackageIcon color="success" />}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    title="Total Sections"
                    value={data.sections.total}
                    icon={<SectionIcon color="primary" />}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <StatCard
                    title="Active Sections"
                    value={data.sections.active}
                    icon={<SectionIcon color="success" />}
                />
            </Grid>
        </Grid>
    );
};

export default Stats; 