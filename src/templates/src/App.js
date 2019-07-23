import React from 'react';
import LandingPageImg from '../media/undraw_landing_page.svg';

export default () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '50px' }}>
      <h1>@open-tech-world/create-react-app</h1>
      <img src={LandingPageImg} alt="Landing page img" />
    </div>
  );
};
