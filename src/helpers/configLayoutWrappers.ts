// export const configLayoutWrappers: IConfigWrappers = {
//   row: {
//     component: "div",
//     props: {
//       className: "ide-wrapper-row"
//     }
//   },
//   col: {
//     component: "div",
//     props: {
//       className: "ide-wrapper-col"
//     }
//   }
// };

export const configLayoutWrappers: IConfigWrappers = {
  row: {
    component: "antd:Row",
    props: {
      gutter: 16,
      type: "flex",
      align: "top"
    }
  },
  col: {
    component: "antd:Col",
    props: {}
  }
};

export const defaultEmptyLayoutSchema = {
  component: "div",
  props: {
    className: "uiengine-container",
    id: "uiengine-container"
  },
  children: []

  // children: [
  //   {
  //     component: "antd:Layout.Content",
  //     children: []
  //   }
  // ]
};
