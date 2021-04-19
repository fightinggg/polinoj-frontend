import React from 'react'
import { ProblemComponet } from './Problem'
import { Tabs } from 'antd';
import {getContext} from '@/services/polin-oj/context'
const { TabPane } = Tabs;


export default class Context extends React.Component {
    state = {
        beginTime: null,
        endTime: null,
        id: null,
        name: null,
        ownerId: null,
        problemId: []
    }

    async componentDidMount() {
        const context = await getContext(this.props.location.pathname.split('/').lastItem);
        this.setState(context);
    }


    render() {
        return (
            <Tabs>
                {
                    (this.state.problemId||[]).map(id => 
                        <TabPane tab={"Problem " + id} key={id}>
                            <ProblemComponet problemId={id}></ProblemComponet>
                        </TabPane>
                    )
                }
            </Tabs>
        );
    }
}