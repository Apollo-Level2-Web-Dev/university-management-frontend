"use client";

import ACDepartmentField from "@/components/Forms/ACDepartmentField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import OfferedCoursesField from "@/components/Forms/OfferedCoursesField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useAddOfferedCourseMutation,
  useOfferedCoursesQuery,
} from "@/redux/api/offeredCourseApi";
import { useSemesterRegistrationsQuery } from "@/redux/api/semesterRegistrationApi";
import { Button, Col, Row, message } from "antd";

const CreateOfferedCourseSectionPage = () => {
  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const { data, isLoading } = useOfferedCoursesQuery({ limit: 10, page: 1 });

  const offeredCourses = data?.offeredCourses;
  const offeredCoursesOptions = offeredCourses?.map((offCourse) => {
    // console.log(offCourse);
    return {
      label: offCourse?.course?.title,
      value: offCourse?.id,
    };
  });

  const onSubmit = async (data: any) => {
    message.loading("Creating.....");
    try {
      const res = await addOfferedCourse(data).unwrap();
      if (res?.id) {
        message.success("Offered Course created successfully");
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
          { label: "offered-course", link: `/${base}/offered-course` },
        ]}
      />
      <h1>Create Offered Course</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}></div>
            <div style={{ margin: "10px 0px" }}></div>
            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                options={offeredCoursesOptions as SelectOptions[]}
                name="offeredCourseId"
                label="Offered Course"
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput label="Section" name="title" />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput label="Max Capacity" name="maxCapacity" />
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

export default CreateOfferedCourseSectionPage;
