import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Switch } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { createContext, joinContext, pageContext, updateJoinContext } from "@/services/polin-oj/context"
import { PageContainer } from '@ant-design/pro-layout';
import ModalForm from '@ant-design/pro-form/lib/layouts/ModalForm';
import { ProFormText } from '@ant-design/pro-form';
import { useState } from 'react';
import { Form } from 'antd';
import { DatePicker } from 'antd';
import { Select } from 'antd';
const { RangePicker } = DatePicker;




export default () => {
    const actionRef = useRef<ActionType>();
    const [createContextVisible, handleCreateContextVisible] = useState<boolean>(false);


    return (
        <PageContainer>
            <ModalForm
                title={'新建比赛'}
                width="80%"
                visible={createContextVisible}
                onVisibleChange={handleCreateContextVisible}
                onFinish={async (value) => {
                    value.beginTime = Date.parse(value.time[0])
                    value.endTime = Date.parse(value.time[1])
                    delete value.time

                    if (value.problemId) {
                        for (var i = 0; i < value.problemId.length; i++) {
                            const element = value.problemId[i];
                            if (isNaN(element)) {
                                message.error(`题号 '${element}' 不是一个数字`)
                                return;
                            }
                        }
                    }

                    const result = await createContext(value);

                    if (result != null) {
                        message.success("恭喜你创建比赛成功")
                        handleCreateContextVisible(true);
                    }

                }}
            >
                <ProFormText
                    label="比赛名称"
                    rules={[
                        {
                            required: true,
                            message: '比赛名称',
                        },
                    ]}
                    width="md"
                    name="name"
                />

                <Form.Item
                    label="比赛时间"
                    name="time"
                >
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>


                <Form.Item
                    label="题号"
                    name="problemId"
                >
                    <Select mode="tags"
                        style={{ width: '100%' }}
                        tokenSeparators={[',']}
                    >
                    </Select>
                </Form.Item>
            </ModalForm>

            <ProTable
                columns={
                    [
                        {
                            dataIndex: 'index',
                            valueType: 'indexBorder',
                            width: 48,
                        },
                        {
                            title: '比赛id',
                            dataIndex: 'id',
                        },
                        {
                            title: '比赛名字',
                            dataIndex: 'name',
                        },
                        {
                            title: '比赛开始时间',
                            dataIndex: 'beginTimeString',
                        },
                        {
                            title: '比赛结束时间',
                            dataIndex: 'endTimeString',
                        },
                        {
                            title: '比赛负责人',
                            dataIndex: 'ownerName',
                        },
                        {
                            title: '操作',
                            valueType: 'option',
                            render: (text, record, _, action) => [
                                record.join ?
                                    <Button
                                        type="link"
                                        href={'/context/' + record.id}
                                        disabled={record.beginTime > new Date().getTime()}>
                                        查看
                            </Button> :
                                    <Button
                                        type="primary"
                                        onClick={async () => {
                                            await joinContext(record.id)
                                            actionRef.current?.reload()
                                        }}
                                        hidden={record.join}>
                                        报名
                            </Button>
                            ],
                        },
                        {
                            title: '打星',
                            render: (text, record) => {
                                return <Switch
                                    checked={record.star}
                                    disabled={!record.join || new Date().getTime() > record.beginTime}
                                    onChange={async (c) => {
                                        await updateJoinContext(record.id, c)
                                        actionRef.current?.reload()
                                    }
                                    }
                                />
                            }
                        }
                    ]}


                actionRef={actionRef}
                request={
                    pageContext
                }

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
                headerTitle="比赛列表"
                toolBarRender={() => [
                    <Button key="button"
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => { handleCreateContextVisible(true) }}>
                        新建
                </Button>
                ]}
            />
        </PageContainer>
    );
};

