import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Layout, Modal, Select, SelectProps} from 'antd';
import "./style.css"
import {CloseOutlined, PlusOutlined} from "@ant-design/icons";
import CardComponentAttachedFile from "../../cards/cardComponentAttachedFile/CardComponentAttachedFile";
import {useSelectedFile} from "../../../store/devices/getSelectedFile";
import {format, parseISO} from "date-fns";
import {SizeType} from "antd/es/config-provider/SizeContext";
import AttachFile from "../attachFiles/attachFile";

import {useAttachedFilesByUidStore} from "../../../store/attachedFiles/attachedFilesByUid";
import Player from "../../player/Player";
import {FILE_PLAY_URL} from "../../../const/const";
import {useAuthStore} from "../../../store/auth/auth";
import {Content} from "antd/es/layout/layout";
import {Footer} from "antd/lib/layout/layout";


interface MoreDetailsProps {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;

}
const MoreDetailsAudio: React.FC<MoreDetailsProps> = ({open, onOk, onCancel}) => {
    const {selectedFile, setSelectedFile} = useSelectedFile();
    const [size] = useState<SizeType>('middle');
    const [openAttacheFiles,setOpenAttacheFiles]=useState(false)
    const {AttachedFilesByUid, fetchAttachedFilesByUid}=useAttachedFilesByUidStore();
    const { user, SmartDVRToken } = useAuthStore();


    useEffect(() => {
        if (selectedFile) {
            fetchAttachedFilesByUid(selectedFile.UID);
        }
    }, [selectedFile, fetchAttachedFilesByUid]);

    const handleCheckboxChange = (fileId: string, checked: boolean) => {
        // Your logic for handling checkbox change
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

    const handleAddFile = () => {
        setOpenAttacheFiles(true)
    };
    const onCloseAttachFile = () => {
        setOpenAttacheFiles(false);

    };

    const onOkAttachFile = () => {
        setOpenAttacheFiles(false);
        fetchAttachedFilesByUid(selectedFile.UID);

    };


    const getFilePlayUrl = (authToken: string) => {
        if (user && SmartDVRToken) {
            const playFile = `${FILE_PLAY_URL}${selectedFile.UID}/${authToken}`;
            return playFile
        }
    };

    console.log("тип: "+selectedFile.fileType)
    return (
        <Modal
            className="DrawerMoreDetails"
            closable={false}
            title={
                <span className="titleModal">
                    <div className="title0">
                        <div className="title1">
                    {displayDate}
                        </div>
                        <div className="title2">
                            <div className="title3">
                                {selectedFile.size.toFixed(1)} мБ |
                            </div>
                            <div className="title4">
                                
                            </div>
                        </div>
                    </div>
                        <CloseOutlined className="closeBut2" onClick={onCancel} style={{cursor: 'pointer', marginRight: 0}}/>
                </span>}
            footer={false}
            onClose={onCancel}
            open={open}
        >

            <Layout style={{background:'#ffff'}}>
                <div className="LR_MD">

                    <Layout style={{background:'#ffff', width:400}}>
                        <Content className="content-RMD" >
                            <div className="right_MD">
                                <div className="left_MD">
                                    <Player source={getFilePlayUrl(SmartDVRToken)} type={selectedFile.fileType}/>
                                </div>
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
                                            label={<span className="inputLabel">Номер</span>}
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
                                        {AttachedFilesByUid.map((attachedFile: any, index: number) => (
                                            <CardComponentAttachedFile
                                                key={attachedFile.ID}
                                                file={attachedFile}
                                                isSelected={!!selectedFile[attachedFile.UID]}
                                                onCheckboxChange={handleCheckboxChange}
                                            />
                                        ))}
                                    </div>

                                </div>
                            </div>

                        </Content>
                        <Footer style={{background: '#ffff'}}>
                            <Button
                                className="buttonModalSave"
                                onClick={onOk}
                            >
                                Сохранить
                            </Button>
                        </Footer>
                    </Layout>
                </div>
                <AttachFile onCancel={onCloseAttachFile} onOk={onOkAttachFile} visible={openAttacheFiles}/>

            </Layout>
        </Modal>
    );
};

export default MoreDetailsAudio;