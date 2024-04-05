import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BasicSwitches from './switch';
import Grid from '@mui/material/Grid';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard(props) {
    const { text } = props
  return (
    <Card sx={{ width: "50%", minWidth: 400 }}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
            {text}
            </Grid>
        
            <Grid item justifyContent="flex-end" alignItems="top right">
                <BasicSwitches text={text}/>
            </Grid>
         </Grid>
         <Grid container justifyContent="space-between" alignItems="center">
            <Grid item sx={{ fontSize: 14, width: 'fit-content'}} color="text.secondary" gutterBottom>
                Active 3 hours ago
            </Grid>
        {{text} == "FAN" }
         </Grid>


      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}