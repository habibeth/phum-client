import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/Form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/Form/PHSelect";
import { semesterOptions } from "../../../constant/semester";
import { monthsName } from "../../../constant/globals";
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from "../../../schemas/academicManagement.schemas";
import { toast } from "sonner";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types/global";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map(number => (
    {
        value: currentYear + number + '',
        label: currentYear + number + ''
    }
))


const CreateAcademicSemester = () => {
    const [createAcademicSemester] = useCreateAcademicSemesterMutation()
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating ....')
        const name = semesterOptions[Number(data?.name) - 1]?.label;
        const code = data?.name;
        const year = data?.year
        const startMonth = data?.startMonth
        const endMonth = data?.endMonth
        const semesterData = {
            name,
            code,
            year,
            startMonth,
            endMonth
        }
        try {
            console.log(semesterData)
            const res = await createAcademicSemester(semesterData) as TResponse;
            if (res?.error) {
                toast.error(res?.error?.data?.message, { id: toastId })
            }
            else {
                toast.success("Semester Created Successfully!", { id: toastId })
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
                <PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
                    <PHSelect name="name" label={"Semester Name"} options={semesterOptions} />
                    <PHSelect name="year" label={"Semester Year"} options={yearOptions} />
                    <PHSelect name="startMonth" label={"Semester Start Month"} options={monthsName} />
                    <PHSelect name="endMonth" label={"Semester End Month"} options={monthsName} />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>

    );
};

export default CreateAcademicSemester;