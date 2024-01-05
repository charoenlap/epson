import { apiClient } from "@/utils/apiClient";
import { Table, Row, Col, Button, Dropdown, Input, Form, Select, Modal, message, Badge, Tag, Transfer } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, AppstoreAddOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import { initDrawerState, closeDrawerState } from "@/store/drawer";
import dayjs from 'dayjs'
import { decode, hashPassword, generateSalt } from '@/utils/encryption';
import { getSession } from "next-auth/react";
import { mapUrl } from "@/utils/tools";

const ManageTable = ({ initialValues, onSubmit, mode, close }) => {
	const [form] = Form.useForm();

	const handleSubmit = () => {
		form.validateFields().then((values) => {
			
			if (mode=='create') {
				values.status = 'active';
				let newSalt = generateSalt();
				values.salt = newSalt;
				values.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
			} else {
				values.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
			}
			onSubmit(values);
		});
	};

	return (
		<Form form={form} initialValues={initialValues} onFinish={handleSubmit}>
			{mode=='edit' && <Form.Item noStyle name="id"><Input type="hidden" /></Form.Item>}
			<Form.Item
				name="username"
				label="Username"
				rules={[{ required: true, message: "Please enter a username" }]}
			>
				<Input type="text" disabled={mode=='edit'} />
			</Form.Item>

			<Form.Item
				name="status"
				label="Status"
				rules={[{ required: true, message: "Please select a status" }]}
			>
				<Select>
					<Select.Option value="active">Active</Select.Option>
					<Select.Option value="inactive">Inactive</Select.Option>
					<Select.Option value="changepassword">Init Password</Select.Option>
				</Select>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Save
				</Button>
			</Form.Item>
		</Form>
	);
};

const Dump = () => {
	const setDrawer = useSetRecoilState(initDrawerState);
	const closeDrawer = useResetRecoilState(closeDrawerState);

	const [dataSource, setDataSource] = useState([]);
	const [columns, setColumns] = useState([]);

    const [listTable, setListTable] = useState([]);

    const updateHandler = async (values) => {
		values.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
		let find = values?.id;
		values = _.omit(values,['id','username']); // username cannot change
		let result = await apiClient().put('/user', values, {params: {id: find}});
		if (result?.data?.changedRows==1) {
			message.success('Update Success');
			await fetchData()
		} else {
			message.error('Fail Update');
		}
		closeDrawer()
    }

    const createHandler = async (values) => {
		let check = await apiClient().get('/user', {params:{['u.username']: _.trim(values?.username), ['u.del']: 0}});
		if (_.size(check?.data)==0) {
			values.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
			values.status = 'changepassword'
			let result = await apiClient().post('/user', values);
			if (result?.data?.insertId) {
				message.success('Create Success');
				await fetchData()
			} else {
				message.error('Fail Create');
			}
		} else {
			message.error('Duplicate username');
		}
		closeDrawer()
    }

    const deleteHandler = async (values) => {
		values.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
		let result = await apiClient().delete("/user", {params:{id:values?.id}, data: {updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')}});
		if (result?.data?.affectedRows>0) {
			message.success('Delete Success');
			await fetchData()
		} else {
			message.error('Fail Delete');
		}
		closeDrawer()
    }

	const fetchData = async () => {
		let result = await apiClient().post("/dump/table", {});
		let ignoreShow = []; // hidden column
		let data = _.map(_.filter(_.keys(_.result(result?.data, "[0]")), f => !_.includes(ignoreShow, f)), (val, key) => ({
			title: _.upperFirst(val),
			dataIndex: val,
			key: val,
			textWrap: 'word-break',
			ellipsis: true,
			...(
				val=='status'
				? {render:(text)=><Tag color={(text=='active'?'success':(text=='changepassword'?'warning':'error'))}>{text}</Tag>}
				: {}
			)
		}));
		data = _.concat(data, {
			key: "action",
			dataIndex: "action",
			title: "Action",
			render: (text, record, index) => (
				<Dropdown
					placement="bottomRight"
					arrow
					disabled={record?.username=='admin'}
					menu={{
						items: [
							{
								key: "view",
								label: "Manage",
								icon: <EditOutlined />,
								onClick: () => {
									setDrawer({
                                        width: '90%',
										title: "Manage",
										content: (
											<ManageTable
                                                onSubmit={updateHandler}
                                                initialValues={record}
												mode="edit"
												close={() => closeDrawer()}
											/>
										),
									});
								},
							},
						],
					}}
				>
					<Button>Action</Button>
				</Dropdown>
			),
		});
		setColumns(data);
		setDataSource(_.map(result?.data, (v, k) => ({ ...v, key: k })));
	};

    const onFilterTable = async (table) => {
        if (_.isUndefined(table)) {
            setDataSource([])
            setColumns([])
        } else {
            
        }
    }

    const getTables = async () => {
		let result = await apiClient().post("/dump/table");
        result = _.map(result?.data, val => _.result(_.values(val), '[0]'))
        setListTable(result)
    }

	useEffect(() => {
		(async () => {
            await getTables();
			// if (_.size(dataSource) == 0) {
			// 	await fetchData();
			// }
		})();
	}, []);

	return (
		<Row>
            <Col span={24}>
                <h3>Export</h3>
                <Select placeholder="Please select Table" size={'large'} onChange={onFilterTable} options={_.map(listTable, v => ({ key: v, label: v, value: v }))} showSearch allowClear style={{width: '100%'}} />
            </Col>
			<Col span={24}>
				{_.size(dataSource)>0 && <Table dataSource={dataSource} columns={columns} />}
			</Col>
		</Row>
	);
};

export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (!session) {
		return {redirect: {destination: '/admin/logout', permanent: false}}
	} else {
		const sessionPermissions = _.split(session.user.permissions, ',');
		const currentUrl = context.resolvedUrl;
		console.log('url', session.user.username, currentUrl, sessionPermissions);
		const isAllowed = mapUrl(currentUrl, sessionPermissions);
		console.log(isAllowed);
		if (isAllowed) {
			return {props:{}}
		} else {
			return {redirect: {destination: '/admin/logout', permanent: false}}
		}
	}
}

export default Dump;
