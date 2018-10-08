import React from 'react';
import Lesson from './Lesson';

import '../App.css';

const style = {
    free: {
        background: '#eee',
        color: 'black',
        border: '1px solid #ccc',
        cursor: 'pointer',
        height: '50px',
    },

    blocked: {
        background: '#000',
        color: 'white',
        border: '1px solid #ccc',
        cursor: 'pointer',
        height: '50px',
    },

    lesson: {
        background: '#23d923',
        color: 'black',
        border: '1px solid #ccc',
        cursor: 'pointer',
        height: '50px',
    },
}

const Hour = ({ hour, hourIndex, dayIndex, toggleBlockHour }) => {
    return (
        <li
            className="teacher__hour"
            style={hour.blocked ? style.blocked : hour.lesson ? style.lesson : style.free}
            onClick={() => toggleBlockHour({ hourIndex, dayIndex })}
        >
            <div>
                {hour.from} - {hour.to}
                {hour.lesson && <Lesson lesson={hour.lesson} />}
            </div>
        </li>
    );
};

export default Hour;