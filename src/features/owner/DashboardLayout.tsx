import Stats from "./Stats";
import Loading from "../../ui/Loading";
import DashboardHeader from "../../ui/DashboardHeader";
import useBasicOwnerProjects from "./useBasicOwnerProjectsInfo";

function DashboardLayout() {
  const { isLoading, basicProjectsInfo } = useBasicOwnerProjects();

  if (isLoading) return <Loading />;
  if(!basicProjectsInfo) return;

  return (
    <div>
      <DashboardHeader />
      <Stats basicProjectsInfo={basicProjectsInfo} />
    </div>
  );
}
export default DashboardLayout;
