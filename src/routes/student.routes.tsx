import EnrolledCourse from "../pages/Student/EnrolledCourse";
import OfferedCourse from "../pages/Student/OfferedCourse";
import StudentDashboard from "../pages/Student/StudentDashboard";

export const studentPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <StudentDashboard />
    },
    {
        name: "Offered Course",
        path: "offered-course",
        element: <OfferedCourse />
    },
    {
        name: "Enrolled Courses",
        path: "enroll-course",
        element: <EnrolledCourse />
    },

]