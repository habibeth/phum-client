import { useParams } from "react-router-dom";
import { useGetAllFacultiesCourseQuery, useUpdateCourseMarksMutation } from "../../redux/features/faculty/facultyCourses.api";
import { Button, Modal, Table, } from "antd";
import PHForm from "../../components/Form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import PHInput from "../../components/Form/PHInput";
import { toast } from "sonner";

type TStudentCourse = {
    _id: string,
    student: any,
    semesterRegistration: any,
    offeredCourse: any
}


const MyStudents = () => {
    const { registrationId, courseId } = useParams();

    const { data: facultiesCoursesStudent } = useGetAllFacultiesCourseQuery([
        { name: 'semesterRegistration', value: registrationId },
        { name: 'course', value: courseId }
    ])

    // console.log(facultiesCoursesStudent)

    const tableData = facultiesCoursesStudent?.data?.map(({ _id, student, semesterRegistration, offeredCourse }: TStudentCourse) => ({
        key: _id,
        name: student.fullName,
        roll: student.id,
        student: student._id,
        semesterRegistration: semesterRegistration._id,
        offeredCourse: offeredCourse._id

    }))

    const columns = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',

        },

        {
            title: 'Roll',
            key: 'roll',
            dataIndex: 'roll',

        },
        {
            title: 'Action',
            key: 'x',
            render: (item: any) => {
                return (
                    <AddMarksModal studentInfo={item} />
                )
            }
        },

    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={tableData}
                // onChange={onChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />
        </div>
    );
};


const AddMarksModal = ({ studentInfo }: any) => {
    const [updateCourseMarks] = useUpdateCourseMarksMutation()
    const { student, semesterRegistration, offeredCourse } = studentInfo
    const [isModalOpen, setIsModalOpen] = useState(false);



    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const marksUpdateData = {
            semesterRegistration,
            offeredCourse,
            student,
            courseMarks: {
                classTest1: Number(data.classTest1),
                midTerm: Number(data.midTerm),
                classTest2: Number(data.classTest2),
                finalTerm: Number(data.finalTerm),
            }
        }

        const res = await updateCourseMarks(marksUpdateData);
        console.log(res)
        if (res?.data?.success) {
            toast.success(res?.data?.message)
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button onClick={showModal}>
                Update Marks
            </Button>
            <Modal title="Update Marks" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <PHForm onSubmit={handleSubmit}>
                    <PHInput type="text" name="classTest1" label="Class Test 1" />
                    <PHInput type="text" name="midTerm" label="Midterm" />
                    <PHInput type="text" name="classTest2" label="Class Test 2" />
                    <PHInput type="text" name="finalTerm" label="Final Terms" />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Modal>
        </>
    )
}

export default MyStudents;