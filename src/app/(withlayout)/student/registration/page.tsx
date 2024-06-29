"use client";

import {
  useMyRegistrationQuery,
  useStartRegistrationMutation,
} from "@/redux/api/semesterRegistrationApi";
import { Alert, Button, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const StudentRegistrationPage = () => {
  const { data, isLoading } = useMyRegistrationQuery({});
  const [startRegistration] = useStartRegistrationMutation();
  const router = useRouter();

  if (isLoading) return <Spin size="small" />;

  const goToRegistrationHandler = async () => {
    if (!data?.studentSemesterRegistration) {
      try {
        await startRegistration({}).unwrap();
      } catch (error) {}
    }
    router.push("/student/pre-registration");
  };

  return (
    <>
      <div style={{ margin: "10px 0px" }}>
        {data?.semesterRegistration &&
        data?.semesterRegistration?.status === "ONGOING" &&
        !data?.studentSemesterRegistration?.isConfirmed ? (
          <Button type="primary" danger onClick={goToRegistrationHandler}>
            Go to registration
          </Button>
        ) : (
          <>
            <div>You are not allowed to do your registration. Stay tuned.</div>
          </>
        )}
      </div>

      {!data?.semesterRegistration ||
        (data?.studentSemesterRegistration?.isConfirmed && (
          <div>
            <Alert
              message={
                <>
                  <span>Your registration has been completed successfully</span>
                  <Link href="/student/courses" style={{ marginLeft: "10px" }}>
                    View Your courses
                  </Link>
                </>
              }
              type="success"
            />
          </div>
        ))}
    </>
  );
};

export default StudentRegistrationPage;
