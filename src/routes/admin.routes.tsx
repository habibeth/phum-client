import AcademicSemester from "../pages/Admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/Admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/Admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/Admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Courses from "../pages/Admin/courseManagement/Courses";
import CreateCourse from "../pages/Admin/courseManagement/CreateCourse";
import OfferCourse from "../pages/Admin/courseManagement/OfferCourse";
import OfferedCourses from "../pages/Admin/courseManagement/OfferedCourses";
import RegisteredSemester from "../pages/Admin/courseManagement/RegisteredSemester";
import SemesterRegistration from "../pages/Admin/courseManagement/SemesterRegistration";
import CreateAdmin from "../pages/Admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/Admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/Admin/userManagement/CreateStudent";
import StudentData from "../pages/Admin/userManagement/StudentData";
import StudentDetails from "../pages/Admin/userManagement/StudentDetails";


// type TRoute = {
//     path: string,
//     element: ReactNode;
// }

// type TSideBarItems = {
//     key: string;
//     label: ReactNode;
//     children?: TSideBarItems[];
// }

export const adminPaths = [
    {
        name: "Dashboard",
        path: 'dashboard',
        element: <AdminDashboard />
    },
    {
        name: "Academic Management",
        children: [
            {
                name: "Create A.Semester",
                path: 'create-academic-semester',
                element: <CreateAcademicSemester />
            },
            {
                name: "Create A.Faculty",
                path: 'create-academic-faculty',
                element: <CreateAcademicFaculty />
            },
            {
                name: "Create A.Department",
                path: 'create-academic-department',
                element: <CreateAcademicDepartment />
            },
            {
                name: "Academic Semester",
                path: 'academic-semester',
                element: <AcademicSemester />
            },


        ]
    },
    {
        name: "User Management",
        children: [
            {
                name: "Create Admin",
                path: 'create-admin',
                element: <CreateAdmin />
            },
            {
                name: "Create Faculty",
                path: 'create-faculty',
                element: <CreateFaculty />
            },
            {
                name: "Create Student",
                path: 'create-student',
                element: <CreateStudent />
            },
            {
                name: "Students",
                path: 'students-data',
                element: <StudentData />
            },
            {
                path: 'student-data/:studentId',
                element: <StudentDetails />
            },

        ]
    },
    {
        name: "Course Management",
        children: [
            {
                name: "Semester Registration",
                path: 'semester-registration',
                element: <SemesterRegistration />
            },
            {
                name: "Registered Semester",
                path: 'registered-semester',
                element: <RegisteredSemester />
            },
            {
                name: "Create Course",
                path: 'create-course',
                element: <CreateCourse />
            },
            {
                name: 'Courses',
                path: 'courses',
                element: <Courses />,
            },
            {
                name: 'Offer Course',
                path: 'offer-course',
                element: <OfferCourse />,
            },
            {
                name: 'Offered Courses',
                path: 'offered-courses',
                element: <OfferedCourses />,
            },
        ]
    },
]


// export const adminPaths = [
//     {
//         index: true,
//         element: <AdminDashboard />
//     },
//     {
//         path: 'dashboard',
//         element: <AdminDashboard />
//     },
//     {
//         path: 'create-student',
//         element: <CreateStudent />
//     },
//     {
//         path: 'create-faculty',
//         element: <CreateFaculty />
//     },
//     {
//         path: 'create-admin',
//         element: <CreateAdmin />
//     },
// ]

// export const adminRoutes = adminPaths.reduce((acc: TRoute[], items) => {
//     if (items.path && items.element) {
//         acc.push({
//             path: items.path,
//             element: items.element
//         })
//     }
//     if (items.children) {
//         items.children.forEach(child => {
//             acc.push({
//                 path: child.path,
//                 element: child.element
//             })
//         })
//     }

//     return acc;
// }, [])

// export const adminSideBarItems = adminPaths.reduce((acc: TSideBarItems[], items) => {
//     if (items.path && items.name) {
//         acc.push({
//             key: items.name,
//             label: <NavLink to={`/admin/${items.path}`}>{items.name}</NavLink>
//         })
//     }
//     if (items.children) {
//         acc.push({
//             key: items.name,
//             label: items.name,
//             children: items?.children?.map(child => ({

//                 key: child.name,
//                 label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>
//             }))
//         })
//     }

//     return acc;
// }, [])