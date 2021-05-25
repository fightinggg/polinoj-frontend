import React from 'react'
import { Col, Row } from 'antd';
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
}


export class ProblemComponet extends React.Component<ProblemProps> {
    state = {
        problem: {
            problemId: 0,
            title: null,
            description: null,
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
            code: ''
        }
    }


    async componentDidMount() {
        const result = await getProblem(this.props.problemId)
        this.setState({ problem: result })
    }


    async submitCode(body: any) {
        body.problemId = this.state.problem.problemId

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
                <Col span={12}>
                    <Card>
                        <Space direction="vertical" size={20} style={{ width: '100%', height: '30%' }}>
                            <PageHeader
                                className="site-page-header"
                                onBack={() => null}
                                title={this.state.problem.title}
                            />
                            <Title level={4}>输入描述</Title>
                            <ReactMarkdown source={this.state.problem.input} />
                            <Title level={4}>输出描述</Title>
                            <ReactMarkdown source={this.state.problem.output} />
                            <Title level={4}>输入样例</Title>
                            <Paragraph copyable={{ tooltips: false }}>
                                <div dangerouslySetInnerHTML={{ __html: this.state.problem.sampleList[0].input }} />
                            </Paragraph>
                            <Title level={4}>输出样例</Title>
                            <Paragraph copyable={{ tooltips: false }} code={true}>
                                <div dangerouslySetInnerHTML={{ __html: this.state.problem.sampleList[0].output }} />
                            </Paragraph>
                        </Space >
                    </Card>

                </Col>
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
            </Row>
        );
    }
}


export default function Problem(props: any) {
    return <ProblemComponet problemId={props.location.pathname.split('/').lastItem}></ProblemComponet>
}
