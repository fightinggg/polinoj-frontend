import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link, SelectLang } from 'umi';
import Footer from '@/components/Footer';

import styles from './Login/index.less';
import { register } from '@/services/polin-oj/login';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};


export default class Regeister extends React.Component {
    state = {
        loading: false
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.lang}>{SelectLang && <SelectLang />}</div>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img alt="logo" className={styles.logo} src="/logo.svg" />
                                <span className={styles.title}>Polin OJ</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>Polin OJ 是地大最具影响力的 Web OJ</div>
                    </div>

                    <div className={styles.main}>
                        <Form {...layout} name="nest-messages" onFinish={async (values) => {
                            this.setState({ loading: true })
                            const result = await register(values);

                            this.setState({ loading: false })
                            if (result != null) {
                                window.location.href = "/welcome";
                            }
                        }}>
                            <Form.Item
                                name={['username']}
                                label="用户名"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name={['password']}
                                label="密码"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Input.Password />
                            </Form.Item>


                            <Form.Item
                                name={['confirmPassword']}
                                label="确认密码"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name={['email']}
                                label="邮箱"
                                rules={[
                                    {
                                        type: 'email',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item name={['telephone']}
                                label="电话"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit"
                                    loading={this.state.loading}
                                >
                                    注册
                            </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};
