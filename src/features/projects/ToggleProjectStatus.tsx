import { ProjectType } from "../../services/projectSrvice";
import Loading from "../../ui/Loading";
import Toggle from "../../ui/Toggle";
import useToggleProjectStatus from "./useToggleprojectStatus";

interface ToggleProjectStatus {
  project: ProjectType
}
function ToggleProjectStatus({ project }:ToggleProjectStatus) {
  const { status } = project;
  const { isUpdating, toggleProjectStatus } = useToggleProjectStatus();

  const toggleHandler = () => {
    const newStatus = status === "OPEN" ? "CLOSED" : "OPEN";
    toggleProjectStatus({
      id: project.id,
      data: { status: newStatus },
    });
  };
  return (
    <div className="w-[5rem]">
      {isUpdating ? (
        <Loading height={20} width={50} />
      ) : (
        <Toggle
          enabled={status === "OPEN" ? true : false}
          label={status === "OPEN" ? "باز" : "بسته"}
          onChange={toggleHandler}
        />
      )}
    </div>
  );
}

export default ToggleProjectStatus;
