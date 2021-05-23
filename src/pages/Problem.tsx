import React, { useState } from 'react'
import { Col, Dropdown, Menu } from 'antd';
const ReactMarkdown = require('react-markdown')
import { Input } from 'antd';
const { TextArea } = Input;
import { Button, notification } from 'antd';
import { Space, Card } from 'antd';
import { PageHeader } from 'antd';

import { CodePreview } from './../utils/code'
import { getProblem } from '@/services/polin-oj/problem';
import { submitProblems } from '@/services/polin-oj/submit';
import MonacoEditor from 'react-monaco-editor/lib/editor';
import ProForm, { ProFormSelect } from '@ant-design/pro-form';

const successInfo = (description: string, message: string) => {
    notification['success']({
        message,
        description
    });
};




export class ProblemComponet extends React.Component {
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

    props = {
        problemId: 0,
    }


    async componentDidMount() {
        const result = await getProblem(this.props.problemId)
        this.setState({problem: result})
    }


    async submitCode(body:any) {
        body.problemId=this.state.problem.problemId

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
            <Space direction="vertical" size={20} style={{ width: '100%' }}>

                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title={this.state.problem.title}
                />

                <Card title="输入描述" style={{ width: '100%' }}>
                    <ReactMarkdown source={this.state.problem.input} />
                </Card>

                <Card title="输出描述">
                    <ReactMarkdown source={this.state.problem.output} />
                </Card>


                <Card title="输入样例">
                    <CodePreview>
                        <div dangerouslySetInnerHTML={{ __html: this.state.problem.sampleList[0].input }} />
                    </CodePreview>
                </Card>

                <Card title="输出样例">
                    <CodePreview>
                        <div dangerouslySetInnerHTML={{ __html: this.state.problem.sampleList[0].output }} />
                    </CodePreview>
                </Card>


     

                <Card title="代码框">
                    <ProForm
                        onFinish={
                            async (v)=>{
                                v.code=this.state.code.code;
                                this.submitCode(v);
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
                        <br></br>
                    </ProForm>
                </Card>
            </Space >
        );
    }
}



export default function Problem(props: any) {
    return <ProblemComponet problemId={props.location.pathname.split('/').lastItem}></ProblemComponet>
}
