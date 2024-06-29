"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMCollapse, { ItemProps } from "@/components/ui/UMCollapse";
import {
  useConfirmMyRegistrationMutation,
  useEnrollIntoCourseMutation,
  useMySemesterRegistrationCoursesQuery,
  useWithdrawFromCourseMutation,
} from "@/redux/api/semesterRegistrationApi";
import { Button, message } from "antd";

const ViewPreregistrationPage = () => {
  const { data, isLoading } = useMySemesterRegistrationCoursesQuery({});
  const [enrollIntoCourse] = useEnrollIntoCourseMutation();
  const [withdrawFromCourse] = useWithdrawFromCourseMutation();
  const [confirmMyRegistration] = useConfirmMyRegistrationMutation();
  //   console.log(data, "offeredCourseSections");

  const handleEnroll = async ({
    offeredCourseId,
    offeredCourseSectionId,
  }: any) => {
    try {
      await enrollIntoCourse({
        offeredCourseId,
        offeredCourseSectionId,
      }).unwrap();
    } catch (err: any) {
      message.error(err?.message);
    }
  };

  const handleWithdraw = async ({
    offeredCourseId,
    offeredCourseSectionId,
  }: any) => {
    try {
      await withdrawFromCourse({
        offeredCourseId,
        offeredCourseSectionId,
      }).unwrap();
    } catch (err: any) {
      message.error(err?.message);
    }
  };

  const handleConfirmRegistration = async () => {
    try {
      const res = await confirmMyRegistration({}).unwrap();
      if (res) {
        message.success("Successfully registered");
      }
    } catch (err: any) {
      message.error(err?.message);
    }
  };

  const availableCourses: ItemProps[] = data?.map(
    (availableCourse: any, index: number) => {
      const obj = {
        key: index,
        label: availableCourse?.course?.title,
        isTaken: availableCourse.isTaken,
        children: (
          <table style={{ padding: "0px 10px", borderSpacing: "10px 15px" }}>
            {availableCourse?.offeredCourseSections?.map(
              (section: any, index: number) => {
                return (
                  <tr key={index}>
                    <td style={{ width: "30%" }}>
                      <span style={{ fontWeight: "bold" }}>
                        Sec - {section?.title}{" "}
                      </span>
                    </td>
                    <td style={{ width: "30%" }}>
                      <span>
                        Enrolled - ({section?.currentlyEnrolledStudent}/
                        {section?.maxCapacity})
                      </span>
                    </td>

                    <td style={{ width: "30%" }}>
                      <table
                        style={{
                          border: "1px solid #d9d9d9",
                          padding: "5px 10px",
                          borderRadius: "5px",
                        }}
                      >
                        <th
                          style={{
                            textAlign: "center",
                            borderBottom: "1px solid black",
                            textTransform: "capitalize",
                          }}
                          colSpan={3}
                        >
                          class schedule
                        </th>

                        {section?.offeredCourseClassSchedules?.map(
                          (el: any, index: number) => {
                            return (
                              <tr
                                key={index}
                                style={{
                                  width: "30%",
                                }}
                              >
                                <td
                                  style={{
                                    fontWeight: 700,
                                    marginRight: "10px",
                                    textTransform: "capitalize",
                                    textAlign: "right",
                                  }}
                                >
                                  {el?.dayOfWeek}
                                </td>
                                <td
                                  style={{
                                    textAlign: "left",
                                    padding: "0px 15px",
                                  }}
                                >
                                  {el?.startTime} - {el?.endTime}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </table>
                    </td>
                    <td
                      style={{
                        width: "30%",
                      }}
                    >
                      {availableCourse?.isTaken && section?.isTaken ? (
                        <Button
                          type="primary"
                          danger
                          onClick={() =>
                            handleWithdraw({
                              offeredCourseId: availableCourse?.id,
                              offeredCourseSectionId: section?.id,
                            })
                          }
                        >
                          Withdraw
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          onClick={() =>
                            handleEnroll({
                              offeredCourseId: availableCourse?.id,
                              offeredCourseSectionId: section?.id,
                            })
                          }
                        >
                          Enroll
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </table>
        ),
      };

      return obj;
    }
  );

  const isAtLeastOneCourseTaken =
    availableCourses?.filter((el: ItemProps) => el.isTaken === true).length > 0
      ? true
      : false;

  const base = "student";
  return (
    <>
      <UMBreadCrumb items={[{ label: `${base}`, link: `/${base}` }]} />
      <ActionBar title="Course Pre-registration" />
      <UMCollapse
        items={availableCourses}
        defaultActiveKey={availableCourses?.map((item) => item.key)}
      />
      {isAtLeastOneCourseTaken && (
        <div
          style={{
            margin: "15px 0px",
          }}
        >
          <Button onClick={handleConfirmRegistration} type="primary">
            Confirm Registration
          </Button>
        </div>
      )}
    </>
  );
};

export default ViewPreregistrationPage;
