import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type ACDepartmentIDFieldProps = {
  name: string;
  label?: string;
  onChange: (e: any) => void;
};

const ACDepartmentIDField = ({
  name,
  label,
  onChange,
}: ACDepartmentIDFieldProps) => {
  const { data, isLoading } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });
  const academicDepartments = data?.academicDepartments;
  const acDepartmentOptions = academicDepartments?.map((acDepartment: any) => {
    console.log(acDepartment?.id);
    return {
      label: acDepartment?.title,
      value: acDepartment?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acDepartmentOptions as SelectOptions[]}
      handleChange={(e) => onChange(e)}
    />
  );
};

export default ACDepartmentIDField;
