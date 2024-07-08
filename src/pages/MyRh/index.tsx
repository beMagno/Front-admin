import React from 'react';
import Benefits from '../../components/MyRh/Benefits';
import Documents from '../../components/MyRh/Documents';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

  const MyRh = () => {
    const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', padding:0 }}>
          <Tabs 
            value={value} 
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Benefícios" value="1" />
            <Tab label="Documentos" value="2" />
          </Tabs>
        </Box>
        <TabPanel value="1">
          <Benefits />
        </TabPanel>
        <TabPanel value="2">
          <Documents />
        </TabPanel>
      </TabContext>
    </Box>
  );
};


  export default MyRh;
