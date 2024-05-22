import React, { useState } from 'react';
import MainMenu from "../../components/menu/Menu";
import LeftPart from "../../components/leftPart/leftPart";
import './style/style.css'
import TableDevices from "../../components/tables/tableDevices/TableDevices";


const AllCams: React.FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('allCams');

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    return (
        <div className="main-container">
            <div className="menu">
                <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem} />
            </div>
            <div className="container">
                    <>
                        <div className="leftPart">
                            <LeftPart leftMenuState={false} />
                        </div>
                        <div className="table">
                            <TableDevices />
                        </div>
                    </>
            </div>
        </div>
    );
};

export default AllCams;
