import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types/academicManagement.types";
import { useState } from "react";
import { TQueryParam } from "../../../types";

export type TTable = Pick<TAcademicSemester, "name" | "year" | "startMonth" | "endMonth">

const AcademicSemester = () => {
    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)
    const { data: semesterData, isLoading, isFetching } = useGetAllSemestersQuery(params);
    // console.log(semesterData?.data)

    const tableData = semesterData?.data?.map(({ _id, name, startMonth, endMonth, year }) => ({
        key: _id,
        name,
        startMonth,
        endMonth,
        year
    }))

    const columns: TableColumnsType<TTable> = [
        {
            title: 'Name',
            dataIndex: 'name',
            showSorterTooltip: { target: 'full-header' },
            filters: [
                {
                    text: 'Autumn',
                    value: 'Autumn',
                },
                {
                    text: 'Summer',
                    value: 'Summer',
                },
                {
                    text: 'Fall',
                    value: 'Fall',
                },
            ],
        },
        {
            title: 'Year',
            dataIndex: 'year',
            filters: [
                {
                    text: '2024',
                    value: '2024',
                },
                {
                    text: '2025',
                    value: '2025',
                },
                {
                    text: '2026',
                    value: '2026',
                },
            ],
        },
        {
            title: 'Start Month',
            dataIndex: 'startMonth',
        },
        {
            title: 'End Month',
            dataIndex: 'endMonth',
        },
        {
            title: 'Action',
            key: 'x',
            render: () => {
                return <div className="">
                    <Button>Update</Button>
                </div>
            }
        },

    ];



    const onChange: TableProps<TTable>['onChange'] = (pagination, filters, sorter, extra) => {
        // console.log([extra, filters])
        if (extra?.action === 'filter') {
            const queryParams: TQueryParam[] = [];
            filters.name?.forEach(item => (
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
        <Table
            loading={isFetching}
            columns={columns}
            dataSource={tableData}
            onChange={onChange}
            showSorterTooltip={{ target: 'sorter-icon' }}
        />
    );
};

export default AcademicSemester;



