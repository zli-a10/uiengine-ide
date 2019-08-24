export const configLayoutWrappers: IConfigWrappers = {
  row: {
    component: "div",
    props: {
      className: "ide-wrapper-row"
    }
  },
  col: {
    component: "div",
    props: {
      className: "ide-wrapper-col"
    }
  }
};

export const defaultEmptyLayoutSchema = {
  component: "antd:Layout",
  children: [
    {
      component: "antd:Layout.Content",
      children: []
    }
  ]
};
