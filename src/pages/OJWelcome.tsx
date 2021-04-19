import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert } from 'antd';


export default (): React.ReactNode => {
  return (
    <PageContainer>
      <Card>
        <Alert
          message={'更好用的OJ系统，已经发布。'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        Polin OJ, 是一款一站式OJ，在Polin OJ上，你能向所有的其他OJ进行提交，更多信息请关注 @Polin OJ

        <br></br>
        <a href="https://github.com/fightinggg/polinoj-backend" target="_post"> 后端代码开源</a>
        <br></br>

        <a href="https://github.com/fightinggg/polinoj-frontend" target="_post"> 前端代码开源</a>
      </Card>

    </PageContainer>
  );
};
