import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth-context";
import { Link, useHistory } from "react-router-dom";
import AddExam from "./AddExam";
// import { Alert } from "react-bootstrap";
import UpdateProfile from "./UpdateProfile";
import ListedExam from "./ListedExam";
import Listed_Joined from "./dashboard/NestedTableDeneme";
// import star from "./stars.svg";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SettingOutlined,
  AppstoreAddOutlined,
  UnorderedListOutlined,
  ScheduleOutlined,
  LogoutOutlined,
  SmileOutlined,
  TrademarkCircleOutlined,
} from "@ant-design/icons";

import { Update } from "@material-ui/icons";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const [content, setContent] = useState("addExam");
  const [list, setList] = useState({});

  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;

  function handleList(getList) {
    setList((list) => ({ ...getList }));
    setContent("Listed_Joined");
  }

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  }, []);

  useEffect(() => {
    Update();
  });

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function handleChange({ key }) {
    setContent(key);
  }

  const Update = () => {
    switch (content) {
      case "addExam":
        return (
          <div>
            <AddExam />
          </div>
        );
      case "listedExam":
        return (
          <div>
            <ListedExam handleJoinedList={handleList} />
          </div>
        );
      case "updateProfile":
        return <UpdateProfile />;
      case "Listed_Joined":
        return <Listed_Joined student_list={list} />;
      default:
        return <div>no content</div>;
    }
  };
  const handleTopMenu = (e) => {
    switch (e.key) {
      case "1":
        setContent("addExam");
        break;
      case "2":
        setContent("listedExam");
        break;
    }
  };

  return (
    <Layout>
      <Header className="header" style={{ backgroundColor: "#38d39f" }}>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ backgroundColor: "#38d39f", color: "white" }}
        >
          <span style={{ fontWeight: "bold" }}>Remote Exam</span>

          <Menu.Item key="1" onClick={handleTopMenu}>
            Sınav Ekle
          </Menu.Item>
          <Menu.Item key="2" onClick={handleTopMenu}>
            Sınavlar
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub2"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={handleChange}
          >
            <SubMenu
              key="sub1"
              icon={<UserOutlined />}
              title="Kullanıcı İşlemleri"
            >
              <Menu.Item key="updateProfile" icon={<SmileOutlined />}>
                Profili Güncelle
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              icon={<ScheduleOutlined />}
              title="Sınav İşlemleri"
            >
              <Menu.Item key="addExam" icon={<AppstoreAddOutlined />}>
                Sınav Ekle
              </Menu.Item>
              <Menu.Item key="listedExam" icon={<UnorderedListOutlined />}>
                Sınavları Listele
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<SettingOutlined />} title="Ayarlar">
              <Menu.Item
                key={"1"}
                onClick={handleLogout}
                icon={<LogoutOutlined />}
              >
                Çıkış Yap
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: "100vh",
            }}
          >
            <Update />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
