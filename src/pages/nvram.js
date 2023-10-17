import React, { useState,useEffect } from 'react';
import { Col, Divider, Row } from 'antd';
import { Card, Space, Button } from 'antd';
import { AlertOutlined, SolutionOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { AutoComplete, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { Table } from 'antd';
import axios from 'axios';
import { Breadcrumb,Menu } from 'antd';
import { Layout,theme,  } from 'antd';
import { LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { selectModel2State } from '@/store/data';
import MyModel2 from '@/components/myModel2';
import Link from 'next/link';
const { Search } = Input;
const { Content,Sider  } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items2 = [
  getItem(
      <Link href="/intrlligentDetail">Data Analytic</Link>,
      'intrlligentDetail',
      <UserOutlined />,
    ),
    getItem(
      <Link href="/checkErrorCode">Check Error Code</Link>,
      'checkErrorCode',
      <LaptopOutlined />,
    ),
    getItem(
      <Link href="/nvram">NVRAM Viewer</Link>,
      'nvram',
      <LaptopOutlined />,
    ),
    getItem(
      <Link href="/serviceManual">Service Manual & Diagram</Link>,
      'serviceManual',
      <LaptopOutlined />,
    ),
];
const columns = [
  {
    title: 'Symptom / Detail',
    dataIndex: 'symptom',
    key: 'symptom',
  },
  {
    title: 'Remedy',
    dataIndex: 'remedy',
    key: 'remedy',
  },
  {
    title: 'Part Code',
    dataIndex: 'part',
    key: 'part',
  },
];
const data = [];
export default function Index() {
  const [selectModel2, setSelectModel2] = useRecoilState(selectModel2State)
  const [itemsModel, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    fetch('/api/manual/listModelSC')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const transformedItems = data.map(item => ({
          key: item.model_name,
          label: item.model_name,
          manual: item.manual,
          diagram: item.diagram,
          nvram: item.nvram,
        }));
        setItems(transformedItems);
      });
  }, []);
  const handleModelSelect = item => {
    setSelectedItem(item);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
    <>
      <Row justify="center">
        <Col span={20} style={{ margin: '10px' }}>
          <p>
            <b>Model</b>
          </p>
          <Space wrap>
            {itemsModel.map(item => (
              <Button type="primary" key={item.key} 
              onClick={() => handleModelSelect(item.nvram)} >
                {item.label}
              </Button>
            ))}
          </Space>
        </Col>
      </Row>
      <Row justify="center" style={{ margin: '20px' }}>
        <Col span={20} style={{ margin: '10px' }}>
        {selectedItem && (
            <a href={`upload/${selectedItem}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large">
              Download
              </Button>
            </Link>
          )}
        </Col>
      </Row>
    </>
  );
}
