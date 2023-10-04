import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";
import { useAcademicSemestersQuery } from "@/redux/api/academic/semesterApi";

type ACFacultyFieldProps = {
  name: string;
  label: string;
};

const ACSemesterField = ({ name, label }: ACFacultyFieldProps) => {
  const { data, isLoading } = useAcademicSemestersQuery({
    limit: 100,
    page: 1,
  });
  const academicSemesters = data?.academicSemesters;
  const acSemesterOptions = academicSemesters?.map((acSemester) => {
    return {
      label: acSemester?.title + "-" + acSemester?.year,
      value: acSemester?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acSemesterOptions as SelectOptions[]}
    />
  );
};

export default ACSemesterField;
