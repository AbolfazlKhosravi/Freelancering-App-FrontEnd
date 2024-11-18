import { useState } from "react";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import toLocalDateShort from "../../utils/toLocalDateShort";
import { toPersianNumbersWithComma } from "../../utils/toPersianNumbers";
import truncateText from "../../utils/truncateText";

import { HiEye, HiOutlineTrash } from "react-icons/hi";
import { TbPencilMinus } from "react-icons/tb";
import ConfirmDelete from "../../ui/ConfirmDelete";
// import useRemoveProject from "./useRemoveProject";
// import CreateProjectForm from "./CreateProjectForm";
import ToggleProjectStatus from "./ToggleProjectStatus.tsx";
import { Link } from "react-router-dom";
import {
  CategoryType,
  ProjectsTags,
  ProjectType,
} from "../../services/projectSrvice.ts";
import { UserType } from "../../services/authServices.ts";
import { useRemoveProject } from "./useRemoveProject.ts";
import CreateProjectForm from "./CreateProjectForm.tsx";

interface ProjectProps {
  project: ProjectType;
  index: number;
  tags: ProjectsTags[];
  category?: CategoryType;
  freelancer?: UserType;
}

function ProjectRow({
  project,
  index,
  tags,
  category,
  freelancer,
}: ProjectProps) {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const { removeProject, isDeleting } = useRemoveProject();

  return (
    <Table.Row>
      <td>{index + 1}</td>
      <td>{truncateText(project.title, 30)}</td>
      <td> {category?.title}</td>
      <td>{toPersianNumbersWithComma(project.budget)}</td>
      <td>{toLocalDateShort(project.deadline)}</td>
      <td>
        <div className="flex flex-wrap items-center gap-2 max-w-[200px]">
          {tags.map((tag) => (
            <span className="badge badge--secondary" key={tag.id}>
              {tag.type}
            </span>
          ))}
        </div>
      </td>
      <td>{freelancer?.name || "-"}</td>
      <td>
        <ToggleProjectStatus project={project} />
      </td>
      <td>
        <div className="flex items-center gap-x-4">
          <>
            <button onClick={() => setIsEditOpen(true)}>
              <TbPencilMinus className="w-5 h-5 text-primary-900" />
            </button>
            <Modal
              title={`ویرایش ${project.title}`}
              open={isEditOpen}
              onClose={() => setIsEditOpen(false)}
            >
              <div>ویرایش پروژه</div>
              <CreateProjectForm
                projectToEdit={project}
                tags={tags}
                onClose={() => setIsEditOpen(false)}
              />
            </Modal>
          </>
          <>
            <button onClick={() => setIsDeleteOpen(true)}>
              <HiOutlineTrash className="w-5 h-5 text-error" />
            </button>
            <Modal
              title={`حذف ${project.title}`}
              open={isDeleteOpen}
              onClose={() => setIsDeleteOpen(false)}
            >
              <ConfirmDelete
                resourceName={project.title}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() =>
                  removeProject(project.id, {
                    onSuccess: () => setIsDeleteOpen(false),
                  })
                }
                ispending={isDeleting}
                disabled={false}
              />
            </Modal>
          </>
        </div>
      </td>
      <td>
        <Link to={String(project.id)} className="flex justify-center">
          <HiEye className="w-5 h-5 text-primary-800" />
        </Link>
      </td>
    </Table.Row>
  );
}
export default ProjectRow;
