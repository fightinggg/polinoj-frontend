import React, { useRef } from 'react';
import { Button, Card, Col, Modal, Row } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getSubmit, pageStatus } from './../services/polin-oj/submit'
import { useState } from 'react';
import { CodePreview } from './../utils/code'
import { Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import { flushSync, render } from 'react-dom';

let timer: NodeJS.Timeout | null = null

interface StatusProps {
    submitId: number
}

interface RunInfo {
    times: number
    memory: number
    returnCode: number
}

interface StatusState {
    code: string,
    ccInfo: string,
    runInfo: Array<RunInfo>,
    status: string,
    loaded: boolean,
}

class StatusShow extends React.Component<StatusProps> {
    state: StatusState

    constructor(props: StatusProps) {
        super(props);
        this.state = {
            code: "",
            ccInfo: "",
            runInfo: [],
            status: '2',
            loaded: false,
        }
    }



    async componentDidMount() {
        await this.flush(this.props.submitId)
        timer = setInterval(() => this.flush(this.props.submitId, false), 3000)
    }

    async componentWillUnmount() {
        // if (timer) {
        //     clearInterval(this.timer)
        // }
    }


    async flush(id: number, close = true) {
        if (close) {
            this.setState({
                code: "",
                ccInfo: "",
                runInfo: [],
                status: '2',
                loaded: false,
            })
        }
        const result = await getSubmit(id)
        console.log(result)
        this.setState({
            code: result.code,
            ccInfo: result.ccInfo,
            runInfo: result.runInfo,
            status: result.status,
            loaded: true,
        })
    }

    render() {
        return (
            <div>
                <Button onClick={async () => await this.flush(this.props.submitId)}>刷新</Button>
                <Title level={4}>编译信息</Title>
                {
                    this.state.loaded ?
                        <CodePreview>
                            {this.state.ccInfo}
                        </CodePreview> :
                        <Spin />
                }
                <Title level={4}>运行信息</Title>
                {
                    this.state.loaded ?
                        <Row>{
                            this.state.runInfo.map((e, i) => {
                                return <Col span={4}><Card title={`样例${i + 1}`}>
                                    {`运行时间:${e.times}`}<br></br>
                                    {`运行内存:${e.memory}`}<br></br>
                                    {`运行结果:${e.returnCode}`}
                                </Card></Col>
                            })}
                            {this.state.status == 'PROCESS' ?
                                <Col span={4}><Card title={`测试中`}>
                                    <Spin />
                                </Card></Col> : <div />}
                        </Row>
                        :
                        <Spin />
                }
                <Title level={4}>代码</Title>
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
        title: '题目ID',
        dataIndex: 'problemId',
        ellipsis: true,
        render: (text, record) => {
            return <a href={'/problem/' + record.problemId}>{record.problemId}</a>
        }
    },
    {
        title: '状态',
        dataIndex: 'status',
        filters: true,
        onFilter: true,
        valueType: 'select',
        valueEnum: {
            all: { text: '全部', status: 'Default' },
            AC: {
                text: 'AC',
                status: 'Success',
                disabled: true,
            },
            WA: {
                text: 'WA',
                status: 'Error',
            },
            TLE: {
                text: 'TLE',
                status: 'Error',
            },
            MLE: {
                text: 'MLE',
                status: 'Error',
            },
            CE: {
                text: 'CE',
                status: 'Error',
            },
            RE: {
                text: 'RE',
                status: 'Error',
            },

            MISS: {
                text: 'MISS',
                status: 'Processing',
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
                    <a onClick={() => { setIsModalVisible(true) }}>评测结果</a>
                    <Modal title="评测结果"
                        visible={isModalVisible}
                        onOk={() => setIsModalVisible(false)}
                        onCancel={() => {
                            setIsModalVisible(false)
                            if (timer) {
                                clearInterval(timer)
                            }
                        }
                        }
                        width='90%'>
                        <StatusShow submitId={record.id} />
                    </Modal>
                </div >
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