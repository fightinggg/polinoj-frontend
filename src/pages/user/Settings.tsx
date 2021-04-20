import React from 'react';
import { updateUser, currentUser } from '@/services/polin-oj/user'

import { Form, Input,  Button } from 'antd';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
/* eslint-disable no-template-curly-in-string */


export default class Problem extends React.Component {
    state = {
        email: null,
        id: null,
        telephone: null,
        username: null,
    }


    async componentDidMount() {
        const user = await currentUser();
        
        this.setState(user)
    }

    finish = async (values: any) => {
        const user = await currentUser();
        values.user.id = user.id;
        updateUser(values.user);
    }

    render() {
        return (
            <Form {...layout} name="nest-messages" onFinish={this.finish}>
                <Form.Item
                    name={['user', 'username']}
                    label="username"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    initialValue={this.state.username}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="email"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                    initialValue={this.state.email}
                >
                    <Input />
                </Form.Item>

                <Form.Item name={['user', 'telephone']}
                    label="telephone"
                    initialValue={this.state.telephone}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit" >
                        Submit
              </Button>
                </Form.Item>
            </Form>

        );
    }
};




