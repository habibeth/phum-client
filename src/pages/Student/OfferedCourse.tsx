import { Button, Col, Row } from "antd";
import { useEnrollCourseMutation, useGetAllOfferedCourseQuery } from "../../redux/features/student/studentCourseManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type TCourse = {
    [idex: string]: any
}

const OfferedCourse = () => {
    const { data: offeredCoursesData } = useGetAllOfferedCourseQuery(undefined);
    const [enrollCourse] = useEnrollCourseMutation()
    // console.log(data)

    const singleObject = offeredCoursesData?.data?.reduce((acc: TCourse, item) => {
        const key = item.course.title
        acc[key] = acc[key] || { courseTitle: key, sections: [] }

        acc[key].sections.push({
            section: item.section,
            _id: item._id,
            days: item.days,
            startTime: item.startTime,
            endTime: item.endTime
        })
        return acc;
    }, {})
    const modifiedData = Object.values(singleObject ? singleObject : {})

    if (!modifiedData.length) {
        return <p>No Available Course Data </p>
    }

    const handleEnroll: SubmitHandler<FieldValues> = async (data) => {
        const enrolledData = {
            offeredCourse: data
        }

        const result = await enrollCourse(enrolledData);
        if (result.data?.success) {
            toast.success(result.data?.message)
        }

    }
    return (
        <Row gutter={[0, 20]}>
            {
                modifiedData.map((item) => {
                    return (
                        <Col span={24} style={{ border: 'solid #d4d4d4 2px' }}>
                            <div className="">
                                <h2 style={{ padding: '10px' }}>{item.courseTitle}</h2>
                            </div>
                            <div className="">
                                {
                                    item?.sections?.map((section: TCourse) => {
                                        return (
                                            <Row justify={'space-between'} align="middle" style={{ borderTop: 'solid #d4d4d4 2px', padding: '10px' }}>
                                                <Col span="5">Section: {section.section}</Col>
                                                <Col span="5">
                                                    Days: {' '}
                                                    {
                                                        section.days.map((day) => (
                                                            <span> {day} </span>
                                                        ))
                                                    }
                                                </Col>
                                                <Col span="5">Start Time: {section.startTime}</Col>
                                                <Col span="5">End Time: {section.endTime}</Col>
                                                <Button onClick={() => handleEnroll(section._id)}>
                                                    Enroll
                                                </Button>
                                            </Row>
                                        )
                                    })
                                }
                            </div>
                        </Col>

                    )
                })
            }
        </Row>
    );
};

export default OfferedCourse;