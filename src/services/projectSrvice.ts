import { CreateProject } from "../features/projects/CreateProjectForm";
import { UserType } from "./authServices";
import http from "./httpServices";

export interface ProjectType {
  id: string;
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
  project_id: string;
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
//   projectId: string;
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

interface RemoveOwnerProject {
  statusCode: number;
  data: {
    message: string;
  };
}

interface CreateProjectApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export function getOwnerProjectsApi() {
  return http
    .get<OwnerProjects>("/project/owner-projects")
    .then(({ data }) => data.data);
}

export function removeOwnerProjectApi(id: string) {
  return http.delete<RemoveOwnerProject>(`/project/${id}`).then(({ data }) => data.data);
}

export function createProjectApi(data:CreateProject) {
  return http.post<CreateProjectApi>(`/project/add`, data).then(({ data }) => data.data);
}
