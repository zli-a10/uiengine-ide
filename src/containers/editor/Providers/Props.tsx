import React, { useState, useMemo } from "react";
// import { ILayoutSchema } from "uiengine/typings";
import { PropsContext } from "../../Context";

export const Props = (props: any) => {
  // const [schema, setSchema] = useState();
  const propManagerContextValue = useMemo<IPropsContext>(
    () => ({
      showTab: "",
      activeTab: (tab: string) => {},
      help: "",
      setHelp: (help: string) => {},
      refresh: "",
      toggleRefresh: (refresh: string) => {}
    }),
    []
  );
  return (
    <PropsContext.Provider value={propManagerContextValue}>
      {props.children}
    </PropsContext.Provider>
  );
};
