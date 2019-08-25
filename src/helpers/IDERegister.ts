import _ from "lodash";

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

          // cache list
          inputComponentInfo.children.forEach(
            (componentInfo: IComponentInfo) => {
              const component = componentInfo.component;
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
}
