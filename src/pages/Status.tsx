import React, { useRef } from 'react';
import { Modal } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getSubmit, pageStatus } from './../services/polin-oj/submit'
import { useState } from 'react';
import { CodePreview } from './../utils/code'
import { Spin } from 'antd';

class CodeShow extends React.Component {
    state = {
        code: null,
        loaded: false,
    }

    props = {
        id: 0
    }

    async componentDidMount() {
        const result = await getSubmit(this.props.id)
        this.setState({
            code: result.code,
            loaded: true,
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.loaded ?
                        <CodePreview>
                            {this.state.code}
                        </CodePreview> :
                        <Spin />
                }
            </div>

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
        render: (text) => {
            return text + 'MS'
        }
    },
    {
        title: '运行内存',
        dataIndex: 'execMemory',
        hideInSearch: true,
        render: (text) => {
            return text + 'KB'
        }
    },
    {
        title: '提交用户',
        dataIndex: 'userName',
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
                        <CodeShow id={record.id} />
                    </Modal>
                </div>
            ]
        },
    },
];


export default () => {
    const actionRef = useRef<ActionType>();
    return (
        <ProTable
            columns={columns}
            actionRef={actionRef}
            request={pageStatus}

            editable={{
                type: 'multiple',
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            pagination={{
                pageSize: 10,
            }}
            dateFormatter="string"
            headerTitle="提交记录"
        />
    );
};