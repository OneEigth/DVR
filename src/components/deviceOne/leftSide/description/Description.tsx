import React, {useEffect} from "react";
import {Form, Input} from "antd";
import './style.css'
import {Device} from "../../../../types/Device";

interface DescriptionsProps{
    device: Device;
}
const Description: React.FC<DescriptionsProps> = ({device}) => {

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
        <div className="descContainer">
            <div className="formGroupLeft"> {/* Группа слева */}
                <Form
                    form={formLeft}
                    className="form"
                    name="basicLeft"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
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
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
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
    )
        ;
}

export default Description;