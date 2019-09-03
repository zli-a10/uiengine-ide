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
  saveTree(treeRoot: IFileTree, type: string);
  saveFile(
    path: string,
    content: any,
    type: string,
    treeRoot?: IFileTree
  ): boolean;
  loadFileTree(type: string): IFileTree;
  loadFile(path: string, type?: string): any;
  removeFile(path: string, type?: string, treeRoot?: IFileTree): boolean;
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
  generate(schema: any); // called on plugin
}
