// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import BasicSwitches from './switch'
import controllerCard from './card'
import BasicCard from './card'



/**
 ** Icons Imports:
 * ! You need to import all the icons which come from the API or from your server and then add these icons in 'icons' variable.
 * ! If you need all the icons from the library, use "import * as Icon from 'mdi-material-ui'"
 * */

 const devices = ["LIGHT", "FAN", "AIR-CONDITIONER", "SMART TV"]

const Controller = () => {
  

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://materialdesignicons.com/' target='_blank'>
            Material Design Icons
          </Link>
        </Typography>
        <Typography variant='body2'>Material Design Icons from the Community</Typography>
        {/* {devices.map(device => {
          <span key={device}>
            <BasicCard text={device}/>
          </span>
        })} */}
          <Grid container spacing={3} padding={3}>
            <Grid item>
              <BasicCard text="LIGHT"/>
            </Grid>
            <Grid item>
            <BasicCard text="FAN"/>
            </Grid>
          </Grid>

          <Grid container spacing={3} padding={3}>
          <Grid item>
          <BasicCard text="SMART TV"/>
          </Grid>
          <Grid item>
          <BasicCard text="AIR-CONDITIONER"/>
          </Grid>
          </Grid>
        {/* <BasicSwitches/> */}
        <col/>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          
        </Grid>
      </Grid>
      
    </Grid>
  )
}

export default Controller
