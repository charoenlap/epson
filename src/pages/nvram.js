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
import { Select } from 'antd';
import { withAuth } from '@/utils/middleware';
import { useRouter } from 'next/router';
import _ from 'lodash';
import {useRecoilState} from 'recoil';
import { breadcrumbState, titleState } from "@/store/page";
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
const data = [];
const Nvram = () => {
  const router = useRouter();
  const { subtype } = router.query;
  const [itemsModel, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bc,setBc] = useRecoilState(breadcrumbState);
  // console.log(subtype);
  useEffect(() => {
    setBc(
        [
            {title:'Home',href:'/'},
            {title:'Data analytic',href:'/intrlligent'},
            {title:subtype,href:'/intrlligentDetail?subtype=SC-F'},
            {title:'NVRAM',href:'/'}
        ]
    )
  }, []);
  useEffect(() => {
    fetch(`/api/manual/listModelSC?subtype=${subtype}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const transformedItems = _.map(data, item => ({
          key: item.model_name,
          label: item.model_name,
          manual: item.manual,
          diagram: item.diagram,
          nvram: item.nvram,
        }));
        setItems(transformedItems);
      });
  }, [subtype]);
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
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
            onChange={handleModelSelect}
            value={selectedItem}
          >
            {itemsModel.map(item => (
              <Select.Option key={item.key} value={item.label}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row justify="center" style={{ margin: '20px' }}>
        <Col span={20} style={{ margin: '10px' }}>
        {selectedItem && (
            <a href={`upload/nvram/${selectedItem}.zip`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large">
              Download
              </Button>
            </a>
          )}
        </Col>
      </Row>
    </>
  );
}

export default withAuth(Nvram)