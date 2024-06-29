import { Col, Row } from "antd";
import FormInput from "../Forms/FormInput";
import FormDatePicker from "../Forms/FormDatePicker";
import FormSelectField from "../Forms/FormSelectField";
import FormTextArea from "../Forms/FormTextArea";
import { bloodGroupOptions } from "@/constants/global";

const StudentBasicInfo = () => {
  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: "5px",
        padding: "15px",
        marginBottom: "10px",
        marginTop: "10px",
      }}
    >
      <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
        <Col span={8} style={{ margin: "10px 0" }}>
          <FormInput
            type="email"
            name="student.email"
            label="Email address"
            size="large"
          />
        </Col>

        <Col span={8} style={{ margin: "10px 0" }}>
          <FormInput
            name="student.contactNo"
            label="Contact no."
            size="large"
          />
        </Col>

        <Col span={8} style={{ margin: "10px 0" }}>
          <FormInput
            name="student.emergencyContactNo"
            label="Emergency contact no."
            size="large"
          />
        </Col>

        <Col span={12} style={{ margin: "10px 0" }}>
          <FormDatePicker
            name="student.dateOfBirth"
            label="Date of birth"
            size="large"
          />
        </Col>

        <Col span={12} style={{ margin: "10px 0" }}>
          <FormSelectField
            name="student.bloodGroup"
            label="Blood group"
            options={bloodGroupOptions}
            size="large"
          />
        </Col>

        <Col span={12} style={{ margin: "10px 0" }}>
          <FormTextArea
            name="student.presentAddress"
            label="Present address"
            rows={4}
          />
        </Col>

        <Col span={12} style={{ margin: "10px 0" }}>
          <FormTextArea
            name="student.permanentAddress"
            label="Permanent address"
            rows={4}
          />
        </Col>
      </Row>
    </div>
  );
};

export default StudentBasicInfo;
