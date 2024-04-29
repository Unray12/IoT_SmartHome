// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WindPowerIcon from '@mui/icons-material/WindPower';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useState, useEffect } from 'react'
// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { WaterDropOutlined } from '@mui/icons-material'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'

import axios from 'axios'
const BackendLink = 'https://hgs-backend.onrender.com'

const Dashboard = () => {
  const [temperature, setTemperature] = useState(null); // State for temperature
  const [humidity, setHumidity] = useState(null);     // State for humidity
  const [fan_speed, setFanSpeed] = useState(null);    // State for fan speed
  const [light, setLight] = useState(null);           // State for light level

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BackendLink}/users/getDashboardData`, {headers: {Authorization: localStorage.getItem('SavedToken')}});
        const data = response.data;
        setTemperature(data.temperature);
        setHumidity(data.humidity);
        setFanSpeed(data.fan_speed);
        setLight(data.light);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    };

    const intervalId = setInterval(fetchData, 8000); // Fetch data every 5 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures data is fetched only once on componen

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={temperature ? `${temperature}°C` : 'Loading...'} // Display 'Loading...' or actual temperature
                icon={<DeviceThermostatIcon />}
                color='success'
                title='Current Temp'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={fan_speed ? `${fan_speed}%` : 'Loading...'} // Display 'Loading...' or actual fan speed
                title='Fan Speed'
                color='secondary'
                icon={<WindPowerIcon />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                  stats={humidity ? `${humidity}%` : 'Loading...'} // Display 'Loading...' or actual humidity
                title='Humidity'
                icon={<WaterDropOutlined />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={light ? `${light} lux` : 'Loading...'} // Display 'Loading...' or actual light level
                color='warning'
                title='Light Level'
                icon={<WbSunnyIcon />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
