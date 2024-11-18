import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const CustomSlider = ({props}) => {
    let { min, max, step, initialValue, sliderHandleChange } = props;

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
                track: { backgroundColor: 'rgb(139, 74, 139)', height: 10 },
                handle: {
                    borderColor: 'rgb(139, 74, 139)',
                    height: 20,
                    width: 20,
                    marginLeft: -10,
                    marginTop: -5,
                    backgroundColor: '#fff',
                    boxShadow: 'rgb(110, 58, 110)'
                }
            }}
        />
    </div>
  );
};

export default CustomSlider;
