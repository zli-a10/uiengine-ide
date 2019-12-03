import React, { useState, useMemo, useContext, useCallback } from 'react';
import _ from 'lodash';
import { IUISchema } from 'uiengine/typings';
import { SchemasContext, IDEEditorContext } from '../../Context';
import { getActiveUINode } from '../../../helpers';

export const Schemas = (props: any) => {
  const { setContent } = useContext(IDEEditorContext);
  const [schema, setSchema] = useState();
  // for showing
  const [editingResource, setEditingResource] = useState();

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [time, setTime] = useState(Date.now());

  const schemasContextValue = useMemo < ISchemasContext > (
    () => ({
      selectedKeys,
      setSelectedKey: (key: any, treeNode?: IResourceTreeNode) => {
        if (treeNode) {
          setEditingResource(treeNode);
        }
        let keys: any = _.clone(selectedKeys);

        if (_.isArray(key)) {
          keys = key;
        } else {
          if (keys.indexOf(key) === -1) keys.push(key);
        }
        setSelectedKeys(keys);
      },
      help: '',
      setHelp: (help: string) => { },
      refresh: time,
      toggleRefresh: () => {
        setTime(Date.now());
      },
      showTab: '',
      activeTab: (tab: string) => { },
      savedTime: '',
      setSavedTime: (savedTime: string) => { },
      // for schema replace
      schema,
      updateSchema: (schema: IUISchema) => {
        setSchema(schema);
        // fetch latest version of schema
        // Bug to fix: sometimes dnd not working
        const allSchema = getActiveUINode(true);

        setContent({
          content: allSchema,
          file: _.get(editingResource, 'key', 'unknown'),
          type: _.get(editingResource, 'type', 'schema')
        });
      },
      editingResource,
      setEditingResource: (editingResource: IResourceTreeNode) => {
        setEditingResource(editingResource);
      }
    }),
    [schema, editingResource, selectedKeys, time]
  );

  return (
    <SchemasContext.Provider value={schemasContextValue}>
      {props.children}
    </SchemasContext.Provider>
  );
};
