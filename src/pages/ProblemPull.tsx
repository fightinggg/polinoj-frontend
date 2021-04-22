import { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import request from 'umi-request';
import {successInfo} from '../utils/utils'
import { pullProblem } from '@/services/polin-oj/problem';


const columns: ProColumns[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '题目名字',
        dataIndex: 'title',
        ellipsis: true,
        hideInSearch: true,
    },
    {
        title: '题目来源',
        dataIndex: 'source',
        ellipsis: true,
    },
    {
        title: '题目来源ID',
        dataIndex: 'sourceId',
        ellipsis: true,
    },
    {
        title: '出题人',
        dataIndex: 'author',
        hideInSearch: true,
    },
    {
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => [
            <a onClick={() => {
                pullProblem(record.source,record.sourceId)
                .then((result)=>{
                    successInfo('拉取成功',`恭喜你拉取${record.source}的题目${result.title}成功，三秒后即将为您跳转到新的题目`)
                    setTimeout(() => {
                        window.location.href="/problem/"+result.problemId; 
                    }, 3000);
                })
            }}>拉取</a>,
            // <a href={record.url} target="_post" rel="noopener noreferrer" key="view">
            //     查看
            // </a>,
        ],
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
                    params = {
                        source: params.source || 'hdu',
                        pageIndex: params.current,
                        pageSize: params.pageSize,
                    }
                    var result = await request('/api/problem/remote', {
                        method: 'POST',
                        data: params,
                    })
                    return {
                        data: result.list,
                        pageSize: result.pageSize,
                        current: result.pageIndex,
                        total: result.total,
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
                pageSize: 100
            }}
            dateFormatter="string"
            headerTitle="题目列表"
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