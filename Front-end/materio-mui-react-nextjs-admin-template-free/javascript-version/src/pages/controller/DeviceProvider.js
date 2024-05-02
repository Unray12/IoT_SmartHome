import React, { createContext, useState } from 'react';


export const deviceContext = createContext();

export const DeviceProvider = ({ children }) => {
    const [lightChecked, setLightChecked] = useState(false);
    const [fanChecked, setFanChecked] = React.useState(false);

    return ( 
    <deviceContext.Provider value={{ lightChecked, setLightChecked, fanChecked, setFanChecked }}>
        {children}
    </deviceContext.Provider>
    );
}