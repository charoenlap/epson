import React, { useEffect } from 'react';
import{  Col, Image, Row  } from 'antd';
import { Card } from 'antd';
import { useSession } from 'next-auth/react';
const { Meta } = Card;
import Link from 'next/link';
export default function index() {
    
  return (
    <>
        <Row justify="center">
            <Col span={20}  style={{ margin: '10px' }}>
                <h3>LFP</h3>
            </Col>
        </Row>
        <Row justify="center">
            <Col span={5}  style={{ margin: '10px' }}>
                <Link href="/intrlligentDetail" >
                    <Card
                        hoverable
                        style={{
                            textAlign: 'center',
                        }}
                        cover={<Image alt="example" src="images/lfp1.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="SC-F Series" description="" />
                        </div>
                    </Card>
                </Link>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <Link href="/intrlligentDetail">
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<Image alt="example" src="images/lfp2.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="SC-P Series" description="" />
                        </div>
                    </Card>
                </Link>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <Link href="/intrlligentDetail">
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<Image alt="example" src="images/lfp3.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="SC-S Series" description="" />
                        </div>
                    </Card>
                </Link>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <Link href="/intrlligentDetail">
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<Image alt="example" src="images/lfp4.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="SC-S Series" description="" />
                        </div>
                    </Card>
                </Link>
            </Col>
        </Row>
        <Row justify="center">
            <Col span={20}  style={{ margin: '10px' }}>
                <h3>Projector / Others</h3>
            </Col>
        </Row>
        <Row justify="center">
            <Col span={5}  style={{ margin: '10px' }}>
                <Link href="/projector">
                    <Card
                        hoverable
                        style={{
                            textAlign: 'center',
                        }}
                        cover={<Image alt="example" src="images/p1.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="Projector" description="" />
                        </div>
                    </Card>
                </Link>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <Link href="/otherCheckErrorCodeLIJ">
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<Image alt="example" src="images/p2.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="LIJ" description="" />
                        </div>
                    </Card>
                </Link>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <Link href="/otherCheckErrorCode">
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<Image alt="example" src="images/p3.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="RIPs" description="" />
                        </div>
                    </Card>
                </Link>
            </Col>
        </Row>
    </>
  )
}
