export default [
  {
    "type": "field",
    "name": "name",
    "component": "my:FormItem",
    "props": { "label": "name" },
    "datasource": {
      "source": "slb.virtual-server:name"
    }
  },
  {
    "type": "field",
    "name": "ipv6-address",
    "component": "my:FormItem",
    "props": { "label": "ipv6-address" },
    "datasource": {
      "source": "slb.virtual-server:ipv6-address"
    }
  },
  {
    "type": "field",
    "name": "ip-address",
    "component": "my:FormItem",
    "props": { "label": "ip-address" },
    "datasource": {
      "source": "slb.virtual-server:ip-address"
    }
  },
  {
    "type": "field",
    "name": "netmask",
    "component": "my:FormItem",
    "props": { "label": "netmask" },
    "datasource": {
      "source": "slb.virtual-server:netmask"
    }
  },
  {
    "type": "field",
    "name": "dummy-ipv6-acl",
    "component": "my:FormItem",
    "props": { "label": "dummy-ipv6-acl" },
    "datasource": {
      "source": "slb.virtual-server:dummy-ipv6-acl"
    }
  },
  {
    "type": "field",
    "name": "ipv6-acl",
    "component": "my:FormItem",
    "props": { "label": "ipv6-acl" },
    "datasource": {
      "source": "slb.virtual-server:ipv6-acl"
    }
  },
  {
    "type": "field",
    "name": "p-ipv6-acl",
    "component": "my:FormItem",
    "props": { "label": "p-ipv6-acl" },
    "datasource": {
      "source": "slb.virtual-server:p-ipv6-acl"
    }
  },
  {
    "type": "field",
    "name": "shared-partition-ipv6-acl",
    "component": "my:FormItem",
    "props": { "label": "shared-partition-ipv6-acl" },
    "datasource": {
      "source": "slb.virtual-server:shared-partition-ipv6-acl"
    }
  },
  {
    "type": "field",
    "name": "ipv6-acl-shared",
    "component": "my:FormItem",
    "props": { "label": "ipv6-acl-shared" },
    "datasource": {
      "source": "slb.virtual-server:ipv6-acl-shared"
    }
  },
  {
    "type": "field",
    "name": "acl",
    "component": "my:FormItem",
    "props": { "label": "acl" },
    "datasource": {
      "source": "slb.virtual-server:acl"
    }
  },
  {
    "type": "field",
    "name": "acl-id",
    "component": "my:FormItem",
    "props": { "label": "acl-id" },
    "datasource": {
      "source": "slb.virtual-server:acl-id"
    }
  },
  {
    "type": "field",
    "name": "acl-name",
    "component": "my:FormItem",
    "props": { "label": "acl-name" },
    "datasource": {
      "source": "slb.virtual-server:acl-name"
    }
  },
  {
    "type": "field",
    "name": "p-acl",
    "component": "my:FormItem",
    "props": { "label": "p-acl" },
    "datasource": {
      "source": "slb.virtual-server:p-acl"
    }
  },
  {
    "type": "field",
    "name": "shared-partition-acl",
    "component": "my:FormItem",
    "props": { "label": "shared-partition-acl" },
    "datasource": {
      "source": "slb.virtual-server:shared-partition-acl"
    }
  },
  {
    "type": "field",
    "name": "acl-id-shared",
    "component": "my:FormItem",
    "props": { "label": "acl-id-shared" },
    "datasource": {
      "source": "slb.virtual-server:acl-id-shared"
    }
  },
  {
    "type": "field",
    "name": "acl-name-shared",
    "component": "my:FormItem",
    "props": { "label": "acl-name-shared" },
    "datasource": {
      "source": "slb.virtual-server:acl-name-shared"
    }
  },
  {
    "type": "field",
    "name": "use-if-ip",
    "component": "my:FormItem",
    "props": { "label": "use-if-ip" },
    "datasource": {
      "source": "slb.virtual-server:use-if-ip"
    }
  },
  {
    "type": "field",
    "name": "enable-disable-action",
    "component": "my:FormItem",
    "props": { "label": "enable-disable-action" },
    "datasource": {
      "source": "slb.virtual-server:enable-disable-action"
    }
  },
  {
    "type": "field",
    "name": "ethernet",
    "component": "my:FormItem",
    "props": { "label": "ethernet" },
    "datasource": {
      "source": "slb.virtual-server:ethernet"
    }
  },
  {
    "type": "field",
    "name": "description",
    "component": "my:FormItem",
    "props": { "label": "description" },
    "datasource": {
      "source": "slb.virtual-server:description"
    }
  },
  {
    "type": "field",
    "name": "redistribution-flagged",
    "component": "my:FormItem",
    "props": { "label": "redistribution-flagged" },
    "datasource": {
      "source": "slb.virtual-server:redistribution-flagged"
    }
  },
  {
    "type": "field",
    "name": "suppress-internal-loopback",
    "component": "my:FormItem",
    "props": { "label": "suppress-internal-loopback" },
    "datasource": {
      "source": "slb.virtual-server:suppress-internal-loopback"
    }
  },
  {
    "type": "field",
    "name": "arp-disable",
    "component": "my:FormItem",
    "props": { "label": "arp-disable" },
    "datasource": {
      "source": "slb.virtual-server:arp-disable"
    }
  },
  {
    "type": "field",
    "name": "stats-data-action",
    "component": "my:FormItem",
    "props": { "label": "stats-data-action" },
    "datasource": {
      "source": "slb.virtual-server:stats-data-action"
    }
  },
  {
    "type": "field",
    "name": "extended-stats",
    "component": "my:FormItem",
    "props": { "label": "extended-stats" },
    "datasource": {
      "source": "slb.virtual-server:extended-stats"
    }
  },
  {
    "type": "field",
    "name": "vrid",
    "component": "my:FormItem",
    "props": { "label": "vrid" },
    "datasource": {
      "source": "slb.virtual-server:vrid"
    }
  },
  {
    "type": "field",
    "name": "disable-vip-adv",
    "component": "my:FormItem",
    "props": { "label": "disable-vip-adv" },
    "datasource": {
      "source": "slb.virtual-server:disable-vip-adv"
    }
  },
  {
    "type": "field",
    "name": "ha-dynamic",
    "component": "my:FormItem",
    "props": { "label": "ha-dynamic" },
    "datasource": {
      "source": "slb.virtual-server:ha-dynamic"
    }
  },
  {
    "type": "field",
    "name": "redistribute",
    "component": "my:FormItem",
    "props": { "label": "redistribute" },
    "datasource": {
      "source": "slb.virtual-server:redistribute"
    }
  },
  {
    "type": "field",
    "name": "redistribute-route-map",
    "component": "my:FormItem",
    "props": { "label": "redistribute-route-map" },
    "datasource": {
      "source": "slb.virtual-server:redistribute-route-map"
    }
  },
  {
    "type": "field",
    "name": "template",
    "component": "my:FormItem",
    "props": { "label": "template" },
    "datasource": {
      "source": "slb.virtual-server:template"
    }
  },
  {
    "type": "field",
    "name": "policy-template",
    "component": "my:FormItem",
    "props": { "label": "policy-template" },
    "datasource": {
      "source": "slb.virtual-server:policy-template"
    }
  },
  {
    "type": "field",
    "name": "template-policy",
    "component": "my:FormItem",
    "props": { "label": "template-policy" },
    "datasource": {
      "source": "slb.virtual-server:template-policy"
    }
  },
  {
    "type": "field",
    "name": "p-policy",
    "component": "my:FormItem",
    "props": { "label": "p-policy" },
    "datasource": {
      "source": "slb.virtual-server:p-policy"
    }
  },
  {
    "type": "field",
    "name": "shared-partition-policy-template",
    "component": "my:FormItem",
    "props": { "label": "shared-partition-policy-template" },
    "datasource": {
      "source": "slb.virtual-server:shared-partition-policy-template"
    }
  },
  {
    "type": "field",
    "name": "template-policy-shared",
    "component": "my:FormItem",
    "props": { "label": "template-policy-shared" },
    "datasource": {
      "source": "slb.virtual-server:template-policy-shared"
    }
  },
  {
    "type": "field",
    "name": "template-virtual-server",
    "component": "my:FormItem",
    "props": { "label": "template-virtual-server" },
    "datasource": {
      "source": "slb.virtual-server:template-virtual-server"
    }
  },
  {
    "type": "field",
    "name": "template-logging",
    "component": "my:FormItem",
    "props": { "label": "template-logging" },
    "datasource": {
      "source": "slb.virtual-server:template-logging"
    }
  },
  {
    "type": "field",
    "name": "template-scaleout",
    "component": "my:FormItem",
    "props": { "label": "template-scaleout" },
    "datasource": {
      "source": "slb.virtual-server:template-scaleout"
    }
  }
]
