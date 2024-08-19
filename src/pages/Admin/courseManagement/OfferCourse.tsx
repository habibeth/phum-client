import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/Form/PHForm";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/Form/PHSelectWithWatch";
import { useState } from "react";
import PHInput from "../../../components/Form/PHInput";

const OfferCourse = () => {
    const [facultyId, setFacultyId] = useState('');
    console.log('Empty', facultyId)
    const { data: academicFacultyData } = useGetAllAcademicFacultiesQuery(undefined);

    const academicFacultyDataOption = academicFacultyData?.data?.map((item) => ({
        value: item._id,
        label: item.name,
    }))

    const onSubmit = () => {

    }
    return (
        <div>
            <Flex justify="center" align="center">
                <Col span={8}>
                    <PHForm onSubmit={onSubmit}>
                        <PHSelectWithWatch
                            onValueChange={setFacultyId}
                            name="academicFaculty"
                            label={"Academic Faculty"}
                            options={academicFacultyDataOption}
                        />
                        <PHInput disabled={!facultyId} type="text" label={`test`} name="test" />
                        <Button htmlType="submit">Submit</Button>
                    </PHForm>
                </Col>
            </Flex>
        </div>
    );
};

export default OfferCourse;