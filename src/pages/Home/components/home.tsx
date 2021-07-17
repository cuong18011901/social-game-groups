import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { Fragment, useEffect, useState } from "react";
import { firebase } from "../../../initialFirebase";
import "../style/index.css";

const db = firebase.database();

export default function Home(): JSX.Element {
  const [state, setstate] = useState<{
    formLoading: boolean;
    listGame: GameType[];
    showModal: boolean;
  }>({ formLoading: false, listGame: [], showModal: false });

  const onFinish = (value: any) => {
    setstate({ ...state, formLoading: true });
    const newData = {
      userId: localStorage.getItem("uid"),
      end: false,
      ...value,
    };
    db.ref("listGame")
      .orderByChild("gameCode")
      .equalTo(newData.gameCode)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          return notification["warning"]({ message: "Code game đã tồn tại" });
        } else {
          db.ref("listGame").child(`${newData.gameCode}`).set(newData);
        }
      })
      .then((value) => {
        !value.exists() &&
          notification["success"]({ message: "Tạo game thành công" });
      })
      .catch(() =>
        notification["error"]({
          message: "Tạo game không thành công, vui lòng thử lại!",
        })
      )
      .finally(() => {
        setstate({ ...state, formLoading: false });
      });
  };

  useEffect(() => {
    db.ref("listGame").once("value", (snapshot) => {
      console.log(snapshot.exportVal());
      const data = snapshot.val() && Object.values(snapshot.val());
      setstate({ ...state, listGame: data as GameType[] });
    });
  }, []);

  const columns = [
    {
      title: "Tên game",
      dataIndex: "gameName",
      key: "gameName",
    },
    {
      title: "Code game",
      dataIndex: "gameCode",
      key: "gameCode",
    },
    {
      title: "Trạng thái",
      dataIndex: "end",
      key: "end",
      render: (end: boolean, record: GameType) => {
        return (
          <Fragment>
            {!record.end ? (
              <Fragment>
                <Button
                  type="primary"
                  onClick={() => {
                    setstate({ ...state, showModal: true });
                    // localStorage.setItem("ingame", record.gameCode as string);
                  }}
                >
                  Vào game
                </Button>
                <Modal title="Basic Modal" visible={state.showModal}>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
              </Fragment>
            ) : (
              <Button disabled={true} type="dashed">
                Kết thúc
              </Button>
            )}
          </Fragment>
        );
      },
    },
  ];

  return (
    <div className="main-content">
      <Form
        name="normal_login"
        className="login-form"
        style={{ marginTop: 20 }}
        onFinish={onFinish}
      >
        <Form.Item>
          <Button disabled={state.formLoading} type="primary" htmlType="submit">
            Tạo game mới
          </Button>
        </Form.Item>
        <Form.Item
          name="gameName"
          rules={[{ required: true, message: "Vui lòng nhập tên game!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Tên game"
          />
        </Form.Item>
        <Form.Item
          name="gameCode"
          rules={[{ required: true, message: "Vui lòng nhập code game!" }]}
        >
          <Input placeholder="Code game" />
        </Form.Item>
        <Form.Item
          name="gamePass"
          rules={[{ required: true, message: "Vui lòng nhập pass game!" }]}
        >
          <Input type="password" placeholder="Mật khẩu vào game" />
        </Form.Item>
        <Form.Item name="userList">
          <Input placeholder="Danh sách người chơi" />
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={state.listGame} />
    </div>
  );
}
