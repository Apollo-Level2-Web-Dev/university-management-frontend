"use client";
import dayjs from "dayjs";
import { useState } from "react";
import { Button, Input, Tag, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useDebounced } from "@/redux/hooks";
import { IAcademicCoreSemester, IOfferedCourse } from "@/types";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import ActionBar from "@/components/ui/ActionBar";
import UMTable from "@/components/ui/UMTable";
import UMModal from "@/components/ui/UMModal";
import { PaymentStatus, PaymentType } from "@/constants/global";
import {
  useInitialPaymentMutation,
  useMyPaymentsQuery,
} from "@/redux/api/paymentApi";
import { useRouter } from "next/navigation";

const ViewMyPayment = () => {
  const [paymentType, setPaymentType] = useState<string>("");
  const [academicSemesterId, setAcademicSemesterId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const query: Record<string, any> = {};
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

  const { data, isLoading } = useMyPaymentsQuery({ ...query });
  const myPayments = data?.myPayments;
  const meta = data?.meta;

  const [initialPayment] = useInitialPaymentMutation();

  const handleInitialPayment = async (data: any) => {
    // console.log(data);
    try {
      const res = await initialPayment(data).unwrap();
      // console.log(res);
      router.push(res?.paymentUrl);
    } catch (error) {}
  };

  const columns = [
    {
      title: "Student info",
      dataIndex: "student",
      render: function (data: any) {
        return (
          <table
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <tr style={{ margin: "0px 0px" }}>
              <td
                style={{
                  fontWeight: 700,
                  marginRight: "10px",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
                name
              </td>
              <td style={{ textAlign: "left", padding: "5px 15px" }}>
                <span style={{ marginLeft: "10px", textAlign: "right" }}>
                  {data?.firstName} {data?.middleName} {data?.lastName}
                </span>
              </td>
            </tr>

            <tr style={{ margin: "0px 0px" }}>
              <td
                style={{
                  fontWeight: 700,
                  marginRight: "10px",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
                Student id
              </td>
              <td style={{ textAlign: "left", padding: "5px 15px" }}>
                <span style={{ marginLeft: "10px", textAlign: "right" }}>
                  {data?.studentId}
                </span>
              </td>
            </tr>
          </table>
        );
      },
    },
    {
      title: "Semester",
      dataIndex: "academicSemester",
      render: function (data: IAcademicCoreSemester) {
        return (
          <>
            {data?.title} - {data?.year}
          </>
        );
      },
    },
    {
      title: "Full Payment Amount",
      render: function (data: any) {
        return (
          <table
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <tr style={{ margin: "0px 0px" }}>
              <td
                style={{
                  fontWeight: 700,
                  marginRight: "10px",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
                full payment amount
              </td>
              <td style={{ textAlign: "left", padding: "5px 15px" }}>
                <span style={{ marginLeft: "10px" }}>
                  {data.fullPaymentAmount} Tk
                </span>
              </td>
            </tr>

            <tr style={{ margin: "0px 0px" }}>
              <td
                style={{
                  fontWeight: 700,
                  marginRight: "10px",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
                partial payment amount
              </td>
              <td style={{ textAlign: "left", padding: "5px 15px" }}>
                <span style={{ marginLeft: "10px" }}>
                  {data.partialPaymentAmount} Tk
                </span>
              </td>
            </tr>

            <tr style={{ margin: "0px 0px" }}>
              <td
                style={{
                  fontWeight: 700,
                  marginRight: "10px",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
                total due amount
              </td>
              <td style={{ textAlign: "left", padding: "5px 15px" }}>
                <span style={{ marginLeft: "10px" }}>
                  {data.totalDueAmount} Tk
                </span>
              </td>
            </tr>

            <tr style={{ margin: "0px 0px" }}>
              <td
                style={{
                  fontWeight: 700,
                  marginRight: "10px",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
                total paid amount
              </td>
              <td style={{ textAlign: "left", padding: "5px 15px" }}>
                <span style={{ marginLeft: "10px" }}>
                  {data.totalPaidAmount} Tk
                </span>
              </td>
            </tr>
          </table>
        );
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      render: function (data: string) {
        return (
          <div style={{ textAlign: "center" }}>
            {data === PaymentStatus.PENDING.toString() && (
              <Tag color="yellow">Pending</Tag>
            )}

            {data === PaymentStatus.FULL_PAID.toString() && (
              <Tag color="green">Paid</Tag>
            )}

            {data === PaymentStatus.PARTIAL_PAID.toString() && (
              <Tag color="orange">Partial Paid</Tag>
            )}
          </div>
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
        return (
          <>
            {data.paymentStatus === PaymentStatus.PENDING && (
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    setAcademicSemesterId(data?.academicSemesterId);
                    setOpen(true);
                    setPaymentType(PaymentType.PARTIAL);
                  }}
                  style={{ marginLeft: "3px" }}
                >
                  Pay Partial
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setAcademicSemesterId(data?.academicSemesterId);
                    setOpen(true);
                    setPaymentType(PaymentType.FULL);
                  }}
                  style={{ marginLeft: "3px" }}
                >
                  Pay Full
                </Button>
              </>
            )}

            {data.paymentStatus === PaymentStatus.PARTIAL_PAID && (
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    setAcademicSemesterId(data?.academicSemesterId);
                    setOpen(true);
                    setPaymentType(PaymentType.FULL);
                  }}
                  style={{ marginLeft: "3px" }}
                >
                  full payment
                </Button>
              </>
            )}
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
    <>
      <UMBreadCrumb items={[{ label: "student", link: "/student" }]} />
      <ActionBar title="My Payment List">
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
        dataSource={myPayments}
        pageSize={size}
        showSizeChanger
        totalPages={meta?.total}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <UMModal
        title="Online Payment"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => {
          if (paymentType === PaymentType.PARTIAL) {
            handleInitialPayment({
              academicSemesterId: academicSemesterId,
              paymentType: PaymentType.PARTIAL,
            });
          } else if (paymentType === PaymentType.FULL) {
            handleInitialPayment({
              academicSemesterId: academicSemesterId,
              paymentType: PaymentType.FULL,
            });
          }
        }}
      >
        <>
          <p>Payment: {paymentType} </p>
          <p className="my-5">Click ok button to proceed payment</p>
        </>
      </UMModal>
    </>
  );
};

export default ViewMyPayment;
