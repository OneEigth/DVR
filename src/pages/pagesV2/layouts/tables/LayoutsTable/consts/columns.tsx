import React from 'react';

import { ReactComponent as SvgDelete } from 'app/assets/icons/delete.svg';
import { ReactComponent as SvgEdit } from 'app/assets/icons/edit.svg';
import { LanguageModel } from '../../../../../../utils/modules/language/types/LanguageModel';
import { LayoutType } from '../../../../../../types/LayoutType';
import Tag from '../../../../../../utils/shared/components/Tags/Tag';
import { Button } from 'antd';

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
            width: 480,
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
            width: 240,
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
            width: 142,
        },

        {
            title: `${language.operator}`,
            dataIndex: 'userName',
            key: 'userName',
            width: 172,
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
            width: 196,
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
