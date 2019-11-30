import React, { useContext } from 'react';
import _ from 'lodash';
import { Collapse, Button } from 'antd';
import { IDEEditorContext, GlobalContext } from '../../Context';
import { getActiveUINode } from '../../../helpers';

const Panel = Collapse.Panel;

export const Release: React.FC = (props: any) => {
  function callback() {}
  // const { preview } = useContext(GlobalContext);
  // const { editNode } = useContext(IDEEditorContext);

  return (
    <div className="ide-props-events">
      <Button>Document Preview</Button>
      <Button>E2E Preview</Button>
    </div>
  );
};
