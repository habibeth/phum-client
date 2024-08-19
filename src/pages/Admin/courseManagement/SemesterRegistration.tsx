import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/Form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/Form/PHSelect";
import { semesterStatusOptions } from "../../../constant/semester";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/Form/PHDatePicker";
import PHInput from "../../../components/Form/PHInput";
import { TResponse } from "../../../types";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import { toast } from "sonner";



// type TSemesterData = {
//     name: string;
//     code: string;
//     year: string;
//     startMonth: string;
//     endMonth: string;
// }


const SemesterRegistration = () => {
    const [addSemester] = useAddSemesterRegistrationMutation();
    const { data: academicSemester } = useGetAllSemestersQuery([
        { name: 'sort', value: "year" }
    ])


    const academicSemesterOption = academicSemester?.data?.map((item: any) => ({
        value: item._id,
        label: `${item.name} ${item.year}`
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating ....')

        const semesterData = {
            ...data,
            minCredit: Number(data.minCredit),
            maxCredit: Number(data.maxCredit),
        }
        // console.log(data)
        try {
            const res = await addSemester(semesterData) as TResponse<any>;
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
                <PHForm onSubmit={onSubmit}>
                    <PHSelect name="academicSemester" label={"Academic Semester"} options={academicSemesterOption} />
                    <PHSelect name="status" label={"Semester Status"} options={semesterStatusOptions} />
                    <PHDatePicker name="startDate" label="Semester Start Date" />
                    <PHDatePicker name="endDate" label="Semester End Date" />
                    <PHInput type="text" name="minCredit" label="Min Credit" />
                    <PHInput type="text" name="maxCredit" label="Max Credit" />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default SemesterRegistration;