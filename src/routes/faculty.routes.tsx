import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import MyCourses from "../pages/Faculty/MyCourses";


export const facultyPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <FacultyDashboard />
    },
    {
        name: "My Courses",
        path: "my-courses",
        element: <MyCourses />
    },

]