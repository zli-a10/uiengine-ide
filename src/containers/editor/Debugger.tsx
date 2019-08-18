import React, { useContext } from 'react';
import { Collapse, Input } from 'antd';
import { Context } from './Context';
import ReactJson from 'react-json-view';

const Panel = Collapse.Panel;

export const Debugger: React.FC = (props: any) => {
  function callback() {}
  const { preview } = useContext(Context);
  const uiJson = {
    schema: [
      {
        widget: 'row',
        props: {
          children: [
            {
              widget: 'column',
              props: {
                children: [
                  {
                    widget: 'field',
                    props: { dataSource: 'aam.aaa-policy.name' }
                  },
                  {
                    widget: 'Custom/SSLi/Service/Form',
                    props: {
                      name: 'name',
                      title: {
                        create: 'Add New Object',
                        update: 'Edit Object'
                      },
                      description: {
                        create:
                          'Please provide following information to create a new object',
                        update:
                          'Please provide following information to edit object'
                      },
                      children: []
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <div className="ide-props-events">
      <h3>(Input)</h3>
      {preview ? (
        <>
          <div className="ide-debugger">
            <h4>Set Debug Host:</h4>
            <Input
              size={'default'}
              placeholder={'192.168.x.x'}
              addonAfter={<a>Send</a>}
            />
          </div>
          <Collapse onChange={callback} accordion defaultActiveKey={'1'}>
            <Panel header="Response" key="1">
              <ReactJson
                indentWidth={2}
                src={uiJson}
                displayDataTypes={false}
                collapsed
                collapseStringsAfterLength={50}
              />
            </Panel>
            <Panel header="Data Binding" key="2">
              <ReactJson
                indentWidth={2}
                collapsed
                src={[
                  {
                    'slb.virtual-server':
                      'http://[host]/axapi/v3/slb/virtual-server/'
                  }
                ]}
              />
            </Panel>
            <Panel header="Events" key="3">
              <ReactJson
                indentWidth={2}
                src={uiJson}
                displayDataTypes={false}
                collapsed
                collapseStringsAfterLength={50}
              />
            </Panel>
          </Collapse>
        </>
      ) : (
        <Collapse onChange={callback} accordion defaultActiveKey={'1'}>
          <Panel header="UI JSON" key="1">
            <ReactJson
              indentWidth={2}
              src={uiJson}
              onEdit={(d: any) => {
                console.log(d);
              }}
              displayDataTypes={false}
              collapsed
              collapseStringsAfterLength={50}
            />
          </Panel>
        </Collapse>
      )}
    </div>
  );
};
