import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import BasicSwitches from './switch';
import Grid from '@mui/material/Grid';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';


const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

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
    <Card 
    sx={{ width: "50%", minWidth: 400, minHeight: 150}}>

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
        {/* {{text} == "FAN" } */}
        </Grid>


      </CardContent>
    </Card>
  );
}