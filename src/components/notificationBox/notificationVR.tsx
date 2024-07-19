import React from 'react';
import { Button, notification } from 'antd';
import {Device} from "../../types/Device";



interface notificationVRBox{
    device:Device;
}
const App: React.FC<notificationVRBox> = (device) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.open({
            message: 'Запись файла',
            description:
                `Ведётся запись на "${device}}" `,
            duration: 0,
        });
    };

    return (
        <>
            {contextHolder}
            <Button type="primary" onClick={openNotification}>
                Open the notification box
            </Button>
        </>
    );
};

export default App;