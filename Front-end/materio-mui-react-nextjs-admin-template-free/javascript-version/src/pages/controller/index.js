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
import PresetMenu from './presetMenu'


/**
 ** Icons Imports:
 * ! You need to import all the icons which come from the API or from your server and then add these icons in 'icons' variable.
 * ! If you need all the icons from the library, use "import * as Icon from 'mdi-material-ui'"
 * */



const Controller = () => {
  const devices = ["LIGHT", "FAN", "AIR-CONDITIONER", "SMART TV"]

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h4' style={{ display: 'inline-block', verticalAlign: 'middle', lineHeight: '28px' }}>
          <Link href='https://materialdesignicons.com/' target='_blank'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" style={{ verticalAlign: 'middle' }}>
              <path d="M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z" />
            </svg>
            &nbsp;Device Controller
          </Link>
        </Typography>
      </Grid>
      <Grid item>
        <PresetMenu/>
      </Grid>
      {devices.map(device => (
        <Grid 
          item key={device} 
          spacing={2} 
          padding={1} 
        >
          <BasicCard text={device} />
        </Grid>
      ))}

    </Grid>
  )
}

export default Controller
