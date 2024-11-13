import { ProjectType } from "../../services/projectSrvice";

interface ToggleProjectStatus {
  project: ProjectType
}
function ToggleProjectStatus({ project }:ToggleProjectStatus) {
  const { status } = project;
  // const { isUpdating, toggleProjectStatus } = useToggleProjectStatus();

  return (
    <div className="w-[5rem]">
      <div className="flex items-center gap-x-2">
        <div
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
        >
          <span
            className={` inline-block h-4 w-4 transform rounded-full bg-secondary-0 transition-transform`}
          />
          {status==="OPEN"?"باز":"بسته"}
        </div>
      </div>
    </div>
  );
}

export default ToggleProjectStatus;
