import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  List,
  Modal,
  Select,
  Typography,
} from "antd";
import React, { Fragment, useEffect, useState } from "react";
import "../style/index.css";
import { firebase } from "./../../../initialFirebase";

const { Text } = Typography;

const db = firebase.database();

type State = { admin?: boolean; roleList: RoleType[]; userList: UserType[] };
export default function UserScreen(): JSX.Element {
  const [state, setState] = useState<State>({
    admin: true,
    roleList: [],
    userList: [],
  });
  const [form] = Form.useForm();

  useEffect(() => {
    db.ref().on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        switch (childSnapshot.key) {
          case "rolelist":
            setState((s) => ({
              ...s,
              roleList: Object.values(childSnapshot.val()),
              userList: s.userList,
            }));
            break;
          case "userlist":
            setState((s) => ({
              ...s,
              roleList: s.roleList,
              userList: Object.values(childSnapshot.val()),
            }));
            break;
          default:
            break;
        }
      });
    });
  }, []);

  const onFinish = (values: any) => {
    const role = state.roleList.find((item) => item.code == values.role);
    const newData = {
      name: values.name,
      password: values.password,
      code: values.code,
      role: role,
      vote: false,
      die: false,
    };
    db.ref("userlist")
      .orderByChild("code")
      .equalTo(values.code)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          alert("Code trùng");
        } else {
          db.ref(`userlist`).child(`${newData.code}`).set(newData);
        }
      });
  };

  const convertToSelectBox = (data?: RoleType[]): Source[] => {
    if (!data) return [];
    return data.map((item: RoleType) => {
      return {
        value: item.code,
        label: item.name,
      };
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className="main-content"
      style={{ minHeight: "100%", overflow: "auto", height: 300 }}
    >
      {state.admin && (
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
            name={"password"}
            label={"password"}
            rules={[
              {
                required: true,
                message: "Input something!",
              },
            ]}
          >
            <Input placeholder="placeholder" />
          </Form.Item>{" "}
          <Form.Item
            name={"role"}
            label={"role"}
            rules={[
              {
                required: true,
                message: "Input something!",
              },
            ]}
          >
            <Select
              clearIcon={true}
              options={convertToSelectBox(state.roleList)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      )}
      <div>
        <List
          itemLayout="horizontal"
          dataSource={state.userList}
          renderItem={(item: UserType) => (
            <List.Item
              style={{ width: "100%" }}
              actions={
                state.admin
                  ? [
                      <Fragment>
                        <Select
                          loading={!state.roleList}
                          value={item.role.code}
                          options={convertToSelectBox(state.roleList)}
                        />
                      </Fragment>,
                      <Button
                        onClick={() => {
                          db.ref(`userlist`).child(item.code).remove();
                          db.ref(`userlist`).once("value", (value) => {
                            !value.exportVal() &&
                              setState({ ...state, userList: [] });
                          });
                        }}
                        type={"dashed"}
                      >
                        Xóa
                      </Button>,
                    ]
                  : []
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={item.name}
                description={
                  state.admin ? (
                    <Fragment>
                      <Col>
                        <Text type="success">{`Nhân vật trong game: ${item.role.name}`}</Text>
                      </Col>
                      <Col>
                        <Text type="success">{`Chú thích: ${item.role.note}`}</Text>
                      </Col>
                    </Fragment>
                  ) : (
                    ""
                  )
                }
              />
            </List.Item>
          )}
        />
        <Modal
          title="Setting User"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        ></Modal>
      </div>
    </div>
  );
}
