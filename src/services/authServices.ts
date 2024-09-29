import { AxiosResponse } from "axios";
import http from "./httpServices";

interface ReturnRequestType {
  message: string;
}

export function getOpt(data: {
  phoneNumber: string;
}): Promise<AxiosResponse<ReturnRequestType>> {
  return http.post<ReturnRequestType>("/user/get-otp", data);
}
export function checkOpt(data: {
  otp: string;
}): Promise<AxiosResponse<ReturnRequestType>> {
  return http.post<ReturnRequestType>("/user/check-otp", data);
}

