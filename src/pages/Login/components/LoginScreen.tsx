import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../../../initialFirebase";
import "../style/index.css";

export default function LoginScreen(): JSX.Element {
  const [state, setstate] = useState({ isLoading: false });
  const onFinish = (values: any) => {
    setstate({ ...state, isLoading: true });
    setTimeout(() => {
      auth
        .signInWithEmailAndPassword(values.email, values.password)
        .then((doc) => {
          localStorage.setItem("uid", doc.user?.uid as string);
          notification["success"]({
            message: "Đăng nhập thành công!!",
          });
          // window.location.replace("/");
        })
        .catch((err) => {
          setstate({ ...state, isLoading: false });
          notification["warning"]({
            message: "Lỗi đăng nhập, vui lòng thử lại!!",
          });
        });
    }, 300);
  };
  if (state.isLoading) return <div className="loader"></div>;
  return (
    <div style={{ padding: 20 }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
}
