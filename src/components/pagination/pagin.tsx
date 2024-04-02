import React from 'react';
import {ConfigProvider, Pagination} from "antd";
import './style/style.css'

interface PaginProps {
    devices: any[];
    currentPage: number;
    pageSize: number;
    setCurrentPage: (page: number) => void;
    setPageSize: (size: number) => void;
}

const Pagin: React.FC<PaginProps> = ({ devices, currentPage, pageSize, setCurrentPage, setPageSize }) => (
    <>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary:"#21201F",
                },
            }}
        >
            <Pagination
                className="pagination"
                style={{ marginBottom: 16}}
                total={devices.length}
                current={currentPage}
                pageSize={pageSize}
                onChange={(page, pageSize) => {
                    setCurrentPage(page);
                    setPageSize(pageSize);
                }}
                showSizeChanger
                showTotal={(total, range) => `${range[0]}-${range[1]} из ${total}`}
                pageSizeOptions={['15', '30', '50', '100']}
            />
        </ConfigProvider>
    </>
);

export default Pagin;
