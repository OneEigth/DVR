import React, {useState} from 'react';
import {Button, Form, type FormProps, Input, Radio} from 'antd';
import '../styles/Style.css';
import ButtonLang from "../../../components/buttons/buttonLang/ButtonLang";
import flag from '../img/DVR2.png'
import {useAuthStore} from "../../../store/auth/auth";
import { useNavigate } from 'react-router-dom';

type FieldType = {
    username?: string;
    password?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const LoginPage: React.FC = () =>{
    const {login, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const [selectedLang, setSelectedLang] = useState<string>('RU'); // Установка начального значения "RU"

    const onFinish = async (values: { username: string; password: string }) => {
        await login(values.username, values.password);
        const isAuthenticated = useAuthStore.getState().isAuthenticated; // Получаем текущее значение аутентификации из хранилища
        if (isAuthenticated) {
            navigate('/main');
        }
    };


return (
    <div className='page'>
        <div className='cart'>
            <div className='first'>
                <img src={flag} alt="logo"/>
                <div className="buttonLang">
                    <Radio.Group value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} className="RadioGroup">
                        <Radio.Button value="RU" className="RadioGroupButton">
                            RU
                        </Radio.Button>
                        <Radio.Button value="KZ" className="RadioGroupButton">
                            KZ
                        </Radio.Button>
                    </Radio.Group>
                </div>
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
                        layout="vertical"
                        label={<span className="inputLabel">Логин</span>}
                        name="username"
                        rules={[
                            {required: true, message: 'Введите логин'},
                        ]}
                        required={false}
                    >
                        <Input className="input"/>
                    </Form.Item>

                    <Form.Item
                        layout="vertical"
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

        </div>
        <div className="version">
            <h3 className="h3">Версия: 1.0.0</h3>
        </div>
    </div>
);
}
export default LoginPage;