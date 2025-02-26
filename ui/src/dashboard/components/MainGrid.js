import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function MainGrid(props) {
    const models=props.models
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRedirect = () => {
    setOpen(false);
  };
  const images = ["RedBubbleVVG/alessia/alessia_2.jpg", "RedBubbleVVG/alessia/alessia_14.jpg", "RedBubbleVVG/Hats/Hats_4.jpg", "RedBubbleVVG/Hats/Hats_5.jpg", "RedBubbleVVG/Hats/Hats_42.jpg", "RedBubbleVVG/Hoodie/Hoodie_46.jpg", "RedBubbleVVG/Hoodie/Hoodie_59.jpg", "RedBubbleVVG/Stickers/Stickers_7.jpg", "RedBubbleVVG/Stickers/Stickers_10.jpg", "RedBubbleVVG/Stickers/Stickers_211.jpg", "RedBubbleVVG/Stickers/Stickers_135.jpg", "RedBubbleVVG/TShirts/TShirts_11.jpg", "RedBubbleVVG/TShirts/TShirts_55.jpg", "RedBubbleVVG/van gogh phone/van gogh phone_3.jpg", "RedBubbleVVG/van gogh phone/van gogh phone_25.jpg", "RedBubbleVVG/van gogh phone/van gogh phone_246.jpg"]
const data = [
    {
        title: 'Images analyzed',
        value: models.length > 0 ? models[0].images.length : 0,
        interval: 'Last 30 days'
    },
    {
        title: 'Potential copyright violations found',
        value: images.length,
        interval: 'Last 30 days'
    },
    ];
    
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Welcome Vincent
      </Typography>
      {models.length > 0 ?
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            {index == 1 ? 
            <StatCard {...card} onClick={handleClickOpen}/>
            :
            <StatCard {...card} />
            }
          </Grid>
        ))}
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Copyright Violations"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The following images may be copyright violations. 
          </DialogContentText>
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {images.map((item, index) => (
            <ImageListItem key={index}>
            <img
                src={item}
                loading="lazy"
            />
            </ImageListItem>
        ))}
        </ImageList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleRedirect} href="/" autoFocus>
            Learn More
          </Button>
        </DialogActions>
      </Dialog>
      </Grid>
      : 
      <Typography>
        You have no trained models to analyse. Click on add models to train a copyright detection model.
      </Typography>
}
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
