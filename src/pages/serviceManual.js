import React, { useEffect,useState } from 'react';
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
      <a href="/intrlligentDetail">Data Analytic</a>,
      'intrlligentDetail',
      <UserOutlined />,
    ),
    getItem(
      <a href="/checkErrorCode">Check Error Code</a>,
      'checkErrorCode',
      <LaptopOutlined />,
    ),
    getItem(
      <a href="/nvram">NVRAM Viewer</a>,
      'nvram',
      <LaptopOutlined />,
    ),
    getItem(
      <a href="/serviceManual">Service Manual & Diagram</a>,
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
  const [itemsModel, setItems] = useState([]);
  const [manual, setSelectedManual] = useState(null);
  const [diagram, setSelectedDiagram] = useState(null);
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
        }));
        setItems(transformedItems);
      });
  }, []);
  const handleModelSelect = (manual, diagram) => {
      setSelectedManual(manual);
      setSelectedDiagram(diagram);
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
              <Button key={item.key} type="primary" onClick={() => handleModelSelect(item.manual,item.diagram)}>{item.label}</Button>
          ))}
          </Space>
        </Col>
      </Row>
      <Row justify="center" style={{ margin: '20px' }}>
        <Col span={20} style={{ margin: '10px' }}>
          {manual && (
            <a href={`upload/manual/${manual}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large">
                Service Manual {manual}
              </Button>
            </a>
          )}

          {diagram && (
            <a href={`upload/diagram/${diagram}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large">
                Diagram {diagram}
              </Button>
            </a>
          )}
        </Col>
      </Row>
    </>
  );
}
