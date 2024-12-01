import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StepCounter = ({ userId }) => {
    const [stepCount, setStepCount] = useState(0);

    useEffect(() => {
        const handleMotionEvent = (event) => {
            const acceleration = event.acceleration;
            const stepThreshold = 15;

            if (acceleration && (Math.abs(acceleration.x) > stepThreshold || Math.abs(acceleration.y) > stepThreshold)) {
                setStepCount((prevCount) => prevCount + 1);
            }
        };

        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', handleMotionEvent);
        } else {
            console.log('DeviceMotionEvent not supported');
        }

        return () => {
            if (window.DeviceMotionEvent) {
                window.removeEventListener('devicemotion', handleMotionEvent);
            }
        };
    }, [stepCount, userId]);

    return (
        <div>
            <h3>Steps: {stepCount}</h3>
        </div>
    );
};

export default StepCounter;
