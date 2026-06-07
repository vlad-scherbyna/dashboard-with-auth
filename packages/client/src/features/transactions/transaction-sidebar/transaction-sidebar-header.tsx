import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  onClose: () => void;
}

export function TransactionSidebarHeader({ onClose }: Props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Transaction details
      </Typography>
      <IconButton onClick={onClose} aria-label="Close">
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
