interface DragItem {
  uinode: IUINode;
  type: string;
}

interface IDndNodeManager {
  sourceNode?: IUINode;
  sourceIndex: number = -1;
  sourceSchema: ILayoutSchema = {};
  sourceChildrenSchema: Array<ILayoutSchema> = [];
  sourceParent?: IUINode;
  sourceParentSchema: ILayoutSchema = {};
  sourceParentChildrenSchema: Array<ILayoutSchema> = [];

  targetNode?: IUINode;
  targetIndex: number = -1;
  targetSchema: ILayoutSchema = {};
  targetChildrenSchema: Array<ILayoutSchema> = [];
  targetParent?: IUINode;
  targetParentSchema: ILayoutSchema = {};
  targetParentChildrenSchema: Array<ILayoutSchema> = [];

  replace(
    sourceNode: IUINode,
    targetNode: IUINode,
    placeHolder?: ILayoutSchema
  );
  insert(sourceNode: IUINode, targetNode: IUINode, placeHolder?: ILayoutSchema);
  addDownRow(
    sourceNode: IUINode,
    targetNode: IUINode,
    placeHolder?: ILayoutSchema
  );
  addUpRow(
    sourceNode: IUINode,
    targetNode: IUINode,
    placeHolder?: ILayoutSchema
  );
  addRightCol(
    sourceNode: IUINode,
    targetNode: IUINode,
    placeHolder?: ILayoutSchema
  );
  addLeftCol(
    sourceNode: IUINode,
    targetNode: IUINode,
    placeHolder?: ILayoutSchema
  );
}
