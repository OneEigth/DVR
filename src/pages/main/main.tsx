import React, { useState } from 'react';
import MainMenu from "../../components/menu/Menu";
import LeftPart from "../../components/leftPart/leftPart";
import './style/style.css'
import TableDevices from "../../components/tables/tableDevices/TableDevices";
import Layout from "../../components/layouts/layout/Layout";

const Main: React.FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('main');

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    return (
        <div className="main-container">
            <div className="menu">
                <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem} />
            </div>

            <div className="container">
                {currentMenuItem === 'allCams' && (
                    <>
                        <div className="leftPart">
                            <LeftPart />
                        </div>
                        <div className="table">
                            <TableDevices />
                        </div>
                    </>
                )}

                {currentMenuItem === 'layouts' && (
                    <>
                        <div className="leftPart">
                            <LeftPart />
                        </div>
                        <div className="table">
                            <Layout />
                        </div>
                    </>
                )}
                {/* Добавьте другие условия, если нужно отображать другие компоненты для других пунктов меню */}
            </div>
        </div>
    );
};

export default Main;
