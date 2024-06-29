import { IMeta, IStudentEnrolledCourseMark } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const BASE_STUDENT_COURSE_MARKS = "/student-enrolled-course-marks";

const studentEnrollCourseMarkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    myMarks: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${BASE_STUDENT_COURSE_MARKS}/my-marks`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (
        response: IStudentEnrolledCourseMark[],
        meta: IMeta
      ) => {
        return {
          myMarks: response,
          meta,
        };
      },
      providesTags: [tagTypes.student],
    }),
    studentEnrolledCourseMarks: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${BASE_STUDENT_COURSE_MARKS}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (
        response: IStudentEnrolledCourseMark[],
        meta: IMeta
      ) => {
        return {
          studentEnrolledCourseMarks: response,
          meta,
        };
      },
      providesTags: [tagTypes.student],
    }),
    updateMarks: build.mutation({
      query: (data) => ({
        url: `${BASE_STUDENT_COURSE_MARKS}/update-marks`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.student],
    }),
    updateFinalMarks: build.mutation({
      query: (data) => ({
        url: `${BASE_STUDENT_COURSE_MARKS}/update-course-final-marks`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.student],
    }),
  }),
});

export const {
  useUpdateMarksMutation,
  useMyMarksQuery,
  useStudentEnrolledCourseMarksQuery,
  useUpdateFinalMarksMutation,
} = studentEnrollCourseMarkApi;

export default studentEnrollCourseMarkApi;
