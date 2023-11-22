import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { withAuth } from "@/utils/middleware";
import {
	Select,
	Form,
	Layout,
	theme,
	Breadcrumb,
	Menu,
	message,
	Col,
	Card,
	Space,
	Row,
	Descriptions,
	Divider,
	Button,
    Input
} from "antd";
import {
	LaptopOutlined,
	NotificationOutlined,
	DownOutlined,
	HomeOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { apiClient } from "@/utils/apiClient";
import _ from "lodash";
import MyModel from "@/components/myModel";
import { selectModelState } from "@/store/data";
const { Content, Sider } = Layout;
const { Meta } = Card;

const Specification = () => {
	const [form] = Form.useForm();
	const selectModel = useRecoilValue(selectModelState);
	const [series, setSeries] = useState([]);
	const [optionSeries, setOptionSeries] = useState([]);
	const [selectedSeries, setSelectedSeries] = useState([]);
	const [columns, setColumns] = useState();
	const [spec, setSpec] = useState({});
	const [disabledDownload, setDisabledDownload] = useState(true);
	const router = useRouter();

	const getSpecificationList = async () => {
		message.loading({ key: "series", content: "loading series..." });
		console.log(selectModel);
        form.resetFields();
		// let resultModel = await apiClient().get('/model');
		let results = await apiClient()
			.get("/series", { params: { id_model: selectModel.id } })
			.catch((e) =>
				message.error({ key: "series", content: "error series" })
			);
        console.log('list', results)
		if (_.size(results?.data) > 0) {
			setSeries(results.data);
			setOptionSeries(
				_.map(results.data, (v) => ({
					label: v?.series_name,
					value: v?.id,
				}))
			);
			message.success({ key: "series", content: "load series succes" });
		}
	};

	const filterOption = (input, option) => {
		let inputLow = _.join(_.split(_.lowerCase(input), " "), "");
		let labelLow = _.join(_.split(_.lowerCase(option?.label), " "), "");
		return _.startsWith(labelLow, inputLow) || inputLow == labelLow;
	};

	const getSpecification = async (idspec) => {
		let key = "series";
        setSpec({});
        if (idspec) {
            message.loading({ key: key, content: "loading ..." });
            console.log(idspec)
            let result = await apiClient()
                .get("/specification", { params: { ['v.id_series']: idspec } })
                .catch((e) =>
                    message.error({ key: key, content: "error content" })
                );
            if (_.size(result?.data) == 1) {
                console.log('last',result.data[0]);
                setSpec(result?.data[0]);
                message.success({ key: key, content: "load " + key + " success" });
            } else {
                message.error({key:key, content:'fail load'});
            }
        }
	};

	const getColumn = async () => {
		message.loading({ key: "column", content: "loading column..." });
		let cols = await apiClient()
			.get("/column", { params: { id_model: selectModel.id } })
			.catch((e) =>
				message.error({ key: "column", content: "error content" })
			);
		if (_.size(cols?.data) > 0) {
			console.log("cols", cols.data);
			setColumns(cols.data);
			message.success({ key: "column", content: "load column success" });
		}
	};

	const getValue = async (idseries) => {
		message.loading({ key: "series", content: "loading series..." });
		let cols = await apiClient()
			.get("/column", { params: { id_model: model.id } })
			.catch((e) =>
				message.error({ key: "column", content: "error content" })
			);
		let result = await apiClient()
			.get("/value", { params: { id_series: idseries } })
			.catch((e) =>
				message.error({ key: "series", content: "error content" })
			);
		if (_.size(result?.data) > 0) {
			console.log(cols);
			setSelectedSeries(result.data);
			message.success({ key: "series", content: "load series success" });
		}
	};

	const onValuesChange = async (change, all) => {
        console.log('onvaluechange',change)
		if (change?.series) {
			setDisabledDownload(false);
			await getSpecification(change.series);
		}
	};

	useEffect(() => {
        (async()=>{
            console.log("selectModel", selectModel);
            if (!selectModel) {
                // router.push("/specandcompair?error=nomodel");
            } else {
                await getSpecificationList();
            }
        })()
	}, [selectModel]);

	return (
		<>
			<MyModel />
			<Row gutter={[12, 12]}>
				<Col span={24}>
					<h3>Specification</h3>
					<Form form={form} onValuesChange={onValuesChange}>
						<Form.Item name={"series"} style={{margin:0}}>
							<Select
								filterOption={filterOption}
								options={optionSeries}
								placeholder="Specification Model"
								showSearch
								style={{ width: "100%" }}
							/>
						</Form.Item>
					</Form>
				</Col>
            </Row>
            <Divider />
            <Row gutter={[12, 12]}>
                <Col span={3}><h3 style={{margin:0}}>ข้อมูลสินค้า</h3></Col>
                <Col span={10}>
					<Descriptions column={1}>
						<Descriptions.Item label="Ordercode">
							{spec?.ordercode || "-"}
						</Descriptions.Item>
						<Descriptions.Item label="Description">
							{spec?.description || "-"}
						</Descriptions.Item>
					</Descriptions>
                </Col>
                <Col span={11}>
					<Descriptions column={1}>
						<Descriptions.Item label="Status">
							{spec?.status || "-"}
						</Descriptions.Item>
					</Descriptions>
                </Col>
            </Row>
            <Row gutter={[12, 12]}>
                <Col span={3}><h3 style={{margin:0}}>ราคาสินค้า</h3></Col>
                <Col span={21}>
					<Descriptions column={1}>
						<Descriptions.Item label="MSRP">
							{spec?.msrp || "-"}
						</Descriptions.Item>
						<Descriptions.Item label="MSRP (Vat%)">
							{spec?.msrp_vat || "-"}
						</Descriptions.Item>
					</Descriptions>
                </Col>
            </Row>
            <Row gutter={[12, 12]}>
                <Col span={3}><h3 style={{margin:0}}>Warranty</h3></Col>
                <Col span={21}>
					<Descriptions column={1}>
						<Descriptions.Item label="STD warranty term">
							{spec?.std_warranty_term || "-"}
						</Descriptions.Item>
						<Descriptions.Item label="Lamp / Light source / Head">
							{spec?.lamp_light_source_head || "-"}
						</Descriptions.Item>
					</Descriptions>
                </Col>
            </Row>
            {/* <Row gutter={[12, 12]}>
                <Col span={3}><h3 style={{margin:0}}>Specs / Product</h3></Col>
                <Col span={21}>
					<Descriptions column={1}>
						<Descriptions.Item label="STD warranty term">
							{spec?.std_warranty_term || "-"}
						</Descriptions.Item>
						<Descriptions.Item label="Lamp / Light source / Head">
							{spec?.lamp_light_source_head || "-"}
						</Descriptions.Item>
					</Descriptions>
                </Col>
            </Row> */}
            <Row gutter={[12,12]}>
                <Col span={3}><h3 style={{margin:0}}>Link Brochure</h3></Col>
                <Col span={21}>
                    <Space.Compact style={{ width: '50%' }}>
                        <Input disabled={_.isEmpty(spec?.brochure)} type="text" value={spec?.brochure} />
                        <Button disabled={_.isEmpty(spec?.brochure)} type="default" onClick={()=>{
                            navigator?.clipboard?.writeText(spec.brochure)
                            message.success('Copy Success')
                        }}>Copy</Button>
                    </Space.Compact>
                </Col>
                <Col span={24} offset={3}>
                    <Button href={spec?.brochure} target="new" download disabled={_.isEmpty(spec?.brochure)}>Download</Button>
                </Col>
            </Row>
            <Row gutter={[12,12]}>
                <Col span={3}><h3 style={{margin:0}}>Bundle Items</h3></Col>
                <Col span={21}>
					<Descriptions column={1}>
						<Descriptions.Item>
							{spec?.bundle_items || "-"}
						</Descriptions.Item>
					</Descriptions>
                </Col>
            </Row>
            <Row gutter={[12,12]}>
                <Col span={3}><h3 style={{margin:0}}>Remark</h3></Col>
                <Col span={21}>
					<Descriptions column={1}>
						<Descriptions.Item>
							{spec?.remark || "-"}
						</Descriptions.Item>
					</Descriptions>
                </Col>
            </Row>
		</>
	);
};

export default withAuth(Specification);
