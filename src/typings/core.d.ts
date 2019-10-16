interface ICommand {
  type: string;
  to: string; // target
  content: any;
}

interface IFileTree {
  name: string;
  title: string;
  children: Array<IFileTree>;
}

interface IFileLoader {
  storage: IStorage;
  editingFile: string;
  saveTree(treeRoot: IFileTree, type: EResourceType);
  saveFile(
    path: string,
    content: any,
    type: EResourceType,
    treeRoot?: IFileTree
  ): boolean;
  loadFileTree(type: EResourceType, isTemplate?: boolean, remoteOnly?: boolean);
  loadFile(path: string, type: EResourceType, isTemplate?: boolean);
  removeFile(path: string, type: EResourceType, treeRoot?: IFileTree);
}

interface IStorage {
  save(path: string, content: any);
  remove(path: string);
  get(path: string);
}

// generate schema when editing
interface ISchemaPropManager {
  errors?: IError;
  generateSchema(
    type: string,
    componentPropSchema: any,
    value: any,
    extraInfo?: any
  );

  applySchema(
    type: string,
    componentPropSchema: any,
    value: any,
    uiNode: IUINode,
    extraInfo?: any
  );
}

interface IError {
  code: number;
  status: string;
}

interface IDataSourceProps {
  datasource: any;
  onChange?: (value: any) => void;
}

interface IDataSourceTreeProps {
  disabled?: boolean;
  value?: any;
  datasource?: any;
  searchText?: string;
  onChange?: (value: any) => void;
}

interface IMockTemplates {
  [name: string]: any;
}

interface ISchemaConverter {
  (schema: IDataSchema, mode: string = ""): any;
}

interface IDataMocker {
  schemaCoverter: ISchemaConverter; // client register this, to generate mockjs template
  enable: boolean;
  mode: string = "";
  noCache: boolean;
  dataCached: any[];
  maxRow: number = 5;
  generate(schema: any); // called on plugin
  generateTableData(childrenNode: IUINode);
}

// web socket
interface IServerOptions {
  port: number; // default 3000
  host?: string; // default localhost
  paths: {
    schemaPath?: string;
    pluginPath?: string;
    componentsPath?: string;
    dataSourcePath?: string;
  };
}

interface IClient {
  connect(command?: IWebsocketCommands);
}

type EResourceType =
  | "schema"
  | "plugin"
  | "datasource"
  | "listener"
  | "template"
  | "component";

type EStorageType = "Local" | "Session" | "File";
type EEditingType = "add" | "edit" | "clone" | "rename" | boolean;
type EStatus = "changed" | "new" | "removed" | "normal" | "renamed" | "dropped";
type EFullStatus = { [key: string]: any; status: EStatus };
type ENodeType = "root" | "file" | "folder";

interface IFileStatusGroup {
  type: EResourceType;
  file: string;
  status: EStatus | EFullStatus;
}

// copy from websocket server side command options
interface ICommandOptions {
  type: EResourceType;
  path?: string;
  isTemplate?: boolean;
  options?: any;
}

interface IWebsocketCommands {
  name: string;
  options?: ICommandOptions;
  response?: any;
}

interface IResourceTreeNode {
  type: EResourceType;
  name: string;
  title: string;
  nodeType: ENodeType;
  children?: Array<IResourceTreeNode>;
  isTemplate?: boolean = false;
  _path_: string;
  _key_: string;
  _parent_: IResourceTreeNode;
  _status_?: EStatus;
  _editing_: EEditingType;
}

interface IUploadFile {
  data: string;
  path: string;
  status: EFullStatus;
  type: EResourceType;
}
