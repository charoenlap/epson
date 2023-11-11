import React, { useEffect, useState } from "react";
import {useRecoilState} from 'recoil';
import { Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import { breadcrumbState, titleState } from "@/store/page";
import _ from 'lodash';
const { Header, Content, Footer, Sider } = Layout;

const Sidebar = () => {
    // const { components: { Menu: {darkItemBg}} } = theme.useToken();
    const [bc,setBc] = useRecoilState(breadcrumbState);
    const [title,setTitle] = useRecoilState(titleState)
    const [currentMenuItem, setCurrentMenuItem] = useState([])
    const router = useRouter();
    const [items, setItems] = useState([]);
    
    
    const handleClick = e => {
        let mainKey = e.key;
        let data = [
            {title:'Home',href:'/'}
        ];
        _.map(items, item => {
            if (_.includes(e?.keyPath, item.key)) {
                if (item.key==mainKey) {
                    setTitle(item.label)
                }
                data.push({
                    title: item.label,
                    ...(item?.href ? {href:item.href} : {})
                })
            }
            if (item?.children) {
                _.map(item.children, child => {
                    if (_.includes(e?.keyPath, child.key)) {
                        if (child.key==mainKey) {
                            setTitle(child.label)
                        }
                        data.push({
                            title: child.label,
                            href: child.href
                        })
                    }
                })
            }
        })
        setBc(_.uniqBy(data, 'title'))
        router.push(e?.item?.props?.href)
    }
    
    const findCurrent = (pathname) => {
        let selected = []
        _.map(items, (item) => {
            if (item.href==pathname) { 
                selected = [item.key];
            }
            if (item.children) {
                _.map(item.children, child => {
                    console.log(pathname,child.href);
                    if (child.href == pathname) {
                        selected = [item.key, child.key];
                    }
                })
            }
        });
        setCurrentMenuItem(selected);
    }

    useEffect(() => {
        if (router.pathname === '/intrlligentDetail' || router.pathname === '/checkErrorCode' || router.pathname === '/nvram' || router.pathname === '/serviceManual') {
            setItems([
                { key: 'home', label: 'Home', href: '/' },
                { key: 'datacenter', label: 'Data Center', children: [
                    { key: 'specification', label: 'Specification', href: '/specification'},
                    { key: 'comparison', label: 'Comparison', href: '/comparison'},
                    { key: 'manual', label: 'Manual', href: '/manualDetail' },
                    { key: 'knowledgebase', label: 'Knowledge Base', href: '/knowledgeBase' },
                ] },
                { key: 'dataanalytics', label: 'Data Analytics LFP', children: [
                    { key: 'listdataanalytic', label: 'List Model Analytic', href: '/intelligent'},
                    { key: 'dataanalytic', label: 'Data Analytic', href: '/intrlligentDetail'},
                    { key: 'checkerrorcode', label: 'Check Error Code', href: '/checkErrorCode'},
                    { key: 'nvram', label: 'NVRAM Viewer', href: '/nvram' },
                    { key: 'servicemanual', label: 'Service Manual & Diagram', href: '/serviceManual' },
                ] },
                { key:'divider', type: 'divider' },
                { key: 'logout', label: 'Logout', href: '/auth/logout' },
            ]);
        }else if (router.pathname === '/projector' || router.pathname === '/projectorServiceManual') {
            setItems([
                { key: 'home', label: 'Home', href: '/' },
                { key: 'datacenter', label: 'Data Center', children: [
                    { key: 'specification', label: 'Specification', href: '/specification'},
                    { key: 'comparison', label: 'Comparison', href: '/comparison'},
                    { key: 'manual', label: 'Manual', href: '/manualDetail' },
                    { key: 'knowledgebase', label: 'Knowledge Base', href: '/knowledgeBase' },
                ] },
                { key: 'dataanalytics', label: 'Data Analytics Projector', children: [
                    { key: 'listdataanalytic', label: 'List Model Analytic', href: '/intelligent'},
                    { key: 'dataanalytic', label: 'Data Analytic', href: '/projector'},
                    { key: 'servicemanual', label: 'Service Manual & Diagram', href: '/projectorServiceManual' },
                ] },
                { key:'divider', type: 'divider' },
                { key: 'logout', label: 'Logout', href: '/auth/logout' },
            ]);
        }else if (router.pathname === '/otherCheckErrorCodeLIJ' || router.pathname === '/otherServiceManualLIJ') {
            setItems([
                { key: 'home', label: 'Home', href: '/' },
                { key: 'datacenter', label: 'Data Center', children: [
                    { key: 'specification', label: 'Specification', href: '/specification'},
                    { key: 'comparison', label: 'Comparison', href: '/comparison'},
                    { key: 'manual', label: 'Manual', href: '/manualDetail' },
                    { key: 'knowledgebase', label: 'Knowledge Base', href: '/knowledgeBase' },
                ] },
                { key: 'dataanalytics', label: 'Data Analytics LIJ', children: [
                    { key: 'listdataanalytic', label: 'List Model Analytic', href: '/intelligent'},
                    { key: 'checkerrorcode', label: 'Check Error Code', href: '/otherCheckErrorCodeLIJ'},
                    { key: 'servicemanual', label: 'Service Manual & Diagram', href: '/otherServiceManualLIJ' },
                ] }, 
                { key:'divider', type: 'divider' },
                { key: 'logout', label: 'Logout', href: '/auth/logout' },
            ]);
        }else if (router.pathname === '/otherCheckErrorCode' || router.pathname === '/otherServiceManual') {
            setItems([
                { key: 'home', label: 'Home', href: '/' },
                { key: 'datacenter', label: 'Data Center', children: [
                    { key: 'specification', label: 'Specification', href: '/specification'},
                    { key: 'comparison', label: 'Comparison', href: '/comparison'},
                    { key: 'manual', label: 'Manual', href: '/manualDetail' },
                    { key: 'knowledgebase', label: 'Knowledge Base', href: '/knowledgeBase' },
                ] },
                { key: 'dataanalytics', label: 'Data Analytics RIPs', children: [
                    { key: 'listdataanalytic', label: 'List Model Analytic', href: '/intelligent'},
                    { key: 'checkerrorcode', label: 'Check Error Code', href: '/otherCheckErrorCode'},
                    { key: 'servicemanual', label: 'Service Manual & Diagram', href: '/otherServiceManual' },
                ] },
                { key:'divider', type: 'divider' },
                { key: 'logout', label: 'Logout', href: '/auth/logout' },
            ]);
        }else{
            setItems([
                { key: 'home', label: 'Home', href: '/' },
                { key: 'datacenter', label: 'Data Center', children: [
                    { key: 'specification', label: 'Specification', href: '/specification'},
                    { key: 'comparison', label: 'Comparison', href: '/comparison'},
                    { key: 'manual', label: 'Manual', href: '/manualDetail' },
                    { key: 'knowledgebase', label: 'Knowledge Base', href: '/knowledgeBase' },
                ] },
                { key: 'dataanalytics', label: 'Data Analytics', href: '/intelligent' },
                { key:'divider', type: 'divider' },
                { key: 'logout', label: 'Logout', href: '/auth/logout' },
            ]);
        }
        
    }, [router.pathname])
    
    useEffect(() => {
        findCurrent(router.pathname);
    }, [items,router.pathname]);
    useEffect(() => {
        console.log('currentMenuItem',currentMenuItem)
    }, [currentMenuItem]);
    
    

	return (
		<Sider
            width={300}
            style={{background:'rgb(68,114,196)'}}
            id={'sidebar'}
        >
            <Menu
                id={'menuside'}
                theme={'dark'}
                mode="inline"
                defaultSelectedKeys={['home']}
                defaultOpenKeys={['datacenter','dataanalytics']}
                selectedKeys={currentMenuItem}
                items={items}
                onClick={handleClick}
                style={{background: 'rgb(68,114,196)'}}
            />
        </Sider>
	);
};

export default Sidebar;
