import React, { FC, Key, useEffect, useState } from 'react';

import './styles.css';

import { Button } from 'antd';
import { ReactComponent as SvgDelete } from 'utils/app/assets/icons/Delete.svg';
import { ReactComponent as SvgClose } from 'utils/app/assets/icons/Close.svg';
import { useLanguageStore } from '../../../../../utils/modules/language/api/store';
import { LayoutType } from '../../../../../types/LayoutType';
import TableLayout from '../../../../../utils/widgets/Layouts/TableLayout/TableLayout';
import useLayoutsStore from '../../api/store';
import { getLayoutsColumns } from './consts/columns';

interface UsersTableProps {}

const LayoutsTable: FC<UsersTableProps> = (props) => {
    const {} = props;
    const { layouts, setEditable, openDelete, getLayoutsAll } = useLayoutsStore();
    const { language } = useLanguageStore();
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [selectedRowKey, setSelectedRowKey] = useState<Key | null>(null);
    const [deleteUserName, setDeleteUserName] = useState('');

    const onSelectChange = (newSelectedRowKeys: Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRowKey(null);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    console.log(layouts);

    const handleEdit = (record: LayoutType) => {
        const newSelectedRowKey = selectedRowKey === record.id ? selectedRowKey : record.id;
        setSelectedRowKey(newSelectedRowKey);
        setSelectedRowKeys([]);
        setEditable(record);
    };

    useEffect(() => {
        getLayoutsAll();
    }, []);

    // const handleDelete = (users: LayoutType[]) => {
    //     const newSelectedRowKey = selectedRowKey === users[0].id ? selectedRowKey : users[0].id;
    //     setSelectedRowKey(newSelectedRowKey);
    //     setSelectedRowKeys([]);
    //     // setOpenDelete(true);
    //     setDeleteUserName(users[0]?.name);
    // };

    return (
        <>
            <TableLayout<LayoutType>
                columns={getLayoutsColumns(language, () => {}, handleEdit)}
                data={layouts}
                rowSelection={rowSelection}
                rowKey="id"
                paginationBool={true}
                rowClassName={(record) => (record.id === selectedRowKey ? 'selected-row' : '')}
                classNameTable={'layouts-table'}
            />

            {selectedRowKeys.length != 0 && (
                <div className={'layouts-table_active'}>
                    <div>
                        <Button
                            className={
                                'body medium-bold button-base button-type-secondary button-size-medium_icon'
                            }
                        >
                            <SvgClose
                                onClick={() => {
                                    setSelectedRowKeys([]);
                                }}
                            />
                        </Button>
                        <span
                            className={'body large'}
                            style={{ color: `var(--gray-black)`, marginLeft: 12 }}
                        >
                            Выделено:{' '}
                        </span>
                        <span className={'body large-bold'} style={{ color: `var(--gray-black)` }}>
                            {selectedRowKeys.length}
                        </span>
                    </div>
                    <Button
                        className={
                            'body medium-bold button-base button-type-primary button-size-medium button-state-danger'
                        }
                        // onClick={() => {
                        //     setOpenDelete(true);
                        // }}
                    >
                        <SvgDelete
                            style={{ width: 16, height: 18, fill: `var(--button-primary-text)` }}
                        />
                        Удалить
                    </Button>
                </div>
            )}
            {/*<ModalWidget*/}
            {/*    title={!deleteUserName ? language.deleteUsers : language.deleteUser}*/}
            {/*    open={openDelete}*/}
            {/*    onClose={() => {*/}
            {/*        deleteUsers(selectedRowKeys);*/}
            {/*        setDeleteUserName('');*/}
            {/*    }}*/}
            {/*    width={616}*/}
            {/*>*/}
            {/*    <>*/}
            {/*        {deleteUserName && (*/}
            {/*            <span className={'body large-bold'} style={{ color: `var(--gray-black)` }}>*/}
            {/*                {deleteUserName}*/}
            {/*            </span>*/}
            {/*        )}*/}

            {/*        <span*/}
            {/*            className={'caption large'}*/}
            {/*            style={{ color: `var(--gray-black)`, display: 'block', marginTop: 4 }}*/}
            {/*        >*/}
            {/*            {!deleteUserName ? language.areSureDeleteUsers : language.areSureDeleteUser}*/}
            {/*        </span>*/}
            {/*        <div className={'users-table-btns'}>*/}
            {/*            <Button*/}
            {/*                className={*/}
            {/*                    'body medium-bold button-base button-type-secondary button-size-medium button-state-danger'*/}
            {/*                }*/}
            {/*            >*/}
            {/*                {language.cancel}*/}
            {/*            </Button>*/}
            {/*            <Button*/}
            {/*                className={*/}
            {/*                    'body medium-bold button-base button-type-primary button-size-medium button-state-danger'*/}
            {/*                }*/}
            {/*            >*/}
            {/*                {language.delete}*/}
            {/*            </Button>*/}
            {/*        </div>*/}
            {/*    </>*/}
            {/*</ModalWidget>*/}
        </>
    );
};

export default LayoutsTable;
