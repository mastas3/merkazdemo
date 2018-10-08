import React from 'react';
import { Icon, Menu, Dropdown } from 'antd';

const AddLesson = ({ fontSize='16px' }) => {
    return (
        <Icon type="plus-square" theme="twoTone" style={{ fontSize }} />
    );
}

export default AddLesson;