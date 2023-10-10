import React, { useEffect } from 'react';
import{  Col, Row  } from 'antd';
import { Card } from 'antd';
import { useSession } from 'next-auth/react';
const { Meta } = Card;
export default function index() {
    const {data:session, status} = useSession();
    useEffect(() => {
        console.log(status)
    }, [status]);
    
  return (
    <>
        <Row justify="center">
            <Col span={20}  style={{ margin: '10px' }}>
                <h3>LFP</h3>
            </Col>
        </Row>
        <Row justify="center">
            <Col span={5}  style={{ margin: '10px' }}>
                <a href="/intrlligentDetail" >
                    <Card
                        hoverable
                        style={{
                            textAlign: 'center',
                        }}
                        cover={<img alt="example" src="images/lfp1.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="SC-F Series" description="" />
                        </div>
                    </Card>
                </a>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <a href="/intrlligentDetail">
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<img alt="example" src="images/lfp2.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="SC-P Series" description="" />
                        </div>
                    </Card>
                </a>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <a href="/intrlligentDetail">
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<img alt="example" src="images/lfp3.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="SC-S Series" description="" />
                        </div>
                    </Card>
                </a>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <a href="/intrlligentDetail">
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<img alt="example" src="images/lfp4.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="SC-S Series" description="" />
                        </div>
                    </Card>
                </a>
            </Col>
        </Row>
        <Row justify="center">
            <Col span={20}  style={{ margin: '10px' }}>
                <h3>Projector / Others</h3>
            </Col>
        </Row>
        <Row justify="center">
            <Col span={5}  style={{ margin: '10px' }}>
                <a href="/projector">
                    <Card
                        hoverable
                        style={{
                            textAlign: 'center',
                        }}
                        cover={<img alt="example" src="images/p1.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="Projector" description="" />
                        </div>
                    </Card>
                </a>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <a href="/otherCheckErrorCodeLIJ">
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<img alt="example" src="images/p2.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="LIJ" description="" />
                        </div>
                    </Card>
                </a>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <a href="/otherCheckErrorCode">
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<img alt="example" src="images/p3.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="RIPs" description="" />
                        </div>
                    </Card>
                </a>
            </Col>
        </Row>
    </>
  )
}
