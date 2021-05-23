import React, { useRef } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Upload } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { createProblem, pageProblem } from '@/services/polin-oj/problem';
import { ModalForm, ProFormDigit, ProFormList, ProFormSlider, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { useState } from 'react';
import { Row } from 'antd'
import { List } from 'antd';
import { previewTestSample } from '@/services/polin-oj/sample';
// import ReactMarkdown from 'react-markdown'



export default () => {
    const actionRef = useRef<ActionType>();
    const [createProblemVisible, handleCreateProblemVisible] = useState<boolean>(false);

    const [updateProblemVisible, handleUpdateProblemVisible] = useState<boolean>(false);
    const [updateProblemId, handleUpdateProblemId] = useState<string>('');
    const [updateSample, handleUpdateSample] = useState<any>([]);


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
            title: '总通过次数',
            dataIndex: 'acCount',
            hideInSearch: true,
        },
        {
            title: '总提交次数',
            dataIndex: 'allCount',
            hideInSearch: true,
        },
        {
            title: '查看',
            valueType: 'option',
            render: (text, record, _, action) => [

                <Button type="link" href={'/problem/' + record.problemId} size={'small'}>
                    查看
                </Button>,
            ],
        },
        {
            title: '编辑',
            valueType: 'option',
            render: (text, record, _, action) => [
                <Button type="link" onClick={
                    async () => {
                        const res = await previewTestSample(record.problemId);
                        handleUpdateSample(res.filenames||['没有测试数据'])
                        handleUpdateProblemId(record.problemId)
                        handleUpdateProblemVisible(true)
                    }
                } size={'small'}>
                    编辑
                </Button>

            ],
        },
    ];

    return (
        <PageContainer>
            <ModalForm
                title={'新建题目'}
                width="80%"
                visible={createProblemVisible}
                onVisibleChange={handleCreateProblemVisible}
                onFinish={async (value) => {
                    const result = await createProblem(value);
                    if (result != null) {
                        console.log(result);
                    }
                }}
            // onValuesChange={handleProblem}
            >
                <ProFormText
                    label="题目名称"
                    rules={[{ required: true }]}
                    width="md"
                    name="title"
                />

                <Row>
                    <Col span={14}>
                        <ProFormSlider
                            label="内存限制"
                            name="memory"
                            rules={[{ required: true }]}
                            min={1}
                            max={512}
                            marks={{
                                1: '1MB',
                                64: '64MB',
                                128: '128MB',
                                256: '256MB',
                                512: '512MB',
                            }}
                        />
                    </Col>
                    <Col span={6} offset={2} >
                        <ProFormDigit
                            label=" "
                            name="memory"
                            min={1} max={512}
                        />
                    </Col>
                </Row>


                <Row>
                    <Col span={14}>
                        <ProFormSlider
                            label="时间限制"
                            name="time"
                            rules={[{ required: true }]}
                            min={1}
                            max={30}
                            marks={{
                                1: '1秒',
                                3: '3秒',
                                7: '7秒',
                                15: '15秒',
                                30: '30秒',
                            }}
                        />
                    </Col>
                    <Col span={6} offset={2} >
                        <ProFormDigit
                            label=" "
                            name="time"
                            min={1} max={30}
                        />
                    </Col>
                </Row>


                <ProFormTextArea
                    label='题目描述'
                    rules={[{ required: true }]}
                    placeholder={'题目描述'}
                    name="description"

                />
                {/* <ReactMarkdown>{problem.description}</ReactMarkdown> */}

                <ProFormTextArea
                    label='输入描述'
                    placeholder='输入描述'
                    rules={[{ required: true }]}
                    name="input"
                />
                {/* <ReactMarkdown>{problem.input}</ReactMarkdown> */}


                <ProFormTextArea
                    label='输出描述'
                    placeholder='输出描述'
                    rules={[{ required: true }]}
                    name="output"
                />
                {/* <ReactMarkdown>{problem.output}</ReactMarkdown> */}

                <ProFormTextArea
                    label='题目提示'
                    rules={[{ required: true }]}
                    placeholder={'题目提示'}
                    name="hint"
                />
                {/* <ReactMarkdown>{problem.hint}</ReactMarkdown> */}

                <ProFormList
                    name="sample"
                    label="样例"
                >
                    <ProFormTextArea
                        label='样例输入'
                        rules={[{ required: true }]}
                        placeholder={'样例输入'}
                        name="input"
                        width='xl'
                    />

                    <ProFormTextArea
                        label='样例输出'
                        rules={[{ required: true }]}
                        placeholder={'样例输出'}
                        name="output"
                        width='xl'
                    />
                </ProFormList>


            </ModalForm>


            <ModalForm
                title={'编辑测试数据集'}
                width="80%"
                visible={updateProblemVisible}
                onVisibleChange={handleUpdateProblemVisible}
                onFinish={async ()=>handleUpdateProblemVisible(false)}
            >
                <Upload {...{
                    name: 'file',
                    action: '/api/cos/upload/sample/' + updateProblemId,
                    maxCount: 1,
                    onChange(info) {
                        if (info.file?.response) {
                            if (info.file.response.success) {
                                handleUpdateSample(info.file.response.data.filenames)
                            } else {
                                handleUpdateSample(['文件有错误，上传失败'])
                            }
                        }
                    }
                }}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>

                <List
                    itemLayout="horizontal"
                    dataSource={updateSample}
                    size={'small'}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />



            </ModalForm>


            <ProTable
                columns={columns}
                actionRef={actionRef}
                request={pageProblem}


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
                    <Button key="button" icon={<PlusOutlined />} type="primary" onClick={
                        () => { handleCreateProblemVisible(true) }
                    }>
                        新建
                </Button>
                ]}
            />
        </PageContainer>
    );
};
