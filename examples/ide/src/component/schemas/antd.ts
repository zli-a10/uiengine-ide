export default [
  {
    id: 'general', // prefix
    title: 'General',
    children: [
      {
        component: 'antd:Icon',
        title: 'Icon',
        isContainer: false,
        schema: {
          type: 'string',
          theme: ['filled', 'outlined', 'outlined']
        }
      },
      {
        component: 'antd:Typography',
        title: 'Typography',
        isContainer: false,
        schema: {}
      },
      {
        component: 'antd:Button',
        title: 'Button',
        isContainer: false,
        schema: {
          content: 'string',
          disabled: 'string',
          size: ['small', 'large'],
          loading: 'boolean|number',
          type: ['primary', 'dashed', 'danger', 'link'],
          shape: ['circle', 'round'],
          icon: 'icon',
          events: ['onClick']
        },
        defaultProps: {
          content: 'Button'
        }
      }
    ]
  },
  {
    id: 'grid', // prefix
    title: 'Grid',
    children: [
      {
        component: 'antd:Row',
        title: 'Row',
        isContainer: true,
        schema: {
          gutter: [{ types: ['xs', 'sm', 'md'] }, { range: [1, 24] }],
          align: [{ default: 'top' }, { options: ['top', 'middle', 'bottom'] }],
          justify: [
            {
              options: [
                'start',
                'end',
                'center',
                'space-around',
                'space-between'
              ]
            }
          ]
        }
      },
      {
        component: 'antd:Col',
        title: 'Column',
        isContainer: true,
        schema: {
          span: [1, 24],
          type: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
          offset: 'number'
        }
      },
      {
        component: 'antd:Layout',
        title: 'Layout',
        isContainer: true,
        schema: {
          className: 'string',
          hasSider: 'boolean'
        }
      },
      {
        component: 'antd:Layout.Header',
        title: 'Header',
        isContainer: true,
        schema: {
          className: 'string',
          hasSider: 'boolean'
        }
      },
      {
        component: 'antd:Layout.Footer',
        title: 'Footer',
        isContainer: true,
        schema: {
          className: 'string',
          hasSider: 'boolean'
        }
      },
      {
        component: 'antd:Layout.Sider',
        title: 'Sider',
        isContainer: true,
        schema: {
          className: 'string',
          collapsed: 'boolean',
          collapsedWidth: 'number',
          collapsible: 'boolean',
          defaultCollapsed: 'boolean',
          reverseArrow: 'boolean',
          theme: ['light', 'dark']
        }
      },
      {
        component: 'antd:Layout.Content',
        title: 'Content',
        isContainer: true,
        schema: {
          className: 'string',
          hasSider: 'boolean'
        }
      }
    ]
  },
  {
    id: 'navigator', // prefix
    title: 'Navigator',
    children: [
      {
        component: 'antd:Affix',
        title: 'affix',
        isContainer: false,
        schema: {
          offsetBottom: 'number',
          offsetTop: 'number',
          events: ['onChange']
        }
      },
      {
        component: 'antd:Breadcrumb',
        title: 'Breadcrumb',
        isContainer: false,
        schema: {
          separator: 'string'
        },
        children: [
          {
            component: 'antd:Breadcrumb.Item',
            title: 'Item',
            isContainer: false,
            schema: {
              href: 'string',
              events: ['onClick']
            }
          },
          {
            component: 'antd:Breadcrumb.Separator',
            title: 'Separator',
            isContainer: false,
            schema: {
              children: 'string'
            }
          }
        ]
      },
      {
        component: 'antd:Dropdown',
        title: 'Dropdown',
        isContainer: false,
        schema: {
          disabled: 'boolean',
          overlayClassName: 'string',
          placement: [
            'bottomLeft',
            'bottomCenter',
            'bottomRight',
            'topLeft',
            'topCenter',
            'topRight'
          ],
          visible: 'boolean'
        },
        children: [
          {
            component: 'antd:Dropdown.Button',
            title: 'Button',
            isContainer: false,
            schema: {
              disabled: 'boolean',
              icon: 'component',
              overlay: 'component',
              placement: 'string',
              size: 'string',
              type: 'string',
              visible: 'boolean',
              events: ['onClick', 'onVisibleChange']
            }
          }
        ]
      },
      {
        component: 'antd:Menu',
        title: 'Menu',
        isContainer: true,
        schema: {
          defaultOpenKeys: 'string[]',
          defaultSelectedKeys: 'string[]',
          inlineCollapsed: 'boolean',
          mode: ['vertical', 'horizontal', 'inline'],
          multiple: 'boolean',
          openKeys: 'string[]',
          selectable: 'boolean',
          selectedKeys: 'string[]',
          theme: ['light', 'dark'],
          events: [
            'onClick',
            'onDeselect',
            'onOpenChange',
            'onSelect',
            'overflowedIndicator'
          ]
        },
        children: [
          {
            component: 'antd:Menu.Item',
            title: 'Item',
            isContainer: true,
            schema: {
              disabled: 'boolean',
              key: 'string',
              title: 'string'
            }
          },
          {
            component: 'antd:Menu.SubMenu',
            title: 'SubMenu',
            isContainer: true,
            schema: {
              popupClassName: 'string',
              disabled: 'boolean',
              key: 'string',
              title: 'string',
              children: 'component',
              events: ['onTitleClick']
            }
          },
          {
            component: 'antd:Menu.ItemGroup',
            title: 'ItemGroup',
            isContainer: false,
            schema: {
              title: 'string',
              children: 'component'
            }
          },
          {
            component: 'antd:Menu.Divider',
            title: 'Divider',
            isContainer: false,
            schema: {}
          }
        ]
      },
      {
        component: 'antd:Pagination',
        title: 'Pagination',
        isContainer: false,
        schema: {
          current: 'number',
          defaultCurrent: 'number',
          defaultPageSize: 'number',
          pageSize: 'number',
          total: 'number',
          disabled: 'boolean',
          hideOnSinglePage: 'boolean',
          showLessItems: 'boolean',
          showSizeChanger: 'boolean',
          simple: 'boolean',
          pageSizeOptions: 'string[]',
          events: ['onChange', 'onShowSizeChange']
        }
      },
      {
        component: 'antd:PageHeader',
        title: 'PageHeader',
        isContainer: true,
        schema: {
          title: 'component',
          subTitle: 'component',
          breadcrumb: 'component',
          footer: 'component',
          events: ['onBack']
        }
      },
      {
        component: 'antd:Steps',
        title: 'Steps',
        isContainer: false,
        schema: {
          className: 'string',
          type: ['default', 'navigation'],
          current: 'number',
          direction: 'string',
          labelPlacement: 'string',
          size: 'string',
          status: 'string',
          initial: 'number',
          events: ['onChange']
        },
        children: [
          {
            component: 'antd:Steps.Step',
            title: 'Steps.Step',
            isContainer: false,
            schema: {
              description: 'string',
              icon: 'string',
              status: 'string',
              disabled: 'boolean',
              title: 'component',
              subTitle: 'component'
            }
          }
        ]
      }
    ]
  },

  {
    id: 'data-input', // prefix
    title: 'Data Input',
    children: [
      {
        component: 'antd:Form',
        title: 'Form',
        isContainer: true,
        schema: {
          layout: ['horizontal', 'vertical', 'inline'],
          labelAlign: ['left', 'right'],
          labelCol: [{ span: 'number' }, { offset: 'number' }],
          hideRequiredMark: 'boolean'
        },
        children: [
          {
            component: 'antd:Form.Item',
            title: 'Item',
            isContainer: true,
            schema: {
              extra: 'string',
              label: 'string',
              labelCol: [{ span: 'number' }, { offset: 'number' }],
              required: 'boolean',
              htmlFor: 'string',
              hasFeedback: 'boolean'
            },
            defaultProps: {
              label: 'Lable Name',
              required: true
            }
          }
        ]
      },
      {
        component: 'antd:Input',
        title: 'Input',
        isContainer: false,
        schema: {
          defaultValue: 'string',
          prefix: 'string',
          suffix: 'string',
          disabled: 'boolean',
          addonAfter: 'component',
          addonBefore: 'component',
          events: ['onChange', 'onPressEnter']
        },
        children: [
          {
            component: 'antd:Input.Password',
            title: 'Password',
            isContainer: false,
            schema: {
              visibilityToggle: 'boolean'
            }
          },
          {
            component: 'antd:Input.TextArea',
            title: 'TextArea',
            isContainer: false,
            schema: {
              autoSize: 'boolean',
              allowClear: 'boolean',
              events: ['onPressEnter']
            }
          },
          {
            component: 'antd:Input.Group',
            title: 'Group',
            isContainer: false,
            schema: {
              defaultValue: 'string',
              prefix: 'string',
              suffix: 'string',
              disabled: 'boolean',
              addonAfter: 'component',
              addonBefore: 'component',
              events: ['onChange', 'onPressEnter']
            }
          },
          {
            component: 'antd:InputNumber',
            title: 'InputNumber',
            isContainer: false,
            schema: {
              autoFocus: 'boolean',
              defaultValue: 'number',
              disabled: 'boolean',
              formatter: 'string',
              max: 'number',
              min: 'number',
              precision: 'number',
              decimalSeparator: 'string',
              size: 'string',
              step: 'number',
              value: 'number',
              events: ['onChange', 'onChange']
            }
          },
          {
            component: 'antd:Input.Search',
            title: 'Search',
            isContainer: false,
            schema: {
              enterButton: 'boolean',
              loading: 'boolean',
              events: ['onSearch']
            }
          }
        ]
      },

      {
        component: 'antd:AutoComplete',
        title: 'AutoComplete',
        isContainer: false,
        schema: {
          allowClear: 'boolean',
          autoFocus: 'boolean',
          backfill: 'boolean',
          disabled: 'boolean',
          placeholder: 'string',
          value: [{ key: 'string' }, { label: 'string' }],
          open: 'boolean',
          defaultOpen: 'boolean',
          events: [
            'onBlur',
            'onChange',
            'onFocus',
            'onSearch',
            'onSelect',
            'onDropdownVisibleChange'
          ]
        }
      },
      {
        component: 'antd:Checkbox',
        title: 'Checkbox',
        isContainer: false,
        schema: {
          autoFocus: 'boolean',
          checked: 'boolean',
          defaultChecked: 'boolean',
          disabled: 'boolean',
          indeterminate: 'boolean',
          events: ['onChange']
        },
        defaultProps: {
          $valueKey: 'checked'
        }
      },
      {
        component: 'antd:Cascader',
        title: 'Cascader',
        isContainer: false,
        schema: {
          allowClear: 'boolean',
          autoFocus: 'boolean',
          changeOnSelect: 'boolean',
          disabled: 'boolean',
          popupVisible: 'boolean',
          showSearch: 'boolean',
          className: 'string',
          defaultValue: 'string[]',
          notFoundContent: 'string',
          placeholder: 'string',
          popupClassName: 'string',
          size: ['large ', 'default', 'small'],
          style: 'string',
          value: 'string[]',
          popupPlacement: ['bottomLeft', 'bottomRight', 'topLeft', 'topRight']
        }
      },
      {
        component: 'antd:DataPicker',
        title: 'DataPicker',
        isContainer: false,
        schema: {
          defaultValue: 'string',
          defaultPickerValue: 'string',
          format: 'string',
          showToday: 'boolean',
          value: 'string',
          events: ['onChange', 'onOk', 'onPanelChange']
        }
      },

      {
        component: 'antd:Mentions',
        title: 'Mentions',
        isContainer: false,
        schema: {
          autoFocus: 'boolean',
          defaultValue: 'string',
          placement: ['top', 'bottom'],
          prefix: 'string',
          split: 'string',
          value: 'string',
          events: ['onChange', 'onSelect', 'onSearch', 'onFocus', 'onBlur']
        }
      },
      {
        component: 'antd:Rate',
        title: 'Rate',
        isContainer: false,
        schema: {
          allowClear: 'boolean',
          allowHalf: 'boolean',
          autoFocus: 'boolean',
          disabled: 'boolean',
          count: 'number',
          defaultValue: 'number',
          value: 'number',
          character: 'string',
          events: [
            'onBlur',
            'onChange',
            'onFocus',
            'onHoverChange',
            'onKeyDown'
          ]
        }
      },
      {
        component: 'antd:Radio.Group',
        title: 'RadioGroup',
        isContainer: true,
        schema: {
          defaultValue: 'any',
          name: 'string',
          size: ['default', 'small', 'large'],
          value: 'any',
          events: ['onChange']
        },
        children: [
          {
            component: 'antd:Radio',
            title: 'Radio',
            isContainer: false,
            schema: {
              content: 'string',
              autoFocus: 'boolean',
              checked: 'boolean',
              defaultChecked: 'boolean',
              value: 'any'
            },
            defaultProps: {
              $valueKey: 'checked'
            }
          }
        ]
      },
      {
        component: 'antd:Switch',
        title: 'Switch',
        isContainer: false,
        schema: {
          autoFocus: 'boolean',
          checked: 'boolean',
          defaultChecked: 'boolean',
          disabled: 'boolean',
          loading: 'boolean',
          size: ['default', 'small'],
          className: 'string',
          unCheckedChildren: 'string',
          events: ['onChange', 'onClick']
        },
        defaultProps: {
          $valueKey: 'checked'
        }
      },
      {
        component: 'antd:Sider',
        title: 'Sider',
        isContainer: false,
        schema: {
          allowClear: 'boolean',
          disabled: 'boolean',
          dots: 'boolean',
          included: 'boolean',
          range: 'boolean',
          vertical: 'boolean',
          tooltipVisible: 'boolean',
          defaultValue: 'number[]',
          max: 'number',
          min: 'number',
          step: 'number',
          value: 'number'
        }
      },
      {
        component: 'antd:Select',
        title: 'Select',
        isContainer: false,
        schema: {
          allowClear: 'boolean',
          autoClearSearchValue: 'boolean',
          autoFocus: 'boolean',
          defaultActiveFirstOption: 'boolean',
          disabled: 'boolean',
          dropdownMatchSelectWidth: 'boolean',
          labelInValue: 'boolean',
          showArrow: 'boolean',
          showSearch: 'boolean',
          defaultOpen: 'boolean',
          open: 'boolean',
          loading: 'boolean',
          defaultValue: 'string',
          dropdownClassName: 'string',
          firstActiveValue: 'string',
          maxTagCount: 'number',
          maxTagTextLength: 'number',
          mode: ['multiple', 'tags'],
          notFoundContent: 'string',
          optionFilterProp: 'string',
          optionLabelProp: 'string',
          placeholder: 'string',
          searchValue: 'string',
          size: 'string',
          events: [
            'onBlur',
            'onChange',
            'onDeselect',
            'onFocus',
            'onSearch',
            'onSelect'
          ]
        }
      },
      {
        component: 'antd:TreeSelect',
        title: 'TreeSelect',
        isContainer: false,
        schema: {
          value: 'string',
          defaultValue: 'string',
          disabled: 'boolean',
          multiple: 'boolean',
          placeholder: 'string',
          searchValue: 'string',
          showSearch: 'boolean',
          size: 'string',
          treeCheckable: 'boolean',
          events: ['onTreeExpand', 'onChange', 'onSearch', 'onSelect']
        }
      },
      {
        component: 'antd:Transfer',
        title: 'Transfer',
        isContainer: false,
        schema: {
          className: 'string',
          disabled: 'boolean',
          showSearch: 'boolean',
          showSelectAll: 'boolean',
          targetKeys: 'string',
          events: ['onScroll', 'onChange', 'onSearch', 'onSelectChange']
        }
      },
      {
        component: 'antd:TimePicker',
        title: 'TimePicker',
        isContainer: false,
        schema: {
          value: 'string',
          use12Hours: 'boolean',
          format: 'string',
          defaultValue: 'string',
          events: ['onChange', 'onOpenChange']
        }
      },
      {
        component: 'antd:Upload',
        title: 'Upload',
        isContainer: false,
        schema: {
          directory: 'boolean',
          fileList: 'object[]',
          multiple: 'boolean',
          name: 'string',
          openFileDialogOnClick: 'boolean',
          events: ['onChange', 'onPreview', 'onRemove  ']
        }
      }
    ]
  },
  {
    id: 'data-display', // prefix
    title: 'Data Display',
    children: [
      {
        component: 'antd:Avatar',
        title: 'Avatar',
        isContainer: false,
        schema: {
          src: 'string',
          srcSet: 'string',
          alt: 'string',
          shape: ['circle', 'square'],
          size: ['large', 'small', 'default'],
          events: ['onError']
        }
      },
      {
        component: 'antd:Badge',
        title: 'Badge',
        isContainer: false,
        schema: {
          color: 'string',
          title: 'string',
          text: 'string',
          dot: 'boolean',
          showZero: 'boolean',
          status: ['success', 'processing', 'default', 'error', 'warning']
        }
      },
      {
        component: 'antd:Comment',
        title: 'Comment',
        isContainer: false,
        schema: {
          datetime: 'string',
          content: 'string'
        }
      },
      {
        component: 'antd:Collapse',
        title: 'Collapse',
        isContainer: true,
        schema: {
          activeKey: 'string',
          accordion: 'boolean',
          destroyInactivePanel: 'boolean',
          events: ['onChange']
        }
      },
      {
        component: 'antd:Carousel',
        title: 'Carousel',
        isContainer: true,
        schema: {
          autoplay: 'boolean',
          dots: 'boolean',
          easing: 'string',
          dotPosition: ['top', 'bottom', 'left', 'right']
        }
      },
      {
        component: 'antd:Card',
        title: 'Card',
        isContainer: true,
        schema: {
          type: 'string',
          size: ['default', 'small'],
          loading: 'boolean',
          events: ['onTabChange']
        }
      },
      {
        component: 'antd:Calendar',
        title: 'Calendar',
        isContainer: false,
        schema: {
          value: 'string',
          mode: 'string',
          events: ['onPanelChange', 'onSelect', 'onChange']
        }
      },
      {
        component: 'antd:Descriptions',
        title: 'Descriptions',
        isContainer: false,
        schema: {
          layout: ['horizontal', 'vertical'],
          size: ['default', 'middle', 'small'],
          colon: 'boolean',
          column: 'number',
          bordered: 'boolean'
        }
      },
      {
        component: 'antd:Empty',
        title: 'Empty',
        isContainer: true,
        schema: {
          description: 'string',
          image: 'string'
        }
      },
      {
        component: 'antd:List',
        title: 'List',
        isContainer: true,
        schema: {
          bordered: 'boolean',
          footer: 'string',
          header: 'string',
          itemLayout: 'string',
          pagination: 'boolean',
          size: ['default', 'middle', 'small'],
          split: 'boolean'
        }
      },
      {
        component: 'antd:Popover',
        title: 'Popover',
        isContainer: false,
        schema: {
          content: 'string',
          title: 'string'
        }
      },
      {
        component: 'antd:Statistic',
        title: 'Statistic',
        isContainer: false,
        schema: {
          decimalSeparator: 'string',
          precision: 'number',
          value: 'string',
          prefix: 'string',
          suffix: 'string'
        }
      },
      {
        component: 'antd:Tree',
        title: 'Tree',
        isContainer: false,
        schema: {
          autoExpandParent: 'boolean',
          blockNode: 'boolean',
          checkable: 'boolean',
          checkStrictly: 'boolean',
          defaultExpandAll: 'boolean',
          defaultExpandParent: 'boolean',
          disabled: 'boolean',
          draggable: 'boolean',
          multiple: 'boolean',
          selectable: 'boolean',
          showIcon: 'boolean',
          showLine: 'boolean',
          checkedKeys: 'string[]',
          defaultCheckedKeys: 'string[]',
          defaultExpandedKeys: 'string[]',
          defaultSelectedKeys: 'string[]',
          expandedKeys: 'string[]',
          selectedKeys: 'string[]',
          events: [
            'onCheck',
            'onDragEnd',
            'onDragEnter',
            'onDragLeave',
            'onDragOver',
            'onDragStart',
            'onDrop',
            'onExpand',
            'onLoad',
            'onRightClick',
            'onSelect'
          ]
        }
      },
      {
        component: 'antd:Tooltip',
        title: 'Tooltip',
        isContainer: false,
        schema: {
          arrowPointAtCenter: 'boolean',
          autoAdjustOverflow: 'boolean',
          defaultVisible: 'boolean',
          mouseEnterDelay: 'number',
          mouseLeaveDelay: 'number',
          overlayClassName: 'string',
          placement: [
            'top',
            'left',
            'right',
            'bottom',
            'topLeft',
            'topRight',
            'bottomLeft',
            'bottomRight',
            'leftTop',
            'leftBottom',
            'rightTop',
            'rightBottom'
          ],
          trigger: ['hover', 'focus', 'click', 'contextMenu'],
          visible: 'boolean',
          destroyTooltipOnHide: 'boolean'
        }
      },
      {
        component: 'antd:Timeline',
        title: 'Timeline',
        isContainer: false,
        schema: {
          mode: ['left', 'alternate', 'right'],
          reverse: 'boolean'
        }
      },
      {
        component: 'antd:Tag',
        title: 'Tag',
        isContainer: false,
        schema: {
          visible: 'boolean',
          color: 'string',
          closable: 'boolean',
          events: ['onClose']
        }
      },
      {
        component: 'antd:Tabs',
        title: 'Tabs',
        isContainer: false,
        schema: {
          activeKey: 'string',
          defaultActiveKey: 'string',
          size: 'string',
          tabPosition: ['top', 'right', 'bottom', 'left'],
          type: ['line', 'card', 'editable-card'],
          events: [
            'onChange',
            'onEdit',
            'onNextClick',
            'onPrevClick',
            'onTabClick'
          ]
        }
      },
      {
        component: 'antd:Table',
        title: 'Table',
        preview: 'https://image.flaticon.com/icons/svg/25/25617.svg',
        isContainer: false,
        schema: {
          bordered: 'boolean',
          childrenColumnName: 'string[]',
          dataSource: 'any[]',
          defaultExpandAllRows: 'boolean',
          defaultExpandedRowKeys: 'string[]',
          expandedRowKeys: 'string[]',
          expandRowByClick: 'boolean',
          indentSize: 'number',
          showHeader: 'boolean',
          size: ['default', 'middle', 'small'],
          events: [
            'onChange',
            'onExpand',
            'onExpandedRowsChange',
            'onHeaderRow',
            'onRow'
          ]
        }
      }
    ]
  },
  {
    id: 'feedback', // prefix
    title: 'Feedback',
    children: [
      {
        component: 'antd:Alert',
        title: 'Alert',
        isContainer: false,
        schema: {
          banner: 'boolean',
          closable: 'boolean',
          showIcon: 'boolean',
          type: ['success', 'info', 'warning', 'error'],
          message: 'string',
          closeText: 'string',
          description: 'string',
          events: ['onClose']
        }
      },
      {
        component: 'antd:Drawer',
        title: 'Drawer',
        isContainer: false,
        schema: {
          closable: 'boolean',
          destroyOnClose: 'boolean',
          maskClosable: 'boolean',
          mask: 'boolean',
          visible: 'boolean',
          keyboard: 'boolean',
          title: 'string',
          width: 'string',
          height: 'string',
          className: 'string',
          zIndex: 'number',
          placement: ['top', 'bottom', 'left', 'right'],
          events: ['onClose']
        }
      },
      {
        component: 'antd:Modal',
        title: 'Modal',
        isContainer: false,
        schema: {
          centered: 'boolean',
          closable: 'boolean',
          confirmLoading: 'boolean',
          destroyOnClose: 'boolean',
          forceRender: 'boolean',
          maskClosable: 'boolean',
          mask: 'boolean',
          visible: 'boolean',
          zIndex: 'number',
          wrapClassName: 'string',
          width: 'string',
          title: 'string',
          okType: 'string',
          okText: 'string',
          cancelText: 'string',
          events: ['onCancel', 'onOk']
        }
      },
      {
        component: 'antd:Message',
        title: 'Message',
        isContainer: false,
        schema: {
          duration: 'number',
          content: 'string',
          events: ['onClose']
        }
      },
      {
        component: 'antd:Notification',
        title: 'Notification',
        isContainer: false,
        schema: {
          description: 'string',
          duration: 'number',
          message: 'string',
          placement: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
          events: ['onClick', 'onClose']
        }
      },
      {
        component: 'antd:Progress',
        title: 'Progress',
        isContainer: false,
        schema: {
          type: ['line', 'circle', 'dashboard'],
          percent: 'number',
          showInfo: 'boolean',
          status: ['success', 'exception', 'normal', 'active'],
          strokeLinecap: ['round', 'spare'],
          strokeColor: 'string',
          successPercent: 'number'
        }
      },
      {
        component: 'antd:Popconfirm',
        title: 'Popconfirm',
        isContainer: false,
        schema: {
          cancelText: 'string',
          okText: 'string',
          okType: 'string',
          title: 'string',
          disabled: 'boolean',
          events: ['onCancel', 'onConfirm']
        }
      },
      {
        component: 'antd:Result',
        title: 'Result',
        isContainer: false,
        schema: {
          title: 'component',
          subTitle: 'component',
          extra: 'component',
          status: ['success', 'warning', 'error', 'info', '404', '403', '500']
        }
      },
      {
        component: 'antd:Spin',
        title: 'Spin',
        isContainer: false,
        schema: {
          delay: 'number',
          size: ['small', 'default', 'large'],
          spinning: 'boolean',
          wrapperClassName: 'string',
          tip: 'string'
        }
      },
      {
        component: 'antd:Skeleton',
        title: 'Skeleton',
        isContainer: false,
        schema: {
          active: 'boolean',
          avatar: 'boolean',
          loading: 'boolean',
          paragraph: 'boolean',
          title: 'boolean'
        }
      }
    ]
  },
  {
    id: 'other', // prefix
    title: 'Other',
    children: [
      {
        component: 'antd:Anchor',
        title: 'Anchor',
        isContainer: false,
        schema: {
          affix: 'boolean',
          bounds: 'number',
          offsetBottom: 'number',
          offsetTop: 'number',
          targetOffset: 'number',
          showInkInFixed: 'boolean'
        }
      },
      {
        component: 'antd:BackTop',
        title: 'BackTop',
        isContainer: false,
        schema: {
          target: 'component',
          visibilityHeight: 'number',
          events: ['onClick']
        }
      },
      {
        component: 'antd:ConfigProvider',
        title: 'ConfigProvider',
        isContainer: false,
        schema: {
          autoInsertSpaceInButton: 'boolean',
          prefixCls: 'string'
        }
      },
      {
        component: 'antd:Divider',
        title: 'Divider',
        isContainer: false,
        schema: {
          className: 'string',
          dashed: 'boolean',
          orientation: ['left', 'right'],
          type: ['horizontal', 'vertical']
        }
      }
    ]
  }
]
