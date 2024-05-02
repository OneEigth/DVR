import React from "react";
import ButtonAddToLayout from "../../../buttons/buttonAddToLayout/ButtonAddToLayout";
import ButtonOnlineArchive from "../../../buttons/buttonOnlineArchive/ButtonOnlineArchive";
import './style.css'
import {Button} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";

const toolBarDeviceOne: React.FC = () => {
    const handleAddToLayout = () => {
        // Добавьте здесь логику обработки клика на кнопку "Добавить в раскладку"
        console.log("Clicked on Add to Layout");
    };
    return (
        <div className="toolBarDeviceOne">
            <div className="leftSideToolBar">
                <Button className="buttonLeft" icon={<ArrowLeftOutlined />} style={{border: 'none'}}>Устройство</Button>
            </div>
            <div className="rightSideToolBar">
                <ButtonAddToLayout onClick={handleAddToLayout}/>
               {/* <ButtonOnlineArchive/>*/}
            </div>
        </div>
    );
}

export default toolBarDeviceOne;
