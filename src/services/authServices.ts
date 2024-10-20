import http from "./httpServices";

export interface UserType {
  id: string;
  name: string;
  avatar: string;
  biography: string;
  email: string;
  phoneNumber: string;
  password: string;
  resetLink: string;
  isVerifiedPhoneNumber: 0 | 1;
  isActive: 0 | 1;
  status: 0 | 1 | 2;
  createdAt: Date;
  updatedAt: Date;
}
export interface returnGetOtp {
  statusCode: number;
  data: {
    message: string;
    expiresIn: number;
    phoneNumber: string;
  };
}
interface returnCheckOtp {
  statusCode: number;
  data: {
    message: string;
    user: UserType;
  };
}

export function getOpt(data: { phoneNumber: string }) {
  return http
    .post<returnGetOtp>("/user/get-otp", data)
    .then(({ data }) => data.data);
}
export function checkOpt(data: { otp: string; phoneNumber: string }) {
  return http
    .post<returnCheckOtp>("/user/check-otp", data)
    .then(({ data }) => data.data);
}
