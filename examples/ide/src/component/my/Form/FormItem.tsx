import React, { useContext } from "react";
import _ from "lodash";
import { Form, Input } from "antd";
import classnames from "classnames";
// import { TransitionMotion, spring } from "react-motion";

// import components from '../';
import { getComponent } from "uiengine";
import { MyContext } from "../../my/Context/Provider";

const { Item } = Form;

const FormItemComponent = (props: any) => {
  let { children, type, error, group, help, isAdvance, ...rest } = props;
  const { data } = useContext(MyContext);
  // console.log(data, group, _.get(data, `help[${group}]`))

  const showAdvanced = _.get(data, `advanceOption[${group}]`, false);

  let element: any = children;
  if (type) {
    if (type.indexOf(":") === -1) type = "antd:" + _.upperFirst(type);
    const InputComponent: any = getComponent(type);
    if (InputComponent) {
      element = <InputComponent {...rest} />;
    } else {
      element = <Input {...rest} />;
    }
  }

  let e = {};
  if (!_.get(error, "status", true)) {
    e = {
      validateStatus: _.isString(error.status) ? error.status : "error",
      help: error.code
    };
  }

  const cls = classnames({
    "a10-form-item": true,
    "advanced-item": isAdvance
  });

  return (
    // <TransitionMotion
    //   styles={
    //     !isAdvance || (isAdvance && showAdvanced === true)
    //       ? [
    //           {
    //             key: _.uniqueId('form-item-'),
    //             style: { scale: spring(1) }
    //           }
    //         ]
    //       : []
    //   }
    //   willEnter={() => ({
    //     scale: 1
    //   })}
    //   willLeave={() => ({
    //     scale: spring(0)
    //   })}
    // >
    //   {(inStyles: any) => {
    //     return inStyles[0] ? (
    !isAdvance || (isAdvance && showAdvanced === true) ? (
      <Item
        // key={inStyles[0].key}
        help={_.get(data, "showHelp") === false ? "" : help}
        {...rest}
        {...e}
        className={cls}
        style={
          {
            // transform: `scaleY(${inStyles[0].style.scale})`
          }
        }
      >
        {element}
      </Item>
    ) : null
    //   }}
    // </TransitionMotion>
  );
};

export default FormItemComponent;
