import { TQueryParam, TResponseRedux } from "../../../types";
import { TCourse, TSemesterRegistration } from "../../../types/courseManagement.type";
import { baseApi } from "../../api/baseApi";


const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesterRegistration: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/semester-registrations',
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['semesterRegistration'],
            transformResponse: (response: TResponseRedux<TSemesterRegistration[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        addSemesterRegistration: builder.mutation({
            query: (data) => ({
                url: '/semester-registrations/create-semester-registration',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['semesterRegistration']
        }),
        updateSemesterRegistration: builder.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: 'PATCH',
                body: args.data,
            }),
            invalidatesTags: ['semesterRegistration']
        }),
        getAllCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string)
                    });
                }
                return {
                    url: '/courses',
                    method: 'GET',
                    params: params
                }
            },
            providesTags: ['courses'],
            transformResponse: (response: TResponseRedux<TCourse[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        addCourse: builder.mutation({
            query: (data) => ({
                url: '/courses/create-course',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['courses']
        }),
        addAssignFaculties: builder.mutation({
            query: (args) => ({
                url: `/courses/${args.courseId}/assign-faculties`,
                method: 'PUT',
                body: args.data,
            }),
            invalidatesTags: ['courses']
        }),
    })
})


export const {
    useAddSemesterRegistrationMutation,
    useGetAllSemesterRegistrationQuery,
    useUpdateSemesterRegistrationMutation,
    useGetAllCoursesQuery,
    useAddCourseMutation,
    useAddAssignFacultiesMutation
} = courseManagementApi