import{createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    tagTypes: ["User"],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/', credentials: "include" }),
    endpoints: (builder) => ({})
});

