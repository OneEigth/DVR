import React from 'react';
import MainMenu from "../../components/menu/Menu";
import LeftPart from "../../components/leftPart/leftPart";
import './style/style.css'
import TableDevices from "../../components/tables/tableDevices/TableDevices";

const Main: React.FC = () => {
    return (
        <div className="main-container">

            <div className="menu">
                <div>
                    <MainMenu/>
                </div>
            </div>

            <div className="container">
                <div className="leftPart">
                    <LeftPart/>
                </div>
                <div className="table">
                    <TableDevices/>
                </div>
            </div>

        </div>
    );
};

export default Main;
