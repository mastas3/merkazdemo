import React from 'react';
import { Calendar, Badge, Menu, Dropdown, Icon } from 'antd';
import AddLesson from './AddLesson';

import '../App.css';

const TeachersAvailableHours = ({ teacherHours, teacherDay, setLesson, student }) => (
    <Menu>
        {teacherHours.map(({ from, to, index }) => (
            <Menu.Item key={index} onClick={() => setLesson({ teacherDay, index, student })}>
                <span>{from} - {to}</span>
            </Menu.Item>
        ))}
    </Menu>
)

const menu = (
    <Menu>
        <Menu.Item key="0">
            <span>Details</span>
        </Menu.Item>
        <Menu.Item key="1">
            <span>Remove</span>
        </Menu.Item>
    </Menu>
);

function getTeacherDay(value, teacherDays) {
    return teacherDays.find(day => day.dayNum == value.date());
}

function dateCellWrapper(teacherDays, setLesson, student) {
    return function dateCellRender(value) {
        const listData = student.events.filter(event => event.dayNum == value.date());
        const teacherDay = getTeacherDay(value, teacherDays);
        const teacherHours = teacherDay ?
            teacherDay.hours.filter(hour => !hour.lesson && !hour.blocked) : [];

        return (
            <ul className="events">
                {
                    listData.map(item => (
                        <li key={item} style={{
                            borderBottom: '1px solid #ccc',
                        }}>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" href="#">
                                    <Badge status={item.type} text={`${item.from} - ${item.to} ${item.content} `} />
                                </a>
                            </Dropdown>
                        </li>
                    )).concat(
                        <Dropdown key={listData.length} overlay={TeachersAvailableHours({ teacherHours, teacherDay, setLesson, student })} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#">
                                <AddLesson />
                            </a>
                        </Dropdown>
                    )
                }
            </ul>
        );
    }
}

const StudentCalendar = ({ store, teacherDays, setLesson }) => (
    <div className="App">
        <Calendar dateCellRender={dateCellWrapper(teacherDays, setLesson, store)} />
    </div>
);

export default StudentCalendar;
