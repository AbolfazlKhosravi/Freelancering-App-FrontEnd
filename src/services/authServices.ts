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
export interface UserFullInfo {
  user: UserType;
  otp: {
    id: string;
    code: number;
    expiresIn: Date;
  };
  roles: {
    id: number;
    title: string;
    user_id: string;
  }[];
}
export interface ReturnGetOtp {
  statusCode: number;
  data: {
    message: string;
    expiresIn: number;
    phoneNumber: string;
  };
}
interface ReturnCheckOtp {
  statusCode: number;
  data: {
    message: string;
    userFullInfo: UserFullInfo;
  };
}

interface ReturnCompleteProfile {
  statusCode: number;
  data: {
    message: string;
    userFullInfo: UserFullInfo;
  };
}

interface ReturnGetUser {
  statusCode: number;
  data: {
    user: UserFullInfo;
  };
}

export function getOpt(data: { phoneNumber: string }) {
  return http
    .post<ReturnGetOtp>("/user/get-otp", data)
    .then(({ data }) => data.data);
}
export function checkOpt(data: { otp: string; phoneNumber: string }) {
  return http
    .post<ReturnCheckOtp>("/user/check-otp", data)
    .then(({ data }) => data.data);
}

export function completeProfile(data: {
  name: string;
  email: string;
  role: number;
}) {
  return http
    .post<ReturnCompleteProfile>("/user/complete-profile", data)
    .then(({ data }) => data.data);
}
export function getUser() {
  return http.get<ReturnGetUser>("/user/profile").then(({ data }) => data.data);
}
