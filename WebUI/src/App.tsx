import "./App.css";
import { ConfigProvider, Layout, theme, Typography } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import logo from "./assets/logo1.jpg";

import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import Home from "./Pages/TaskView";
import Create from "./Pages/Create";

function App() {
  const screens = useBreakpoint();

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#9b249d",
          borderRadius: 2,
        },
      }}
    >
      <Layout
        style={{
          height: "100dvh",
        }}
      >
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            padding: "0 30px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt=""
              style={{
                width: 60,
                height: 60,
              }}
            />
            <Typography.Title
              style={{
                color: "white",
                marginBottom: 0,
              }}
            >
              KAIBURR
            </Typography.Title>
          </div>
        </Header>
        <Layout>
          <Sider trigger={null} collapsible collapsed={!screens.sm}>
            <Navbar />
          </Sider>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: "#d4d4d4",
              borderRadius: borderRadiusLG,
              overflow: "scroll",
              maxHeight: "95dvh",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </Content>
        </Layout>
        <Footer>footer</Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
