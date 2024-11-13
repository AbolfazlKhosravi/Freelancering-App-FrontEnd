import { Controller, SubmitHandler, useForm } from "react-hook-form";
import useCategories from "../../hooks/useCategories";
import TextField from "../../ui/TextField";
import RHFSelect from "../../ui/RHFSelect";
import TagsInput from "react-tagsinput";
import DatePickerField from "../../ui/DatePickerField";
import useCreateProject from "./useCreateProject";
import Loading from "../../ui/Loading";

interface CreateProjectForm {
  onClose: () => void;
}
export interface CreateProject {
  title: string;
  description: string;
  category: number;
  budget: number;
  deadline: Date | string;
  tags: string[];
}
function CreateProjectForm({ onClose }: CreateProjectForm) {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
  } = useForm<CreateProject>();

  const { isCreating, createProject } = useCreateProject();

  const { categories } = useCategories();

  const onSubmit: SubmitHandler<CreateProject> = (data) => {
    
    data.deadline = new Date(data.deadline).toISOString();

    createProject(data, {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
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
