import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SimpleDialogDemo from './subWindowDevices';
import axios from 'axios';

const BElink = "https://hgs-backend.onrender.com";

export default function PresetMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [listPreset, setListPreset] = React.useState([]);
  const open = Boolean(anchorEl);

  const getAllHouseSetting = async () => {
    console.log(localStorage.getItem("SavedToken"))

    var a = await axios.get(BElink + '/users/getHouseSetting?house_id=1', { headers: { Authorization:localStorage.getItem('SavedToken') }});
    console.log(a)
  }

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
    let response = await axios.get(BElink + '/users/getHouseSetting?house_id=1', { headers: { Authorization:localStorage.getItem('SavedToken') }});
    setListPreset(response.data);
    console.log(response);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addMorePreset = () => {

  }
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Presetting menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {listPreset.map(preset => (

            <MenuItem onClick={handleClose} key = {preset.name}> {preset.name} </MenuItem>
            
          ))}
        <Button onClick={addMorePreset}>Add more</Button>
        <SimpleDialogDemo/>
      </Menu>
      {/* <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        <MenuItem onClick={handleClose}>Set 1</MenuItem>
        <MenuItem onClick={handleClose}>Set 2</MenuItem>
        <MenuItem onClick={handleClose}>Set 3</MenuItem>
        <Button onClick={addMorePreset}>Add more</Button>
        <SimpleDialogDemo/>
      </Menu> */}
    </div>
  );
}