import React, { useEffect, useRef, useState } from "react";
import './style.css'

import {Layout, List, Typography} from "antd";
import {useAuthStore} from "../../store/auth/auth";


const { Header, Content } = Layout;
const { Text } = Typography;
const PTTDispatch: React.FC = () => {
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null); // Для выбранного устройства
    const [messages, setMessages] = useState<
        { dataBlob: Blob; type: "user" | "received"; from: string }[]
    >([]);
    const [rooms, setRooms] = useState<
        { name: string; devices: { DID: string }[] }[]
    >([]);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
        null
    );
    const [chunks, setChunks] = useState<Blob[]>([]);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const recordButtonRef = useRef<HTMLButtonElement | null>(null);
    const { SmartDVRToken, user } = useAuthStore();

    const srvHostPort = "ws://45.141.76.30:4279/web-ptt";
    const userUID = user?.uid;
    const userToken = SmartDVRToken;
    const url = `${srvHostPort}/${userUID}/${userToken}`;
    const socket = useRef<WebSocket | null>(null);
    const isRecording = useRef<boolean>(false); // Флаг записи
    const mutableChunks = useRef<Blob[]>([]);



    useEffect(() => {
        socket.current = new WebSocket(url);

        socket.current.onopen = () => {
            console.log("WebSocket connection open.");
        };


        socket.current.onmessage = (msg: MessageEvent<any>): void => {
            console.log("Received message:", msg);

            msg.data.arrayBuffer().then((result: ArrayBuffer) => {
                const t = new Uint8Array(result);
                const index = t.indexOf(10);

                if (index === -1) {
                    // Binary message without metadata
                    const dataBlob = new Blob([t], { type: "audio/wav" });
                    if (dataBlob.size > 0) {
                        console.log("Received binary message without metadata.");
                        addMessage(dataBlob, "received", "unknown");
                    } else {
                        console.error("Received empty Blob. Skipping.");
                    }
                } else {
                    // Binary message with metadata
                    const firstPart = t.subarray(0, index);
                    const decoder = new TextDecoder("utf-8");
                    const text = decoder.decode(firstPart);

                    console.log("Received metadata:", text);

                    const secondPart = t.subarray(index + 1);
                    const dataBlob = new Blob([secondPart], { type: "audio/wav" });
                    if (dataBlob.size > 0) {
                        console.log("Received binary message with metadata.");
                        addMessage(dataBlob, "received", text);
                    } else {
                        console.error("Received empty Blob. Skipping.");
                    }
                }
            }).catch((error: unknown): void => {
                console.error("Error processing WebSocket message:", error);
            });
        };

        socket.current.onclose = () => {
            console.warn("WebSocket connection closed.");
        };

        socket.current.onerror = (error) => {
            console.error("WebSocket encountered an error:", error);
        };

        return () => {
            socket.current?.close();
        };
    }, [url]);

    const getMicrophoneAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: false,
                audio: { channelCount: 1 },
            });

            const tracks = stream.getAudioTracks();
            if (tracks.length === 0) {
                console.error("No audio tracks found in the stream.");
                return;
            }

            console.log("Audio stream tracks:", tracks);

            const mimeType = "audio/webm;codecs=opus";
            const options: MediaRecorderOptions = {};

            if (MediaRecorder.isTypeSupported(mimeType)) {
                options.mimeType = mimeType;
            } else {
                console.warn(`${mimeType} is not supported. Using default settings.`);
            }

            const recorder = new MediaRecorder(stream, options);

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    console.log("Data chunk received. Size:", e.data.size);
                    mutableChunks.current.push(e.data); // Добавляем данные в useRef
                } else {
                    console.warn("Empty data chunk received.");
                }
            };

            recorder.onstart = () => {
                console.log("MediaRecorder started recording.");
            };

            recorder.onstop = async () => {
                // Проверяем, есть ли данные в массиве
                if (mutableChunks.current.length === 0) {
                    console.error("No data chunks available. Skipping upload.");
                    return;
                }

                // Создаём Blob из чанков
                const blob = new Blob(mutableChunks.current, { type: "audio/wav" });

                if (blob.size === 0) {
                    console.error("Generated Blob is empty. Skipping upload.");
                    return;
                }

                console.log("Recording stopped. Blob size:", blob.size);

                try {
                    // Отправка через WebSocket
                    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
                        socket.current.send(blob);
                        console.log("Audio data sent via WebSocket.");
                    } else {
                        console.error("WebSocket is not open. Cannot send data.");
                    }

                    // Добавляем сообщение в интерфейс
                    addMessage(blob, "user", "operator");
                } catch (error) {
                    console.error("Error sending audio data via WebSocket:", error);
                }

                // Очищаем массив
                mutableChunks.current = [];
            };

            setMediaRecorder(recorder);
        } catch (err) {
            console.error("Error accessing microphone:", err);
        }
    };



    const startConversationTo = () => {
        if (!selectedGroup && !selectedDevice) {
            console.error("No target selected for WebSocket message.");
            return;
        }

        const target = selectedDevice ? `device_${selectedDevice}` : `room_${selectedGroup}`;
        console.log("Sending target:", target);

        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            socket.current.send(target); // Отправляем адресата
        } else {
            console.error("WebSocket is not open.");
        }
    };

    // Старт записи
    const startRecording = () => {
        if (!mediaRecorder) {
            console.error("MediaRecorder is not initialized.");
            return;
        }

        if (mediaRecorder.state === "recording") {
            console.warn("MediaRecorder is already recording.");
            return;
        }

        recordButtonRef.current?.classList.add("recording");
        mutableChunks.current = []; // Очищаем локальный массив перед записью
        isRecording.current = true;

        try {
            mediaRecorder.start();
            console.log("Recording started.");
        } catch (err) {
            console.error("Error starting MediaRecorder:", err);
        }
    };

    // Остановка записи
    const stopRecording = () => {
        if (!mediaRecorder) {
            console.error("MediaRecorder is not initialized.");
            return;
        }

        if (mediaRecorder.state !== "recording") {
            console.warn("MediaRecorder is not recording. Cannot stop.");
            return;
        }

        recordButtonRef.current?.classList.remove("recording");

        isRecording.current = false;

        try {
            mediaRecorder.stop();
            console.log("Recording stopped.");

            // Отправляем информацию о получателе
            startConversationTo(); // Здесь отправляется `selectedGroup` или `selectedDevice`
        } catch (err) {
            console.error("Error stopping MediaRecorder:", err);
        }
    };

    const addMessage = (dataBlob: Blob, type: "user" | "received", from: string) => {
        if (dataBlob.size === 0) {
            console.error("Attempted to add empty Blob to messages.");
            return;
        }

        setMessages((prev) => [...prev, { dataBlob, type, from }]);
        setTimeout(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }, 100);
    };

    const fetchRooms = () => {
        const url = "http://45.141.76.30:8172/pttgroup/get_by/all";

        fetch(url, {
            method: "GET",
            headers: {
                SmartDVRLogin: "ptt_srv",
                SmartDVRToken:
                    "79a2a517-007b-11ef-8012-0001693eb0e4-660aa468-fe16-11ee-8012-0001693eb0e4-1dc0f54d-1c34-11ef-beb3-0001693eb0e4",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setRooms(data.data);
                } else {
                    console.error("Error fetching rooms:", data.error);
                }
            })
            .catch((error) => console.error("Fetch error:", error));
    };

    const selectTarget = (groupName: string, deviceId?: string) => {
        setSelectedGroup(groupName);
        setSelectedDevice(deviceId || null);

        console.log(
            `Selected Target: Group - ${groupName}, Device - ${deviceId || "All"}`
        );
    };



    useEffect(() => {
        getMicrophoneAccess();
        fetchRooms();
    }, []);

    return (

        <Layout style={{ height: "100%" }}>
            <Header style={{ backgroundColor: "#FFFF", color: "black", textAlign: "center" }}>
                <h1 style={{ color: "Black", margin: 0 }}>PTT Dispatch</h1>
            </Header>
            <Content style={{ padding: "20px" }}>
                <div style={{display: "flex", height: "100%"}}>
                    {/* Левая панель с рабочими группами */}
                    <div
                        style={{
                            flex: "0 0 30%",
                            background: "#f0f2f5",
                            padding: "10px",
                            /*overflowY: "auto",*/
                            borderRight: "1px solid #d9d9d9",
                        }}
                    >

                    <Typography.Title level={2}>Рабочие группы</Typography.Title>
                        <List
                            bordered
                            dataSource={rooms}
                            renderItem={(room) => (
                                <List.Item>
                                    <div>
                                        <Text
                                            onClick={() => selectTarget(room.name)}
                                            style={{
                                                cursor: "pointer",
                                                color:
                                                    selectedGroup === room.name && !selectedDevice
                                                        ? "#1890ff"
                                                        : undefined,
                                            }}
                                        >
                                            {room.name}
                                        </Text>
                                        {/* Список устройств внутри группы */}
                                        <List
                                            size="small"
                                            dataSource={room.devices}
                                            renderItem={(device) => (
                                                <List.Item
                                                    onClick={() => selectTarget(room.name, device.DID)}
                                                    style={{
                                                        cursor: "pointer",
                                                        paddingLeft: "20px",
                                                        color:
                                                            selectedGroup === room.name &&
                                                            selectedDevice === device.DID
                                                                ? "#1890ff"
                                                                : undefined,
                                                    }}
                                                >
                                                    Устройство: {device.DID}
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </List.Item>

                            )}
                        />
                    </div>

                    {/* Правая панель с чат-сообщениями */}
                    <div style={{flex: "1", display: "flex", flexDirection: "column"}}>

                        <div
                            ref={chatContainerRef}
                            style={{
                                flex: 1,
                                padding: "10px",
                                background: "#fff",
                                border: "1px solid #d9d9d9",
                                /*overflowY: "auto",*/
                                borderRadius: "4px",
                            }}
                        >
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        justifyContent: message.type === "user" ? "flex-end" : "flex-start",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: "10px",
                                            background: message.type === "user" ? "#1890ff" : "#f0f2f5",
                                            color: message.type === "user" ? "#fff" : "#000",
                                            borderRadius: "4px",
                                            width: "40%",
                                        }}
                                    >
                                        <audio
                                            controls
                                            src={URL.createObjectURL(message.dataBlob)}
                                            style={{display: "block", width: "100%"}}
                                        />
                                        <Text>{message.from}</Text>
                                    </div>
                                </div>
                            ))}


                        </div>

                        <button
                            id="record"
                            ref={recordButtonRef}
                            onMouseDown={startRecording}
                            onMouseUp={stopRecording}
                            onMouseLeave={stopRecording}
                        >
                            Record
                        </button>

                    </div>
                </div>
            </Content>
        </Layout>
    );
};


export default PTTDispatch;

/*
import React, { useEffect, useRef, useState } from "react";
import './style.css';
import { Layout, List,Typography} from "antd";

const { Header, Content } = Layout;
const { Text } = Typography;

const PTTDispatch: React.FC = () => {
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [messages, setMessages] = useState<
        { dataBlob: Blob; type: "user" | "received"; from: string }[]
    >([]);
    const [rooms, setRooms] = useState<
        { name: string; devices: { DID: string }[] }[]
    >([]);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
        null
    );
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const recordButtonRef = useRef<HTMLButtonElement | null>(null);

    const socket = useRef<WebSocket | null>(null);
    const mutableChunks = useRef<Blob[]>([]);

    const srvHostPort = "ws://45.141.76.30:4279/web-ptt";
    const userUID = "ac425fec-0856-11ef-8012-0001693eb0e4";
    const userToken = "ac425fec-0856-11ef-8012-0001693eb0e4";
    const url = `${srvHostPort}/${userUID}/${userToken}`;

    // WebSocket Setup
    useEffect(() => {
        socket.current = new WebSocket(url);

        socket.current.onopen = () => {
            console.log("WebSocket connection open.");
        };

        socket.current.onmessage = (msg: MessageEvent<any>): void => {
            console.log("Received message:", msg);

            msg.data.arrayBuffer().then((result: ArrayBuffer) => {
                const t = new Uint8Array(result);
                console.log("Raw Uint8Array data:", t);
                const index = t.indexOf(10);

                if (index === -1) {
                    const dataBlob = new Blob([t], { type: "audio/wav" });
                    if (dataBlob.size > 0) {
                        console.log("Binary message without metadata.");
                        addMessage(dataBlob, "received", "unknown");
                    } else {
                        console.error("Received empty Blob. Skipping.");
                    }
                } else {
                    const firstPart = t.subarray(0, index);
                    const decoder = new TextDecoder("utf-8");
                    const text = decoder.decode(firstPart);

                    console.log("Received metadata:", text);

                    const secondPart = t.subarray(index + 1);
                    const dataBlob = new Blob([secondPart], { type: "audio/wav" });
                    if (dataBlob.size > 0) {
                        console.log("Binary message with metadata.");
                        addMessage(dataBlob, "received", text);
                    } else {
                        console.error("Received empty Blob. Skipping.");
                    }
                }
            }).catch((error: unknown) => {
                console.error("Error processing WebSocket message:", error);
            });
        };

        socket.current.onclose = () => {
            console.warn("WebSocket connection closed.");
        };

        socket.current.onerror = (error) => {
            console.error("WebSocket encountered an error:", error);
        };

        return () => {
            socket.current?.close();
        };
    }, [url]);

    // Microphone Access and MediaRecorder
    const getMicrophoneAccess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { channelCount: 1 },
                video: false,
            });

            console.log("Audio stream tracks:", stream.getAudioTracks());

            const mimeType = "audio/webm;codecs=opus";
            const options: MediaRecorderOptions = {};
            if (MediaRecorder.isTypeSupported(mimeType)) {
                options.mimeType = mimeType;
            } else {
                console.warn(`${mimeType} not supported. Using default settings.`);
            }

            const recorder = new MediaRecorder(stream, options);

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    console.log("Data chunk received. Size:", e.data.size);
                    mutableChunks.current.push(e.data);
                } else {
                    console.warn("Empty data chunk received.");
                }
            };

            recorder.onstop = () => {
                if (mutableChunks.current.length === 0) {
                    console.error("No data chunks available. Skipping upload.");
                    return;
                }

                const blob = new Blob(mutableChunks.current, { type: "audio/wav" });
                console.log("Recording stopped. Blob size:", blob.size);

                if (socket.current?.readyState === WebSocket.OPEN) {
                    socket.current.send(blob);
                    console.log("Audio data sent via WebSocket.");
                } else {
                    console.error("WebSocket is not open. Cannot send data.");
                }

                addMessage(blob, "user", "operator");
                mutableChunks.current = [];
            };

            setMediaRecorder(recorder);
        } catch (err) {
            console.error("Error accessing microphone:", err);
        }
    };

    const startRecording = () => {
        if (!mediaRecorder) {
            console.error("MediaRecorder is not initialized.");
            return;
        }

        if (mediaRecorder.state === "recording") {
            console.warn("MediaRecorder is already recording.");
            return;
        }

        recordButtonRef.current?.classList.add("recording");
        mutableChunks.current = [];
        mediaRecorder.start();
        console.log("Recording started.");
    };

    const stopRecording = () => {
        if (!mediaRecorder) {
            console.error("MediaRecorder is not initialized.");
            return;
        }

        if (mediaRecorder.state !== "recording") {
            console.warn("MediaRecorder is not recording. Cannot stop.");
            return;
        }

        recordButtonRef.current?.classList.remove("recording");
        mediaRecorder.stop();
        console.log("Recording stopped.");
    };

    const addMessage = (dataBlob: Blob, type: "user" | "received", from: string) => {
        setMessages((prev) => [...prev, { dataBlob, type, from }]);
        setTimeout(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }, 100);
    };

    const fetchRooms = () => {
        const url = "http://45.141.76.30:8172/pttgroup/get_by/all";

        fetch(url, {
            method: "GET",
            headers: {
                SmartDVRLogin: "ptt_srv",
                SmartDVRToken:
                    "79a2a517-007b-11ef-8012-0001693eb0e4-660aa468-fe16-11ee-8012-0001693eb0e4-1dc0f54d-1c34-11ef-beb3-0001693eb0e4",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setRooms(data.data);
                } else {
                    console.error("Error fetching rooms:", data.error);
                }
            })
            .catch((error) => console.error("Fetch error:", error));
    };

    useEffect(() => {
        getMicrophoneAccess();
        fetchRooms();
    }, []);

    const selectTarget = (groupName: string, deviceId?: string) => {
        setSelectedGroup(groupName); // Сохраняем выбранную группу
        setSelectedDevice(deviceId || null); // Сохраняем выбранное устройство или сбрасываем, если не указано
        console.log(
            `Selected Target: Group - ${groupName}, Device - ${deviceId || "All"}`
        );
        // Здесь можно отправить данные через WebSocket или обработать логику
    };

    return (
        <Layout style={{ height: "100%" }}>
            <Header style={{ backgroundColor: "#FFFF", color: "black", textAlign: "center" }}>
                <h1 style={{ color: "Black", margin: 0 }}>PTT Dispatch</h1>
            </Header>
            <Content style={{ padding: "20px" }}>
                <div style={{display: "flex", height: "100%"}}>
                    {/!* Левая панель с рабочими группами *!/}
                    <div
                        style={{
                            flex: "0 0 30%",
                            background: "#f0f2f5",
                            padding: "10px",
                            /!*overflowY: "auto",*!/
                            borderRight: "1px solid #d9d9d9",
                        }}
                    >

                        <Typography.Title level={2}>Рабочие группы</Typography.Title>
                        <List
                            bordered
                            dataSource={rooms}
                            renderItem={(room) => (

                                <List.Item>
                                    <div>
                                        <Text
                                            onClick={() => selectTarget(room.name)}
                                            style={{
                                                cursor: "pointer",
                                                color:
                                                    selectedGroup === room.name && !selectedDevice
                                                        ? "#1890ff"
                                                        : undefined,
                                            }}
                                        >
                                            {room.name}
                                        </Text>
                                        {/!* Список устройств внутри группы *!/}
                                        <List
                                            size="small"
                                            dataSource={room.devices}
                                            renderItem={(device) => (
                                                <List.Item
                                                    onClick={() => selectTarget(room.name, device.DID)}
                                                    style={{
                                                        cursor: "pointer",
                                                        paddingLeft: "20px",
                                                        color:
                                                            selectedGroup === room.name &&
                                                            selectedDevice === device.DID
                                                                ? "#1890ff"
                                                                : undefined,
                                                    }}
                                                >
                                                    Устройство: {device.DID}
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </List.Item>

                            )}
                        />
                    </div>

                    {/!* Правая панель с чат-сообщениями *!/}
                    <div style={{flex: "1", display: "flex", flexDirection: "column"}}>

                        <div
                            ref={chatContainerRef}
                            style={{
                                flex: 1,
                                padding: "10px",
                                background: "#fff",
                                border: "1px solid #d9d9d9",
                                /!*overflowY: "auto",*!/
                                borderRadius: "4px",
                            }}
                        >
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        justifyContent: message.type === "user" ? "flex-end" : "flex-start",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: "10px",
                                            background: message.type === "user" ? "#1890ff" : "#f0f2f5",
                                            color: message.type === "user" ? "#fff" : "#000",
                                            borderRadius: "4px",
                                            width: "40%",
                                        }}
                                    >
                                        <audio
                                            controls
                                            src={URL.createObjectURL(message.dataBlob)}
                                            style={{display: "block", width: "100%"}}
                                        />
                                        <Text>{message.from}</Text>
                                    </div>
                                </div>
                            ))}


                        </div>

                        <button
                            id="record"
                            ref={recordButtonRef}
                            onMouseDown={startRecording}
                            onMouseUp={stopRecording}
                            onMouseLeave={stopRecording}
                        >
                            Record
                        </button>

                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default PTTDispatch;
*/
