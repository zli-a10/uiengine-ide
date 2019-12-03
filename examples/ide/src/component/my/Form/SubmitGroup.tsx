import React from "react";
import { Row, Button } from "antd";
// import _ from "lodash";
const SubmitGroupComponent = (props: any) => {
  const {
    onSaveClick,
    onCancelClick,
    saveText = "Save",
    cancelText = "Cancel",
    buttonAlign = "right"
  } = props;
  return (
    <Row className="a10-form-submit" style={{ textAlign: buttonAlign }}>
      <Button type="primary" size="large" icon="save" onClick={onSaveClick}>
        {saveText}
      </Button>
      <Button
        type="danger"
        icon="close-circle"
        size="large"
        onClick={onCancelClick}
      >
        {cancelText}
      </Button>
    </Row>
  );
};

export default SubmitGroupComponent;
