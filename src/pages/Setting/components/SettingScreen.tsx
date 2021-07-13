import { Button, Form, Input, List } from "antd";
import React, { useEffect, useState } from "react";
import "../style/index.css";
import { firebase } from "./../../../initialFirebase";
const db = firebase.database();

export default function SettingScreen(): JSX.Element {
  const [state, setstate] = useState<RoleType[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    db.ref("rolelist").on("value", (snapshot) => {
      snapshot.exportVal() && setstate(Object.values(snapshot.exportVal()));
    });
  }, []);

  const onFinish = (values: RoleType) => {
    const newData = {
      name: values.name,
      code: values.code,
      note: values.note,
    };
    db.ref("rolelist")
      .orderByChild("code")
      .equalTo(values.code)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          alert("Code trùng");
        } else {
          db.ref(`rolelist`).child(`${newData.code}`).set(newData);
        }
      });
  };

  return (
    <div
      className="main-content"
      style={{ minHeight: "100%", overflow: "auto", height: 300 }}
    >
      <Form
        form={form}
        layout="vertical"
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <Form.Item
          name={"name"}
          label={"Name"}
          rules={[
            {
              required: true,
              message: "Input something!",
            },
          ]}
        >
          <Input placeholder="placeholder" />
        </Form.Item>
        <Form.Item
          name={"code"}
          label={"Code"}
          rules={[
            {
              required: true,
              message: "Input something!",
            },
          ]}
        >
          <Input placeholder="placeholder" />
        </Form.Item>
        <Form.Item
          name={"note"}
          label={"Mô tả"}
          rules={[
            {
              required: true,
              message: "Input something!",
            },
          ]}
        >
          <Input placeholder="placeholder" />
        </Form.Item>

        <Form.Item>
          <Button style={{ marginTop: 20 }} type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
      )
      <List
        itemLayout="horizontal"
        dataSource={state}
        renderItem={(item, index) => (
          <List.Item
            style={{ width: "100%" }}
            actions={[
              <Button
                onClick={() => {
                  db.ref(`rolelist`).child(item.code).remove();
                  db.ref(`rolelist`).once("value", (value) => {
                    !value.exportVal() && setstate([]);
                  });
                }}
                type={"dashed"}
              >
                Xóa
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={`Chú thích: ${item.note}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
