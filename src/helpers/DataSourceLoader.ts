import * as _ from "lodash";

const getDataSource = (
  dataTree: any,
  keys: string[],
  fileName: string,
  parentKey?: string
) => {
  const [firstKey, ...otherKeys] = keys;
  const existItem = _.find(dataTree, (item: any) => {
    return item.title === firstKey;
  }) as { name: string; children: any; files: string[]; file: string };
  const value = parentKey ? `${parentKey}.${firstKey}` : firstKey;

  if (!existItem) {
    // const value = keys.slice(0, keys.indexOf(firstKey) + 1).join(".");
    dataTree.push({
      component: "div",
      files: [fileName],
      type: "file",
      id: value,
      value: `${value}:`,
      title: firstKey,
      ...(otherKeys.length > 0
        ? { children: getDataSource([], otherKeys, fileName, value) }
        : { file: fileName })
    });
  } else {
    if (otherKeys.length > 0) {
      existItem.children = getDataSource(
        existItem.children || [],
        otherKeys,
        fileName,
        value
      );
    } else {
      existItem.file = fileName;
    }
    existItem.files = [fileName, ...existItem.files];
  }
  return dataTree;
};

export const analysisDataSource = (dataSource: any) => {
  let dataTree: any = [];
  dataSource.forEach((item: any) => {
    const { name } = item;
    const nameKeys = _.split(_.replace(name, ".json", ""), ".");
    dataTree = getDataSource(dataTree, nameKeys, name);
  });

  // console.log(dataTree, "data tree");
  return dataTree;
};
