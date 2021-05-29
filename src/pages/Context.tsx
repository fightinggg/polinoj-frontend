import React from 'react'
import { ProblemComponet } from './Problem'
import { Badge, Tabs } from 'antd';
import { getContext, getContextRank } from '@/services/polin-oj/context'
import { Card } from 'antd';
const { TabPane } = Tabs;
import { Typography } from 'antd';
import ProTable from '@ant-design/pro-table';
import { toInteger } from 'lodash';
import { StarTwoTone } from '@ant-design/icons';
const { Text, Link } = Typography;

interface RankListProps {
    contextId: number
}

class RankList extends React.Component<RankListProps> {
    state = {
        columns: [],
        data: []
    }


    async componentDidMount() {
        const result = await getContextRank(this.props.contextId);
        const problemColums = []
        for (let i = 0; i < result.problemSize; i++) {
            let k = String.fromCharCode('A'.charCodeAt(0) + i)
            problemColums.push({
                key: k,
                dataIndex: i,
                title: k,
                onCell: (record: any) => {
                    if (record[i].accept) {
                        return {
                            style: {
                                backgroundColor: record[i].firstBlood ? 'lightgreen' : 'green'
                            }
                        }
                    } else {
                        return record[i].punish ? ({
                            style: {
                                backgroundColor: 'red'
                            }
                        }) : ({})
                    }

                }
                ,
                render: (text: any, record: any) =>
                (
                    <div >
                        {
                            record[i].accept ?
                                <div>
                                    <Text>+{record[i].punish + 1} try</Text>
                                    {/* <br></br> */}
                                    {/* <Text>score:{toInteger(record[i].score / 1000 / 60)}</Text> */}
                                </div>
                                : record[i].punish ?
                                    <Text>+{record[i].punish + 1} try</Text>
                                    : <div></div>
                        }

                    </div>
                )
            })
        }

        const columns = [
            {
                key: 'userName',
                dataIndex: 'userName',
                title: '用户',
                render: (text: any, record: any) =>
                (<div>
                    {record.star ?
                        <StarTwoTone />
                        :
                        <Badge count={record.rank}
                            style={{
                                backgroundColor: record.rank == 1 ? '#FFD700'
                                    : record.rank == 2 ? '#E6E8FA'
                                        : '#B5A642'
                            }}
                        />}
                    {record.userName}
                </div>)
            },
            {
                key: 'acceptCount',
                dataIndex: 'acceptCount',
                title: '过题数'
            },
            {
                key: 'score',
                dataIndex: 'score',
                title: '分数'
            },

            ...problemColums
        ]
        const data = result.list.map((e: any) => ({
            star: e.star,
            rank: e.rank,
            score: e.score,
            acceptCount: e.acceptCount,
            userName: e.userName,
            ...e.problemStateVOList
        }));

        this.setState({
            columns,
            data,
        });
    }

    async getData(id: number) {
        const result = await getContextRank(id);
        let data = result.list.map((e: any) => ({
            star: e.star,
            rank: e.rank,
            score: toInteger(e.score / 1000 / 60),
            acceptCount: e.acceptCount,
            userName: e.userName,
            ...e.problemStateVOList
        }));
        return {
            data: data,
            pageSize: data.lenght,
            current: 0,
            total: data.lenght,
        }
    }

    render() {
        return (
            <ProTable columns={this.state.columns}
                request={async () => await this.getData(this.props.contextId)}
                search={false}
                style={{ overflow: 'auto' }} />
        )
    }
}

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
        const context = await getContext(location.pathname.split('/').lastItem);
        this.setState(context);
    }


    render() {
        return (
            <Card>  <Tabs>
                {
                    (this.state.problemId || []).map((id, index) =>
                        <TabPane tab={"Problem " + String.fromCharCode('A'.charCodeAt(0) + index)} key={id}>
                            <div>
                                <Card> <Link href={`/problem/${id}`} >题库链接</Link></Card>
                                <ProblemComponet
                                    problemId={id}
                                    contextId={location.pathname.split('/').lastItem}
                                    canSubmitCode={(this.state.endTime || 0) > new Date().valueOf()}
                                ></ProblemComponet>
                            </div>
                        </TabPane>
                    )

                }

                {/* dashborad */}
                <TabPane tab={"榜单"}>
                    <RankList contextId={location.pathname.split('/').lastItem}></RankList>
                </TabPane>
            </Tabs></Card>
        );
    }
}