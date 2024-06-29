"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Input } from "antd";
import Link from "next/link";
import { ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import UMTable from "@/components/ui/UMTable";
import { IOfferedCourseSchedule, IOfferedCourseSection } from "@/types";
import { useFacultyCoursesQuery } from "@/redux/api/facultyApi";

const FacultyCoursesPage = () => {
  const query: Record<string, any> = {};

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
  const { data, isLoading } = useFacultyCoursesQuery({ ...query });

  const myCourses = data?.myCourses;
  const meta = data?.meta;

  // console.log(myCourses);

  const columns = [
    {
      title: "Course name",
      dataIndex: "course",
      render: function (data: any) {
        return <>{data?.title}</>;
      },
    },
    {
      title: "Code",
      dataIndex: "course",
      render: function (data: any) {
        return <>{data?.code}</>;
      },
    },
    {
      title: "Credit",
      dataIndex: "course",
      render: function (data: any) {
        return <>{data?.credits}</>;
      },
    },
    {
      title: "Section",
      dataIndex: "sections",
      render: function (
        data: {
          classSchedules: IOfferedCourseSchedule[];
          section: IOfferedCourseSection;
        }[]
      ) {
        const section = data?.map((el) => el?.section);
        return (
          <>
            {section?.map((el, index) => {
              return (
                <div key={index} style={{ margin: "20px 0px" }}>
                  <span>
                    Sec - {el?.title} ({el?.currentlyEnrolledStudent}/
                    {el?.maxCapacity})
                  </span>
                </div>
              );
            })}
          </>
        );
      },
    },

    {
      title: "Action",
      render: function (data: any) {
        const section: IOfferedCourseSection[] | undefined =
          data?.sections?.map((el: any) => el?.section);
        return (
          <>
            {section?.map((el: IOfferedCourseSection, index: number) => {
              return (
                <div key={index} style={{ margin: "20px 0px" }}>
                  <Link
                    href={`/faculty/courses/student?courseId=${data?.course?.id}&offeredCourseSectionId=${el?.id}`}
                  >
                    <Button type="primary">View all students</Button>
                  </Link>
                </div>
              );
            })}
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
        ]}
      />
      <ActionBar title="My Courses">
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
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={myCourses}
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

export default FacultyCoursesPage;
