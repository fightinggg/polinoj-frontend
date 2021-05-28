import React from 'react'
import { Col, Row, Spin } from 'antd';
const ReactMarkdown = require('react-markdown')
import { notification } from 'antd';
import { Space, Card } from 'antd';
import { PageHeader } from 'antd';

import { getProblem } from '@/services/polin-oj/problem';
import { submitProblems } from '@/services/polin-oj/submit';
import MonacoEditor from 'react-monaco-editor/lib/editor';
import ProForm, { ProFormSelect } from '@ant-design/pro-form';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';

const successInfo = (description: string, message: string) => {
    notification['success']({
        message,
        description
    });
};


interface ProblemProps {
    problemId: 0,
    contextId: 0,
    canSubmitCode: boolean,
}


export class ProblemComponet extends React.Component<ProblemProps> {
    state = {
        problem: {
            problemId: 0,
            title: null,
            description: null,
            hint: null,
            input: null,
            output: null,
            sampleList: [{
                input: null,
                output: null,
            }],
            source: null,
            sourceId: null,
            author: null,
            time: null,
            memory: null
        },
        code: {
            lang: 'cpp',
            code: '',
        },
        loaded: false
    }



    async componentDidMount() {
        const result = await getProblem(this.props.problemId)
        this.setState({ problem: result, loaded: true })
    }

    async submitCode(body: any) {
        body.problemId = this.props.problemId
        body.contextId = this.props.contextId

        const result = await submitProblems(body);
        if (result != null) {
            successInfo('提交成功', '你的提交成功了哦,三秒后为您跳转到提交结果页面')
            setTimeout(() => {
                window.location.href = "/status";
            }, 3000);
        }
    }



    render() {

        const options = {
            selectOnLineNumbers: true
        };


        return (
            <Row >
                <Col span={this.props.canSubmitCode ? 12 : 24}>
                    <Card>
                        <Space direction="vertical" size={20} style={{ width: '100%', height: '30%' }}>
                            <PageHeader
                                className="site-page-header"
                                onBack={() => null}
                                title={this.state.problem.title}
                            />
                            <Title level={1}>资源限制</Title>
                            {
                                this.state.loaded ?
                                    <div>
                                        <text>时间限制: {this.state.problem.time ? this.state.problem.time + "秒" : "标准时间"}</text>
                                        <br></br>
                                        <text>内存限制: {this.state.problem.time ? this.state.problem.memory + "MB" : "标准空间"}</text>
                                    </div>
                                    : <Spin />
                            }
                            <Title level={1}>题目描述</Title>
                            {
                                this.state.loaded ? <ReactMarkdown source={this.state.problem.description} /> : <Spin />
                            }

                            <Title level={1}>输入描述</Title>
                            {
                                this.state.loaded ? <ReactMarkdown source={this.state.problem.input} /> : <Spin />
                            }
                            <Title level={1}>输出描述</Title>
                            {
                                this.state.loaded ? <ReactMarkdown source={this.state.problem.output} /> : <Spin />
                            }
                            <Title level={1}>提示</Title>
                            {
                                this.state.loaded ? <ReactMarkdown source={this.state.problem.hint} /> : <Spin />
                            }
                            {
                                this.state.loaded ?
                                    this.state.problem.sampleList.map((o, i) =>
                                    (
                                        <div>
                                            <Title level={1}>输入样例{i + 1}</Title>
                                            {
                                                <Paragraph copyable={{ tooltips: false }}>
                                                    <div dangerouslySetInnerHTML={{ __html: o.input }} />
                                                </Paragraph>
                                            }
                                            <Title level={1}>输出样例{i + 1}</Title>
                                            {
                                                <Paragraph copyable={{ tooltips: false }} code={true}>
                                                    <div dangerouslySetInnerHTML={{ __html: o.output }} />
                                                </Paragraph>
                                            }
                                        </div>)
                                    )
                                    : <Spin />
                            }



                        </Space >
                    </Card>

                </Col>
                {
                    this.props.canSubmitCode ?
                        <Col span={12}>
                            <Card>
                                <ProForm
                                    onFinish={
                                        async (v) => {
                                            v.code = this.state.code.code;
                                            await this.submitCode(v);
                                        }
                                    }
                                    onValuesChange={
                                        async (v) => {
                                            if (v.language != undefined) {
                                                this.setState({
                                                    code: {
                                                        lang: v.language,
                                                        code: this.state.code.code
                                                    }
                                                })
                                            }
                                        }
                                    }
                                >
                                    <ProFormSelect
                                        name="language"
                                        label="language"
                                        valueEnum={{
                                            cpp: 'C/C++',
                                            java: 'Java',
                                        }}
                                        rules={[{ required: true, message: 'Please select your language!' }]}
                                    />
                                </ProForm>
                                <br></br>
                                <MonacoEditor
                                    height="600"
                                    language={this.state.code.lang}
                                    options={options}
                                    onChange={async (value) => {
                                        this.setState({
                                            code: {
                                                lang: this.state.code.lang,
                                                code: value
                                            }
                                        })
                                    }}

                                />
                            </Card>
                        </Col>
                        : <div></div>
                }
            </Row >
        );
    }
}


export default function Problem(props: any) {
    return  <Card> <ProblemComponet
        problemId={props.location.pathname.split('/').lastItem}
        contextId={0}
        canSubmitCode={true}
    ></ProblemComponet></Card>
}
