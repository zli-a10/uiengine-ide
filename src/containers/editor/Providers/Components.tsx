import React, { useState, useMemo } from 'react';
// import { ILayoutSchema } from "uiengine/typings";
import { ComponentsContext } from '../../Context';

export const Components = (props: any) => {
  // const [schema, setSchema] = useState();
  const componentsContextValue = useMemo < IComponentsContext > (
    () => ({
      keywords: '',
      setKeywords: (path: string) => {},
      help: '',
      setHelp: (help: string) => {},
      refresh: '',
      toggleRefresh: (refresh: string) => {},
      showTab: '',
      activeTab: (tab: string) => {}
    }),
    []
  );

  return (
    <ComponentsContext.Provider value={componentsContextValue}>
      {props.children}
    </ComponentsContext.Provider>
  );
};
