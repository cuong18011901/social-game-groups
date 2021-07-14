import {
  CarOutlined,
  HomeOutlined,
  ManOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import "firebase/database";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./style/index.css";
const { Header, Content } = Layout;

interface Props {
  children: ReactNode;
}

export default function MainLayout(props: Props) {
  const key = window.location.pathname.split("/").pop();
  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[key ?? "home"]}
          defaultOpenKeys={["sub1"]}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to={"/home"}>Home</Link>
          </Menu.Item>
          <Menu.Item key="game" icon={<StarOutlined />}>
            <Link to={"/game"}>Game</Link>
          </Menu.Item>
          <Menu.Item key="play" icon={<PlayCircleOutlined />}>
            <Link to={"/play-game"}>Game</Link>
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
      </Header>
      <Content className="site-layout-background">{props.children}</Content>
    </Layout>
  );
}
