import React from 'react';
import {Button, message, Modal} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import {useAuthStore} from "../../../store/auth/auth";
import {DeleteDeviceOne} from "../../../api/devices/deleteDeviceOne";
import {useNavigate} from "react-router-dom";
import {Device} from "../../../types/Device";
import "./NotSavedChanges.css"
import {useIsFormChanged} from "../../../store/devices/getDeviceChange";
import {getEditDevice} from "../../../api/devices/getEditDevice";

interface NotSavedChangesProps {
    visible: boolean;
    device:Device | null;
    onOk: () => void;
    onCancel: () => void;
}
const NotSavedChanges: React.FC<NotSavedChangesProps> = ({ visible,device, onOk, onCancel }) => {

    const { user, SmartDVRToken } = useAuthStore();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const {isFormChanged,setIsFormChanged, setIsNotSavedModalVisible} = useIsFormChanged();


    const handleNo=()=>{
        setIsFormChanged(false);
        setIsNotSavedModalVisible(false)

    }



    return (
        <Modal
            title={
                <div className="titleModal_delDevOne">
                    <span className="spanGroup_delDevOne">Несохранённые данные</span>
                    <>
                    <CloseOutlined onClick={onCancel} className="closeBut_Group"/>
                    </>
                </div>
            }
            className="delDevOne_modal"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            width={720}
            closable={false}
            footer={
                <div className="footerDevOneDelModal">
                    <Button className="buttonNo" onClick={handleNo}>Нет</Button>
                    <Button className="buttonYes" onClick={onOk}>Да</Button>

                </div>
            }
        >
            <span className="contentText"> У вас имеются несохраненные данные "Устройства {device?.name}", Сохранить?  </span>
        </Modal>
    );
};
export default NotSavedChanges;