import React, {useState,useEffect} from 'react';
import {useRecoilState} from 'recoil';
import{  Col, Card, Button, Row,Dropdown,Breadcrumb,Menu,Layout,theme, message, Select, Form, Table, Space  } from 'antd';
import { LaptopOutlined,DownOutlined,HomeOutlined ,UserOutlined   } from '@ant-design/icons';
import _ from 'lodash';
import { apiClient } from '@/utils/apiClient';
import { useRouter } from 'next/router';
import MyModel from "@/components/myModel";
import { selectModelState } from '@/store/data';
const { Content,Sider  } = Layout;
const { Meta } = Card;
function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="#" href="#">
          Model
        </a>
      ),
    },
  ];
  const items2 = [
    getItem(
        <a href="/specification">Specification</a>,
        'specification',
        <UserOutlined />,
      ),
      getItem(
        <a href="/comparison">Comparison</a>,
        'comparison',
        <LaptopOutlined />,
      ),
  ];
const Comparison = () => {
    
    const [selectModel,setSelectModel] = useRecoilState(selectModelState);
    const router = useRouter();
    const [series, setSeries] = useState([]);
    const [optionSeries, setOptionSeries] = useState([])
    const [optionSeriesRemaining, setOptionSeriesRemaining] = useState([])
    const [form] = Form.useForm();
    const [selectedSeries, setSelectedSeries] = useState([]);
    const [dataSource, setDataSource] = useState([])
    
    const filterOption = (input, option) => {
        let inputLow = _.join(_.split(_.lowerCase(input),' '),'');
        let labelLow = _.join(_.split(_.lowerCase(option?.label),' '),'');
        return _.startsWith(labelLow, inputLow) ||inputLow==labelLow
    }
    const defaultTableColumn = [
        {
            title:'',
            dataIndex:'head',
            key:'head',
            rowScope: 'row',
        },
        {
            title: (
                <Form.Item name={['series','1']}>
                    <Select 
                        filterOption={filterOption}
                        options={_.filter(optionSeries, f => !_.includes(selectedSeries,f.value))} 
                        placeholder="Modal" 
                        showSearch 
                        
                        style={{width:'100%'}} />
                </Form.Item>
            ),
            dataIndex:'compare1',
            key: 'compare1'
        },
        {
            title: (
                <Form.Item name={['series','2']}>
                    <Select 
                        filterOption={filterOption}
                        options={_.filter(optionSeries, f => !_.includes(selectedSeries,f.value))} 
                        placeholder="Modal" 
                        showSearch 
                        style={{width:'100%'}} />
                </Form.Item>
            ),
            dataIndex:'compare2',
            key: 'compare2'
        },
        {
            title: (
                <Form.Item name={['series','3']}>
                    <Select 
                        filterOption={filterOption}
                        options={_.filter(optionSeries, f => !_.includes(selectedSeries,f.value))} 
                        placeholder="Modal" 
                        showSearch 
                        style={{width:'100%'}} />
                </Form.Item>
            ),
            dataIndex:'compare3',
            key: 'compare3'
        },
    ]
    const [tableColumn, setTableColumn] = useState(defaultTableColumn)

    const removeColumn = (index) => {
        let column = _.cloneDeep(tableColumn);
        delete column[index];
        let newColumn = column;
        setTableColumn(newColumn)
    }

    const getSeries = async() => {
        message.loading({key:'series',content:'loading series...'});
        // let resultModel = await apiClient().get('/model');
        let resultSeries = await apiClient().get('/series',{params:{id_model: selectModel.id}}).catch(e => message.error({key:'series',content:'error series'}));
        if (_.size(resultSeries?.data)>0) {
            setSeries(resultSeries.data)
            console.log('optionseries',resultSeries.data)
            setOptionSeries(_.map(resultSeries.data, v => ({label:v?.series_name,value:v?.id})))
            setSelectedSeries([])
            
            message.success({key:'series',content:'load series succes'})
        }
    }

    const getColumn = async () => {
        message.loading({key:'column',content:'loading column...'});
        let cols = await apiClient().get('/column',{params:{id_model: selectModel.id}}).catch(e => message.error({key:'column',content:'error content'}));
        if (_.size(cols?.data)>0) {
            console.log('cols',cols.data)
            // setColumns(cols.data);
            setDataSource(_.map(cols.data, v => ({
                key:v.id,
                head: v.column_name,
                compare1: '',
                compare2: '',
                compare3: '',
            })))
            message.success({key:'column',content:'load column success'})
        }
    }

    const getValue = async(key,idseries) => {
        message.loading({key:'series',content:'loading series...'});
        let result = await apiClient().get('/value',{params:{id_series: idseries}}).catch(e => message.error({key:'series',content:'error content'}));
        console.log(result)
        if (_.size(result?.data)>0) {
            console.log('data',result.data)
            // setValues({
            //     ...values,
            //     [key]: result.data
            // });

            console.log(dataSource)
            
            setDataSource(_.map(dataSource, v => {
                return {
                    ...v,
                    ['compare'+key]: _.result(_.find(result.data, ({id_column:v.key})), 'val')
                }
            }))
            message.success({key:'series',content:'load series success'})
        }
    }

    const onValuesChange = async(change,all) => {
        console.log('change',all)        
        if (change?.series) {
            setSelectedSeries(_.values(all.series))
            let k = _.head(_.keys(change.series))
            let v = _.head(_.values(change.series))
            await getValue(k, v);
        }
    }

    const addColumn = () => {
        let index = parseInt(_.size(tableColumn));
        let tabletemp = _.cloneDeep(tableColumn);
        let temp = tabletemp[1];
        temp.dataIndex = 'compare'+index;
        temp.key = 'compare'+index;
        temp.title = (
            <Form.Item name={['series',(index)+'']}>
                <Select 
                    filterOption={filterOption}
                    options={_.filter(optionSeries, f => !_.includes(selectedSeries,f.value))} 
                    placeholder="Modal" 
                    showSearch 
                    style={{width:'100%'}} />
            </Form.Item>
        )
        console.log('check',index+'', temp)
        setTableColumn([
            ...tableColumn,
            temp
        ])
    }

    useEffect(() => {
        if (optionSeries) {
            setTableColumn(defaultTableColumn);
        }
    }, [optionSeries])
    
    

    useEffect(() => {
        (async()=>{
            if (selectModel) {
                // form.resetFields();
                await getSeries();
                await getColumn();
            }
        })()
    }, [selectModel])
    
    
  return (
    <>
        <Row style={{marginBottom:'5px'}}>
            <Col span={12}>
                <MyModel />
            </Col>
            <Col span={12} style={{textAlign:'right'}}>
                <Space>
                    <Button onClick={()=>router.reload()}>Reset</Button>
                    <Button disabled={_.size(tableColumn)>=6} onClick={()=>addColumn()}>Add Column</Button>
                </Space>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Form form={form} onValuesChange={onValuesChange}>
                    <Table bordered dataSource={dataSource} columns={tableColumn} pagination={{pageSize: _.size(dataSource), hideOnSinglePage:true}} />
                </Form>
            </Col>
        </Row>
    </>
  )
}

export default Comparison