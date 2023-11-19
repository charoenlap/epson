import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ConfigProvider, Layout, theme, Typography } from "antd";
import { RecoilRoot, RecoilEnv } from "recoil";
import "@/styles/globals.css";

import { useRouter } from "next/router";
import _ from "lodash";
import DefaultLayout from '@/components/defaultLayout'
import AdminLayout from '@/components/adminLayout'
import BlankLayout from '@/components/blankLayout'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({
	Component,
	pageProps: { session, status, ...pageProps },
}) {
	const [isAuth, setIsAuth] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const router = useRouter();
	const isUnderAdminSection = router.pathname.startsWith('/admin');
	const isExactAdminRoute = router.pathname === '/admin' || router.pathname === '/admin/index';
	const LayoutComponent = isUnderAdminSection ? (isExactAdminRoute ? BlankLayout : AdminLayout) : DefaultLayout;


	return (
		<SessionProvider session={session}>
			<ConfigProvider
				theme={{
					token: {
						// colorPrimary: 'red',
						// colorBgContainer: colorBgContainer
					},
					components: {
						Menu: {
							darkItemBg: '#1677ff'
						}
					},
				}}
			>
				<RecoilRoot>
					<LayoutComponent>
						<Component {...pageProps} />
					</LayoutComponent>
					{/* <Layout>
						<HeaderMenu />
						<Layout>
							{isAuth && <Sidebar />}
							<Layout
								style={{
									padding: "0 24px 24px",
								}}
							>
								{isAuth && <Breadcrumbs />}
								<Content
									style={{
										...(isAuth
											? {
													padding: 24,
													margin: 0,
													minHeight:
														"calc(100vh - 142px)",
													background:
														colorBgContainer,
											  }
											: {}),
									}}
								>
									<Component {...pageProps} />
								</Content>
							</Layout>
						</Layout>
					</Layout> */}
				</RecoilRoot>
			</ConfigProvider>
		</SessionProvider>
	);
}
