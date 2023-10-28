"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { Button } from "antd";
import { useRouter } from "next/navigation";

import React from "react";

type FormData = {
  id: string | string[] | undefined;
  token: string | string[] | undefined;
};

function ResetPassword({ searchParams }: any) {
  const { id, token } = searchParams;
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();

  if (!id && !token) return null;

  const defaultValues: {
    id: string | string[] | undefined;
    newPassword: string;
  } = {
    id,
    newPassword: "",
  };

  const onSubmit = async (values: FormData) => {
    try {
      await resetPassword(values);
      router.push("/login");
    } catch (error) {}
  };

  return (
    <div
      style={{ margin: "100px 0", display: "flex", justifyContent: "center" }}
    >
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <h3>Reset Password</h3>
        <div style={{ margin: "5px 0" }}>
          <FormInput type="text" name="id" label="User Id" />
        </div>
        <div style={{ margin: "5px 0" }}>
          <FormInput type="password" name="newPassword" label="New password" />
        </div>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;
