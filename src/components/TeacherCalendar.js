import React from 'react';
import Day from './Day';

const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 200px)',
    gap: '16px 4px',
    margin: 'auto',
}

const TeacherCalendar = ({ store, toggleBlockHour }) => (
    <div className="App" style={style}>
        <h2>
            {store.calendar.month}
            <br />
            2018
            <br />
            <p>Teacher: {store.teacherName}</p>
        </h2>
        {store.calendar.days.map((day, idx) => {
            return <Day key={idx} day={day} dayIndex={idx} toggleBlockHour={toggleBlockHour} />
        })}
    </div>
);

export default TeacherCalendar;