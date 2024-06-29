import { IMeta, IOfferedCourseSection } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const BASE_OFFERED_COURSES_SECTION = "/offered-course-sections";

const offeredCourseSectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    offeredCourseSections: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BASE_OFFERED_COURSES_SECTION,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IOfferedCourseSection[], meta: IMeta) => {
        return {
          offeredCourseSections: response,
          meta,
        };
      },
      providesTags: [tagTypes.offeredCourseSection],
    }),
    offeredCourseSection: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BASE_OFFERED_COURSES_SECTION}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.offeredCourseSection],
    }),
    addOfferedCourseSection: build.mutation({
      query: (data) => ({
        url: BASE_OFFERED_COURSES_SECTION,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.offeredCourseSection],
    }),
    updateOfferedCourseSection: build.mutation({
      query: (data) => ({
        url: `${BASE_OFFERED_COURSES_SECTION}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.offeredCourseSection],
    }),
    deleteOfferedCourseSection: build.mutation({
      query: (id) => ({
        url: `${BASE_OFFERED_COURSES_SECTION}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.offeredCourseSection],
    }),
  }),
});

export const {
  useOfferedCourseSectionsQuery,
  useOfferedCourseSectionQuery,
  useAddOfferedCourseSectionMutation,
  useDeleteOfferedCourseSectionMutation,
  useUpdateOfferedCourseSectionMutation,
} = offeredCourseSectionApi;

export default offeredCourseSectionApi;
