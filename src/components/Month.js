import React from 'react';


const createDay = () => {
    return Array.from({length: 12}, (_,i) => ({
      from: i+8 < 10 ? `0${(i+8)}:00` : `${(i+8)}:00`,
      to: i+9 < 10 ? `0${(i+9)}:00` : `${(i+9)}:00`
    }));
}

const monthData = num => Array.from({length: num}, (_,i) => {
    return createDay();
});

const Month = ({ weeks }) => (
    <ul>
        month
    </ul>
);
 
export default Month;