import { IFaculty, IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const BASE_FACULTY_API_URL = "/faculties";

export const facultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all faculty user endpoint
    faculties: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BASE_FACULTY_API_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IFaculty[], meta: IMeta) => {
        return {
          faculties: response,
          meta,
        };
      },
      providesTags: [tagTypes.faculty],
    }),
    // get single faculty user endpoint
    faculty: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BASE_FACULTY_API_URL}/profile/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faculty],
    }),
    // create faculty user endpoint
    addFacultyWithFormData: build.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.faculty],
    }),
    // update faculty user endpoint
    updateFaculty: build.mutation({
      query: (data) => ({
        url: `${BASE_FACULTY_API_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.faculty],
    }),
    // delete faculty user endpoint
    deleteFaculty: build.mutation({
      query: (id) => ({
        url: `${BASE_FACULTY_API_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faculty],
    }),
  }),
});

export const {
  useAddFacultyWithFormDataMutation, // create faculty user hook
  useFacultiesQuery, // get all faculty users hook
  useFacultyQuery, // get single faculty user hook
  useUpdateFacultyMutation, // update single faculty user hook
  useDeleteFacultyMutation, // delete single faculty user hook
} = facultyApi;
