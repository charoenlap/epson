
import React, {useEffect,useState} from 'react';
import{  Col, Divider, message, Row  } from 'antd';
import Link from 'next/link';
import { Card, Space } from 'antd';
import { AlertOutlined,SolutionOutlined,HomeOutlined ,UserOutlined   } from '@ant-design/icons';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Breadcrumb } from 'antd';
import { apiClient } from '../utils/apiClient';
import _ from 'lodash';
const { Meta } = Card;
export default function Manual() {
    const [lists, setLists] = useState([]);

    const getLists = async () => {
        message.loading({key:'init',content:'loading...'})
        const models = await apiClient().get('/model');
        console.log(models);
        setLists(models.data)
        if (_.size(models?.data)>0) {
            message.success({key:'init',content:'Load model success'})
        } else {
            message.error({key:'inti',content:'Cannot load model'});
        }
    }

    useEffect(() => {
        (async()=>{
            if (_.size(lists)==0) {
                await getLists();
            }
        })()
    }, [lists])
    
    
  return (
    <>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row justify="center">
                <Col span={20}>
                <Breadcrumb
                    items={[
                    {
                        href: '/',
                        title: <HomeOutlined />,
                    },
                    {
                        href: '/datacenter',
                        title: (
                        <>
                            <UserOutlined />
                            <span>Data Center</span>
                        </>
                        ),
                    },
                    {
                        title: 'Manual',
                    },
                    ]}
                />
                </Col>
            </Row>
            <Card>
            <Row justify="center" gutter={[14,14]}>
					{
						_.size(lists)>0 && _.map(lists, model => (
						<Col span={6}>
							<Link href={"/manualDetail?model="+model.model_name}>
								<Card
									hoverable
									style={{
										textAlign: 'center',
										height:320,
									}}
									cover={<img alt="example" src={"images/m"+model.id+".png"} />}
								>
									<div style={{ marginTop: 'auto' }}>
										<Meta title={model.model_name} description="" />
									</div>
								</Card>
							</Link>
						</Col>
						))
					}
            </Row>
            </Card>
        </Space>
    </>
  )
}
