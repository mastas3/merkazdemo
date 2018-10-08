import React, { Component } from 'react';
import { getDay, format } from 'date-fns';
import TeacherCalendar from './components/TeacherCalendar';
import StudentCalendar from './components/StudentCalendar';
import { Divider } from 'antd';

import './App.css';

const dayNames = {
  0: 'Saturday',
  1: 'Sunday',
  2: 'Monday',
  3: 'Tuesday',
  4: 'Wednesday',
  5: 'Thursday',
  6: 'Friday',
}

const monthNames = {
  1: 'Januray',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
}

const createDay = (dayNum, monthNum) => {
  return {
    dayNum,
    dayName: dayNames[getDay(new Date(2018, monthNum, dayNum + 1))],
    date: format(new Date(2018, monthNum, dayNum), 'DD/MM/YYYY'),
    hours: Array.from({ length: 12 }, (_, i) => ({
      index: i,
      blocked: false,
      lesson: null,
      from: i + 8 < 10 ? `0${(i + 8)}:00` : `${(i + 8)}:00`,
      to: i + 9 < 10 ? `0${(i + 9)}:00` : `${(i + 9)}:00`
    })),
  }
}

const createDays = ({ monthLength, monthNum }) => Array.from({ length: monthLength }, (_, i) => {
  return createDay(i + 1, monthNum);
});

class App extends Component {
  state = {
    StudentStore: {
      name: 'Avi',
      phone: '054-2347755',
      events: [],
    },

    TeacherStore: {
      teacherName: 'Eyal',
      calendar: {
        month: 'October',
        days: [],
      }
    }
  }

  componentDidMount() {
    const monthNum = 9; // october
    const monthLength = 31;
    const days = createDays({ monthLength, monthNum });

    this.setState(prevState => ({
      TeacherStore: {
        ...prevState.TeacherStore,
        calendar: {
          ...prevState.TeacherStore.calendar,
          days,
        }
      }
    }));
  }

  toggleBlockHour = ({ dayIndex, hourIndex }) => {
    if (this.state.TeacherStore.calendar.days[dayIndex].hours[hourIndex].lesson) return;

    this.setState(prevState => ({
      ...prevState,
      TeacherStore: {
        ...prevState.TeacherStore,
        calendar: {
          ...prevState.TeacherStore.calendar,
          days: [
            ...prevState.TeacherStore.calendar.days.slice(0, dayIndex),
            {
              ...prevState.TeacherStore.calendar.days[dayIndex],
              hours: [
                ...prevState.TeacherStore.calendar.days[dayIndex].hours.slice(0, hourIndex),
                {
                  ...prevState.TeacherStore.calendar.days[dayIndex].hours[hourIndex],
                  blocked: !prevState.TeacherStore.calendar.days[dayIndex].hours[hourIndex].blocked,
                },
                ...prevState.TeacherStore.calendar.days[dayIndex].hours.slice(hourIndex + 1),
              ]
            },
            ...prevState.TeacherStore.calendar.days.slice(dayIndex + 1),
          ]
        }
      }
    }));
  }

  setLesson = ({ teacherDay, index, student }) => {
    const { dayNum } = teacherDay;

    this.setState(prevState => ({
      ...prevState,
      TeacherStore: {
        ...prevState.TeacherStore,
        calendar: {
          ...prevState.TeacherStore.calendar,
          days: [
            ...prevState.TeacherStore.calendar.days.slice(0, teacherDay.dayNum - 1),
            {
              ...prevState.TeacherStore.calendar.days[dayNum - 1],
              hours: [
                ...prevState.TeacherStore.calendar.days[dayNum - 1].hours.slice(0, index),
                {
                  ...prevState.TeacherStore.calendar.days[dayNum - 1].hours[index],
                  lesson: {
                    studentName: student.name,
                    studentPhone: student.phone,
                    from: prevState.TeacherStore.calendar.days[dayNum - 1].hours[index].from,
                    to: prevState.TeacherStore.calendar.days[dayNum - 1].hours[index].to,
                  }
                },
                ...prevState.TeacherStore.calendar.days[dayNum - 1].hours.slice(index + 1),
              ]
            },
            ...prevState.TeacherStore.calendar.days.slice(dayNum),
          ]
        }
      },
      StudentStore: {
        ...prevState.StudentStore,
        events: [
          ...prevState.StudentStore.events,
          {
            from: prevState.TeacherStore.calendar.days[dayNum - 1].hours[index].from,
            to: prevState.TeacherStore.calendar.days[dayNum - 1].hours[index].to,          
            dayNum,
            teacherName: 'Eyal',
            content: 'Shopify Lesson',
            type: 'warning',
          }
        ]
      }
    }));
  }

  removeLesson = () => {

  }

  resetHour = () => {

  }

  render() {
    const { StudentStore, TeacherStore } = this.state;

    return (
      <div className="App" style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <TeacherCalendar toggleBlockHour={this.toggleBlockHour} store={TeacherStore} />
        <br />
        <Divider />
        <br />
        <StudentCalendar store={StudentStore} setLesson={this.setLesson} teacherDays={TeacherStore.calendar.days} />
      </div>
    );
  }
}

export default App;
