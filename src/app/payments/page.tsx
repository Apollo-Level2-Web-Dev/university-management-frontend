"use client";

import { Button, Result } from "antd";
import { ResultStatusType } from "antd/es/result";
import { useRouter } from "next/navigation";
import React from "react";

function PaymentResultPage({ searchParams }: any) {
  const router = useRouter();
  const { status } = searchParams;
  // console.log(searchParams);
  const resultTitle =
    status === "success" ? "Successfully Paid" : "Something Went Wrong...";
  return (
    <>
      <Result
        status={status as ResultStatusType}
        title={resultTitle}
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              router.push("/student/payment");
            }}
          >
            Back to payment list
          </Button>,
        ]}
      />
    </>
  );
}

export default PaymentResultPage;
