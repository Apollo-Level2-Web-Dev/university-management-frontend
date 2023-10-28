import { IMeta, IRoom } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

export const BASE_STUDENT_SEMESTER_PAYMENT = "/student-semester-payments";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    myPayments: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${BASE_STUDENT_SEMESTER_PAYMENT}/my-semester-payments`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IRoom[], meta: IMeta) => {
        return {
          myPayments: response,
          meta,
        };
      },
      providesTags: [tagTypes.payment],
    }),
    initialPayment: build.mutation({
      query: (data: any) => ({
        url: `${BASE_STUDENT_SEMESTER_PAYMENT}/initiate-payment`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.payment],
    }),
  }),
});

export const { useMyPaymentsQuery, useInitialPaymentMutation } = paymentApi;

export default paymentApi;
