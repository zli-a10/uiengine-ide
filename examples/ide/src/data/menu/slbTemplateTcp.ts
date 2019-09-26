
export default [
  {
    "name": "name",
    "props": { "label": "Name" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:name" },
    "component": "my:FormItem"
  },
  {
    "name": "idle-timeout",
    "props": { "label": "Idle Timeout" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:idle-timeout" },
    "component": "my:FormItem"
  },
  {
    "name": "half-open-idle-timeout",
    "props": { "label": "Half Open Idle Timeout" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:half-open-idle-timeout" },
    "component": "my:FormItem"
  },
  {
    "name": "half-close-idle-timeout",
    "props": { "label": "Half Close Idle Timeout" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:half-close-idle-timeout" },
    "component": "my:FormItem"
  },
  {
    "name": "initial-window-size",
    "props": { "label": "Initial Window Size" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:initial-window-size" },
    "component": "my:FormItem"
  },
  {
    "name": "force-delete-timeout",
    "props": { "label": "Force Delete Timeout" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:force-delete-timeout" },
    "component": "my:FormItem"
  },
  {
    "name": "force-delete-timeout-100ms",
    "props": { "label": "Force Delete Timeout 100ms" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:force-delete-timeout-100ms" },
    "component": "my:FormItem"
  },
  {
    "name": "alive-if-active",
    "props": { "label": "Alive If Active" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:alive-if-active" },
    "component": "my:FormItem"
  },
  {
    "name": "qos",
    "props": { "label": "QoS" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:qos" },
    "component": "my:FormItem"
  },
  {
    "name": "insert-client-ip",
    "props": { "label": "Insert Client IP" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:insert-client-ip" },
    "component": "my:FormItem"
  },
  {
    "name": "lan-fast-ack",
    "props": { "label": "LAN Fast ACK" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:lan-fast-ack" },
    "component": "my:FormItem"
  },
  {
    "name": "reset-fwd",
    "props": { "label": "Reset Forward" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:reset-fwd" },
    "component": "my:FormItem"
  },
  {
    "name": "reset-rev",
    "props": { "label": "Reset Receive" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:reset-rev" },
    "component": "my:FormItem"
  },
  {
    "name": "disable",
    "props": { "label": "Disable" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:disable" },
    "component": "my:FormItem"
  },
  {
    "name": "down",
    "props": { "label": "Down" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:down" },
    "component": "my:FormItem"
  },
  {
    "name": "del-session-on-server-down",
    "props": { "label": "Delete Session On Server Down" },
    "type": "field",
    "datasource": { "source": "slb.template.tcp:del-session-on-server-down" },
    "component": "my:FormItem"
  }
]

