import http from "./httpServices";
import { CategoryType } from "./projectSrvice";

interface CategoryApi {
  statusCode: number;
  data: {
    categories:CategoryType[]
  };
}
export function getCategoryApi() {
  return http.get<CategoryApi>("/category/list").then(({ data }) => data.data);
}