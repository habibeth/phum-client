import { Layout, Menu } from "antd";
import { adminPaths } from "../../routes/admin.routes";
import { sidebarGenerator } from "../../utils/sidebarGenerator";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
const { Sider } = Layout;


const userRole = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
}


const Sidebar = () => {
    const token = useAppSelector(useCurrentToken);
    let user;

    if (token) {
        user = verifyToken(token)
    }


    let sidebarItems;

    switch ((user as TUser)!.role) {
        case userRole.ADMIN:
            sidebarItems = sidebarGenerator(adminPaths, userRole.ADMIN)
            break;

        case userRole.FACULTY:
            sidebarItems = sidebarGenerator(facultyPaths, userRole.FACULTY)
            break;

        case userRole.STUDENT:
            sidebarItems = sidebarGenerator(studentPaths, userRole.STUDENT)
            break;

        default:
            break;
    }
    return (
        <Sider
            style={{ height: '100vh', position: 'sticky', top: '0', left: '0' }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                // console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div style={{ color: "white", textAlign: "center", height: "4rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1>PH University</h1>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={sidebarItems} />
        </Sider>
    );
};

export default Sidebar;