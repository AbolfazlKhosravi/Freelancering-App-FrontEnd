import { AxiosResponse } from "axios";
import http from "./httpServices";

interface ReturnRequestType {
  message: string;
}

interface retuerGetOtp {
  statusCode: number,
  data: {
    message: string,
    expiresIn: number,
    phoneNumber:string,
  },
}

export function getOpt(data: {
  phoneNumber: string;
}) {
  return http.post<retuerGetOtp>("/user/get-otp", data).then(({data})=>data.data);
}
export function checkOpt(data: {
  otp: string;
}): Promise<AxiosResponse<ReturnRequestType>> {
  return http.post<ReturnRequestType>("/user/check-otp", data);
}

