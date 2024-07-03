import React from 'react';
import Benefits from '../../components/MyRh/Benefits';
import Documents from '../../components/MyRh/Documents';

  const MyRh = () => {
    return (
      <div>
        <h1 style={{marginBottom:30}}>Meu RH</h1>
        <Benefits/>
        <Documents/>
      </div>
    );
  };

  export default MyRh;
