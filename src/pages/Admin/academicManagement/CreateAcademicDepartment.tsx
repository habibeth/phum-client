import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/Form/PHForm";
import PHSelect from "../../../components/Form/PHSelect";
import { academicDepartmentSchema, academicFacultySchema } from "../../../schemas/academicManagement.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { facultyOptions } from "../../../constant/faculty";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { departmentOptions } from "../../../constant/department";
import { useState } from "react";
import { TQueryParam, TResponse } from "../../../types";
import { useCreateAcademicDepartmentMutation, useGetAllFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";

type TDepartment = {
    name: string;
    academicFaculty: string
}

const CreateAcademicDepartment = () => {
    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)
    const { data: facultyData } = useGetAllFacultyQuery(params);
    const [createAcademicDepartment] = useCreateAcademicDepartmentMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating ....')
        const name = data.name
        try {
            const academicFaculties = facultyData?.data?.find(faculty => faculty?.name === data.academicFaculty)
            const departmentData = {
                name,
                academicFaculty: academicFaculties?._id
            }
            if (academicFaculties) {
                const result = await createAcademicDepartment(departmentData) as TResponse<TDepartment>

                if (result?.error) {
                    toast.error(result?.error?.data?.errorSources[0]?.message, { id: toastId })
                }
                else {
                    toast.success("Department is Created Successfully!", { id: toastId })
                }
            }
            else {
                toast.error("Faculty does not exists!", { id: toastId })
            }
        } catch (error) {
            toast.error("Something Went Wrong!", { id: toastId })
        }
    }
    return (
        <div>
            <Flex justify="center" align="center">
                <Col span={8}>
                    <PHForm onSubmit={onSubmit} resolver={zodResolver(academicDepartmentSchema)}>
                        <PHSelect name="academicFaculty" label={"Faculty Name"} options={facultyOptions} />
                        <PHSelect name="name" label={"Department Name"} options={departmentOptions} />
                        <Button htmlType="submit">Create Department</Button>
                    </PHForm>
                </Col>
            </Flex>
        </div>
    );
};

export default CreateAcademicDepartment;