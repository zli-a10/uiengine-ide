import React, { useState, useMemo } from "react";
import { ILayoutSchema } from "uiengine/typings";
import { SchemasContext } from "../../Context";

export const Schemas = (props: any) => {
  const [schema, setSchema] = useState();
  const schemasContextValue = useMemo<ISchemasContext>(
    () => ({
      current: "",
      setCurrent: (path: string) => {},
      help: "",
      setHelp: (help: string) => {},
      refresh: "",
      toggleRefresh: (refresh: string) => {},
      showTab: "",
      activeTab: (tab: string) => {},
      savedTime: "",
      setSavedTime: (savedTime: string) => {},
      // for schema replace
      schema,
      updateSchema: (schema: ILayoutSchema) => {
        setSchema(schema);
      }
    }),
    []
  );
  return (
    <SchemasContext.Provider value={schemasContextValue}>
      {props.children}
    </SchemasContext.Provider>
  );
};
