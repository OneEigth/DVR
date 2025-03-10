import React from 'react';

import { ReactComponent as SvgDelete } from 'app/assets/icons/delete.svg';
import { ReactComponent as SvgEdit } from 'app/assets/icons/edit.svg';
import { LanguageModel } from '../../../../../../utils/modules/language/types/LanguageModel';
import { LayoutType } from '../../../../../../types/LayoutType';
import Tag from '../../../../../../utils/shared/components/Tags/Tag';

export const getLayoutsColumns = (
    language: LanguageModel,
    handleDelete: (layouts: LayoutType[]) => void,
    setEditable: (layout: LayoutType) => void,
) => {
    return [
        {
            title: `${language.employee}`,
            dataIndex: 'name',
            key: 'name',
            width: 565.33,
            render: (text: string, record: any) => {
                return (
                    <div>ret</div>
                    // <div className={'users-table_fio-container'}>
                    //     <div className={'avatar title medium'}>
                    //         {text.split(' ').length > 1
                    //             ? `${getInitials(text.split(' ')[0])}${getInitials(text.split(' ')[1])}`
                    //             : getInitials(text.split(' ')[0])}
                    //     </div>
                    //     <span>{text}</span>
                    // </div>
                );
            },
        },
        {
            title: `${language.description}`,
            dataIndex: 'description',
            key: 'description',
            width: 565.33,
        },
        {
            title: `${language.role}Внешний вид`,
            dataIndex: 'viewType',
            key: 'viewType',
            width: 565.33,
            render: (text: string, record: LayoutType) => {
                return (
                    <Tag state={'default'} border={true}>
                        {text}
                    </Tag>
                );
            },
        },
        {
            title: `${language.actions}`,
            dataIndex: 'userName',
            key: 'userName',
            width: 96,
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
    ];
};
