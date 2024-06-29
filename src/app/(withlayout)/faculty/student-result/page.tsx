"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Input, Tag, message } from "antd";
import Link from "next/link";
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Fragment, useState } from "react";
import { useDebounced } from "@/redux/hooks";
import UMTable from "@/components/ui/UMTable";
import dayjs from "dayjs";
import BaseRow from "@/components/ui/BaseRow";
import { ExamType } from "@/constants/global";
import {
  useStudentEnrolledCourseMarksQuery,
  useUpdateFinalMarksMutation,
} from "@/redux/api/studentEnrollCourseMarkApi";
import { IStudentEnrolledCourseMark } from "@/types";

const StudentResultPage = ({ searchParams }: Record<string, any>) => {
  const [updateFinalMarks] = useUpdateFinalMarksMutation();
  const [academicSemesterId, setAcademicSemesterId] = useState<string>();

  const query: Record<string, any> = {};

  const { studentId, courseId, offeredCourseSectionId } = searchParams;

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  if (!!studentId || !!courseId || !!offeredCourseSectionId) {
    query["studentId"] = studentId;
    query["courseId"] = courseId;
    query["offeredCourseSectionId"] = offeredCourseSectionId;
  }

  const { data, isLoading } = useStudentEnrolledCourseMarksQuery({ ...query });

  const studentEnrolledCourseMarks = data?.studentEnrolledCourseMarks;
  const meta = data?.meta;

  // console.log(studentEnrolledCourseMarks);

  const handleUpdateFinalMarks = async (values: any) => {
    // console.log(values);
    try {
      const res = await updateFinalMarks(values);
      if (res) {
        message.success("Final Marks Updated");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Student id",
      dataIndex: "student",
      render: function (data: any) {
        return (
          <>
            <table>
              <BaseRow title="name">
                {data?.firstName} {data?.middleName} {data?.lastName}
              </BaseRow>
              <BaseRow title="student ID">{data?.studentId}</BaseRow>
            </table>
          </>
        );
      },
    },
    {
      title: "Grade info",
      render: function (data: any) {
        return (
          <table>
            <BaseRow title="grade">{!data?.grade ? "-" : data?.grade}</BaseRow>
            <BaseRow title="total marks">{data?.marks}</BaseRow>
          </table>
        );
      },
    },
    {
      title: "Exam type",
      dataIndex: "examType",
      sorter: true,
      render: function (data: any) {
        return (
          <Tag color={data === ExamType.MIDTERM ? "magenta" : "blue"}>
            {data}
          </Tag>
        );
      },
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        setAcademicSemesterId(data?.academicSemesterId);
        return (
          <>
            <Link
              href={`/faculty/update-mark?&examType=${data?.examType}&marks=${data?.marks}&academicSemesterId=${data?.academicSemesterId}&studentId=${studentId}&courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}`}
            >
              <Button type="primary" style={{ marginLeft: "3px" }}>
                Update marks
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "faculty",
            link: "/faculty",
          },
          {
            label: "courses",
            link: "/faculty/courses",
          },
          {
            label: "students",
            link: "/faculty/courses/student",
          },
        ]}
      />
      <ActionBar title="Student Marks">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>

        <div style={{ marginLeft: "auto" }}>
          {data?.studentEnrolledCourseMarks
            .filter(
              (el: IStudentEnrolledCourseMark) => el.examType === ExamType.FINAL
            )
            .map((el, index) => {
              if (el.marks > 0) {
                return (
                  <Fragment key={index}>
                    <Button
                      type="primary"
                      size="large"
                      onClick={() =>
                        handleUpdateFinalMarks({
                          studentId,
                          courseId,
                          academicSemesterId,
                        })
                      }
                    >
                      Update Final Marks
                    </Button>
                  </Fragment>
                );
              }
            })}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={studentEnrolledCourseMarks}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default StudentResultPage;
