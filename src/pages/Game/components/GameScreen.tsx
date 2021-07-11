import {
  Avatar,
  Button,
  Col,
  Collapse,
  List,
  Select,
  Tag,
  Typography,
} from "antd";
import { getRedirectStatus } from "next/dist/lib/load-custom-routes";
import React, { Fragment, useEffect, useState } from "react";
import "../style/index.css";
import { firebase } from "./../../../initialFirebase";

const { Text, Link } = Typography;
const { Panel } = Collapse;
const db = firebase.database();

type State = {
  admin?: boolean;
  game: GameType[];
  collapseIndex?: string[] | number[];
  roleList: RoleType[];
  userList: UserType[];
};

export default function GameScreen(): JSX.Element {
  const gameName = "INGAME";
  const [state, setState] = useState<State>({
    collapseIndex: ["user"],
    admin: true,
    game: [],
    roleList: [],
    userList: [],
  });

  useEffect(() => {
    db.ref().on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.key);
        switch (childSnapshot.key) {
          case "game":
            setState((s) => ({
              ...s,
              game: Object.values(childSnapshot.val()),
              userList: s.userList,
            }));
            break;
          case "userlist":
            setState((s) => ({
              ...s,
              game: s.game,
              userList: Object.values(childSnapshot.val()),
            }));
            break;

          case "rolelist":
            setState((s) => ({
              ...s,
              game: s.game,
              userList: s.userList,
              roleList: Object.values(childSnapshot.val()),
            }));
            break;
          default:
            break;
        }
      });
    });
  }, []);

  const addNewTurn = () => {
    let liveUser: UserType[] = [];
    db.ref("userlist").on("value", (snap) => (liveUser = snap.exportVal()));
    const newdata = { turn: state.game.length + 1, user: liveUser };
    db.ref(`game/turn${newdata.turn}`).set(newdata);
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
  const getUserDie = (die: boolean, vote: boolean) => {
    if (!die) return "Còn sống";
    switch (vote) {
      case true:
        return "Treo Cổ";
      case false:
        return "Chết trong đêm";
    }
  };

  return (
    <div
      className="main-content"
      style={{ minHeight: "100%", overflow: "auto", height: 300 }}
    >
      <div style={{ marginBottom: 10 }}>
        <Button type={"primary"} onClick={addNewTurn}>
          New Turn
        </Button>
      </div>
      <div>
        <Collapse defaultActiveKey={state.collapseIndex}>
          <Panel key="user" header={`Player`}>
            <List
              itemLayout="horizontal"
              dataSource={state.userList}
              renderItem={(item) => (
                <List.Item
                  style={{ width: "100%" }}
                  actions={
                    state.admin
                      ? [
                          <Select
                            loading={!state.roleList}
                            value={item.role.code}
                            options={convertToSelectBox(state.roleList)}
                          />,
                        ]
                      : []
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={
                      item.die ? (
                        <Text type={"danger"}>
                          {item.name} {item.vote && ": Treo cổ"}
                        </Text>
                      ) : (
                        <Text type={"success"}>{item.name}</Text>
                      )
                    }
                    description={
                      state.admin && (
                        <Fragment>
                          <Col>
                            <Text type="secondary">{`Nhân vật trong game: ${item.role.name}`}</Text>
                          </Col>
                          <Col>
                            <Text type="secondary">{`Chú thích: ${item.role.note}`}</Text>
                          </Col>
                          <Tag color={item.die ? "error" : "blue"}>
                            {getUserDie(item.die, item.vote)}
                          </Tag>
                        </Fragment>
                      )
                    }
                  />
                </List.Item>
              )}
            />
          </Panel>
          {state.game.map((game) => {
            return (
              <Panel
                showArrow
                header={`TURN: ${game.turn}`}
                key={`${game.turn}`}
              >
                {game.turn === state.game.length ? (
                  <Fragment>
                    Danh sách người chơi:
                    <List
                      itemLayout="horizontal"
                      dataSource={Object.values(game.user)}
                      renderItem={(item) => (
                        <List.Item
                          style={{ width: "100%" }}
                          actions={
                            state.admin && !item.die
                              ? [
                                  <Button
                                    type="primary"
                                    onClick={() => {
                                      db.ref(
                                        `game/turn${game.turn}/user/${item.code}`
                                      ).update({ die: true, vote: true });
                                      db.ref(`userlist/${item.code}`).update({
                                        die: true,
                                        vote: true,
                                      });
                                    }}
                                  >
                                    Treo Cổ
                                  </Button>,
                                  <Button
                                    type="primary"
                                    onClick={() => {
                                      db.ref(
                                        `game/turn${game.turn}/user/${item.code}`
                                      ).update({ die: true, vote: false });
                                      db.ref(`userlist/${item.code}`).update({
                                        die: true,
                                        vote: false,
                                      });
                                    }}
                                  >
                                    Sói cắn
                                  </Button>,
                                ]
                              : [
                                  <Button
                                    type="primary"
                                    onClick={() => {
                                      db.ref(
                                        `game/turn${game.turn}/user/${item.code}`
                                      ).update({ die: false, vote: false });
                                      db.ref(`userlist/${item.code}`).update({
                                        die: false,
                                        vote: false,
                                      });
                                    }}
                                  >
                                    Cứu
                                  </Button>,
                                ]
                          }
                        >
                          <List.Item.Meta
                            avatar={
                              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title={
                              item.die ? (
                                <Text type="danger">{item.name}</Text>
                              ) : (
                                <Text type="success">{item.name}</Text>
                              )
                            }
                            description={getUserDie(item.die, item.vote)}
                          />
                        </List.Item>
                      )}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    Danh sách người chơi:
                    <List
                      itemLayout="horizontal"
                      dataSource={Object.values(game.user)}
                      renderItem={(item) => (
                        <List.Item style={{ width: "100%" }}>
                          <List.Item.Meta
                            avatar={
                              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title={
                              item.die ? (
                                <Text type="danger">{item.name}</Text>
                              ) : (
                                <Text type="success">{item.name}</Text>
                              )
                            }
                            description={getUserDie(item.die, item.vote)}
                          />
                        </List.Item>
                      )}
                    />
                  </Fragment>
                )}
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
}
