export interface GenericAPIResponse<T> {
  status: "success" | "fail" | "error";
  data?: T;
  message?: string;
  [key: string]: any;
}
