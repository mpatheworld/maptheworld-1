import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Box,
    Divider,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Flight as PackageIcon,
    ViewList as SectionIcon,
    Image as ImageIcon,
    Email as EmailIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
    {
        text: 'Dashboard',
        icon: <DashboardIcon />,
        path: '/dashboard'
    },
    {
        text: 'Packages',
        icon: <PackageIcon />,
        path: '/packages'
    },
    {
        text: 'Sections',
        icon: <SectionIcon />,
        path: '/sections'
    },
    {
        text: 'Banners',
        icon: <ImageIcon />,
        path: '/banners'
    },
    {
        text: 'Enquiries',
        icon: <EmailIcon />,
        path: '/enquiries'
    }
];

const Sidebar = React.memo(({ open }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    transform: !open ? `translateX(-${drawerWidth}px)` : 'none',
                    transition: 'transform 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
                    overflowX: 'hidden'
                },
            }}
        >
            <Box sx={{ overflow: 'auto', mt: 8 }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={location.pathname === item.path}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
});

export default Sidebar; 