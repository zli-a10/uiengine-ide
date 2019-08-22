import _ from "lodash";

export class IDERegister {
  static componentsLibrary: any = [];

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
                  id: componentInfo.id
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
        }
      );
    }
  }
}
