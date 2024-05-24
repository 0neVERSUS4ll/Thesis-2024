// DeviceToolbar.js
import React from 'react';
import Device from './device';

const DeviceToolbar = ({ selectDevice }) => {
  return (
    <div>
      <Device type="Device1" />
      <Device type="Device2" />
      {/* Add more devices as needed */}
    </div>
  );
};

export default DeviceToolbar;