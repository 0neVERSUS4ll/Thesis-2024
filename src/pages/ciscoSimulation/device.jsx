// Device.js
import React from 'react';
import Draggable from 'react-draggable';

const Device = ({ type }) => {
  return (
    <Draggable>
      <div>
        <h2>{type} Device</h2>
        {/* Add your device logic here */}
      </div>
    </Draggable>
  );
};

export default Device;