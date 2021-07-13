import {
  CarOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import "firebase/database";
import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { firebase } from "../initialFirebase";
import "./style/index.css";
const { Header, Content, Sider } = Layout;

interface Props {
  children: ReactNode;
}
type State = { database: any };

export default function MainLayout(props: Props) {
  const key = window.location.pathname.split("/").pop();
  const [collapsed, setcollapsed] = useState(true);
  const toggle = () => {
    setcollapsed(!collapsed);
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[key ?? "home"]}
          defaultOpenKeys={["sub1"]}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to={"/home"}>Home</Link>
          </Menu.Item>
          <Menu.Item key="game" icon={<CarOutlined />}>
            <Link to={"/game"}>Game</Link>
          </Menu.Item>
          <Menu.Item key="user" icon={<UserOutlined />}>
            <Link to={"/user"}>User</Link>
          </Menu.Item>
          <Menu.Item key="setting" icon={<SettingOutlined />}>
            <Link to={"/setting"}>Setting</Link>
          </Menu.Item>
          <Menu.Item key="create">
            <Button
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Game Mới
            </Button>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content className="site-layout-background">{props.children}</Content>
      </Layout>
    </Layout>
  );
}
