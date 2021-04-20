import React from 'react';
import { Descriptions } from 'antd';
import { Card } from 'antd';
import {currentUser} from '@/services/polin-oj/user'

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

    render() {
        return (
            <Card style={{ width: '100%' }}>
                <Descriptions title={this.state.username}>
                    <Descriptions.Item label="账号">{this.state.id}</Descriptions.Item>
                    <Descriptions.Item label="手机号">{this.state.telephone}</Descriptions.Item>
                    <Descriptions.Item label="邮箱">{this.state.email}</Descriptions.Item>
                </Descriptions>
            </Card>
        );
    }
};
