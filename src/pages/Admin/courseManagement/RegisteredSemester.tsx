import { Button, Dropdown, Space, Table, TableColumnsType, Tag } from "antd";
import { useGetAllSemesterRegistrationQuery, useUpdateSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { TSemesterRegistration } from "../../../types/courseManagement.type";
import { useState } from "react";


export type TTableData = Pick<TSemesterRegistration, 'startDate' | 'endDate' | 'status'>;

const items = [
    {
        label: 'Upcoming',
        key: 'UPCOMING'
    },
    {
        label: 'Ongoing',
        key: 'ONGOING'
    },
    {
        label: 'Ended',
        key: 'ENDED'
    },
]


const RegisteredSemester = () => {
    const [semesterId, setSemesterId] = useState('');

    const [updateSemesterRegistration] = useUpdateSemesterRegistrationMutation()

    const { data: semesterData, isLoading, isFetching } = useGetAllSemesterRegistrationQuery([
        { name: 'sort', value: 'startDate' }
    ]);

    const tableData = semesterData?.data?.map(({ _id, academicSemester, startDate, endDate, status }) => ({
        key: _id,
        name: `${academicSemester?.name} ${academicSemester?.year}`,
        startDate: moment(new Date(startDate)).format('DD-MMMM-YYYY'),
        endDate: moment(new Date(endDate)).format('DD-MMMM-YYYY'),
        status
    }))

    const handleStatusUpdate = (data) => {
        const updateData = {
            id: semesterId,
            data: {
                status: data.key
            }
        }
        updateSemesterRegistration(updateData)
        console.log(updateData)
    }

    const menuProps = {
        items,
        onClick: handleStatusUpdate
    }

    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (item) => {
                let color;
                if (item === 'UPCOMING') {
                    color = "blue"
                }
                if (item === 'ONGOING') {
                    color = "green"
                }
                if (item === 'ENDED') {
                    color = "red"
                }
                return <Tag color={color}>{item}</Tag>
            }
        },
        {
            title: 'Start Date',
            key: 'startDate',
            dataIndex: 'startDate',
        },
        {
            title: 'End Date',
            key: 'endDate',
            dataIndex: 'endDate',
        },

        {
            title: 'Action',
            key: 'x',
            render: (item) => {
                return (
                    <Dropdown menu={menuProps} trigger={['click']}>
                        <Button onClick={() => setSemesterId(item.key)}>
                            Update
                        </Button>
                    </Dropdown>
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

export default RegisteredSemester;



