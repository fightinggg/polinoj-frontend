import { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import request from 'umi-request';


const columns: ProColumns[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '题目id',
        dataIndex: 'problemId',
        ellipsis: true,
    },
    {
        title: '题目名字',
        dataIndex: 'title',
        ellipsis: true,
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
            <a href={'/problem/' + record.problemId} rel="noopener noreferrer" key="view">
                查看
             </a>,
        ],
    },
];



export default () => {
    const actionRef = useRef<ActionType>();
    return (
        <ProTable
            columns={columns}
            actionRef={actionRef}
            request={
                async (params = {}) => {
                    var result = await request('/api/problem/page', {
                        method: 'POST',
                        data: params,
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
            headerTitle="题目列表"
            toolBarRender={() => [
                <Button key="button" icon={<PlusOutlined />} type="primary">
                    新建
                </Button>
            ]}
        />
    );
};