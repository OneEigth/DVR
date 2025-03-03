import React, {useEffect, useMemo, useRef, useState} from "react";
import './style.css'
import {Button, Typography, Layout, List} from "antd";
import {useAuthStore} from "../../store/auth/auth";
import {usePTTGroupsStore} from "../../store/pttGroups/usePTTGroupsStore";


const { Header, Sider, Content } = Layout;
const { Text } = Typography;


const PTTDispatch: React.FC = () => {
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null); // Для выбранного устройства
    const [messages, setMessages] = useState<
        { dataBlob: Blob; type: "user" | "received"; from: string, timestamp: string, isPlayed: boolean }[]
    >([]);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
        null
    );

    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const recordButtonRef = useRef<HTMLButtonElement | null>(null);
    const { SmartDVRToken, user } = useAuthStore();
    const {
        groups,
        fetchGroups,
    } = usePTTGroupsStore();

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

    useEffect(() => {
        getMicrophoneAccess();
    }, []);



    const srvHostPort = "wss://89.218.134.252:8181/ptt-api";
    const userUID = user?.uid;
    const userToken = SmartDVRToken;
    const url = `${srvHostPort}/${userUID}/${userToken}`;
    const socket = useRef<WebSocket | null>(null);
    const isRecording = useRef<boolean>(false); // Флаг записи
    const mutableChunks = useRef<Blob[]>([]);



    useEffect(() => {
        socket.current = new WebSocket(url);

        socket.current.onopen = () => {
            console.log("✅ WebSocket connection open.");
        };


        socket.current.onmessage = (msg: MessageEvent<any>): void => {
            console.log("Received message:", msg);

            msg.data.arrayBuffer().then((result: ArrayBuffer) => {
                const t = new Uint8Array(result);
                const index = t.indexOf(10);

                if (index === -1) {
                    // Binary message without metadata
                    console.log("🔄 Бинарное сообщение без метаданных.");
                    const dataBlob = new Blob([t], { type: "audio/wav" });
                    console.log("🎵 Создан Blob:", dataBlob);
                    addMessage(dataBlob, "received", "unknown");
                    if (dataBlob.size > 0) {
                        console.log("Received binary message without metadata.");
                        addMessage(dataBlob, "received", "unknown");
                    } else {
                        console.error("Received empty Blob. Skipping.");
                    }
                } else {
                    // Binary message with metadata
                    console.log("📜 Бинарное сообщение с метаданными.");
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

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => console.log("✅ Микрофон работает!"))
            .catch((error) => console.error("❌ Ошибка доступа к микрофону:", error));


        try {
            const stream = await navigator.mediaDevices.getUserMedia({
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
        const timestamp = new Date().toLocaleString(); // Получаем текущее время
        if (dataBlob.size === 0) {
            console.error("Attempted to add empty Blob to messages.");
            return;
        }

        console.log("✅ Создан новый Blob. Размер:", dataBlob.size, "Тип:", dataBlob.type);

        const audioURL = URL.createObjectURL(dataBlob);
        console.log("🔗 Сгенерирован URL для аудио:", audioURL);


        setMessages((prev) => [
            ...prev,
            { dataBlob, type, from, timestamp, isPlayed: false },
        ]);
        setTimeout(() => {
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }, 100);
    };

    const selectTarget = (groupName: string, deviceId?: string) => {
        setSelectedGroup(groupName);
        setSelectedDevice(deviceId || null);

        console.log(
            `Selected Target: Group - ${groupName}, Device - ${deviceId || "All"}`
        );
    };


    // Функция открытия окна
    const openAdminPanel = () => {
        window.open('/adminPtt', '_blank');
    };


    // Фильтруем группы по userUID, но устройства не трогаем
    const filteredGroups = useMemo(() => {
        return groups.filter(group => group.userUID === userUID);
    }, [groups, userUID]);


    return (

        <Layout style={{ height: "100vh" }}>


            <Header style={{
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px",
                position: "fixed",
                width: "100%",
                top: 0,
                zIndex: 1000,
            }}>
                <h1 style={{color: "black", margin: 0, whiteSpace: "nowrap"}}>PTT Dispatch</h1>
                {/* Кнопка "Администрирование" в правом углу */}
                <Button
                    type="primary"
                    onClick={openAdminPanel}
                    style={{ display: user?.isAdmin ? "inline-block" : "none" }} // Показываем кнопку только для админов
                >
                    Администрирование
                </Button>
            </Header>

            <Layout style={{ marginTop: 64 }}>
                <Sider width={300}
                       style={{
                           background: "#f0f2f5",
                           height: "calc(100vh - 64px)", // Высота минус Header
                           overflowY: "auto", // Включаем прокрутку
                           position: "fixed",
                           left: 0,
                           borderRight: "1px solid #d9d9d9",
                           padding: "10px",
                       }}
                >
                    <Typography.Title level={2}>Рабочие группы</Typography.Title>
                    <List
                        bordered
                        dataSource={filteredGroups}
                        renderItem={(room) => (
                            <List.Item>
                                <div>
                                    <Text onClick={() => selectTarget(room.name)} style={{ cursor: "pointer" }}>
                                        {room.name}
                                    </Text>
                                    <List
                                        size="small"
                                        dataSource={room.devices}
                                        renderItem={(device) => (
                                            <List.Item onClick={() => selectTarget(room.name, device.DID)} style={{ cursor: "pointer" }}>
                                                Устройство: {device.DID} | Онлайн: {device.online ? "Да" : "Нет"}
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </List.Item>
                        )}
                    />
                </Sider>

                {/* Правая панель с чатом */}
                <Layout style={{ marginLeft: 300 }}>
                    <Content style={{ padding: "20px", display: "flex", flexDirection: "column",  height: "calc(100vh - 64px)" }}>
                        <div
                            ref={chatContainerRef}
                            style={{
                                flex: 1,
                                padding: "10px",
                                background: "#fff",
                                border: "1px solid #d9d9d9",
                                borderRadius: "4px",
                                overflowY: "auto", // Добавляем независимую прокрутку чата
                                maxHeight: "calc(100vh - 130px)", // Ограничиваем высоту, чтобы кнопка не уезжала вниз

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
                                            position: "relative", // Для позиционирования метки
                                        }}
                                    >
                                        {/* Метка для непрослушанных сообщений */}
                                        {message.type === "received" && !message.isPlayed && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "-5px", // Смещение вверх
                                                    right: "-5px", // Смещение вправо
                                                    width: "20px",
                                                    height: "20px",
                                                    borderRadius: "50%",
                                                    background: "red",
                                                    border: "2px solid white", // Чтобы метка была видна на фоне сообщения
                                                }}
                                            />
                                        )}
                                        <audio
                                            controls
                                            src={URL.createObjectURL(message.dataBlob)}
                                            style={{display: "block", width: "100%"}}

                                        />
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginTop: "5px"
                                        }}>
                                            <Text>{message.from}</Text>
                                            <Text style={{
                                                fontSize: "12px",
                                                color: message.type === "user" ? "#e6f7ff" : "#8c8c8c"
                                            }}>
                                                {message.timestamp}
                                            </Text>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Кнопка записи */}
                        <Button
                            type="primary"
                            ref={recordButtonRef}
                            onMouseDown={startRecording}
                            onMouseUp={stopRecording}
                            onMouseLeave={stopRecording}
                            style={{marginTop: "10px"}}
                        >
                            Запись
                        </Button>
                    </Content>
                </Layout>
            </Layout>
        </Layout>

    );
};


export default PTTDispatch;

