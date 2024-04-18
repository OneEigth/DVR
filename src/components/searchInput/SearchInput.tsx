import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchInput: React.FC = () => (
    <Input
        placeholder="поиск"
        suffix={<SearchOutlined />}
        style={{width:'240px', height:'32px'}}
    />
);

export default SearchInput;