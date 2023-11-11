import React from 'react'
import { HomeOutlined } from '@ant-design/icons';
import { Layout, theme, Menu } from "antd";
import{  Image  } from 'antd';
const { Header } = Layout;

const HeaderMenu = () => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        padding: '0 30px',
        background: '#231f20',
        color: '#fff'
      }}
    >
      {/* <div className="demo-logo" /> */}
      <Image alt="example" preview={false} src="../../../images/logo.png" width={100}/>
      {/* <Menu
        theme="dark"
        mode="horizontal"
        items={items}
      /> */}
    </Header>
  )
}

export default HeaderMenu