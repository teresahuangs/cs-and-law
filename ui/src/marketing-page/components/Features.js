import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiChip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';

const items = [
  {
    icon: <SearchRoundedIcon />, 
    title: 'AI-Powered Detection',
    description:
      'Upload artwork and let our AI analyze its copyright status, comparing it against global databases.'
  },
  {
    icon: <SecurityRoundedIcon />, 
    title: 'Protection & Monitoring',
    description:
      'Track and protect your intellectual property with automated copyright infringement alerts.'
  },
  {
    icon: <GavelRoundedIcon />, 
    title: 'Legal Insights & Actions',
    description:
      'Receive actionable legal guidance on licensing, fair use, and copyright claims.'
  }
];

const Chip = styled(MuiChip)(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        background:
          'linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))',
        color: 'hsl(0, 0%, 100%)',
        borderColor: (theme.vars || theme).palette.primary.light,
        '& .MuiChip-label': {
          color: 'hsl(0, 0%, 100%)',
        },
        ...theme.applyStyles('dark', {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

export default function Features() {
  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 }, textAlign: 'center' }}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h2" variant="h4" gutterBottom sx={{ color: 'text.primary' }}>
          How ArtGuard AI Protects Your Work
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: { xs: 2, sm: 4 }, maxWidth: 800 }}>
          ArtGuard AI uses cutting-edge technology to analyze, track, and protect digital artworks. Our AI-driven system detects potential copyright issues and provides legal insights to safeguard your creations.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        {items.map(({ icon, title, description }, index) => (
          <Box
            key={index}
            sx={{
              p: 3,
              width: '100%',
              maxWidth: 600,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            {icon}
            <Typography variant="h6" sx={{ mt: 1 }}>{title}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>{description}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}


