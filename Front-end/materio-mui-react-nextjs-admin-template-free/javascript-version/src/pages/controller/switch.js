import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Fan } from 'mdi-material-ui';
import axios from 'axios';

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


const BElink = "https://hgs-backend.onrender.com"
export default function BasicSwitches() {
  const [fanChecked, setChecked] = React.useState(false);
  
  const handleChangeFan = async (event) => {
    setChecked(event.target.checked);

    try {
      const response = event.target.checked ? await axios.get(BElink + "/users/turnOnLight") : await axios.get(BElink + "/users/turnOffLight");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    
  }

  const handleChangeLight = async (event) => {
    setChecked(event.target.checked);

    try {
      const response = event.target.checked ? await axios.get(BElink + "/users/turnOnLight") : await axios.get(BElink + "/users/turnOffLight");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    
  }

  
  return (
    <div>
      <FormGroup>
        <FormControlLabel control={
          <Switch 
            defaultChecked 
            size="medium"
            color="warning"
            checked={fanChecked}
            onChange={handleChangeFan}
          />} label="FAN" />
      </FormGroup>

      <FormControlLabel
        control={<IOSSwitch 
          sx={{ m: 1 }} 
          defaultChecked 
          onChange={handleChangeLight}/>}
        label="LIGHT"
      />
    </div>
  );
}

