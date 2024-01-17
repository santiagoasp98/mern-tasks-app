import { useState, useEffect } from "react";
import { Layout, Drawer } from "antd";
import RightMenu from "./RightMenu";
import { Link, useLocation } from "react-router-dom";

import './Navbar.css';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  let { pathname: location } = useLocation();
  useEffect(() => {
    setVisible(false);
  }, [location]);

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
          <div className="logo">
            <Link to='/'>
              <div
                className="brand-font" 
                style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
              >
                Tasks Manager
              </div>
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="rightMenu">
              <RightMenu mode={"horizontal"} />
            </div>

            <Drawer
              title={"Tasks Manager"}
              placement="right"
              closable={true}
              onClose={showDrawer}
              open={visible}
              style={{ zIndex: 99999 }}
            >
              <RightMenu mode={"inline"} />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
