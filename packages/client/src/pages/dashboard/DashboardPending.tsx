import { Box, Skeleton, List, ListItem } from '@mui/material';

export function DashboardPending() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Skeleton variant="rectangular" height={64} />
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Skeleton variant="text" width={180} height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={40} sx={{ mb: 3, borderRadius: 1 }} />
        <List sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <ListItem key={i} divider sx={{ gap: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="25%" />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                <Skeleton variant="text" width={60} />
                <Skeleton variant="rectangular" width={70} height={20} sx={{ borderRadius: 10 }} />
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
