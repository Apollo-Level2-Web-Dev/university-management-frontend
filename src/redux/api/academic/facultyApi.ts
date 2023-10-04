import { IAcademicFaculty, IMeta } from "@/types";

import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";

const ACADEMIC_FACULTY_URL = "/academic-faculties";

export const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic faculties api endpoint
    academicFaculties: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ACADEMIC_FACULTY_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAcademicFaculty[], meta: IMeta) => {
        return {
          academicFaculties: response,
          meta,
        };
      },
      providesTags: [tagTypes.academicFaculty],
    }),
    // get single academic faculty by id api endpoint
    academicFaculty: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ACADEMIC_FACULTY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.academicFaculty],
    }),
    // create academic faculty api endpoint
    addAcademicFaculty: build.mutation({
      query: (data) => ({
        url: ACADEMIC_FACULTY_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.academicFaculty],
    }),
    // update academic faculty api endpoint
    updateAcademicFaculty: build.mutation({
      query: (data) => ({
        url: `${ACADEMIC_FACULTY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.academicFaculty],
    }),
    // delete academic faculty api endpoint
    deleteAcademicFaculty: build.mutation({
      query: (id) => ({
        url: `${ACADEMIC_FACULTY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.academicFaculty],
    }),
  }),
});

export const {
  useAddAcademicFacultyMutation, // create ac faculty hook
  useAcademicFacultiesQuery, // get all faculties hook
  useAcademicFacultyQuery, // get single faculty hook
  useUpdateAcademicFacultyMutation, // update existing faculty hook
  useDeleteAcademicFacultyMutation, // delete existing faculty hook
} = academicFacultyApi;
