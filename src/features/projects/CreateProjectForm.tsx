import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useCategories from "../../hooks/useCategories";
import TextField from "../../ui/TextField";
import RHFSelect from "../../ui/RHFSelect";
import TagsInput from 'react-tagsinput'
import { Value } from "react-multi-date-picker";
import DatePickerField from "../../ui/DatePickerField";

interface CreateProjectForm {
  onClose:()=>void
}
interface CreateProject {
  title: string;
  description: string;
  category: number;
  budget: number;
  deadline: string;
  tags: string[];
}
function CreateProjectForm({ onClose }: CreateProjectForm) {

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<CreateProject>();

  const [date, setDate] = useState<Value>(new Date());
  const [tags, setTags] = useState<string[]>([]);
  const { categories } = useCategories();

  const onSubmit:SubmitHandler<CreateProject> = (data) => {
    console.log(data);
    
    // const newProject = {
    //   ...data,
    //   deadline: new Date(date).toISOString(),
    //   tags,
    // };

    // if (isEditSession) {
    //   editProject(
    //     { id: editId, newProject },
    //     {
    //       onSuccess: () => {
            onClose();
    //         reset();
    //       },
    //     }
    //   );
    // } else {
    //   createProject(newProject, {
    //     onSuccess: () => {
    //       onClose();
    //       reset();
    //     },
    //   });
    // }
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
        options={categories}
      />
      <div>
        <label className="mb-2 block text-secondary-700">تگ</label>
        <TagsInput value={tags} onChange={setTags} inputProps={{ placeholder: 'تگ اضافه کنید' }} />
      </div>
      <DatePickerField date={date} setDate={setDate} label="ددلاین" required/>
      <div className="!mt-8">
        {/* {isCreating  ? (
          <Loading />
        ) : ( */}
          <button type="submit" className="btn btn--primary w-full">
            تایید
          </button>
        {/* )} */}
      </div>
    </form>
  );
}
export default CreateProjectForm;
