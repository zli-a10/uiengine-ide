import * as React from "react";
import { TooltipPlacement, AdjustOverflow } from "antd/lib/tooltip";
import { Popover, Divider } from "antd";
const { MoreVertical } = require("react-feather");
export interface IDropdownMenuProps {
  title: string;
  menu: JSX.Element[];
  trigger?: "hover" | "focus" | "click";
  placement?: TooltipPlacement;
  style?: React.CSSProperties;
  overlayClassName?: string;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean | AdjustOverflow;
  onClick?: (Component: JSX.Element, index: number) => void;
}
export interface IDropdownMenuState {
  visible: boolean;
  currentVal: any;
}

export class DropdownMenu extends React.Component<
  IDropdownMenuProps,
  IDropdownMenuState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      currentVal: null
    };
  }

  onClick = (Component: JSX.Element, index: number) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(Component, index);
    }
    this.setState({ visible: false });
  };

  onVisibleChange = (visible: boolean) => {
    this.setState({ visible });
  };

  renderContent = () => {
    const { menu } = this.props;
    const contentItems: any[] = [];
    menu.reduce((result: any[], Component: JSX.Element, index: number) => {
      const type = menu[index].type;
      if (type === Divider) {
        return result;
      } else if (type === "hr") {
        result.push(<Component.type {...Component.props} />);
      } else {
        const nextItem = menu.length > index + 1 && menu[index + 1].type;
        const hasDivider = nextItem === Divider;
        result.push(
          <li
            key={index}
            className={hasDivider ? "-contextmenu-popover-divider" : ""}
            onClick={this.onClick.bind(this, Component, result.length)}
          >
            <Component.type {...Component.props} />
          </li>
        );
      }

      return result;
    }, contentItems);
    return <ul className="-dropdown-menu-popover-list">{contentItems}</ul>;
  };

  render() {
    const {
      trigger = "click",
      placement = "bottom",
      style = {},
      overlayClassName,
      arrowPointAtCenter,
      autoAdjustOverflow
    } = this.props;
    return (
      <div className="-dropdown-menu">
        <span style={style}>{this.props.title}</span>
        <Popover
          className="-dropdown-menu-popover"
          content={this.renderContent()}
          trigger={trigger}
          overlayClassName={overlayClassName}
          arrowPointAtCenter={arrowPointAtCenter}
          autoAdjustOverflow={autoAdjustOverflow}
          onVisibleChange={this.onVisibleChange}
          visible={this.state.visible}
          placement={placement}
        >
          <MoreVertical
            className="-dropdown-menu-more"
            style={{ ...style, width: 20, height: 20 }}
          />
        </Popover>
      </div>
    );
  }
}
