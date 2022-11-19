import { callApi } from "@/plugins/axios";

export const callPostCalendar = (key, data) => {
  return callApi(`/api/custom/${key}`, {
    method: "POST",
    data,
  });
};

export const callGetCalendar = (key) => {
  return callApi(`/api/custom/${key}`, {
    method: "GET",
  });
};
