import { useGetAllEnrolledCourseQuery } from "../../redux/features/student/studentCourseManagement.api";


const EnrolledCourse = () => {
    const { data: enrolledCoursesData } = useGetAllEnrolledCourseQuery(undefined);

    console.log(enrolledCoursesData)
    return (
        <div>
            <div>
                {enrolledCoursesData?.data?.map((item: any) => {
                    return (
                        <div>
                            <div>{item.course.title}</div>
                            <div>{item.offeredCourse.section}</div>
                            <div>
                                {item.offeredCourse.days.map((item: any) => (
                                    <span> {item}</span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EnrolledCourse;