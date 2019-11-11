export default {
  row: {
    component: 'my:Layout.Row',
    props: {
      gutter: 16,
      type: 'flex',
      align: 'top',
      style: {
        display: 'flex',
        flex: 1
      }
    }
  },
  col: {
    component: 'my:Layout.Col',
    props: {
      style: { flex: 1 }
    }
  },
  empty: {
    component: 'div',
    props: {
      id: 'uiengine-container'
    },
    children: []
  }
}
