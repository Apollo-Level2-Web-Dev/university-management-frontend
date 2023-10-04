import { IMeta, ISemesterRegistration } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const BASE_SEMESTER_REGISTRATION = "/semester-registrations";
export const semesterRegistrationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    semesterRegistrations: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BASE_SEMESTER_REGISTRATION,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ISemesterRegistration[], meta: IMeta) => {
        return {
          semesterRegistrations: response,
          meta,
        };
      },
      providesTags: [tagTypes.semesterRegistration],
    }),
    semesterRegistration: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BASE_SEMESTER_REGISTRATION}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.semesterRegistration],
    }),
    addSemesterRegistrations: build.mutation({
      query: (data) => ({
        url: BASE_SEMESTER_REGISTRATION,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.semesterRegistration],
    }),
    updateSemesterRegistrations: build.mutation({
      query: (data) => ({
        url: `${BASE_SEMESTER_REGISTRATION}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.semesterRegistration],
    }),
    deleteSemesterRegistrations: build.mutation({
      query: (id) => ({
        url: `${BASE_SEMESTER_REGISTRATION}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.semesterRegistration],
    }),
  }),
});

export const {
  useSemesterRegistrationsQuery,
  useSemesterRegistrationQuery,
  useAddSemesterRegistrationsMutation,
  useDeleteSemesterRegistrationsMutation,
  useUpdateSemesterRegistrationsMutation,
} = semesterRegistrationApi;

export default semesterRegistrationApi;
