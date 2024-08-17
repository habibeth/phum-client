import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";

export type TTable = Pick<TStudent, "fullName" | "id" | "email" | "contactNo">

const StudentData = () => {
    const [page, setPage] = useState(1)
    const [params, setParams] = useState<TQueryParam[]>([])
    const { data: studentData, isLoading, isFetching } = useGetAllStudentsQuery([{ name: 'limit', value: 10 }, { name: 'page', value: page }, { name: 'sort', value: 'id' }, ...params]);
    console.log(studentData?.data)
    const metaData = studentData?.meta

    const tableData = studentData?.data?.map(({ _id, fullName, id, email, contactNo }) => ({
        key: _id,
        fullName,
        id,
        email,
        contactNo
    }))

    const columns: TableColumnsType<TTable> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'fullName',
        },
        {
            title: 'Roll No.',
            key: 'id',
            dataIndex: 'id',
        },
        {
            title: 'Email.',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Contact No.',
            key: 'contactNo',
            dataIndex: 'contactNo',
        },
        {
            title: 'Action',
            key: 'x',
            render: (item) => {
                console.log(item)
                return (
                    <Space className="">
                        <Link to={`/admin/student-data/${item.key}`}>
                            <Button>Details</Button>
                        </Link>
                        <Button>Update</Button>
                        <Button>Block</Button>
                    </Space>
                )

            },
            width: '1%'
        },

    ];



    const onChange: TableProps<TTable>['onChange'] = (_pagination, filters, _sorter, extra) => {
        // console.log([extra, filters])
        if (extra?.action === 'filter') {
            const queryParams: TQueryParam[] = [];
            filters.fullName?.forEach(item => (
                queryParams.push({ name: 'name', value: item })
            ))
            filters.year?.forEach(item => (
                queryParams.push({ name: 'year', value: item })
            ))
            setParams(queryParams)
        }
    };
    if (isLoading) {
        return <p>Loading!!!</p>
    }
    return (
        <>
            <Table
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                pagination={false}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />
            <Pagination
                align="end"
                current={page}
                onChange={(value) => setPage(value)}
                pageSize={metaData?.limit}
                total={metaData?.total}
            />
        </>
    );
};

export default StudentData;