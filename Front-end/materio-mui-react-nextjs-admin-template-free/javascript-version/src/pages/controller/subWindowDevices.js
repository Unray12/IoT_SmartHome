import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import { DialogContent } from '@mui/material';
import Slider from '@mui/material/Slider';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} >
      <DialogTitle>Presetting devices</DialogTitle>
      <DialogContent sx={{ padding: '20px' }} >
        <FormGroup>
            <FormControlLabel control={<Switch defaultChecked />} label="FAN"  />
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
            <FormControlLabel control={<Switch defaultChecked />} label="LIGHT" />
            <FormControlLabel control={<Switch defaultChecked />} label="AIR-CONDITIONER"/>
        </FormGroup>
        <Stack sx={{ margin: '20px' }}>
            <Button variant="contained">Save</Button>
        </Stack>
    </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};


// export default function SimpleDialogDemo() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog
//         selectedValue={selectedValue}
//         open={open}
//         onClose={handleClose}
//       />
//     </div>
//   );
// }