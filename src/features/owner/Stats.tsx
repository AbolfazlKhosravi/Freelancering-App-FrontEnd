import {
  HiOutlineViewGrid,
  HiCurrencyDollar,
  HiCollection,
} from "react-icons/hi";
import Stat from "../../ui/Stat";
import { ProjectType } from "../../services/projectSrvice";

interface Stats {
  basicProjectsInfo: {
    ownerProjects: ProjectType[];
    proposalsCount: number;
  };
}

function Stats({ basicProjectsInfo }: Stats) {
  const numOfProjects = basicProjectsInfo.ownerProjects.length;
  const numOfAcceptedProjects = basicProjectsInfo.ownerProjects.filter(
    (p) => p.freelancer
  ).length;
  const numOfProposals = basicProjectsInfo.proposalsCount;

  return (
    <div className="grid grid-cols-3 gap-8">
      <Stat
        color="primary"
        title="پروژه ها"
        value={numOfProjects}
        icon={<HiOutlineViewGrid className="w-20 h-20" />}
      />
      <Stat
        color="green"
        title="پروژه های واگذار شده"
        value={numOfAcceptedProjects}
        icon={<HiCurrencyDollar className="w-20 h-20" />}
      />
      <Stat
        color="orange"
        title="درخواست ها"
        value={numOfProposals}
        icon={<HiCollection className="w-20 h-20" />}
      />
    </div>
  );
}

export default Stats;
