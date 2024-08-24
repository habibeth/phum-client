import { TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const facultyCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllFacultiesCourse: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/enrolled-courses',
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['OfferedCourse'],
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        updateCourseMarks: builder.mutation({
            query: (data) => ({
                url: '/enrolled-courses/update-enrolled-course',
                method: 'PATCH',
                body: data,
            })
        }),
    })
})


export const {
    useGetAllFacultiesCourseQuery,
    useUpdateCourseMarksMutation
}: any = facultyCourseApi