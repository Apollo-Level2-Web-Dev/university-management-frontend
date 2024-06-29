import { Col, Row } from "antd";
import FormInput from "../Forms/FormInput";

const LocalGuardianInfo = () => {
  return (
    <>
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "5px",
          padding: "15px",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        <p style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}>
          Guardian information
        </p>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={6} style={{ margin: "10px 0" }}>
            <FormInput
              name="student.localGuardian.name"
              label="Local guardian name"
            />
          </Col>

          <Col span={6} style={{ margin: "10px 0" }}>
            <FormInput
              name="student.localGuardian.occupation"
              label="Local guardian occupation"
            />
          </Col>

          <Col span={6} style={{ margin: "10px 0" }}>
            <FormInput
              name="student.localGuardian.contactNo"
              label="Local guardian contact no."
            />
          </Col>

          <Col span={6} style={{ margin: "10px 0" }}>
            <FormInput
              name="student.localGuardian.address"
              label="Local guardian address"
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LocalGuardianInfo;
