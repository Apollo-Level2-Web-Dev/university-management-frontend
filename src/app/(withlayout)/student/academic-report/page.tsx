"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { useMyAcademicInfosQuery } from "@/redux/api/studentApi";
import { Card, Col, Row, Tag } from "antd";

const AcademicReport = () => {
  const query: Record<string, any> = {};
  const { data, isLoading } = useMyAcademicInfosQuery({ ...query });
  const columns = [
    {
      title: "Grade Report",
      dataIndex: "",
      render: function (data: any) {
        return (
          <>
            <div style={{ marginBottom: "15px" }}>
              <div>
                <b>
                  {data?.academicSemester?.title} -{" "}
                  {data?.academicSemester?.year}
                </b>{" "}
                -{" "}
                <Tag color="blue">
                  <b>
                    {data?.academicSemester?.isCurrent === true
                      ? "ongoing"
                      : ""}
                  </b>
                </Tag>
              </div>
              <ul style={{ listStyle: "none", marginTop: "20px" }}>
                {data?.completedCourses?.map((el: any) => {
                  return (
                    <li key={el.id}>
                      <div
                        style={{
                          border: "1px solid #d9d9d9",
                          borderRadius: "5px",
                          marginBottom: "5px",
                          padding: "10px",
                        }}
                      >
                        <b>{el?.course?.title}</b>
                        <div>
                          <span>
                            Grade: <b>{el?.grade}</b>
                          </span>
                          <span style={{ marginLeft: "20px" }}>
                            Gpa: <b>{el?.point}</b>
                          </span>
                          <span style={{ marginLeft: "20px" }}>
                            Status: <b>{el?.status}</b>
                          </span>
                          <span style={{ marginLeft: "20px" }}>
                            Marks: <b>{el?.totalMarks}</b>
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <UMBreadCrumb
        items={[
          { label: `student`, link: `/student` },
          { label: `courses`, link: `/student/courses` },
          { label: `schedule`, link: `/student/courses/schedule` },
        ]}
      />

      <ActionBar title="My Academic Grade Report" />

      <Row gutter={24}>
        <Col span={12}>
          <Card title="Total CGPA">
            <b>{data?.academicInfo?.cgpa}</b>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Total completed credit">
            <b>
              {data?.academicInfo?.totalCompletedCredit}{" "}
              {data?.academicInfo?.totalCompletedCredit <= 1
                ? "credit"
                : "credits"}
            </b>
          </Card>
        </Col>
      </Row>

      <div style={{ margin: "10px 0" }}>
        <UMTable
          loading={isLoading}
          dataSource={data?.courses}
          columns={columns}
          showPagination={false}
        />
      </div>
    </>
  );
};

export default AcademicReport;
