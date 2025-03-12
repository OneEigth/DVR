import React from 'react';

import { ReactComponent as SvgDelete } from 'app/assets/icons/delete.svg';
import { ReactComponent as SvgEdit } from 'app/assets/icons/edit.svg';
import { LanguageModel } from '../../../../../../utils/modules/language/types/LanguageModel';
import { LayoutType } from '../../../../../../types/LayoutType';
import Tag from '../../../../../../utils/shared/components/Tags/Tag';
import { Button } from 'antd';
import { Device } from '../../../../../../types/Device';

export const getLayoutsColumns = (
    language: LanguageModel,
    handleDelete: (layouts: LayoutType[]) => void,
    setEditable: (layout: LayoutType) => void,
) => {
    return [
        {
            title: `${language.name}`,
            dataIndex: 'name',
            key: 'name',
            width: '38.035%',
            // render: (text: string, record: any) => {
            //     return (
            //         <div>ret</div>
            //         // <div className={'users-table_fio-container'}>
            //         //     <div className={'avatar title medium'}>
            //         //         {text.split(' ').length > 1
            //         //             ? `${getInitials(text.split(' ')[0])}${getInitials(text.split(' ')[1])}`
            //         //             : getInitials(text.split(' ')[0])}
            //         //     </div>
            //         //     <span>{text}</span>
            //         // </div>
            //     );
            // },
        },
        {
            title: `${language.appearance}`,
            dataIndex: 'viewType',
            key: 'viewType',
            width: '19.017%',
            render: (text: string, record: LayoutType) => {
                return (
                    <Tag state={'default'} border={true}>
                        {text}
                    </Tag>
                );
            },
        },
        {
            title: `${language.description}`,
            dataIndex: 'description',
            key: 'description',
            width: '11.252%',
        },

        {
            title: `${language.operator}`,
            dataIndex: 'userName',
            key: 'userName',
            width: '13.629%',
            // render: (text: string, record: LayoutType) => {
            //     return (
            //         <div style={{ marginLeft: 5 }}>
            //             <SvgEdit
            //                 className={'users-table-icon--edit'}
            //                 onClick={() => setEditable(record)}
            //             />
            //             <SvgDelete
            //                 className={'users-table-icon--delete'}
            //                 onClick={() => handleDelete([record])}
            //             />
            //         </div>
            //     );
            // },
        },
        {
            title: `${language.actions}`,
            dataIndex: 'actions',
            key: 'actions',
            width: '15.531%',
            render: (text: string, record: LayoutType) => {
                return (
                    <div style={{ marginLeft: 5 }}>
                        <Button
                            className={
                                'users-table-icon--edit button-base button-type-primary button-size-small body medium-bold'
                            }
                            onClick={() => setEditable(record)}
                        >
                            Добавить устройство
                        </Button>
                    </div>
                );
            },
        },
    ];
};

export const getLayoutsDeviceColumns = (
    language: LanguageModel,
    handleDelete: (layouts: Device[]) => void,
    setEditable: (layout: Device) => void,
) => {
    return [
        {
            // title: `${language.deviceName}`,
            dataIndex: 'id',
            key: 'id',
            width: '2.536%',
        },
        {
            title: `${language.deviceName}`,
            dataIndex: 'name',
            key: 'name',
            width: '38.035%',
            render: (text: string, record: Device) => {
                return (
                    <div>
                        <span
                            className={`status-dot ${record.online ? 'active' : 'inactive'}`}
                            style={{
                                marginRight: 16,
                                marginLeft: 0,
                                position: 'relative',
                                top: -1,
                            }}
                        ></span>
                        {text}
                    </div>
                );
            },
        },
        {
            title: `${language.deviceGroup}`,
            dataIndex: 'groupName',
            key: 'groupName',
            width: '19.017%',
            render: (text: string, record: Device) => {
                return (
                    <Tag state={'processing'} border={true}>
                        {text}
                    </Tag>
                );
            },
        },
        {
            title: `${language.model}`,
            dataIndex: 'description',
            key: 'description',
            width: '11.252%',
            render: (text: string, record: Device) => {
                return (
                    <div>
                        {text || (
                            <Tag state={'error'} border={true}>
                                not content
                            </Tag>
                        )}
                    </div>
                );
            },
        },

        {
            title: `${language.batteryLoad}`,
            dataIndex: 'battery_level',
            key: 'battery_level',
            width: '13.629%',
            render: (text: string, record: Device) => {
                return <div>{`${text}% заряд`}</div>;
            },
        },
        {
            title: `${language.actions}`,
            dataIndex: 'actions',
            key: 'actions',
            width: '15.531%',
            render: (text: string, record: Device) => {
                return (
                    <div style={{ marginLeft: 5 }}>
                        <Button
                            className={
                                'users-table-icon--edit button-base button-type-secondary button-size-small button-state-danger body medium-bold'
                            }
                            onClick={() => setEditable(record)}
                        >
                            Удалить с раскладки
                        </Button>
                    </div>
                );
            },
        },
    ];
};
