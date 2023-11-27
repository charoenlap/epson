import { modelsState, selectModelState } from '@/store/data'
import {FormOutlined} from "@ant-design/icons";
import { Form, Card, Button, Modal, Row, Col } from 'antd'
import {useRecoilState} from 'recoil';
import React, { useEffect, useState } from 'react'
import { apiClient } from '../utils/apiClient';
import _ from 'lodash';
import { useRouter } from 'next/router';
const {Meta} = Card;

const MyModel = () => {
    const [models,setModels] = useRecoilState(modelsState);
    const [selectModel, setSelectModel] = useRecoilState(selectModelState)
    const [lists, setLists] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    
    const getLists = async () => {
        const results = await apiClient().get('/model');
        console.log(results.data)
        setModels(results.data)
        setLists(results.data)
    }

    useEffect(() => {
        (async()=>{
            if (_.size(lists)==0) {
                await getLists();
            }
        })()
        
    }, [])
    
    useEffect(() => {
        console.log(models, selectModel)
        if (_.isEmpty(selectModel)) {
            setIsModalOpen(true);
        }
    }, [selectModel, models])

    
    

  return (
    <div style={{marginBottom:'5px'}}>
        <Button onClick={()=>setIsModalOpen(!isModalOpen)}><FormOutlined />{_.result(_.find(models, {id:selectModel?.id}),'model_name') || 'Please select type' }</Button>
        <Modal title="Please select type" open={isModalOpen} width={'50%'} footer={null} destroyOnClose={true} onCancel={()=>setIsModalOpen(false)}>
            <Row gutter={[24,24]} justify={'center'}>
            {
                _.map(models, val => (
                    <Col span={6}>
                        <Button type="link" onClick={()=>{
                            setSelectModel(val);
                            // modal.destroy();
                            setIsModalOpen(false);
                            // router.push('/specification')
                        }} style={{width:'100%'}}>
                            <Card cover={<img alt={val.id} src={"images/m"+val.id+".png"} style={{height:'120px'}} />}>
                                <Meta title={val.model_name} />
                            </Card>
                        </Button>
                    </Col>
                ))
            }
            </Row>
        </Modal>
        {/* <Form initialValues={{modelid: selectModel?.id}}>
            <Form.Item label="Type" name="modelid">
                <Select options={_.map(lists, v => ({ label: v.model_name, value: v.id }))} onSelect={(val)=>{
                    console.log('setselect',_.find(model, {id: val}))
                    setSelectModel(_.find(model, {id: val}))
                }} style={{width: '200px'}} />
            </Form.Item>
        </Form> */}
    </div>
  )
}

export default MyModel