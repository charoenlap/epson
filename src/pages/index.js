import React, { useEffect } from "react";
import { Breadcrumb, Col, Divider, Row, Card, Space } from "antd";
import {
	AlertOutlined,
	SolutionOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/middleware";
const { Meta } = Card;
const Index = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth/login");
		}
	}, [session]);

	return (
		<Row gutter={[12,12]}>
			<Col span={12}>
				<Link href="/datacenter">
					<Card
						hoverable
						style={{
							// width: 240,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							textAlign: "center",
							padding: "16px",
						}}
						// cover={<img alt="example" src="images/epson.png" />}
					>
						<SolutionOutlined
							style={{
								fontSize: "50px",
								color: "#08c",
								marginBottom: "16px",
							}}
						/>
						<Meta title="Data Center" description="" />
					</Card>
				</Link>
			</Col>
			<Col span={12}>
				<Link href="/intelligent">
					<Card
						hoverable
						style={{
							// width: 240,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							textAlign: "center",
							padding: "16px",
						}}
						// cover={<img alt="example" src="images/epson.png" />}
					>
						<AlertOutlined
							style={{
								fontSize: "50px",
								color: "#08c",
								marginBottom: "16px",
							}}
						/>
						<Meta title="Data Analytic" description="" />
					</Card>
				</Link>
			</Col>
		</Row>
	);
};

export default withAuth(Index);
