import { useGetAllOfferedCourseQuery } from "../../redux/features/student/studentCourseManagement.api";


const OfferedCourse = () => {
    const { data } = useGetAllOfferedCourseQuery(undefined)
    console.log(data)
    return (
        <div>
            <h2>This is OfferedCourse Components</h2>
        </div>
    );
};

export default OfferedCourse;