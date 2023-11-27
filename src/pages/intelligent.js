import React, { useEffect } from 'react';
import { withAuth } from "@/utils/middleware";
import{  Col, Image, Row  } from 'antd';
import { Card } from 'antd';
import { getSession, useSession } from 'next-auth/react';
const { Meta } = Card;
import Link from 'next/link';
import {useRecoilState} from 'recoil';
import { breadcrumbState, titleState } from "@/store/page";
const Intelligent = () => {
    const [bc, setBc] = useRecoilState(breadcrumbState)
    useEffect(() => {
        setBc([
            {title:'Home', href:'/'},
            {title:'Data Analytics', href:'/intelligent'},
        ])
    }, [])
    
  return (
    <>
        <Row justify="center">
            <Col span={20}  style={{ margin: '10px' }}>
                <h3>LFP</h3>
            </Col>
        </Row>
        <Row justify="center">
            <Col span={5}  style={{ margin: '10px' }}>
                <Link href="/intrlligentDetail?subtype=SC-F" onClick={()=>setBc([..._.filter(bc, v => !_.startsWith(v.href, '?subtype=')),{title:'SC-F', href:'?subtype=SC-F'}])}>
                    <Card
                        hoverable
                        style={{
                            textAlign: 'center',
                        }}
                        cover={<Image alt="" preview={false} src="images/lfp1.png"/>}
                        
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="SC-F Series" description="" />
                        </div>
                    </Card>
                </Link>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <Link href="/intrlligentDetail?subtype=SC-P" onClick={()=>setBc([..._.filter(bc, v => !_.startsWith(v.href, '?subtype=')),{title:'SC-P', href:'?subtype=SC-P'}])}>
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<Image alt="example" preview={false} src="images/lfp2.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="SC-P Series" description="" />
                        </div>
                    </Card>
                </Link>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <Link href="/intrlligentDetail?subtype=SC-S" onClick={()=>setBc([..._.filter(bc, v => !_.startsWith(v.href, '?subtype=')),{title:'SC-S', href:'?subtype=SC-S'}])}>
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<Image alt="example" preview={false} src="images/lfp3.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="SC-S Series" description="" />
                        </div>
                    </Card>
                </Link>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <Link href="/intrlligentDetail?subtype=SL-D" onClick={()=>setBc([..._.filter(bc, v => !_.startsWith(v.href, '?subtype=')),{title:'SL-D', href:'?subtype=SL-D'}])}>
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<Image alt="example" preview={false} src="images/lfp4.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="SC-D Series" description="" />
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
                <Link href="/projector" onClick={()=>setBc([
                    {title:'Home', href:'/'},
                    {title:'Data Analytics Projector'},
                    {title:'Data Analytic', href: '/projector'},
                ])}>
                    <Card
                        hoverable
                        style={{
                            textAlign: 'center',
                        }}
                        cover={<Image alt="example" preview={false} src="images/p1.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="Projector" description="" />
                        </div>
                    </Card>
                </Link>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <Link href="/otherCheckErrorCodeLIJ" onClick={()=>setBc([
                    {title:'Home', href:'/'},
                    {title:'Data Analytics LIJ'},
                    {title:'Check Error Code', href: '/otherCheckErrorCodeLIJ'},
                ])}>
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<Image alt="example" preview={false} src="images/p2.png" />}
                    >
                        <div style={{ marginTop: 'auto' }}>
                            <Meta title="LIJ" description="" />
                        </div>
                    </Card>
                </Link>
            </Col>
            <Col span={5}  style={{ margin: '10px' }}>
                <Link href="/otherCheckErrorCode" onClick={()=>setBc([
                    {title:'Home', href:'/'},
                    {title:'Data Analytics RIPs'},
                    {title:'Check Error Code', href: '/otherCheckErrorCode'},
                ])}>
                    <Card
                        hoverable
                        style={{
                        textAlign: 'center',
                        }}
                        cover={<Image alt="example" preview={false} src="images/p3.png" />}
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

export async function getServerSideProps(context) {
	 const session = await getSession(context);
	if (session==null) {
		return { redirect: { destination: '/auth/login?authen', permanent: false } }
	}
	return {props:{}}
}

export default withAuth(Intelligent)