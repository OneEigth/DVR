import React from 'react';
import { Pagination } from "antd";

interface PaginProps {
    devices: any[];
    currentPage: number;
    pageSize: number;
    setCurrentPage: (page: number) => void;
    setPageSize: (size: number) => void;
}

const Pagin: React.FC<PaginProps> = ({ devices, currentPage, pageSize, setCurrentPage, setPageSize }) => (
    <>
        <Pagination
            style={{ marginBottom: 16 }}
            total={devices.length} // Total number of items
            current={currentPage} // Current page
            pageSize={pageSize} // Page size
            onChange={(page, pageSize) => {
                setCurrentPage(page); // Update current page
                setPageSize(pageSize); // Update page size
            }}
        />
    </>
);

export default Pagin;
