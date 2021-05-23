import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Row, Col } from 'antd';


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
        <br></br>


        <a href="https://github.com/fightinggg/polinoj-sandbox" target="_post"> 沙箱代码开源</a>
        <br></br>

        <a href="https://github.com/fightinggg/polinoj-sandbox-cpp" target="_post"> C++评测镜像开源</a>
        <br></br>


        <br></br>
        <h3>目前已接入OJ:</h3>
        <Row>
          <Col span={4}>
            <img src="http://acm.hdu.edu.cn/favicon.ico" width='100%'></img>
          </Col>
        </Row>

      </Card>

    </PageContainer>
  );
};
