import _ from "lodash";
import { DataMocker } from "./DataMocker";

function addCriticalInfo(componentInfos: any) {
  componentInfos.forEach((componentInfo: IComponentInfoGroup, key: number) => {
    componentInfo.key = _.uniqueId(`${componentInfo.component}-`);
    componentInfo.value = componentInfo.component;
    if (componentInfo.isContainer === undefined) {
      componentInfo.isContainer = false;
    }
    // register
    const component = componentInfo.component;
    IDERegister.componentsList[component] = componentInfo;

    // recursively add prop for each child
    if (_.isArray(componentInfo.children)) {
      addCriticalInfo(componentInfo.children);
    }
  });
  return componentInfos;
}

export class IDERegister {
  static componentsLibrary: any = [];
  // for easier to fetch component schemas
  static componentsList: any = {};
  static websocketOptions: IServerOptions;

  static registerComponentsInfo(componentInfos: any) {
    if (componentInfos) {
      if (!_.isArray(componentInfos)) {
        componentInfos = [componentInfos];
      }

      componentInfos.forEach(
        (inputComponentInfo: IComponentInfoGroup, key: number) => {
          inputComponentInfo.key = _.uniqueId(
            `${inputComponentInfo.id}-${Date.now()}-`
          );
          inputComponentInfo.value = _.uniqueId("component-category-");
          inputComponentInfo.selectable = false;

          // find category exists
          const findedIndex = _.findIndex(IDERegister.componentsLibrary, {
            id: inputComponentInfo.id
          });

          // merge
          if (findedIndex > -1) {
            inputComponentInfo.children.forEach(
              (componentInfo: IComponentInfo) => {
                const librariesChildren =
                  IDERegister.componentsLibrary[findedIndex].children;
                const existIndex = _.findIndex(librariesChildren, {
                  component: componentInfo.component
                });

                if (existIndex === -1) {
                  librariesChildren.push(componentInfo);
                } else {
                  // replace
                  librariesChildren[existIndex] = componentInfo;
                }
              }
            );
          } else {
            IDERegister.componentsLibrary.push(inputComponentInfo);
          }

          // add critical info
          addCriticalInfo(inputComponentInfo.children);
        }
      );
    }
  }

  static getComponentInfo(componentName: string) {
    return IDERegister.componentsList[componentName] || {};
  }

  static registerSchemaConverter(converter: ISchemaConverter) {
    const mocker = DataMocker.getInstance();
    mocker.schemaCoverter = converter;
  }

  static registerWebsocket(options: IServerOptions) {
    IDERegister.websocketOptions = options;
  }
}
