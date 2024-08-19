import { Button, Modal, Table, TableColumnsType } from "antd";
import { useAddAssignFacultiesMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { TCourse } from "../../../types/courseManagement.type";
import { useState } from "react";
import PHForm from "../../../components/Form/PHForm";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import PHSelect from "../../../components/Form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";



export type TTableData = Pick<TCourse, 'title' | 'code'>;

// const items = [
//     {
//         label: 'Upcoming',
//         key: 'UPCOMING'
//     },
//     {
//         label: 'Ongoing',
//         key: 'ONGOING'
//     },
//     {
//         label: 'Ended',
//         key: 'ENDED'
//     },
// ]


const Courses = () => {

    // const [updateSemesterRegistration] = useUpdateSemesterRegistrationMutation()

    const { data: coursesData, isLoading, isFetching } = useGetAllCoursesQuery([
        { name: 'sort', value: 'code' }
    ]);

    const tableData = coursesData?.data?.map(({ _id, title, prefix, code }) => ({
        key: _id,
        title,
        code: `${prefix}${code}`,
    }))

    // const handleAssignFaculties = (data: any) => {

    //     const updateData = {
    //         // id: semesterId,
    //         data: {
    //             status: data.key
    //         }
    //     }
    //     // updateSemesterRegistration(updateData)
    //     console.log(updateData)
    // }

    // const menuProps = {
    //     items,
    //     onClick: handleStatusUpdate
    // }

    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Course Title',
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: 'Course Code',
            key: 'code',
            dataIndex: 'code',
        },

        {
            title: 'Action',
            key: 'x',
            render: (item) => {
                return (
                    <AddFacultyModal data={item} />
                )
            }
        },

    ];



    // const onChange: TableProps<TTable>['onChange'] = (_pagination, _filters, _sorter, extra) => {
    //     // console.log([extra, filters])
    //     if (extra?.action === 'filter') {
    //         const queryParams: TQueryParam[] = [];
    //         filters.name?.forEach(item => (
    //             queryParams.push({ name: 'name', value: item })
    //         ))
    //         filters.year?.forEach(item => (
    //             queryParams.push({ name: 'year', value: item })
    //         ))
    //         setParams(queryParams)
    //     }
    // };
    if (isLoading) {
        return <p>Loading!!!</p>
    }
    return (
        <Table
            loading={isFetching}
            columns={columns}
            dataSource={tableData}
            // onChange={onChange}
            showSorterTooltip={{ target: 'sorter-icon' }}
        />
    );
};


const AddFacultyModal = ({ data }: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
    const [addFaculties] = useAddAssignFacultiesMutation();
    const facultiesOption = facultiesData?.data?.map((item) => ({
        value: item._id,
        label: item.fullName
    }))
    // console.log(facultiesData)
    const courseId = data.key

    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        const facultyData = {
            courseId,
            data
        }
        console.log(facultyData);
        addFaculties(facultyData);
        setIsModalOpen(false);
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
                Assign Faculties
            </Button>
            <Modal title="Assign Faculties" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <PHForm onSubmit={handleSubmit}>
                    <PHSelect mode="multiple" options={facultiesOption} name="faculties" label="Faculty Members Name" />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Modal>
        </>
    )
}

export default Courses;



