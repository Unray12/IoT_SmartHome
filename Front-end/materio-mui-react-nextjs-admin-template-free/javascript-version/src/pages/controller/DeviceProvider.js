import React, { createContext, useState } from 'react';


export const deviceContext = createContext();

export const DeviceProvider = ({ children }) => {
    const [lightChecked, setLightChecked] = useState(false);
    const [fanChecked, setFanChecked] = React.useState(false);
    const [doorOpen, setDoorOpen] = React.useState(false);
    const [fanLevel, setFanLevel] = React.useState(0);
    const [lightLevel, setLightLevel] = React.useState(4);

    return ( 
    <deviceContext.Provider value={{ lightChecked, setLightChecked, fanChecked, setFanChecked, fanLevel, setFanLevel, doorOpen, setDoorOpen, lightLevel, setLightLevel }}>
        {children}
    </deviceContext.Provider>
    );
}