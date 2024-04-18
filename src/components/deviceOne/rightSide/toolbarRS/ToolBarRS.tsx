import React from "react";
import SearchInput from "../../../searchInput/SearchInput";
import ButtonFilterRS from "../../../buttons/buttonFilter2/ButtonFilterRS";
import './style.css'

const ToolBarRS: React.FC = () => {

    return (
        <div className="ToolBarRS">
            <div className="leftSideRS">
                <h1 style={{
                    fontFamily: 'Roboto',
                    fontSize: '24px',
                    fontWeight: 400,
                    lineHeight: '32px',
                    textAlign: 'left',
                    margin:0,
                    marginBottom:'16px',
                    padding:0
                }}>Файлы</h1>
            </div>
            <div className="rightSideRS">
                <SearchInput/>
                <ButtonFilterRS/>
            </div>
        </div>
    );
}

export default ToolBarRS;