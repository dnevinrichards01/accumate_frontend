import React, { useState } from 'react';
import Slider from 'rc-slider';


const CustomSlider = ({props}) => {
    let { min, max, step, initialValue, sliderHandleChange } = props;

    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
    const secondaryColor = rootStyles.getPropertyValue('--secondary-color').trim();

    return (
    <div style={{ width: '100%'}}>
        <Slider
            min={min}
            max={max}
            step={step}
            value={initialValue}
            onChange={sliderHandleChange}
            styles={{
                rail: { backgroundColor: '#ddd', height: 10 },
                track: { backgroundColor: `${primaryColor}`, height: 10 },
                handle: {
                    borderColor: `${primaryColor}`,
                    height: 20,
                    width: 20,
                    marginLeft: -10,
                    marginTop: -5,
                    backgroundColor: '#fff',
                    boxShadow: `${secondaryColor}`
                }
            }}
        />
    </div>
  );
};

export default CustomSlider;
