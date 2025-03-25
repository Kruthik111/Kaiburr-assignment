import { useNavigate } from "react-router";

// Icons

import {
  EditOutlined,
  OrderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={(event: any) => navigate(event.key)}
      defaultSelectedKeys={[window.location.pathname]}
      items={[
        {
          key: "/",
          icon: <OrderedListOutlined />,
          label: "View all tasks",
        },
        {
          key: "/create",
          icon: <PlusOutlined />,
          label: "Create Task",
        },
        {
          key: "/edit",
          icon: <EditOutlined />,
          label: "Modify Task",
        },
      ]}
    />
  );
};

export default Navbar;
