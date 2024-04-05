import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Fan } from 'mdi-material-ui';
import axios from 'axios';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';



const label = { inputProps: { 'aria-label': 'Switch demo' } };




const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


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

const BElink = "https://hgs-backend.onrender.com"
export default function BasicSwitches(props) {
  const { text } = props
  const [fanChecked, setFanChecked] = React.useState(false);
  const [fanLevel, setFanLevel] = React.useState(0);
  const [lightChecked, setLightChecked] = React.useState(false);
  
  const handleChangeFan = async (event) => {
    setFanChecked(event.target.checked);
    try {
      const response = event.target.checked ? await axios.post(BElink + "/users/turnOnFan") : await axios.post(BElink + "/users/turnOffFan");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    
  }

  const handleFanLevel = async (event) => {
    setFanLevel(event.target.value);
    try {
      const response = await axios.post(BElink + "/users/updateFanSpeed", 
      {
        fan_speed:parseInt(event.target.value, 10), 
        headers: {
        "Content-Type": "application/json"
      }})
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeLight = async (event) => {
    setLightChecked(event.target.checked);

    try {
      const response = event.target.checked ? await axios.post(BElink + "/users/turnOnLight") : await axios.post(BElink + "/users/turnOffLight");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    
  }

  const handleOnChange = (event) => {
    if (text == "LIGHT")
      handleChangeLight(event);
    else if (text == "FAN")
      handleChangeFan(event);
  }
  
  return (
    <div>
      <FormGroup>
        {/* <FormControlLabel control={
          <Switch 
            defaultChecked 
            size="medium"
            color="warning"
            sx={{
              transform: 'scale(1.5)', // Adjust the scale as per your requirement
            }}
            checked={fanChecked}
            onChange={handleChangeFan}
          />} 
          labelPlacement='top'
          label="FAN" /> */}
      {/* </FormGroup> */}

        <FormControlLabel
          control={<IOSSwitch 
            sx={{ 
              m: 1,
              transform: 'scale(1)',
            }} 
            defaultChecked
            checked={text == "LIGHT" ? lightChecked : fanChecked} 
            onChange={handleOnChange}/>}
            labelPlacement='top'
            label=""
        />

    </FormGroup>
    {text == "FAN" &&
    <FormGroup>
      <FormControlLabel
        control={<PrettoSlider
          valueLabelDisplay="auto"
          value={fanLevel}
          onChange={handleFanLevel}
          aria-label="pretto slider"
          defaultValue={20} 
          sx={{
            width: '100%', // Adjust the width as per your requirement
          }}
        />}
        labelPlacement='top'
        label="FAN SLIDER"
      />
      </FormGroup>}



    </div>
  );
}

