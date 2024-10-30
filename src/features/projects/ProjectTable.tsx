import useOwnerProjects from "./useOwnerProjects";
import Loading from "../../ui/Loading";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import ProjectRow from "./ProjectRow";
import axios from "axios";

function ProjectTable() {
  const { isLoading, fullProjectsInfo, error } = useOwnerProjects();

  if (error) {
    if (axios.isAxiosError(error)) {
      return (
        <p className="font-bold text-secondary-700">
          {" "}
          {error.response?.data?.message}.
        </p>
      );
    }
  }
  if (isLoading) return <Loading />;

  if (!fullProjectsInfo?.ownerProjects.length)
    return <Empty resourceName="پروژه" />;
  const { ownerProjects, projectsTags, projectsCategories, freelancers } =
    fullProjectsInfo;
  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>عنوان پروژه</th>
        <th>دسته بندی</th>
        <th>بودجه</th>
        <th>ددلاین</th>
        <th>تگ ها</th>
        <th>فریلنسر</th>
        <th>وضعیت</th>
        <th>عملیات</th>
        <th>درخواست ها</th>
      </Table.Header>
      <Table.Body>
        {ownerProjects.map((project, index) => {
          const tags = projectsTags.filter(
            (tag) => tag.project_id === project.id
          );
          const category = projectsCategories.find(
            (category) => category.id === project.categoryId
          );
          const freelancer = freelancers.find(
            (freelancer) => freelancer.id === project.freelancer
          );
          return (
            <ProjectRow
              key={project.id}
              project={project}
              tags={tags}
              category={category}
              freelancer={freelancer}
              index={index}
            />
          );
        })}
      </Table.Body>
    </Table>
  );
}
export default ProjectTable;
