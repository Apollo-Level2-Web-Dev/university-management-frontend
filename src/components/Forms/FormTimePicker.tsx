import { TimePicker } from "antd";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

type FormTimePickerProps = {
  name: string;
  label?: string;
  index?: number;
};
export default function FormTimePicker({ name, label }: FormTimePickerProps) {
  const { control, setValue } = useFormContext();
  return (
    <>
      {label ? label : null}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TimePicker
            size="large"
            defaultValue={dayjs(field.value ? field.value : "00:00", "HH:mm")}
            format={"HH:mm"}
            onChange={(el, value) => {
              setValue(name, value);
            }}
            style={{ width: "100%" }}
          />
        )}
      />
    </>
  );
}
