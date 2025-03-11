import { ConfigProvider, Pagination, Table, TableProps } from 'antd';
import './styles.css';
import { ReactElement, useState } from 'react';
import ruRU from 'antd/lib/locale/ru_RU';

type ColumnType<T> = TableProps<T>['columns'];

interface TableLayoutProps<T> extends TableProps<T> {
    columns: ColumnType<T>;
    data: T[];
    rowKey?: string;
    className?: string;
    divBottom?: boolean;
    classNameTable?: string;
    paginationBool?: boolean;
    expandable?: any;
    paginationPosition?:
        | 'topLeft'
        | 'topCenter'
        | 'topRight'
        | 'bottomLeft'
        | 'bottomCenter'
        | 'bottomRight';
}

/**
 * Компонент шаблона для компонента таблицы.
 *
 * @component
 * @param {TableLayoutProps<T>} props - Свойства компонента.
 * @param {ColumnType<T>} props.columns - Колонки компонента таблицы.
 * @param {T[]} props.data - Данные компонента таблицы.
 * @returns {ReactElement} - Возвращает компонент шаблона таблицы.
 */

const TableLayout = <T extends {}>(props: TableLayoutProps<T>): ReactElement => {
    const {
        columns,
        data,
        rowKey,
        className = '',
        pagination,
        divBottom,
        classNameTable,
        paginationBool = false,
        expandable,
        paginationPosition = 'topRight',
        ...restProps
    } = props;
    // console.log(Array.isArray(data));

    const classPagination = paginationBool ? 'pagination' : '';

    return (
        <div
            className={`${divBottom ? `${className} has-div` : className} custom-table ${classPagination}`}
        >
            <ConfigProvider locale={ruRU}>
                <Table<T>
                    sticky
                    // scroll={{ x: 0, y: 1000 }}
                    // scroll={{ y: 'calc(100vh - 290px)' }}
                    expandable={expandable}
                    columns={columns}
                    dataSource={data}
                    rowKey={rowKey}
                    pagination={
                        paginationBool
                            ? {
                                  ...pagination,
                                  defaultPageSize: 10,
                                  showSizeChanger: data.length > 20,
                                  position: [paginationPosition],
                              }
                            : paginationBool
                    }
                    className={`${classNameTable} table-scroll ${classPagination}`}
                    // className={'custom-table'}
                    childrenColumnName={'antdChildren'}
                    {...restProps}
                />
                {!paginationBool && divBottom && (
                    <div className={'test'} style={{ height: '19px' }} />
                )}
            </ConfigProvider>
        </div>
    );
};

export default TableLayout;
