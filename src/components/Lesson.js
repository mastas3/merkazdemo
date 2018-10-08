import React from 'react';

const Lesson = ({ lesson: { studentName, studentPhone } }) => (
    <div>{studentName} - {studentPhone}</div>
);

export default Lesson;
