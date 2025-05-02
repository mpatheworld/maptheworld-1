import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = React.memo(({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleToggleSidebar = React.useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <Header onToggleSidebar={handleToggleSidebar} />
            <Sidebar open={isSidebarOpen} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${isSidebarOpen ? 240 : 0}px)` },
                    mt: 8,
                    // ml: { sm: isSidebarOpen ? '240px' : 0 },
                    transition: 'margin 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms'
                }}
            >
                {children}
            </Box>
        </Box>
    );
});

export default Layout; 