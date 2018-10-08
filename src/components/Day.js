import React from 'react';
import Hour from './Hour';

import '../App.css';

const style = {
    border: '1px solid #ccc',
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    h1: {
        fontSize: '14px',
        ':hover': {
            background: '#e6f7ff',
        }
    },
    h2: {
        fontSize: '12px',
    }
}

const Day = ({ day, dayIndex, toggleBlockHour }) => {
    return (
        <div className='teacher__day' style={style}>
            <h1 style={style.h1}>{day.dayName}</h1>
            <h2 style={style.h2}>{day.date}</h2>
            <ul style={style.ul}>
                {day.hours.map((hour, idx) => {
                    return <Hour key={idx} hour={hour} dayIndex={dayIndex} hourIndex={idx} toggleBlockHour={toggleBlockHour} />;
                })}
            </ul>
        </div>
    );
};

export default Day;