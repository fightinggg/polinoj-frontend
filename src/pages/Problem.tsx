import React from 'react'
import { Col } from 'antd';
const ReactMarkdown = require('react-markdown')
import { Input } from 'antd';
const { TextArea } = Input;
import { Button, notification } from 'antd';
import { Space, Card } from 'antd';
import { PageHeader } from 'antd';

import { CodePreview } from './../utils/code'
import { getProblem } from '@/services/polin-oj/problem';
import { submitProblems } from '@/services/polin-oj/submit';

const successInfo = (description: string, message: string) => {
    notification['success']({
        message,
        description
    });
};


export class ProblemComponet extends React.Component {
    state = {
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
    }

    props = {
        problemId: 0,
    }

    static codeInputId = "codeInput"


    async componentDidMount() {
        const result = await getProblem(this.props.problemId)
        this.setState(result)
    }


    async submitCode(problemId: number) {
        const code = document.getElementById(ProblemComponet.codeInputId)?.value
        const body = {
            code: code,
            lang: "c++",
            problemId,
        }

        const result = await submitProblems(body);
        if (result != null) {
            successInfo('提交成功', '你的提交成功了哦,三秒后为您跳转到提交结果页面')
            setTimeout(() => {
                window.location.href = "/status";
            }, 3000);
        }
    }

    render() {
        return (
            <Space direction="vertical" size={20} style={{ width: '100%' }}>

                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title={this.state.title}
                />

                <Card title="输入描述" style={{ width: '100%' }}>
                    <ReactMarkdown source={this.state.input} />
                </Card>




                <Card title="输出描述">
                    <ReactMarkdown source={this.state.output} />
                </Card>


                <Card title="输入样例">
                    <CodePreview>
                        <div dangerouslySetInnerHTML={{ __html: this.state.sampleList[0].input }} />
                    </CodePreview>
                </Card>

                <Card title="输出样例">
                    <CodePreview>
                        <div dangerouslySetInnerHTML={{ __html: this.state.sampleList[0].output }} />
                    </CodePreview>
                </Card>

                <Card title="代码框">
                    <Card bordered={false} >
                        <TextArea rows={20} id={ProblemComponet.codeInputId} />
                    </Card>
                    <Card bordered={false} >
                        <Col span={4} offset={10} >
                            <Button type="primary" block
                                onClick={() => this.submitCode(this.state.problemId)}
                            > 提交代码 </Button>
                        </Col>
                    </Card>
                </Card>
            </Space >
        );
    }
}



export default function Problem(props: any) {
    return <ProblemComponet problemId={props.location.pathname.split('/').lastItem}></ProblemComponet>
}
