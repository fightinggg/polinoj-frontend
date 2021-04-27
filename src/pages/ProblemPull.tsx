import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import request from 'umi-request';
import { successInfo } from '../utils/utils'
import { pullProblem } from '@/services/polin-oj/problem';
import { useState } from 'react';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import { Button, message } from 'antd';


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
        valueType: 'select',
        valueEnum: {
            all: { text: '全部', status: 'Default' },
            hdu: {
                text: 'hdu',
            }
        },
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
            <a onClick={async () => {
                const result = await pullProblem(record.source, record.sourceId);
                if(result!=null){
                    message.success("恭喜你拉取题目成功");
                }
            }}>拉取</a>,
            <a href={record.url} target="_post" rel="noopener noreferrer" key="view">
                查看
            </a>,
        ],
    },
];



export default () => {
    const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
    const actionRef = useRef<ActionType>();
    return (
        <PageContainer>
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
                rowKey="sourceId"
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
                    pageSize: 10
                }}
                dateFormatter="string"
                headerTitle="题目列表"
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    },
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            selectedRowsState
                            .map(o => {
                                const result = pullProblem(o.source, o.sourceId)
                                result.then(async o=>{
                                    if(o!=null){
                                        message.success(`恭喜你拉取题成功: ${o.title}`);
                                    }
                                })
                                return result;
                            })
                            .map(async o=>{await o})
                        }
                    }
                    >
                        批量拉取
                    </Button>
                </FooterToolbar>
            )}
        </PageContainer>

    );
};

