/* eslint-disable react/prop-types */
import { Menu, Avatar, Button } from "antd";
import { UserOutlined, FileDoneOutlined, LogoutOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const RightMenu = ({ mode }) => {
  const { user, signOut } = useAuth();

  const handleLogOut = async () => {
    await signOut();
  };

  if (user) {
    return (
      <Menu mode={mode} style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}>
        <Menu.SubMenu
          title={
            <>
              <Avatar icon={<UserOutlined />} />
              <span className="username">{user.username}</span>
            </>
          }
        >
          <Menu.Item key="profile">
            <Link to='/profile'>
              <UserOutlined /> Profile
            </Link>
          </Menu.Item>
          <Menu.Item key="tasks">
            <Link to='/tasks'>
              <FileDoneOutlined /> Tasks
            </Link>
          </Menu.Item>
          <Menu.Item key="logout" onClick={handleLogOut}>
            <LogoutOutlined /> Logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }

  return (
    <div>
      <Link to="/login" style={{ color: 'white' }}>Login</Link>
      <Button 
        type="primary" 
        style={{ marginLeft: '8px', marginRight: '8px' }}
      >
        <Link to="/register">Register</Link>
      </Button>
    </div>
  );
};


export default RightMenu;
