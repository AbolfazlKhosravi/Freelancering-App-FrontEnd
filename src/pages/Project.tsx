import ProjectHeader from "../features/project/ProjectHeader";
import ProposalsTable from "../features/project/ProposalsTable";
import useProject from "../features/project/useProject";
import Loading from "../ui/Loading";

function Project() {
  const { isLoading, project } = useProject();

  if (isLoading) return <Loading />;
  if (!project) return <div>چیزی یافت نشد</div>; 
  return (
    <div>
      <ProjectHeader project={project.projectInfo} />
      <ProposalsTable proposals={project.proposalList} />
    </div>
  );
}

export default Project