import React, {useEffect, useState} from "react";
import {Card, Checkbox, Select, SelectProps} from 'antd';
import './style/style.css'
import { parseISO, format } from 'date-fns';
import {useFileStore} from "../../../store/devices/fileStore";
import {File} from "../../../types/File";
import {useAuthStore} from "../../../store/auth/auth";
import {useOnlineStateStream} from "../../../store/devices/onlineStream";
import {VIDEO_FILE_PREVIEW} from "../../../api/file/FilePreview"
import img from './Video picture.png'
import {SizeType} from "antd/es/config-provider/SizeContext";
import ButtonAction from "../../buttons/buttonAct/ButtonAction";
import {useFileSelectionStore} from "../../../store/devices/useSelectedRowKeysFilesRS";
import {useOpenMoreDetails} from "../../../store/devices/useShowMoreDetails";
import {useSelectedFile} from "../../../store/devices/getSelectedFile";

interface CardComponentProps {
    file: File;
    isSelected: boolean;
    onCheckboxChange: (fileId: string, checked: boolean) => void;

}

const CardComponentFile: React.FC<CardComponentProps> = ({ file}) => {
    const { setSelectedFileUID } = useFileStore();
    const { user,SmartDVRToken } = useAuthStore.getState();
    const {setIsStreamOnline}=useOnlineStateStream();
    const [previewUrlVideo, setPreviewUrlVideo] = useState<string>('');
    const [previewUrlJpg, setPreviewUrlJpg] = useState<string>('');
    const [size] = useState<SizeType>('middle');
    const {selectedFiles, setSelectedFiles}=useFileSelectionStore();
    const {setOpenMoreDetails} = useOpenMoreDetails();
    const {setSelectedFile} = useSelectedFile();


    const handleDeviceClick = (FileUid: string) => {
        setSelectedFileUID(FileUid);
        setIsStreamOnline(false);

        if (!file){
            setOpenMoreDetails(false);
        }
        setSelectedFile(file);
        setOpenMoreDetails(true);

    };




    useEffect(() => {
        const fetchPreview = async () => {
            if (user?.login) {
                try {
                    const preview = await VIDEO_FILE_PREVIEW(file.UID, SmartDVRToken, user.login);
                    if (file.fileType==='jpg'){ setPreviewUrlJpg(preview);}
                    setPreviewUrlVideo(preview);
                } catch (error) {
                    console.error("Error fetching file preview:", error);
                }
            }
        };

        fetchPreview();
    }, [file, SmartDVRToken, user]);



    const handleCheckboxChange = (fileId: string, checked: boolean) => {
        setSelectedFiles(fileId, checked);
    };

// Function to format the date
    const formatDate = (isoDate: string): string => {
        const parsedDate = parseISO(isoDate);
        return format(parsedDate, 'dd.MM.yy - HH:mm:ss');
    };

    const displayDate = formatDate(file.start); // Assuming `file.start` is in ISO format

    const options: SelectProps['options'] = [
        { label: '1 - наименьшая секретность', value: '1' },
        { label: '2 - низкая секретность', value: '2' },
        { label: '3 - средний уровень секретности', value: '3' },
        { label: '4 - повышенная секретность', value: '4' },
        { label: '5 - высокая секретность', value: '5' }
    ];


    const handleChangeUrgent =() => {
    };

    const showDrawerMoreDetails = () => {
        if (!file){
            setOpenMoreDetails(false);
        }
        setSelectedFile(file);
        setOpenMoreDetails(true);
    };


    return (
        <div className="containerCardFile" >
            <Checkbox
                className="fileCheckbox"
                checked={!!selectedFiles[file.UID]}
                onChange={(e) => handleCheckboxChange(file.UID, e.target.checked)}
                onClick={(e) => e.stopPropagation()}
                key={file.UID}
            />
            <div className="coverFile" onClick={() => handleDeviceClick(file.UID)}>

                <Card
                    className="coverCardFile"
                    key={file.UID}
                    cover={
                        file.fileType === 'jpg' ? (
                            <img className="imgPreview" src={previewUrlJpg} alt={'нет превью'}/>
                        ) : file.fileType === 'mp4' ? (
                            <img className="imgPreview" alt={''} src={previewUrlVideo}/>
                        ) : (
                            <img className="imgPreview" src={img} alt={''}/>
                        )
                    }

                />
            </div>
            <div className="propertiesFile">
                <h1 className="nameFile">
                    {displayDate}
                    ({file.duration})
                </h1>
                <div className="propertyGroupFile">
                    <h3 className="propertyFile">{file.size.toFixed(1)}мБ</h3>
                    <div className="urgentSet">
                        <Select
                            className="selectUrgent"
                            size={size}
                            defaultValue="секретность"
                            onChange={handleChangeUrgent}
                            style={{width: 152, marginBottom: 16}}
                            options={options}
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardComponentFile;



