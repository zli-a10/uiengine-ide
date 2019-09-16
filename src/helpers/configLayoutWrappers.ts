// export const configLayoutWrappers: IConfigWrappers = {
//   row: {
//     component: "ide:Row",
//     props: {
//       className: "ide-wrapper-row"
//     }
//   },
//   col: {
//     component: "ide:Col",
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
      align: "top",
      style: {
        display: "flex"
      }
    }
  },
  col: {
    component: "antd:Col",
    props: {
      style: { flex: 1 }
    }
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
