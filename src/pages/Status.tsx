import React, { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Modal, Button, Tag, Space, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import {getSubmit} from './../services/polin-oj/submit'
import { useState } from 'react';
import {CodePreview} from './../utils/code'

class CodeShow extends React.Component {
    state = {
        code: null,
    }

    async componentDidMount() {
        const result = await getSubmit(this.props.id)
        this.setState({
            code: result.code,
        })
    }

    render() {
        return (
            <CodePreview>
                {this.state.code}
            </CodePreview>
        );
    }
}

const columns: ProColumns[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '题目来源',
        dataIndex: 'problemSource',
        ellipsis: true,
    },
    {
        title: '题目来源ID',
        dataIndex: 'problemId',
        ellipsis: true,
    },
    {
        title: '状态',
        dataIndex: 'status',
        filters: true,
        onFilter: true,
        valueType: 'select',
        valueEnum: {
            all: { text: '全部', status: 'Default' },
            WA: {
                text: 'WA',
                status: 'Error',
            },
            AC: {
                text: 'AC',
                status: 'Success',
                disabled: true,
            },
            '?': {
                text: '?',
                status: 'Processing',
            },
        },
    },
    {
        title: '运行时间',
        dataIndex: 'execTime',
        hideInSearch: true,
        render: (text)=>{
            return text+'MS'
        }
    },
    {
        title: '运行内存',
        dataIndex: 'execMemory',
        hideInSearch: true,
        render: (text)=>{
            return text+'KB'
        }
    },
    {
        title: '题解用户',
        dataIndex: 'user',
    },
    {
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => {
            const [isModalVisible, setIsModalVisible] = useState(false);
            return [
                <div>
                    <a onClick={() => { setIsModalVisible(true) }}>查看代码</a>
                    <Modal title="代码"
                        visible={isModalVisible}
                        onOk={() => setIsModalVisible(false)}
                        onCancel={() => setIsModalVisible(false)}
                        width='90%'>
                        <CodeShow id={record.id}/>
                    </Modal>
                </div>
            ]
        },
    },
];

const menu = (
    <Menu>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
);

export default () => {
    const actionRef = useRef<ActionType>();
    return (
        <ProTable
            columns={columns}
            actionRef={actionRef}
            request={
                async (params = {}) => {
                    params.source = 'hdu'
                    var result = await request('/api/problem/status', {
                        params,
                    })
                    return { 
                        data: result.list, 
                        pageSize: result.pageSize,
                        current: result.pageIndex,
                    }
                }
            }


            editable={{
                type: 'multiple',
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            form={{
                // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
                syncToUrl: (values, type) => {
                    if (type === 'get') {
                        return {
                            ...values,
                            created_at: [values.startTime, values.endTime],
                        }; 0
                    }
                    return values;
                },
            }}
            pagination={{
                pageSize: 10,
            }}
            dateFormatter="string"
            headerTitle="提交记录"
            toolBarRender={() => [
                <Button key="button" icon={<PlusOutlined />} type="primary">
                    新建
                </Button>,
                <Dropdown key="menu" overlay={menu}>
                    <Button>
                        <EllipsisOutlined />
                    </Button>
                </Dropdown>,
            ]}
        />
    );
};