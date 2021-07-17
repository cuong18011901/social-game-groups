import {
  Avatar,
  Badge,
  Button,
  Col,
  Collapse,
  List,
  Result,
  Select,
  Tag,
  Typography,
} from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { firebase } from "../../../initialFirebase";
import "../style/index.css";

const { Text } = Typography;
const { Panel } = Collapse;
const db = firebase.database();

type State = {
  game: GameType[];
  isReset?: boolean;
  collapseIndex?: string[] | number[];
  roleList: RoleType[];
  userList: UserType[];
  voteList?: VoteType[];
};

export default function GameScreen(): JSX.Element {
  const [state, setState] = useState<State>({
    isReset: false,
    collapseIndex: ["user"],
    voteList: [],
    game: [],
    roleList: [],
    userList: [],
  });

  useEffect(() => {
    db.ref("votelist")
      .orderByChild("totalVote")
      .limitToLast(3)
      .on("value", (snap) => {
        setState({ ...state, voteList: Object.values(snap.exportVal()) });
      });
  }, []);

  useEffect(() => {
    db.ref().on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
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
  }, [state.isReset]);

  const convertToSelectBox = (data?: RoleType[]): Source[] => {
    if (!data) return [];
    return data.map((item: RoleType) => {
      return {
        value: item.code,
        label: item.name,
      };
    });
  };

  const convertUserToSelectBox = (data?: UserType[]): Source[] => {
    if (!data) return [];
    return data.map((item: UserType) => {
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

  const onVote = () => {
    console.log("object");
    return null;
  };

  const renderListVote = () => {
    let listVote: VoteType[] = [];
    db.ref("votelist")
      .orderByChild("totalVote")
      .limitToLast(4)
      .on("value", (snap) => {
        snap.forEach((item) => {
          const newItem = item.val();
          listVote.unshift(newItem);
        });
      });

    return (
      <List
        itemLayout="vertical"
        dataSource={listVote}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button onClick={onVote}>Thêm Phiếu</Button>,
              <Select
                value={"Người bỏ phiếu"}
                options={convertUserToSelectBox(state.userList)}
              />,
            ]}
          >
            <List.Item.Meta
              title={
                <Badge count={item.totalVote}>
                  <Tag color="red">{item.userName}</Tag>
                </Badge>
              }
            />
          </List.Item>
        )}
      />
    );
  };
  return (
    <div
      className="main-content"
      style={{ minHeight: "100%", overflow: "auto", height: 300 }}
    >
      <div>
        <Result status="404" subTitle={renderListVote()} />
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
                  actions={[
                    <Select
                      loading={!state.roleList}
                      value={item.role.code}
                      options={convertToSelectBox(state.roleList)}
                    />,
                  ]}
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
                          actions={[
                            <Button
                              type="primary"
                              onClick={() => {
                                console.log(
                                  db
                                    .ref("votelist")
                                    .orderByChild("totalVote")
                                    .limitToLast(1)
                                    .on("value", (snap) =>
                                      console.log(snap.val())
                                    )
                                );
                              }}
                            >
                              Đưa lên giàn
                            </Button>,
                          ]}
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
