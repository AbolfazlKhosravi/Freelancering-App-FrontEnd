import { UserType } from "./authServices";
import http from "./httpServices";


export interface ProjectType {
  id: number;
  title: string;
  description: string;
  status: "OPEN" | "CLOSED";
  budget: number;
  deadline: Date;
  owner: string;
  freelancer: string;
  updatedAt: Date;
  categoryId: number;
}
export interface ProjectsTags {
  id: number;
  type: string;
  project_id: number;
}
export interface CategoryType {
  id: number;
  title: string;
  englishTitle: string;
  description: string;
  type: string;
  parentId: number;
  icon_sm: string;
  icon_lg: string;
}
// export interface ProposalType {
//   id: number;
//   projectId: number;
//   price: number;
//   duration: number;
//   userId: string;
//   status: 0 | 1 | 2;
//   createdAt: Date;
// }

interface OwnerProjects {
  statusCode: number;
  data: {
    fullProjectsInfo: {
      ownerProjects: ProjectType[];
      projectsTags: ProjectsTags[];
      projectsCategories: CategoryType[];
      freelancers: UserType[];
    };
  };
}

export function getOwnerProjectsApi() {
  return http.get<OwnerProjects>("/project/owner-projects").then(({ data }) => data.data);
}