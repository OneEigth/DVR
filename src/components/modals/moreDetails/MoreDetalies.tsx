import React, { useState } from 'react';
import {AutoComplete, Button, Drawer, Form, Input, Select, SelectProps} from 'antd';
import {File} from "../../../types/File";
import "./style.css"
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {useOpenMoreDetails} from "../../../store/devices/useShowMoreDetails";
import CardComponentAttachedFile from "../../cards/cardComponentAttachedFile/CardComponentAttachedFile";
import {useSelectedFile} from "../../../store/devices/getSelectedFile";
import {format, parseISO} from "date-fns";
import {SizeType} from "antd/es/config-provider/SizeContext";


interface MoreDetailsProps {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
}
const MoreDetails: React.FC<MoreDetailsProps> = ({open, onOk, onCancel}) => {
    const {selectedFile} = useSelectedFile();
    const [size] = useState<SizeType>('middle');



    const handleAddFile = () => {

    };

    if (!selectedFile) {
        return null; // Or render a fallback UI
    }

    const formatDate = (isoDate: string): string => {
        const parsedDate = parseISO(isoDate);
        return format(parsedDate, 'dd.MM.yy - HH:mm:ss');
    };

    const displayDate = formatDate(selectedFile.start); // Assuming `file.start` is in ISO format

    const options: SelectProps['options'] = [
        { label: '1 - наименьшая секретность', value: '1' },
        { label: '2 - низкая секретность', value: '2' },
        { label: '3 - средний уровень секретности', value: '3' },
        { label: '4 - повышенная секретность', value: '4' },
        { label: '5 - высокая секретность', value: '5' }
    ];

    const handleChangeUrgent =() => {
    };

    return (
        <Drawer
            placement="left"
            className="DrawerMoreDetails"
            closable={false}
            title={
                <span className="titleModal">
                    Подробности
                    <CloseOutlined className="closeBut2" onClick={onCancel} style={{cursor: 'pointer', marginRight: 0}}/>
                </span>}
            footer={
                <Button
                    className="buttonModalSave"
                    onClick={onOk}
                >Сохранить</Button>

            }
            onClose={onCancel}
            open={open}
        >

            <div className="fileData">
                <h1 className="h1_event">Сведения файла</h1>
                <Form
                    className="form"
                    name="basic"
                    labelCol={{span: 10}}
                    wrapperCol={{span: 14}}
                    style={{maxWidth: '100%'}}
                >
                    <Form.Item
                        label={<span className="inputLabel">Время и дата</span>}
                        name="name"
                        rules={[{required: true, message: 'Пожалуйста, введите номер'}]}
                    >
                        <h1 className="fileOption_h1">{displayDate}</h1>
                    </Form.Item>

                    <Form.Item
                        label={<span className="inputLabel">Размер</span>}
                        name="description"
                        rules={[{required: true, message: 'Пожалуйста, введите описание'}]}
                    >
                      <h1 className="fileOption_h1" >{selectedFile.size.toFixed(1)} мБ</h1>

                    </Form.Item>

                    <Form.Item
                        label={<span className="inputLabel">Автор записи</span>}
                        name="description"
                        rules={[{required: true, message: 'Пожалуйста, введите описание'}]}
                    >
                        <h1 className="fileOption_h1" >{selectedFile.ownerUID}</h1>
                    </Form.Item>

                    <Form.Item
                        label={<span className="inputLabel">Секретность</span>}
                        name="description"
                        rules={[{required: false, message: 'Пожалуйста, введите описание'}]}
                    >
                        <Select
                            className="selectUrgent"
                            size={size}
                            defaultValue="секретность"
                            onChange={handleChangeUrgent}
                            style={{width: '100%', marginBottom: 16}}
                            options={options}
                        />
                    </Form.Item>

                </Form>
            </div>

            <div className="eventData">
                <h1 className="h1_event">Сведения события</h1>
                <Form
                    className="form"
                    name="basic"
                    labelCol={{span: 10}}
                    wrapperCol={{span: 14}}
                    style={{maxWidth: '100%'}}
                >
                    <Form.Item
                        label={<span className="inputLabel">Номер события</span>}
                        name="name"
                        rules={[{required: true, message: 'Пожалуйста, введите номер'}]}
                    >
                        <Input className="input"/>
                    </Form.Item>

                    <Form.Item
                        label={<span className="inputLabel">Описание</span>}
                        name="description"
                        rules={[{required: true, message: 'Пожалуйста, введите описание'}]}
                    >
                        <Input className="input"/>
                    </Form.Item>

                </Form>
            </div>

            <div className="attachedFile">
                <div className="attachedTools">
                    <h1 className="h1_attachedFiles">Прикреплённые файлы:</h1>
                    <Button
                        className="buttonAddFile"
                        icon={<PlusOutlined/>}
                        onClick={handleAddFile}
                    >
                    </Button>
                </div>
                <div className="attachedFiles">
                    <CardComponentAttachedFile/>
                </div>
            </div>


        </Drawer>
    );
};

export default MoreDetails;