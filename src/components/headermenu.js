import React from 'react'
import { HomeOutlined } from '@ant-design/icons';
import { Layout, theme, Menu } from "antd";
import{  Image  } from 'antd';
import { useSession } from 'next-auth/react';
const { Header } = Layout;

const HeaderMenu = () => {
  const { data: session, status } = useSession();

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
      {
        (status=='authenticated') && (<h3>SMART CS DCA</h3>)
      }
      
      {/* <div className="demo-logo" /> */}
      {/* <Image alt="example" preview={false} src="../../../images/logo.png" width={100}/> */}
      {/* <Menu
        theme="dark"
        mode="horizontal"
        items={items}
      /> */}
    </Header>
  )
}

export default HeaderMenu