import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/Form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/Form/PHSelect";
import PHInput from "../../../components/Form/PHInput";
import { useAddCourseMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";



// type TSemesterData = {
//     name: string;
//     code: string;
//     year: string;
//     startMonth: string;
//     endMonth: string;
// }


const CreateCourse = () => {

    const [addCourse] = useAddCourseMutation();
    const { data: courses } = useGetAllCoursesQuery([
        { name: 'sort', value: "code" }
    ])

    const preRequisiteCoursesOption = courses?.data?.map((item: any) => ({
        value: item._id,
        label: `${item.title}`
    }));
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating ....')

        const courseData = {
            ...data,
            code: Number(data.code),
            credits: Number(data.credits),
            isDeleted: false,
            preRequisiteCourses: data.preRequisiteCourses ? data.preRequisiteCourses?.map((item: any) => ({
                course: item,
                isDeleted: false,
            })) : []
        }
        // console.log(courseData)
        try {
            const res = await addCourse(courseData) as TResponse<any>;
            if (res?.error) {
                toast.error(res?.error?.data?.message, { id: toastId })
            }
            else {
                toast.success("Course Created Successfully!", { id: toastId })
            }
            // toast.success("Semester Create Successfully!")
            console.log(res)
        } catch (error) {
            toast.error("Something Went Wrong!", { id: toastId })
        }
    }

    return (
        <Flex justify="center" align="center">
            <Col span={6}>
                <PHForm onSubmit={onSubmit}>
                    <PHInput type="text" name="title" label="Course Title" />
                    <PHInput type="text" name="prefix" label="Course Prefix" />
                    <PHInput type="text" name="code" label="Course Code" />
                    <PHInput type="text" name="credits" label="Course Credit" />
                    <PHSelect mode="multiple" name="preRequisiteCourses" options={preRequisiteCoursesOption} label="Pre Requisite Course" />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>

    );
};

export default CreateCourse;