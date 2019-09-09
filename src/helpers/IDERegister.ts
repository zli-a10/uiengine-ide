import _ from "lodash";
import { DataMocker } from "./DataMocker";

function addCriticalInfo(componentInfos: any) {
  componentInfos.forEach((componentInfo: IComponentInfoGroup, key: number) => {
    componentInfo.key = _.uniqueId(`${componentInfo.id}-${Date.now()}-`);
    componentInfo.value = componentInfo.component;
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

  static registerComponentsInfo(componentInfos: any) {
    if (componentInfos) {
      if (!_.isArray(componentInfos)) {
        componentInfos = [componentInfos];
      }

      componentInfos.forEach(
        (inputComponentInfo: IComponentInfoGroup, key: number) => {
          let findedIndex = -1;
          inputComponentInfo.key = _.uniqueId(
            `${inputComponentInfo.id}-${Date.now()}-`
          );
          inputComponentInfo.value = _.uniqueId("component-category-");
          inputComponentInfo.selectable = false;
          IDERegister.componentsLibrary.forEach(
            (componentInfo: IComponentInfoGroup, index: number) => {
              if (inputComponentInfo.id === componentInfo.id) {
                findedIndex = index;
                return;
              }
            }
          );

          // merge
          if (findedIndex > -1) {
            inputComponentInfo.children.forEach(
              (componentInfo: IComponentInfo) => {
                const librariesChildren =
                  IDERegister.componentsLibrary[findedIndex].children;
                const existIndex = _.findIndex(librariesChildren, {
                  component: componentInfo.component
                });

                if (!existIndex) {
                  librariesChildren.push(inputComponentInfo);
                } else {
                  // replace
                  librariesChildren[existIndex] = inputComponentInfo;
                }
              }
            );
          } else {
            IDERegister.componentsLibrary.push(inputComponentInfo);
          }

          // add critical info
          addCriticalInfo(inputComponentInfo.children);

          // cache list
          inputComponentInfo.children.forEach(
            (componentInfo: IComponentInfo) => {
              const component = componentInfo.component;
              // for tree selector
              // componentInfo.key = _.uniqueId(
              //   `${componentInfo.component}-${Date.now()}-`
              // );
              // componentInfo.value = componentInfo.component;

              if (componentInfo.isContainer === undefined)
                componentInfo.isContainer = false;
              // assign to cache
              IDERegister.componentsList[component] = componentInfo;
            }
          );
        }
      );

      // console.log(IDERegister.componentsList);
    }
  }

  static getComponentInfo(componentName: string) {
    return IDERegister.componentsList[componentName] || {};
  }

  static registerSchemaConverter(converter: ISchemaConverter) {
    const mocker = DataMocker.getInstance();
    mocker.schemaCoverter = converter;
  }
}
