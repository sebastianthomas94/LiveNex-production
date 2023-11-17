import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "user/signup",
        method: "post",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: "user/logout",
        method: "get",
      }),
    }),
    signin: builder.mutation({
      query: (data) => ({
        url: "user/signin",
        method: "post",
        body: data,
      }),
    }),
    sentReply: builder.mutation({
      query: (data) => ({
        url: "user/reply",
        method: "post",
        body: data,
      }),
    }),
    isSubscribed: builder.mutation({
      query: () => ({
        url: "user/issubscribed",
        method: "get",
      }),
    }),
    razporpay: builder.mutation({
      query: (params) => ({
        url: "user/razor/orders",
        method: "get",
        params,
      }),
    }),
    razporPaySuccess: builder.mutation({
      query: (data) => ({
        url: "user/razor/success",
        method: "post",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "user/admin/login",
        method: "post",
        body: data,
      }),
    }),
    getUsers: builder.mutation({
      query: () => ({
        url: "user/admin/getusers",
        method: "get",
      }),
    }),
    setLiveData: builder.mutation({
      query: (data) => ({
        url: "user/setlivedata",
        method: "post",
        body: data,
      }),
    }),
    getPastLives: builder.mutation({
      query: () => ({
        url: "user/getpastlives",
        method: "get",
      }),
    }),
    deleteUser: builder.mutation({
      query: (_id) => ({
        url: "user/admin/deleteuser",
        method: "get",
        params: {
          _id,
        },
      }),
    }),
    createTicket: builder.mutation({
      query: (params) => ({
        url: "user/createticket",
        method: "get",
        params: params,
      }),
    }),
    getTickets: builder.mutation({
      query: () => ({
        url: "user/gettickets",
        method: "get",
      }),
    }),
    getAllTickets: builder.mutation({
      query: () => ({
        url: "user/admin/getalltickets",
        method: "get",
      }),
    }),
    sentTicketReply: builder.mutation({
      query: (data) => ({
        url: "user/admin/sentticketreply",
        method: "post",
        body: data,
      }),
    }),
    getSubscriptionDetails: builder.mutation({
      query: () => ({
        url: "user/getSubscriptionDetails",
        method: "get",
      }),
    }),
    sentScheduleInfo: builder.mutation({
      query: (data) => ({
        url: "user/scheduleinfoupdate",
        method: "post",
        body: data,
      }),
    }),
    getUpcomingLives: builder.mutation({
      query: () => ({
        url: "user/getUpcomingLives",
        method: "get",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLogoutMutation,
  useSigninMutation,
  useSentReplyMutation,
  useIsSubscribedMutation,
  useRazporpayMutation,
  useRazporPaySuccessMutation,
  useLoginMutation,
  useGetUsersMutation,
  useSetLiveDataMutation,
  useGetPastLivesMutation,
  useDeleteUserMutation,
  useCreateTicketMutation,
  useGetTicketsMutation,
  useGetAllTicketsMutation,
  useSentTicketReplyMutation,
  useGetSubscriptionDetailsMutation,
  useSentScheduleInfoMutation,
  useGetUpcomingLivesMutation,
} = userApiSlice;
