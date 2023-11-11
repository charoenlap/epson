import React, { useEffect, useState } from "react";
import { Card, message, Row, Col, Button } from "antd";
import { withAuth } from "../utils/middleware.js";
import { apiClient } from "../utils/apiClient.js";
const { Meta } = Card;
import { selectModelState } from "@/store/data";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router.js";
import _ from 'lodash';

const Datacenter = () => {
	const [selectModel,setSelectModel] = useRecoilState(selectModelState);
	const router = useRouter();
    const [lists, setLists] = useState([]);

    const getLists = async () => {
        message.loading({key:'init',content:'loading...'})
        const models = await apiClient().get('/model');
        console.log(models);
        setLists(models.data)
        if (_.size(models?.data)>0) {
            message.success({key:'init',content:'Load model success'})
        } else {
            message.error({key:'inti',content:'Cannot load model'});
        }
    }

    useEffect(() => {
        (async()=>{
            if (_.size(lists)==0) {
                await getLists();
            }
        })()
    }, [lists])

	return (
		<>
			<Card>
				<Row justify="center">
				{
					_.size(lists)>0 && _.map(lists, val => (
						<Col span={8} >
							<Button type="link" onClick={()=>{
								setSelectModel(val);
								router.push('/specification')
							}} style={{width:'100%'}}>
								<Card cover={<img alt={val.id} src={"images/m"+val.id+".png"} width={200}/>}>
									<Meta title={val.model_name} />
								</Card>
							</Button>
						</Col>
					))
				}
				</Row>
			</Card>
		</>
	);
}

export default withAuth(Datacenter);