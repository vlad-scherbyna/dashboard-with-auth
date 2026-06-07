import { AppBar, Toolbar, Typography, Button, Box, Skeleton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../features/auth';
import { TestAutomation } from '../types/core';

interface Props extends TestAutomation {
  smeName?: string;
  loading?: boolean;
}

export default function Header({ smeName, loading, 'data-testid': testId }: Props) {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" elevation={1} data-testid={testId}>
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          {loading ? (
            <Skeleton variant="text" width={200} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
          ) : (
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {smeName}
            </Typography>
          )}
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.85 }}>
          {user?.name}
        </Typography>
        <Button color="inherit" startIcon={<LogoutIcon />} onClick={logout} size="small">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
