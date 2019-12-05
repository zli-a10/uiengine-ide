import React, { useState } from 'react';
import _ from 'lodash';
import { Icon } from 'antd';
import Tour from 'reactour';
// import steps from "./steps";
const timeout = (ms: number) => new Promise(res => setTimeout(res, ms));
const steps = [
  {
    selector:
      '#root > div.ide-editor > div.manager > div.pages > div > div.ant-tabs-bar.ant-tabs-top-bar > div > div > div > div > div:nth-child(1) > div.ant-tabs-tab-active.ant-tabs-tab',
    content: (params: any) => {
      return (
        <div className="tour-tips">
          <div className="describe">
            <strong>Schemas</strong> has two parts,
            <ol>
              <li>
                Templates stores many generally used template, like List page,
                Form page, Wizard Page, it helps us unify the content layout,
                don`t try to create a template at here, it`s readonly.
              </li>
              <li>
                Pages we could say schema sections, could contains each other
                directly, we can manully create them or use DnD to create them
              </li>
            </ol>
          </div>
          <div className="tip">
            <Icon type="bulb" className="icon" /> Try to
            <ol>
              <li>
                Create/Delete/Clone a page by hovering the Menu icon, and click
                the menu items.
              </li>
              <li>
                Drag an page item to the Drawing Board directly, it will treat
                as a schema template to reuse it
              </li>
            </ol>
          </div>
        </div>
      );
    }
  },
  {
    selector:
      '#root > div.ide-editor > div.manager > div.pages > div > div.ant-tabs-bar.ant-tabs-top-bar > div > div > div > div > div:nth-child(1) > div:nth-child(2)',
    content: (params: any) => {
      return (
        <div className="tour-tips">
          <div className="describe">
            <strong>Resources</strong> are source code loaded from your source
            code and stored back by Websocket, you can directly edit them on the
            browser.
          </div>
          <div className="tip">
            <Icon type="bulb" className="icon" /> Expand any item, and click a
            Node, turns to right Code Editor, see the file source
          </div>
        </div>
      );
    },
    action: (node: any) => {
      node.click();
    }
  },
  {
    selector:
      '#root > div.ide-editor > div.manager > div.widgets > div > div.ant-tabs-bar.ant-tabs-top-bar > div > div > div > div > div:nth-child(1) > div.ant-tabs-tab-active.ant-tabs-tab',
    content: (params: any) => {
      return (
        <div className="tour-tips">
          <div className="describe">
            Components listed all the components you would like used to the
            project.
          </div>
          <div className="tip">
            <Icon type="bulb" className="icon" /> Try to drag a component to the
            Drawingboard on the right
          </div>
        </div>
      );
    }
  },
  {
    selector:
      '#root > div.ide-editor > div.manager > div.widgets > div > div.ant-tabs-bar.ant-tabs-top-bar > div > div > div > div > div:nth-child(1) > div:nth-child(2)',
    content: (params: any) => {
      return (
        <div className="tour-tips">
          <div className="describe">
            DataSources correspond to UIEngine's data schema, here we read all
            the datasources from the example datasources folder which served by
            the websocket server.
          </div>
          <div className="tip">
            <Icon type="bulb" className="icon" /> Try to drag a Datasource(both
            tree folder and leaves) to the Drawingboard
          </div>
        </div>
      );
    },
    action: (node: any) => node.click()
  },
  {
    selector:
      '#root > div.ide-editor > div.ant-tabs.ant-tabs-top.ant-tabs-card.ant-tabs-editable-card.ant-tabs-no-animation > div.ant-tabs-bar.ant-tabs-top-bar.ant-tabs-card-bar > div > div > div > div > div:nth-child(1) > div > div',
    content: (params: any) => {
      return (
        <div className="tour-tips">
          <div className="describe">
            Drawingboard can help you build your GUI page layout, you can drag &
            drop resource from right panels(whatever Components, Datasource,
            Schemas).
          </div>
          <div className="tip">
            <Icon type="bulb" className="icon" /> Drag and Drop Tips:
            <ol>
              <li>
                Try to drag Components to add new component to the Drawingboard
              </li>
              <li>
                Try to drag an existing schemas to the Drawingboard, this can
                help us reuse the created schema
              </li>
              <li>
                Try to drag Datasource Tree or Node to the Drawingboard, this
                can help us create the mockups faster
              </li>
            </ol>
          </div>
        </div>
      );
    },
    action: (node: any) => node.click()
  },
  {
    selector: '#drawingboard > div.wrapper.with-datasource.wrapper-container > section > div > main > div > div.ant-row > div > div.ant-col.ant-col-24 > div > form > div:nth-child(1)',
    content: (params: any) => {
      return (
        <div className="tour-tips">
          <div className="describe">
            Drawingboard editing area, all the actions operated on the
            drawingboard will refresh the UISchema in time.
          </div>
          <div className="tip">
            <Icon type="bulb" className="icon" /> Operation Tips:
            <ol>
              <li>Drag and Drop one element to another</li>
              <li>Click this item to select this item to edit</li>
            </ol>
          </div>
        </div>
      );
    }
  },
  {
    selector: '#drawingboard > div > div.sandbox > div:nth-child(2) > div > div.component-name > i',
    content: (params: any) => {
      return (
        <div className="tour-tips">
          <div className="describe">
            Element Tag helps us know the element's name, component, and
            dependency relations
          </div>
          <div className="describe">
            Operation Tips:
            <ol>
              <li>Mouse over the Element Tag to see full info</li>
              <li>
                Mouse over to the Element Tag show out the Element operation
                actions menu
              </li>
              <li>Click the Element Tag to open Prop Window</li>
            </ol>
            <div className="tip">
              <Icon type="bulb" className="icon" /> Now try to click the Element
              Tag to open Prop Window
            </div>
          </div>
        </div>
      );
    },
    // observe: '#root > div.ide-editor',
    action: (node: any) => node.click()
  },
  {
    selector: '#prop-manager',
    content: (params: any) => {
      return (
        <div className="tour-tips">
          <div className="describe">
            Properties manager window, work with Debug & Release Tabs, at this
            part.
          </div>
          <i className="describe">
            Tips: If some elements label has words(Drag), it means you can drag
            any elements from Drawing board into that area, example, Dependency
            Panel on Design Tab, once you add a new item for each dependency,
            you can drag element from Drawing Board to select that element as
            dependency object.{' '}
          </i>
          <div className="tip">
            <Icon type="bulb" className="icon" />
            <ol>
              <li>
                Try to select any elements to see the three Panels changes
              </li>
              <li>
                Try to change properties to observe the Drawingboard elements
                changes, example, input a label
              </li>
              <li>
                Try to bind datasource on Data Source Panel, it will generate
                test data
              </li>
            </ol>
          </div>
        </div>
      );
    }
  },
  {
    selector: '#root > div.ide-header > div.right > div.props > button',
    content: (params: any) => {
      return (
        <div className="tour-tips">
          <div className="describe">
            Any time when you edting and want to see the final render view,
            click this swicher to preview, the Drawing Board will update in
            time.
          </div>

          <div className="tip">
            <Icon type="bulb" className="icon" /> Try to switch it now
          </div>
        </div>
      );
    },
    actionBefore: async () => {
      await timeout(5000);
    },
    action: (node: any) => node.click()
  },
  // {
  //   selector: `#root > div.ide-editor > div.ant-tabs.ant-tabs-top.ant-tabs-line > div.ant-tabs-bar.ant-tabs-top-bar > div.ant-tabs-nav-container > div > div > div > div:nth-child(1) > div:nth-child(2)`,
  //   content: (params: any) => {
  //     return (
  //       <div className="tour-tips">
  //         <div className="describe">
  //           Code Editor will sync source code from backend in time by connecting
  //           Websocket,
  //         </div>

  //         <div className="tip">
  //           <Icon type="bulb" className="icon" /> Operation Tips:
  //           <ol>
  //             <li>Try to click a page schema from right Schemas Tab </li>
  //             <li>Try to click any source code from right Resources Tab </li>
  //             <li>Try to type some words on it... </li>
  //           </ol>
  //         </div>
  //       </div>
  //     );
  //   },
  //   action: (node: any) => node.click()
  // },
  // {
  //   selector: `.splitter`,
  //   content: (params: any) => {
  //     return (
  //       <div className="tour-tips">
  //         <div className="describe">
  //           Split the Edit region into two parts, this is very helpful to edit a
  //           page schema, edit on the Code Editor, and IDE will render the view
  //           in time on Drawing Board
  //         </div>

  //         <div className="tip">
  //           <Icon type="bulb" className="icon" /> Operation Tips:
  //           <ol>
  //             <li>
  //               Try to open a Page Schema, and edit some words, see what will
  //               happen on the Drawing Board{" "}
  //             </li>
  //             <li>Try to open any file from Resources Tab </li>
  //           </ol>
  //         </div>
  //       </div>
  //     );
  //   },
  //   action: (node: any) => node.click()
  // },
  {
    selector: '#root > div.ide-header > div.right > div.props > a.save',
    content: (params: any) => {
      return (
        <div className="tour-tips">
          <div className="describe">
            All the operations you have done are tempary stored on localStorage,
            if you have confirmd they are final result, click the save icon to
            back up to your working folder, the working folder on your disk
            could specific, see exmaples/ide/server/config/websocket.ts.
            <br />
            Caution: After all contents you selected are being saved, the
            localStorage will be cleaned.
          </div>

          <div className="tip">
            <Icon type="bulb" className="icon" /> Try to click it, and check
            whether all your contents stored on your working directory.
          </div>
        </div>
      );
    }
  }
];

// interface IStartGuide {
//   onClose: () => void;
//   opened: boolean;
// }

export const Start = (props: any) => {
  const { onClose, opened } = props;

  return (
    <Tour steps={steps} isOpen={opened} onRequestClose={onClose} rounded={12} />
  );
};
