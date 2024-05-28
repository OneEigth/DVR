    import React, {useEffect} from "react";
import {Form, Input} from "antd";
import './style.css'
import {Device} from "../../../../types/Device";
    import IconLeftMenuFooter from "../../../icons/iconLeftMenu/IconLeftMenuFooter";
    import ButtonLeftMenuFooterEdit from "../../../buttons/buttonLeftMenu/ButtonLeftMenuFooterEdit";
    import ButtonLeftMenuFooterDelete from "../../../buttons/buttonLeftMenu/ButtonLeftMenuFooterDelete";
    import ButtonDeviceAddToLayout from "../../../buttons/buttonDeviceEdit/ButtonDeviceAddToLayout";
    import ButtonDeviceSave from "../../../buttons/buttonDeviceEdit/ButtonDeviceSave";
    import ButtonDeviceDelete from "../../../buttons/buttonDeviceEdit/ButtonDeviceDelete";

interface DescriptionsProps{
    device: Device;
}
const Description: React.FC<DescriptionsProps> = ({device}) => {

    const handleDeviceDelete = () => {

    };

    const handleDeviceAddToLayout = () => {

    };

    const handleDeviceSave = () => {

    };


    const [formLeft] = Form.useForm();
    const [formRight] = Form.useForm();

    useEffect(() => {
        formLeft.setFieldsValue({
            name: device.name,
            description: device.description,
            group: device.groupUID,
        });

        formRight.setFieldsValue({
            employee: device.ownerUID,
            serialNumber: device.DID,
            model: device.model,
        });

    }, [device, formLeft, formRight]);

    return (
        <div className="description_cont">
            <div className="desc">
                <div className="formGroupLeft"> {/* Группа слева */}
                    <Form
                        form={formLeft}
                        className="form"
                        name="basicLeft"
                        labelCol={{span: 5}}
                        wrapperCol={{span: 18}}
                        style={{maxWidth: '100%'}}

                    >
                        <Form.Item
                            label={<span className="inputLabel">Название</span>}
                            name="name"
                        >
                            <Input className="input" disabled/>
                        </Form.Item>

                        <Form.Item
                            label={<span className="inputLabel">Описание</span>}
                            name="description"
                        >
                            <Input className="input" disabled/>
                        </Form.Item>

                        <Form.Item
                            label={<span className="inputLabel">Группа</span>}
                            name="group"
                        >
                            <Input className="input" disabled/>
                        </Form.Item>
                    </Form>
                </div>

                <div className="formGroupRight">
                    {/* Группа справа */}

                    <Form
                        form={formRight}
                        className="form"
                        name="basicRight"
                        labelCol={{span: 5}}
                        wrapperCol={{span: 19}}
                        style={{maxWidth: '100%'}}
                    >
                        <Form.Item
                            label={<span className="inputLabel">Сотрудник</span>}
                            name="employee"

                        >
                            <Input className="input" disabled/>
                        </Form.Item>

                        <Form.Item
                            label={<span className="inputLabel">Серийный номер</span>}
                            name="serialNumber"
                        >
                            <Input className="input" disabled/>
                        </Form.Item>

                        <Form.Item
                            label={<span className="inputLabel">Модель</span>}
                            name="model"
                        >
                            <Input className="input" disabled/>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className="description_footer">
                <div>
                    <ButtonDeviceSave onClick={handleDeviceSave}/>
                    <ButtonDeviceAddToLayout onClick={handleDeviceAddToLayout}/>
                    <ButtonDeviceDelete onClick={handleDeviceDelete}/>
                </div>
            </div>
        </div>
    )
        ;
}

    export default Description;