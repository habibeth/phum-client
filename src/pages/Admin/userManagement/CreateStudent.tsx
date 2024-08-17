
import PHForm from "../../../components/Form/PHForm";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/Form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/Form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constant/globals";
import PHDatePicker from "../../../components/Form/PHDatePicker";
import { useGetAllDepartmentQuery, useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";


const sDefaultValues = {
    "name": {
        "firstName": "Ahsan",
        "middleName": "Mukul",
        "lastName": "Habib"
    },
    "gender": "male",
    "email": "john.doe1234@gmail.com",
    "contactNo": "123-456-7890",
    "emergencyContactNo": "098-765-4321",
    "bloogGroup": "O+",
    "presentAddress": "1234 Elm Street, Springfield, IL",
    "permanentAddress": "5678 Oak Avenue, Springfield, IL",
    "guardian": {
        "fatherName": "James Doe",
        "fatherOccupation": "Engineer",
        "fatherContactNo": "123-456-7890",
        "motherName": "Jane Doe",
        "motherOccupation": "Teacher",
        "motherContactNo": "123-456-7890"
    },
    "localGuardian": {
        "name": "Emily Smith",
        "occupation": "Doctor",
        "contactNo": "123-456-7890",
        "address": "9101 Maple Lane, Springfield, IL"
    },
    "profileImage": "http://example.com/images/john_doe.jpg",
    "isActive": "Active",
    "admissionSemester": "66969869cefc49e191573818",
    "academicDepartment": "66598dcc046652b3af27b673",

}


const CreateStudent = () => {
    const [addStudent, { data, error }] = useAddStudentMutation();
    console.log({ data, error })
    const { data: sData, isLoading: sIsLoading } = useGetAllSemestersQuery(undefined);
    const { data: dData, isLoading: dIsLoading } = useGetAllDepartmentQuery(undefined, { skip: sIsLoading });
    const semesterOptions = sData?.data?.map(item => ({
        value: item._id,
        label: `${item.name} ${item.year}`
    }))
    const departmentOptions = dData?.data?.map(item => ({
        value: item._id,
        label: `${item.name}`
    }))
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        const studentData = {
            password: "student123",
            student: data,
        }
        const formData = new FormData();
        formData.append('data', JSON.stringify(studentData));
        formData.append('file', data?.image)

        addStudent(formData)


        console.log(Object.fromEntries(formData))
        // console.log([...formData.entries()])
    }
    return (
        <Row>
            <Col span={24}>
                <PHForm onSubmit={onSubmit} defaultValues={sDefaultValues}>
                    <Divider>Personal Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="name.firstName" label="First Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="name.middleName" label="Middle Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="name.lastName" label="Last Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect name="gender" label="Gender" options={genderOptions} />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHDatePicker name="dateOfBirth" label="Date Of Birth" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect name="bloogGroup" label="Blood Group" options={bloodGroupOptions} />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <Controller
                                name="image"
                                render={({ field: { onChange, value, ...field } }) => (
                                    <Form.Item label="Picture">
                                        <Input
                                            type="file"
                                            value={value?.fileName}
                                            {...field}
                                            onChange={(e) => onChange(e.target.files?.[0])}
                                        />
                                    </Form.Item>
                                )}
                            />
                        </Col>
                    </Row>
                    <Divider>Contact Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="email" label="Email Address" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="contactNo" label="Contact Number" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="emergencyContactNo" label="Emergency Contact Number" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="presentAddress" label="Present Address" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="permanentAddress" label="Permanent Address" />
                        </Col>
                    </Row>
                    <Divider>Guardian Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="guardian.fatherName" label="Father Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="guardian.fatherOccupation" label="Father Occupation" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="guardian.fatherContactNo" label="Father Contact Number" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="guardian.motherName" label="Mother Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="guardian.motherOccupation" label="Mother Occupation" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="guardian.motherContactNo" label="Mother Contact Number" />
                        </Col>
                    </Row>
                    <Divider>Local Guardian Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="localGuardian.name" label="Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="localGuardian.occupation"
                                label="Occupation"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="localGuardian.contactNo"
                                label="Contact No."
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="localGuardian.address"
                                label="Address"
                            />
                        </Col>
                    </Row>
                    <Divider>Academic Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect
                                options={semesterOptions}
                                disabled={sIsLoading}
                                name="admissionSemester"
                                label="Admission Semester"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect
                                options={departmentOptions}
                                disabled={dIsLoading}
                                name="academicDepartment"
                                label="Admission Department"
                            />
                        </Col>
                    </Row>
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Row>

    );
};

export default CreateStudent;