import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useCategories from "../../hooks/useCategories";
import TextField from "../../ui/TextField";
import RHFSelect from "../../ui/RHFSelect";
import TagsInput from "react-tagsinput";
import DatePickerField from "../../ui/DatePickerField";
import useCreateProject from "./useCreateProject";
import Loading from "../../ui/Loading";
import { ProjectsTags, ProjectType } from "../../services/projectSrvice";
import useEditProject from "./useEditProject";


interface CreateProjectForm {
  onClose: () => void;
  projectToEdit?: ProjectType;
  tags?: ProjectsTags[];
}
export interface CreateProject {
  title: string;
  description: string;
  category: number;
  budget: number;
  deadline: Date | string;
  tags: string[];
}
function CreateProjectForm({
  onClose,
  projectToEdit,
  tags: tagsInput,
}: CreateProjectForm) {
  let isEditSession: boolean = false;
  let editValues: CreateProject | undefined = undefined;
  if (projectToEdit?.id) {
    isEditSession = true;
    const { title, description, budget, deadline, categoryId } = projectToEdit;
    
    editValues = {
      title,
      description,
      budget,
      category: categoryId,
      deadline: new Date(deadline),
      tags: tagsInput?.map((tag) => tag.type) || [],
    };
  }

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm<CreateProject>({ defaultValues: editValues });

  const { isCreating, createProject } = useCreateProject();
  const { editProject } = useEditProject();

  const { categories } = useCategories();

  const onSubmit: SubmitHandler<CreateProject> = (data) => {
    data.deadline = new Date(data.deadline).toISOString();

    if (isEditSession && projectToEdit?.id) {
      editProject(
        { id: projectToEdit.id, data },
        {
          onSuccess: () => {
            onClose();
            reset();
          },
        }
      );
    } else {
      createProject(data, {
        onSuccess: () => {
          onClose();
          reset();
        },
      });
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <TextField<CreateProject>
        label="عنوان"
        name="title"
        register={register}
        validationSchema={{
          required: "عنوان ضروری است",
          minLength: {
            value: 10,
            message: "حداقل 10 کاراکتر را وارد کنید",
          },
        }}
        errors={errors}
      />
      <TextField<CreateProject>
        label="توضیحات"
        name="description"
        register={register}
        validationSchema={{
          required: "توضیحات ضروری است",
          minLength: {
            value: 15,
            message: "حداقل 15 کاراکتر را وارد کنید",
          },
        }}
        errors={errors}
      />
      <TextField<CreateProject>
        label="بودجه"
        name="budget"
        type="number"
        register={register}
        validationSchema={{
          required: "بودجه ضروری است",
        }}
        errors={errors}
      />
      <RHFSelect<CreateProject>
        label="دسته بندی"
        required
        name="category"
        register={register}
        validationSchema={{
          required: "یک دسته بندی ایجاد کنید",
        }}
        options={categories}
        errors={errors}
      />
      <Controller
        name="tags"
        control={control}
        defaultValue={[]}
        rules={{
          required: "حداقل یک تگ اضافه کنید",
        }}
        render={({ field }) => (
          <div>
            <label className="mb-2 block text-secondary-700">تگ</label>
            <TagsInput
              {...field}
              inputProps={{ placeholder: "تگ اضافه کنید" }}
            />
            {errors && errors["tags"] && (
              <span className="text-error block text-sm mt-2">
                {errors["tags"]?.message as string}
              </span>
            )}
          </div>
        )}
      />
      <Controller
        name="deadline"
        control={control}
        defaultValue={new Date()}
        rules={{
          required: "تاریخ ددلاین ضروری است",
        }}
        render={({ field: { value, onChange } }) => (
          <>
            {" "}
            <DatePickerField
              date={value}
              setDate={onChange}
              label="ددلاین"
              required
            />
            {errors && errors["deadline"] && (
              <span className="text-error block text-sm mt-2">
                {errors["deadline"]?.message as string}
              </span>
            )}
          </>
        )}
      />
      <div className="!mt-8">
        {isCreating ? (
          <Loading />
        ) : (
          <button type="submit" className="btn btn--primary w-full">
            تایید
          </button>
        )}
      </div>
    </form>
  );
}
export default CreateProjectForm;
