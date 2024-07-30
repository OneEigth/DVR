import React, {useEffect, useState} from "react";
import "./style.css"
import IconSignalLow from "../../../icons/iconSignalLow/IconSignalLow";
import {ConfigProvider, Progress} from "antd";
import {Device} from "../../../../types/Device";
import {getTimeOnline} from "../../../../api/devices/getTimeOnline";
import {useAuthStore} from "../../../../store/auth/auth";

interface DeviceProps{
    device:Device | null
}
const InfoBar: React.FC<DeviceProps> = ({device}) => {
    const {user,SmartDVRToken}=useAuthStore();
    const[onlineTime, setOnlineTime]=useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTimeOnline = async () => {
            if (device && user?.login && SmartDVRToken) {
                try {
                    const result = await getTimeOnline(SmartDVRToken, user.login, device.UID);
                    if (result?.success) {
                        const formattedTime = formatTime(result.data); // Use the utility function
                        setOnlineTime(formattedTime);
                    } else {
                        setError(result?.error || 'Unknown error');
                    }
                } catch (err) {
                    setError('An error occurred while fetching online time.');
                }
            }
        };

        fetchTimeOnline(); // Initial fetch

        const interval = setInterval(fetchTimeOnline, 60000); // Fetch every 60 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [user, SmartDVRToken, device]);



    const formatTime = (totalMinutes: number): string => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        const pad = (num: number) => String(num).padStart(2, '0');

        return `${pad(hours)}:${pad(minutes)}`;
    };

    const usedMemoryPercentage = device?.storageInfo
        ? Number((device.storageInfo.internalUsed / device.storageInfo.internal * 100).toFixed(0))
        : 0;

    return (
        <div className="infoBarDevice">
            <div className="battery">
                <h1 className="h1bat">Уровень заряда</h1>
                <span className="span"><IconSignalLow/>{device?.battery_level}%</span>
            </div>
            <div className="hdd">
                <h1 className="h1hdd">Занятость жёсткого диска</h1>
                <ConfigProvider
                    theme={{
                        components: {
                            Progress: {
                                defaultColor: '#FCE49C',
                                fontSize:24
                            }
                        },
                    }}
                >
                    <Progress
                        className="progress"
                        percent={usedMemoryPercentage}

                    />
                </ConfigProvider>
            </div>
            <div className="time">
                <h1 className="h1time">Время онлайн</h1>
                { device?.online ?
                <h1 className="h1OnlineTime">{onlineTime}</h1>
                    : ""}
            </div>
        </div>
    );
}
export default InfoBar;
