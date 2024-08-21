import { TResponseRedux } from "../../../types";
import { TOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOfferedCourse: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/offered-courses/get-offered-courses',
                    method: 'GET',
                    params: params
                }
            },
            transformResponse: (response: TResponseRedux<TOfferedCourse[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        // addSemesterRegistration: builder.mutation({
        //     query: (data) => ({
        //         url: '/semester-registrations/create-semester-registration',
        //         method: 'POST',
        //         body: data,
        //     }),
        //     invalidatesTags: ['semesterRegistration']
        // }),
    })
})


export const {
    useGetAllOfferedCourseQuery
} = studentCourseApi