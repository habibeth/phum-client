import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/Form/PHForm";
import { academicFacultySchema } from "../../../schemas/academicManagement.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import PHSelect from "../../../components/Form/PHSelect";
import { facultyOptions } from "../../../constant/faculty";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types";

type TFacultyData = {
    name: string
}

const CreateAcademicFaculty = () => {
    const [createAcademicFaculty] = useCreateAcademicFacultyMutation()
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating ....')
        const name = data.name
        const facultyData = {
            name
        }
        console.log(facultyData)
        try {
            const res = await createAcademicFaculty(facultyData) as TResponse<TFacultyData>;
            if (res?.error) {
                toast.error(res?.error?.data?.errorSources[0]?.message, { id: toastId })
            }
            else {
                toast.success("Faculty is Created Successfully!", { id: toastId })
            }
            // toast.success("Semester Create Successfully!")
            console.log(res)
        } catch (error) {
            toast.error("Something Went Wrong!!!!!!!!!!!!!!!!!!!!", { id: toastId })
        }
    }
    return (
        <Flex justify="center" align="center">
            <Col span={8}>
                <PHForm onSubmit={onSubmit} resolver={zodResolver(academicFacultySchema)}>
                    <PHSelect name="name" label={"Faculty Name"} options={facultyOptions} />
                    <Button htmlType="submit">Create Faculty</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicFaculty;