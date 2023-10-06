import React, { useState, useEffect } from 'react';
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
import MyModel2 from '@/components/myModel2';
import { useRecoilState } from 'recoil';
import { selectModel2State } from '@/store/data';
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
  const [selectModel2, setSelectModel2] = useRecoilState(selectModel2State);
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
  const [model, setModel] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [tableData, setTableData] = useState([]);
  const handleModelSelectModel = async (errorCode) => {
    setErrorCode(errorCode);
    try {
      const response = await axios.post('/api/errorCode/find', {
        model: selectModel2?.model_name,
        errorCode: errorCode,
      });
      const responseData = response.data.map(item => ({
        key: item.id, // Unique key for each row
        symptom: item.error_name,
        remedy: item.remedy,
        part: item.part_check,
      }));
      setTableData(responseData);
    } catch (error) {
      console.error(error);
    }
    
  };
  return (
    <Row justify="center" gutter={[24,24]}>
      <Col span={24}>
        <MyModel2 />
        {/* <p>
          <b>Model</b>
        </p>
        <Space wrap>
          {itemsModel.map(item => (
            <Button key={item.key} type={selectedItem === item.label ? 'warning' : 'primary'} 
            onClick={() => handleModelSelect(item.label)}
            className={selectedItem === item.label ? 'warning-button' : ''} >
              {item.label}
            </Button>
          ))}
        </Space> */}
      </Col>  
      <Col span={24}>
      <Search
          placeholder="Enter number Error Code: "
          enterButton="Search"
          size="large"
          // Handle the input value as needed
          onChange={(e) => handleModelSelectModel(e.target.value)}
          value={errorCode}
        />
      </Col>
      <Col span={24}>
      <Table columns={columns} dataSource={tableData} />
      </Col>
    </Row>
  );
}
