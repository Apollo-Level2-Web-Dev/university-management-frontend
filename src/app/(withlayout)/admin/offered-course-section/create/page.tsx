"use client";
import ACDepartmentIDField from "@/components/Forms/ACDepartmentIDField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import SemesterRegistrationField from "@/components/Forms/SemesterRegistrationField";
import FormDynamicFields from "@/components/ui/FormDynamicFields";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useOfferedCoursesQuery } from "@/redux/api/offeredCourseApi";
import { useAddOfferedCourseSectionMutation } from "@/redux/api/offeredCourseSectionApi";
import { Button, Col, Row, message } from "antd";
import { useState } from "react";

const CreateOfferedCourseSectionPage = () => {
  const [addOfferedCourseSection] = useAddOfferedCourseSectionMutation();
  const [acDepartmentId, setAcDepartmentId] = useState<string>();
  const [semesterRegistrationId, setSemesterRegistrationId] =
    useState<string>();

  const query: Record<string, any> = {};

  if (!!acDepartmentId) {
    query["academicDepartmentId"] = acDepartmentId;
  }
  if (!!semesterRegistrationId) {
    query["semesterRegistrationId"] = semesterRegistrationId;
  }
  const { data, isLoading } = useOfferedCoursesQuery({
    limit: 10,
    page: 1,
    ...query,
  });

  const offeredCourses = data?.offeredCourses;
  const offeredCoursesOptions = offeredCourses?.map((offCourse) => {
    // console.log(offCourse?.course?.id);
    return {
      label: offCourse?.course?.title,
      value: offCourse?.id,
    };
  });

  const onSubmit = async (data: any) => {
    data.maxCapacity = parseInt(data?.maxCapacity);
    // console.log(data);
    message.loading("Creating.....");
    try {
      const res = await addOfferedCourseSection(data).unwrap();
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
          {
            label: "offered-course-section",
            link: `/${base}/offered-course-section`,
          },
        ]}
      />
      <h1>Create Offered Course Section</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <SemesterRegistrationField
                name="semesterRegistration"
                label="Semester Registration"
                onChange={(el) => setSemesterRegistrationId(el)}
              />
            </div>
            <div style={{ margin: "10px 0px" }}>
              <ACDepartmentIDField
                name="academicDepartment"
                label="Academic Department"
                onChange={(el) => setAcDepartmentId(el)}
              />
            </div>
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
            <Button type="primary" htmlType="submit">
              add
            </Button>
          </Col>
          <Col span={16} style={{ margin: "10px 0" }}>
            <FormDynamicFields />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateOfferedCourseSectionPage;
