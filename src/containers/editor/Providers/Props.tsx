import React, { useState, useMemo } from "react";
// import { ILayoutSchema } from "uiengine/typings";
import { PropsContext } from "../../Context";

export const Props = (props: any) => {
  const [time, updateTime] = useState(Date.now());
  const propManagerContextValue = useMemo<IPropsContext>(
    () => ({
      showTab: "",
      activeTab: (tab: string) => {},
      help: "",
      setHelp: (help: string) => {},
      time,
      refresh: () => {
        // updateTime(Date.now());
        // console.log(time);
      }
    }),
    [time]
  );
  return (
    <PropsContext.Provider value={propManagerContextValue}>
      {props.children}
    </PropsContext.Provider>
  );
};
