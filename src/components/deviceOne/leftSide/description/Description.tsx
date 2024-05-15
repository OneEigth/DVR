import React from "react";
import {Form, Input} from "antd";
import './style.css'
import {Device} from "../../../../types/Device";

interface DescriptionsProps{
    device: Device;
}
const Description: React.FC<DescriptionsProps> = ({device}) => {

    return (
        <div className="descContainer">
            <div className="formGroupLeft"> {/* Группа слева */}
                <Form
                    className="form"
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                >
                    <Form.Item
                        label={<span className="inputLabel">Название</span>}
                        name="name"
                        initialValue={device.name}
                    >
                        <Input className="input" disabled/>
                    </Form.Item>

                    <Form.Item
                        label={<span className="inputLabel">Описание</span>}
                        name="description"
                        initialValue={device.description}
                    >
                        <Input className="input" disabled/>
                    </Form.Item>

                    <Form.Item
                        label={<span className="inputLabel">Группа</span>}
                        name="group"
                        initialValue={device.groupUID}
                    >
                        <Input className="input" disabled/>
                    </Form.Item>
                </Form>
            </div>

            <div className="formGroupRight">
                {/* Группа справа */}

                <Form
                    className="form"
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                >
                    <Form.Item
                        label={<span className="inputLabel">Сотрудник</span>}
                        name="employee"
                        initialValue={device.ownerUID}
                    >
                        <Input className="input" disabled/>
                    </Form.Item>

                    <Form.Item
                        label={<span className="inputLabel">Серийный номер</span>}
                        name="serialNumber"
                        initialValue={device.DID}
                    >
                        <Input className="input" disabled/>
                    </Form.Item>

                    <Form.Item
                        label={<span className="inputLabel">Модель</span>}
                        name="model"
                        initialValue={device.model}
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