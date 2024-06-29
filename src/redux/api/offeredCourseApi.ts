import { IMeta, IOfferedCourse } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const BASE_OFFERED_COURSES = "/offered-courses";

export const offeredCourseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    offeredCourses: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BASE_OFFERED_COURSES,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IOfferedCourse[], meta: IMeta) => {
        return {
          offeredCourses: response,
          meta,
        };
      },
      providesTags: [tagTypes.offeredCourse],
    }),
    offeredCourse: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BASE_OFFERED_COURSES}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.offeredCourse],
    }),
    addOfferedCourse: build.mutation({
      query: (data) => ({
        url: BASE_OFFERED_COURSES,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.offeredCourse],
    }),
    updateOfferedCourse: build.mutation({
      query: (data) => ({
        url: `${BASE_OFFERED_COURSES}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.offeredCourse],
    }),
    deleteOfferedCourse: build.mutation({
      query: (id) => ({
        url: `${BASE_OFFERED_COURSES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.offeredCourse],
    }),
  }),
});

export const {
  useOfferedCoursesQuery,
  useOfferedCourseQuery,
  useAddOfferedCourseMutation,
  useDeleteOfferedCourseMutation,
  useUpdateOfferedCourseMutation,
} = offeredCourseApi;
