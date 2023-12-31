import React, { useEffect, useState } from "react";
import {useRecoilState} from 'recoil';
import { Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import { breadcrumbState, titleState } from "@/store/page";
import _ from 'lodash';
import { useSession } from "next-auth/react";
import { mapUrl } from "@/utils/tools";
const { Header, Content, Footer, Sider } = Layout;

const Sidebar = () => {
    const { data: session, status } = useSession();
    // const { components: { Menu: {darkItemBg}} } = theme.useToken();
    const [bc,setBc] = useRecoilState(breadcrumbState);
    const [title,setTitle] = useRecoilState(titleState)
    const [currentMenuItem, setCurrentMenuItem] = useState([])
    const router = useRouter();
    const [items, setItems] = useState([]);
    const { subtype } = router.query;
    
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
        console.log(router.query.subtype);
        if (router.query?.subtype) {
            data.push({
                title: router.query?.subtype,
                href: '?subtype='+router.query?.subtype
            })
        }
        setBc(_.uniqBy(data, 'title'))
        router.push(e?.item?.props?.href)
    }
    
    const findCurrent = (pathname) => {
        let selected = []
        _.map(items, (item) => {
            // console.log(item,pathname)
            if (_.startsWith(item.href,pathname)) { 
                selected = [item.key];
            }
            if (item.children) {
                _.map(item.children, child => {
                    // console.log(pathname,child.href);
                    if (_.startsWith(child.href, pathname)) {
                        selected = [child.key, item.key];
                    }
                })
            }
        });
        console.log('selected', selected)
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
                { key: 'dataanalytics', label: 'Data Analytics', children: [
                    { key: 'listdataanalytic', label: 'List Model Analytic', href: '/intelligent'},
                    { key: 'dataanalytic', label: 'Data Analytic', href: `/intrlligentDetail?subtype=${subtype}`},
                    { key: 'checkerrorcode', label: 'Check Error Code', href: `/checkErrorCode?subtype=${subtype}`},
                    { key: 'nvram', label: 'NVRAM Viewer', href: `/nvram?subtype=${subtype}` },
                    { key: 'servicemanual', label: 'Service Manual & Diagram', href: `/serviceManual?subtype=${subtype}` },
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
        
    }, [router.pathname,subtype])

    useEffect(() => {
        findCurrent(router.pathname);
    }, [items,router.pathname]);
    // useEffect(() => {
    //     console.log('currentMenuItem',currentMenuItem)
    // }, [currentMenuItem]);
    
    

	if (status=='authenticated') {
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
                    // defaultSelectedKeys={['home']}
                    // defaultOpenKeys={['datacenter','dataanalytics']}
                    selectedKeys={currentMenuItem}
                    items={_.filter(items, item => {
                        if (item.children) {
                            return _.some(item.children, child => {
                                let showchild = mapUrl(child.href, _.split(session?.user?.permissions,','))
                                // console.log('child', showchild, child.href, _.split(session?.user?.permissions,','));
                                return showchild;
                            })
                        }
                        if (item?.href) {
                            let showit = mapUrl(item.href, _.split(session?.user?.permissions,','))
                            // console.log(item.href);
                            return showit || item.key=='logout';
                        }
                        // console.log(item);
                        return item.key=='logout'
                    })}
                    onClick={handleClick}
                    style={{background: 'rgb(68,114,196)'}}
                />
            </Sider>
        );
    }
};

export default Sidebar;
