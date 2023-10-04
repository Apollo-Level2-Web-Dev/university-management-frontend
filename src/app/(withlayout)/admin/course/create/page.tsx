"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import { SelectOptions } from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddCourseMutation, useCoursesQuery } from "@/redux/api/courseApi";
import { Button, Col, Row, message } from "antd";

const CreateCoursePage = () => {
  const [addCourse] = useAddCourseMutation();

  const { data, isLoading } = useCoursesQuery({ limit: 10, page: 1 });

  const courses = data?.courses;
  const coursesOptions = courses?.map((course) => {
    return {
      label: course?.title,
      value: course?.id,
    };
  });

  const onSubmit = async (data: any) => {
    data.credits = parseInt(data?.credits);

    const coursePreRequisitesOptions = data?.coursePreRequisites?.map(
      (id: string) => {
        return {
          courseId: id,
        };
      }
    );

    data.coursePreRequisites = coursePreRequisitesOptions;

    message.loading("Creating.....");
    try {
      const res = await addCourse(data).unwrap();
      if (res?.id) {
        message.success("Course created successfully");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  const base = "admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "course", link: `/${base}/course` },
        ]}
      />
      <h1>Create Course</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="title" label="Title" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="code" label="Course Code" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput name="credits" label="Course Credits" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormMultiSelectField
                options={coursesOptions as SelectOptions[]}
                name="coursePreRequisites"
                label="Pre Requisite Courses"
              />
            </div>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          add
        </Button>
      </Form>
    </div>
  );
};

export default CreateCoursePage;
