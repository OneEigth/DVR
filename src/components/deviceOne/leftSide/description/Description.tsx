import React from "react";
import {Form, Input} from "antd";
import './style.css'

const Description: React.FC = () => {

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
                        initialValue="daasdc"
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