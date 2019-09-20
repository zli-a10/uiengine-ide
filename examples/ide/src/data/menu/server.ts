export default [
  {
    "type": "field",
    "name": "name",
    "component": "antd:Form.Item",
    "props": { "label": "Name" },
    "children": [
      {
        "component": "antd:Input",
        "datasource": { "source": "slb.server:name" }
      }
    ]
  },
  {
    "type": "field",
    "name": "server-ipv6-addr",
    "component": "antd:Form.Item",
    "props": { "label": "Server IPv6 Address" },
    "children": [
      {
        "component": "antd:Input",
        "datasource": { "source": "slb.server:server-ipv6-addr" }
      }
    ]
  },
  {
    "type": "field",
    "name": "host",
    "component": "antd:Form.Item",
    "props": { "label": "Host" },
    "children": [
      {
        "component": "antd:Input",
        "datasource": { "source": "slb.server:host" }
      }
    ]
  },
  {
    "type": "field",
    "name": "fqdn-name",
    "component": "antd:Form.Item",
    "props": { "label": "FQDN Name" },
    "children": [
      {
        "component": "antd:Input",
        "datasource": { "source": "slb.server:fqdn-name" }
      }
    ]
  },
  {
    "type": "field",
    "name": "resolve-as",
    "component": "antd:Form.Item",
    "props": { "label": "Resolve As" },
    "children": [
      {
        "component": "antd:Select",
        "datasource": { "source": "slb.server:resolve-as" }
      }
    ]
  },
  {
    "type": "field",
    "name": "action",
    "component": "antd:Form.Item",
    "props": { "label": "Action" },
    "children": [
      {
        "component": "antd:Select",
        "datasource": { "source": "slb.server:action" }
      }
    ]
  },
  {
    "type": "field",
    "name": "external-ip",
    "component": "antd:Form.Item",
    "props": { "label": "External IP" },
    "children": [
      {
        "component": "antd:Input",
        "datasource": { "source": "slb.server:external-ip" }
      }
    ]
  },
  {
    "type": "field",
    "name": "ipv6",
    "component": "antd:Form.Item",
    "props": { "label": "IPv6" },
    "children": [
      {
        "component": "antd:Input",
        "datasource": { "source": "slb.server:ipv6" }
      }
    ]
  },
  {
    "type": "field",
    "name": "template",
    "component": "antd:Form.Item",
    "props": { "label": "Template" },
    "children": [
      {
        "component": "antd:Input",
        "datasource": { "source": "slb.server:template" }
      }
    ]
  },
  {
    "type": "field",
    "name": "template-server",
    "component": "antd:Form.Item",
    "props": { "label": "Template Server" },
    "children": [
      {
        "component": "antd:Select",
        "datasource": { "source": "slb.server:template-server" }
      }
    ]
  },
  {
    "type": "field",
    "name": "server-health-check",
    "component": "antd:Form.Item",
    "props": { "label": "Server Health Check" },
    "children": [
      {
        "component": "antd:Input",
        "datasource": { "source": "slb.server:server-health-check" }
      }
    ]
  },
  {
    "type": "field",
    "name": "health-check",
    "component": "antd:Form.Item",
    "props": { "label": "Health Check" },
    "children": [
      {
        "component": "antd:Select",
        "datasource": { "source": "slb.server:health-check" }
      }
    ]
  },
  {
    "type": "field",
    "name": "p-health-check",
    "component": "antd:Form.Item",
    "props": { "label": "P Health Check" },
    "children": [
      {
        "component": "antd:Input",
        "datasource": { "source": "slb.server:p-health-check" }
      }
    ]
  },
  {
    "type": "field",
    "name": "shared-partition-health-check",
    "component": "antd:Form.Item",
    "props": { "label": "Shared Partition Health Check" },
    "children": [
      {
        "component": "antd:Switch",
        "datasource": {
          "source": "slb.server:shared-partition-health-check"
        }
      }
    ]
  },
  {
    "type": "field",
    "name": "health-check-shared",
    "component": "antd:Form.Item",
    "props": { "label": "Health Check Shared" },
    "children": [
      {
        "component": "antd:Select",
        "datasource": { "source": "slb.server:health-check-shared" }
      }
    ]
  },
  {
    "type": "field",
    "name": "health-check-disable",
    "component": "antd:Form.Item",
    "props": { "label": "Health Check Disable" },
    "children": [
      {
        "component": "antd:Switch",
        "datasource": {
          "source": "slb.server:health-check-disable"
        }
      }
    ]
  },
  {
    "type": "field",
    "name": "conn-limit",
    "component": "antd:Form.Item",
    "props": { "label": "Connection Limit" },
    "children": [
      {
        "component": "antd:InputNumber",
        "datasource": { "source": "slb.server:conn-limit" }
      }
    ]
  },
  {
    "type": "field",
    "name": "no-logging",
    "component": "antd:Form.Item",
    "props": { "label": "No Logging" },
    "children": [
      {
        "component": "antd:Switch",
        "datasource": { "source": "slb.server:no-logging" }
      }
    ]
  },
  {
    "type": "field",
    "name": "conn-resume",
    "component": "antd:Form.Item",
    "props": { "label": "Connection Resume" },
    "children": [
      {
        "component": "antd:InputNumber",
        "datasource": { "source": "slb.server:conn-resume" }
      }
    ]
  },
  {
    "type": "field",
    "name": "weight",
    "component": "antd:Form.Item",
    "props": { "label": "Weight" },
    "children": [
      {
        "component": "antd:InputNumber",
        "datasource": { "source": "slb.server:weight" }
      }
    ]
  },
  {
    "type": "field",
    "name": "slow-start",
    "component": "antd:Form.Item",
    "props": { "label": "Slow Start" },
    "children": [
      {
        "component": "antd:Switch",
        "datasource": { "source": "slb.server:slow-start" }
      }
    ]
  },
  {
    "type": "field",
    "name": "spoofing-cache",
    "component": "antd:Form.Item",
    "props": { "label": "Spoofing Cache" },
    "children": [
      {
        "component": "antd:Switch",
        "datasource": { "source": "slb.server:spoofing-cache" }
      }
    ]
  },
  {
    "type": "field",
    "name": "stats-data-action",
    "component": "antd:Form.Item",
    "props": { "label": "Stats Data Action" },
    "children": [
      {
        "component": "antd:Select",
        "datasource": { "source": "slb.server:stats-data-action" }
      }
    ]
  },
  {
    "type": "field",
    "name": "extended-stats",
    "component": "antd:Form.Item",
    "props": { "label": "Extended Stats" },
    "children": [
      {
        "component": "antd:Switch",
        "datasource": { "source": "slb.server:extended-stats" }
      }
    ]
  },
  {
    "type": "field",
    "name": "alternate-server",
    "component": "antd:Form.Item",
    "datasource": { "source": "slb.server:alternate-server" },
    "props": { "label": "Alternate Server" },
    "children": [
      {
        "component": "antd:Col",
        "children": [
          {
            "type": "field",
            "name": "alternate",
            "component": "antd:Form.Item",
            "datasource": {
              "source": "slb.server:alternate-server.alternate"
            },
            "props": { "label": "Alternate" },
            "children": [{ "component": "antd:InputNumber" }]
          },
          {
            "type": "field",
            "name": "alternate-name",
            "component": "antd:Form.Item",

            "props": { "label": "Alternate Name" },
            "children": [
              {
                "component": "antd:Select",
                "datasource": {
                  "source": "slb.server.alternate-server:alternate-name"
                }
              }
            ]
          }
        ]
      }
    ]
  }
]
