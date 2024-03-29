import React from 'react';
import {Button, Form, type FormProps, Input} from 'antd';
import '../styles/Style.css';
import ButtonLang from "../../../components/buttons/buttonLang/ButtonLang";
import flag from '../img/Logo.png'
import {useAuthStore} from "../../../store/auth/auth";
import { useNavigate } from 'react-router-dom';


type FieldType = {
    username?: string;
    password?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const LoginPage: React.FC = () =>{
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const onFinish = async (values: { username: string; password: string }) => {
        await login(values.username, values.password);
        if (useAuthStore.getState().isAuthenticated) {
            navigate('/main'); // Перенаправляем на страницу /tab после успешной авторизации
        }
    };


return (
    <div className='page'>
        <div className='cart'>
            <div className='first'>
                <img src={flag} alt="logo"/>
            </div>

            <div className="second">
                <h1 className='label'>Вход</h1>
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label={<span className="inputLabel">Логин</span>}
                        name="username"
                        rules={[
                            { required: true, message: 'Введите логин' },
                        ]}
                        required={false}
                    >
                        <Input className="input" />
                    </Form.Item>

                    <Form.Item
                        label={<span className="inputLabel">Пароль</span>}
                        name="password"
                        rules={[{required: true, message: 'Введите пароль.'}]}
                        required={false}
                    >
                        <Input.Password className="input"/>
                    </Form.Item>


                    <Button type="primary" htmlType="submit" className="ButtonLogIn">
                        Войти
                    </Button>

                </Form>
            </div>
            <div className="thirdLine">
                <div className="version">
                    <h3 className="h3">Версия: 1234</h3>
                </div>
                <div className="buttonLang">
                    <ButtonLang/>
                </div>
            </div>
        </div>

    </div>
);
}
export default LoginPage;