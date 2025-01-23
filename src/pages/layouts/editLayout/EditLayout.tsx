
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import MainMenu from "../../../components/menu/Menu";
import {Button, Form, Input, Layout, message, Radio, RadioChangeEvent} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import './style.css'
import {useNavigate} from "react-router-dom";
import CameraGrid3x3 from "../../../components/cameraGrid/3х3/cameraGrid3x3";
import LocationMap2 from "../../../components/locationMap2/LocationMap2";
import {useSelectedLayout} from "../../../store/useSelectedLayout";
import ButtonLayoutViewStyle from "../../../components/buttons/buttonLayout/buttonLayoutViewStyle";
import CameraGrid1x5 from "../../../components/cameraGrid/1x5/cameraGrid1x5";
import CameraGrid3x4 from "../../../components/cameraGrid/3x4/cameraGrid3x4";
import CameraGrid4x4 from "../../../components/cameraGrid/4x4/cameraGrid4x4";
import CameraGrid2x2 from "../../../components/cameraGrid/2x2/cameraGrid2x2";
import CameraGrid1x12 from "../../../components/cameraGrid/1x12/cameraGrid1x12";
import CameraGrid2x8 from "../../../components/cameraGrid/2х8/cameraGrid2x8";
import {useIsLayoutFormChanged} from "../../../store/layout/useIsLayoutFormChanged";
import ButtonLayoutSave from "../../../components/buttons/buttonLayout/LayoutEdit/ButtonLayoutSave";
import {useAuthStore} from "../../../store/auth/auth";
import {UpdateLayouts} from "../../../api/layout/UpdateLayout";
import {useStateNameDevice} from "../../../store/layout/useStateNameDevice";
const {Header, Content, Footer} = Layout;


// Стилизация Radio.Group
const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
`;

// Стилизация Radio.Button
const StyledRadioButton = styled(Radio.Button)`
    flex: 1;
    text-align: center;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    line-height: 1.5;
    cursor: pointer;

    &.ant-radio-button-wrapper {
        border-radius: 0;
        border: none;
        box-shadow: none;
    }

    &.ant-radio-button-wrapper-checked {
        background-color: #4D4E65; /* Цвет для выделенной кнопки */
        color: white;

        &:hover {
            background-color: #4D4E65; /* Цвет при наведении на выделенную кнопку */
            color: white; /* Текст остается белым */
        }
    }

    &:not(.ant-radio-button-wrapper-checked) {
        background-color: #CDD0D2; /* Цвет для невыделенных кнопок */
        color: #333;

        &:hover {
            background-color: #4D4E65; /* Цвет при наведении на невыделенную кнопку */
            color: white; /* Текст становится белым */
        }
    }
`;


const EditLayout: React.FC = () => {

    const navigate = useNavigate();

    const [formLeft] = Form.useForm();
    const [formRight] = Form.useForm();
    const [currentMenuItem, setCurrentMenuItem] = useState('layouts');
    const { selectedLayout, setSelectedLayout } = useSelectedLayout();
    const [isMapVisible, setIsMapVisible] = useState(false);
    const { SmartDVRToken, user } = useAuthStore();
    const [messageApi, contextHolder] = message.useMessage();
    const {isShowNameDevice, setIsShowNameDevice}=useStateNameDevice();
    const [selectedType, setSelectedType] = useState(isShowNameDevice ? 'Show' : 'Hide');
    const {setIsLayoutFormChanged, setIsNotSavedModalVisible, isNotSavedModalVisible, layoutViewType, setLayoutViewType } = useIsLayoutFormChanged();




    const handleSelectLayoutView = (size: '2x2' | '1х5' | '3х4' | '3х3' | '2х8' | '1х12' | '4х4') => {
        setLayoutViewType(size);
    };

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };


    useEffect(() => {
        if (selectedLayout) {
            setLayoutViewType(selectedLayout.viewType || '2x2'); // Устанавливаем вид из данных раскладки
            formLeft.setFieldsValue({ name: selectedLayout.name });
            formRight.setFieldsValue({ description: selectedLayout.description });
        }
    }, [selectedLayout, formLeft, formRight]);

    const handleLayoutSave = async () => {
        if (user?.login) {
            try {
                const valuesLeft = await formLeft.validateFields();
                const valuesRight = await formRight.validateFields();



                const initialValuesLeft = {
                    name: selectedLayout?.name,
                };
                const initialValuesRight = {
                    description: selectedLayout?.description,
                };

                const changedValuesLeft = getChangedFields(initialValuesLeft, valuesLeft);
                const changedValuesRight = getChangedFields(initialValuesRight, valuesRight);



                if (selectedLayout?.uid && SmartDVRToken) {  // Проверьте регистр 'uid' или 'UID'
                    const updatedLayoutData = {
                        ...selectedLayout,
                        ...changedValuesLeft,
                        ...changedValuesRight,
                        viewType: layoutViewType,
                    };

                    console.log("Updated Layout Data:", updatedLayoutData);

                    const response = await UpdateLayouts(SmartDVRToken, user.login, updatedLayoutData);

                    if (response?.success) {
                        messageApi.success('Раскладка успешно обновлена');
                        setIsLayoutFormChanged(false);
                        setSelectedLayout(updatedLayoutData);

                        navigate('/layout/${selectedLayout.uid}', { state: { layout: updatedLayoutData } });
                    } else {
                        const errorMessage = response?.error || 'Неизвестная ошибка';
                        messageApi.error('Ошибка обновления: ' + errorMessage);
                    }
                } else {
                    messageApi.error('UID или SmartDVRToken отсутствует.');
                }
            } catch (error) {
                console.error('Ошибка валидации или сохранения:', error);
                messageApi.error('Ошибка валидации или сохранения');
            }
        } else {
            messageApi.error('Пользователь не авторизован');
        }
    };

    const getChangedFields = (initialValues: { [key: string]: any }, currentValues: { [key: string]: any }) => {
        const changedFields: { [key: string]: any } = {};
        for (const key in currentValues) {
            if (currentValues[key] !== initialValues[key]) {
                changedFields[key] = currentValues[key];
            }
        }
        return changedFields;
    };

   /* const handleRadioChange = (e: any) => {
        const value = e.target.value;
        setSelectedType(value);
        setIsShowNameDevice(value === 'Show');
    };*/
    const handleDeleteLayout = () => {

    };

    const handleBackToAllDevice = () => {
        navigate(-1);
    };

    const initialValuesLeft = {
        name: selectedLayout?.name,
    };

    const initialValuesRight = {
        description: selectedLayout.description
    };

    const checkForChanges = () => {
        const valuesLeft = formLeft.getFieldsValue();
        const valuesRight = formRight.getFieldsValue();
        const changedValuesLeft = getChangedFields(initialValuesLeft, valuesLeft);
        const changedValuesRight = getChangedFields(initialValuesRight, valuesRight);
        setIsLayoutFormChanged(Object.keys(changedValuesLeft).length > 0 || Object.keys(changedValuesRight).length > 0);
    };


    const handleRadioChange = (e: RadioChangeEvent) => {

        const value = e.target.value;
        setSelectedType(value);
        setIsShowNameDevice(value === 'Show');
    };
    return (
        <>
        <Layout style={{minHeight: '100vh'}}>
            <Header style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 0,
                paddingRight: 0
            }}>
                <div className="menu">
                    <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem}/>
                </div>
            </Header>

            <Layout>

                <Layout>
                    <Content style={{
                        overflowX: 'auto',
                        background: '#ffffff',
                        flex: 1,
                        padding: '16px'
                    }}>
                        <div className="layouts">
                            <div className="header_layout">
                                <div className="left_HT">
                                    <Button className="buttonLeft" icon={<ArrowLeftOutlined/>} style={{border: 'none'}}
                                            onClick={handleBackToAllDevice}>Раскладка</Button>
                                </div>

                                <div className="center_LO">
                                    <ButtonLayoutViewStyle onFilterButtonClick={handleSelectLayoutView}/>
                                </div>

                            </div>

                            <div className="body_layouts">
                                {layoutViewType === '2x2' && <CameraGrid2x2 menuType={"edit"} isMapVisible={isMapVisible}/>}
                                {layoutViewType === '1х5' && <CameraGrid1x5 menuType={"edit"}  isMapVisible={isMapVisible}/>}
                                {layoutViewType === '3х4' && <CameraGrid3x4 menuType={"edit"} isMapVisible={isMapVisible}/>}
                                {layoutViewType === '3х3' && <CameraGrid3x3 menuType={"edit"} isMapVisible={isMapVisible}/>}
                                {layoutViewType === '2х8' && <CameraGrid2x8 menuType={"edit"} isMapVisible={isMapVisible}/>}
                                {layoutViewType === '1х12' && <CameraGrid1x12 menuType={"edit"} isMapVisible={isMapVisible}/>}
                                {layoutViewType === '4х4' && <CameraGrid4x4 menuType={"edit"} isMapVisible={isMapVisible}/>}

                                {!selectedLayout && <p>Раскладка не выбрана</p>}
                            </div>

                            <div className="description_layout">
                                <div className="formGroupLeft"> {/* Группа слева */}
                                    <Form
                                        form={formLeft}
                                        initialValues={initialValuesLeft}
                                        className="form"
                                        name="basicLeft"
                                        labelCol={{span: 4}}
                                        wrapperCol={{span: 20}}
                                        style={{maxWidth: '100%'}}
                                        onValuesChange={checkForChanges}
                                    >
                                        <Form.Item
                                            label={<span className="inputLabel">Название</span>}
                                            name="name"
                                            rules={[{required: true, message: 'Пожалуйста, введите Название'}]}
                                        >
                                            <Input className="input"/>
                                        </Form.Item>
                                        <Form.Item
                                            label={<span className="inputLabel">Названия утройств</span>}
                                            name="nameOfDevice"
                                            rules={[{required: false, message: 'Пожалуйста, введите Название'}]}
                                        >
                                            <div style={{width: "100%"}}>
                                                <StyledRadioGroup value={selectedType} onChange={handleRadioChange}>
                                                    <StyledRadioButton value="Show">Показать</StyledRadioButton>
                                                    <StyledRadioButton value="Hide">Скрыть</StyledRadioButton>
                                                </StyledRadioGroup>
                                            </div>

                                        </Form.Item>
                                    </Form>
                                </div>

                                <div className="formGroupRight">
                                    {/* Группа справа */}

                                    <Form
                                        form={formRight}
                                        initialValues={initialValuesRight}
                                        className="form"
                                        name="basicRight"
                                        labelCol={{span: 5}}
                                        wrapperCol={{span: 19}}
                                        style={{maxWidth: '100%'}}
                                        onValuesChange={checkForChanges}
                                    >
                                        <Form.Item
                                            label={<span className="inputLabel">Описание</span>}
                                            name="description"

                                            rules={[{required: true, message: 'Пожалуйста, введите описание'}]}
                                        >
                                            <Input className="input"/>
                                        </Form.Item>

                                    </Form>
                                </div>
                            </div>

                            <div className="DescButtons_layout">
                                <ButtonLayoutSave onClick={handleLayoutSave}/>
                            </div>

                        </div>
                    </Content>


                    <Footer style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: 0,
                        paddingRight: 0,
                        background: "blue",
                        position: 'relative',
                        bottom: 0,
                        backgroundColor: '#ffffff'
                    }}>
                        {/* Ваш футер здесь */}
                    </Footer>
                </Layout>
            </Layout>

            {/* Модальные окна */}
        </Layout>
       </>
    );
};

export default EditLayout;