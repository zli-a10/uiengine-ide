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
  props: {
    className: "layout"
  },
  children: [
    {
      component: "antd:Layout.Content",
      children: [
        {
          component: "antd:Row",
          props: {
            span: 24,
            gutter: 16
          },
          children: [
            {
              component: "antd:Col",
              props: {
                span: 24
              },
              children: []
            }
          ]
        }
      ]
    }
  ]
};
