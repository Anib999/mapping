import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";

export const SideBar = () => {
  const headerStyle = {
    padding: "24px",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "1px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "noWrap",
  };

  return (
    // collapsed={true}
    <ProSidebar>
      <SidebarHeader style={headerStyle}>Location Tracker</SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem>
            Current Location
            <Link to="/allColl" />
          </MenuItem>
          <MenuItem>
            History
            <Link to="/history" />
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};
