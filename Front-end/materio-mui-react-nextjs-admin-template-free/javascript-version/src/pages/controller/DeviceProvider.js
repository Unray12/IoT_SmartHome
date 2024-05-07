import React, { createContext, useState, useEffect } from 'react';

// ** Axios Import
import axios from 'axios';
export const deviceContext = createContext();

export const DeviceProvider = ({ children }) => {
    const [lightChecked, setLightChecked] = useState(false);
    const [fanChecked, setFanChecked] = React.useState(false);
    const [doorOpen, setDoorOpen] = React.useState(false);
    const [fanLevel, setFanLevel] = React.useState(0);
    const [lightLevel, setLightLevel] = React.useState(4);

    useEffect(() => {
        const BackendLink = 'https://hgs-backend.onrender.com';
        const fetchData = async () => {
          try {
            const response = await axios.get(`${BackendLink}/users/getDashboardData`, {
              headers: {
                Authorization: localStorage.getItem('SavedToken'),
              },
            });
            
    
            const data = response.data;
            setLightChecked(data.light);
            setFanChecked(data.fan);
            setFanLevel(data.fan_speed);
            setLightLevel(data.light_level);
            setDoorOpen(data.door);
            console.log("It runs");
          } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors gracefully
          }
        };
    
        fetchData(); // Fetch data immediately for testing
    
        const intervalId = setInterval(fetchData, 5000); // Fetch data every 8 seconds
    
        return () => clearInterval(intervalId); // Cleanup on component unmount
      }, []); // Empty dependency array ensures data is fetched only once on component mount

    return ( 
    <deviceContext.Provider value={{ lightChecked, setLightChecked, fanChecked, setFanChecked, fanLevel, setFanLevel, doorOpen, setDoorOpen, lightLevel, setLightLevel }}>
        {children}
    </deviceContext.Provider>
    );
}