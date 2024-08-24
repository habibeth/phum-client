import { Button, Col, Flex } from "antd";
import { useGetAllFacultiesCourseQuery } from "../../redux/features/faculty/facultyCourses.api";
import PHForm from "../../components/Form/PHForm";
import PHSelect from "../../components/Form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";



const MyCourses = () => {
    const navigate = useNavigate()
    const { data: facultiesCoursesData } = useGetAllFacultiesCourseQuery(undefined);

    const semesterOptions = facultiesCoursesData?.data?.map(item => ({
        label: `${item.academicSemester.name} ${item.academicSemester.year}`,
        value: item.semesterRegistration._id
    }))


    const courseOptions = facultiesCoursesData?.data?.map(item => ({
        label: `${item.course.title}`,
        value: item.course._id
    }))

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        navigate(`/faculty/my-courses/${data.semesterRegistration}/${data.course}`)
    }

    return (
        <Flex justify="center" align="center">
            <Col span={6}>
                <PHForm onSubmit={onSubmit}>
                    <PHSelect name="semesterRegistration" label={"Semester Name"} options={semesterOptions} />
                    <PHSelect name="course" label={"Semester Name"} options={courseOptions} />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default MyCourses;
