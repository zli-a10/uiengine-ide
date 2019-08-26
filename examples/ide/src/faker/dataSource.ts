import * as _ from 'lodash'

export const dataSource = {
  'uijson-list': [
    { multiDataSource: false, path: 'aam/accounts/kerberos-spns' },
    { multiDataSource: false, path: 'aam/auth-clients/logon-form-based' },
    { multiDataSource: false, path: 'aam/auth-clients/logon-http-auth' },
    { multiDataSource: false, path: 'aam/auth-clients/portal/change-password' },
    { multiDataSource: false, path: 'aam/auth-clients/portal/logon-fail' },
    { multiDataSource: false, path: 'aam/auth-clients/portal/logon' },
    {
      multiDataSource: false,
      path: 'aam/auth-clients/portal/notify-change-password'
    },
    { multiDataSource: false, path: 'aam/auth-clients/portal/portal' },
    { multiDataSource: false, path: 'aam/auth-clients/saml/identity-provider' },
    { multiDataSource: false, path: 'aam/auth-clients/saml/service-provider' },
    { multiDataSource: false, path: 'aam/auth-relays/form-based.request-uri' },
    { multiDataSource: true, path: 'aam/auth-relays/form-based' },
    { multiDataSource: false, path: 'aam/auth-relays/http-basic' },
    { multiDataSource: false, path: 'aam/auth-relays/kerberos' },
    { multiDataSource: false, path: 'aam/auth-relays/ntlm' },
    { multiDataSource: false, path: 'aam/auth-servers/ldap' },
    { multiDataSource: false, path: 'aam/auth-servers/oscp' },
    { multiDataSource: false, path: 'aam/auth-servers/radius' },
    { multiDataSource: false, path: 'aam/auth-servers/windows' },
    { multiDataSource: false, path: 'aam/log-settings/log' },
    {
      multiDataSource: false,
      path: 'aam/policies-and-templates/aaa-policy.aaa-rule'
    },
    { multiDataSource: true, path: 'aam/policies-and-templates/aaa-policy' },
    {
      multiDataSource: false,
      path: 'aam/policies-and-templates/authentication-template'
    },
    {
      multiDataSource: false,
      path: 'aam/policies-and-templates/authorization-policy.attribute'
    },
    {
      multiDataSource: true,
      path: 'aam/policies-and-templates/authorization-policy'
    },
    { multiDataSource: false, path: 'aam/service-groups.member' },
    { multiDataSource: true, path: 'aam/service-groups' },
    { multiDataSource: false, path: 'adc/health/global' },
    { multiDataSource: false, path: 'adc/health/monitor' },
    {
      multiDataSource: false,
      path: 'adc/ip-source-nat/acl-bind/ipv4/acl-id-list'
    },
    {
      multiDataSource: false,
      path: 'adc/ip-source-nat/acl-bind/ipv4/acl-name-list'
    },
    {
      multiDataSource: false,
      path: 'adc/ip-source-nat/acl-bind/ipv6/acl-list'
    },
    { multiDataSource: false, path: 'adc/ip-source-nat/groups/ipv4' },
    { multiDataSource: false, path: 'adc/ip-source-nat/groups/ipv6' },
    { multiDataSource: false, path: 'adc/ip-source-nat/ipv4-pools' },
    { multiDataSource: false, path: 'adc/ip-source-nat/ipv6-pools' },
    { multiDataSource: false, path: 'adc/ip-source-nat/logging' },
    { multiDataSource: true, path: 'adc/ip-source-nat/nat-global' },
    {
      multiDataSource: true,
      path: 'adc/ip-source-nat/nat-interfaces/ethernets'
    },
    {
      multiDataSource: false,
      path: 'adc/ip-source-nat/nat-interfaces/virtual-ethernets'
    },
    { multiDataSource: false, path: 'adc/ip-source-nat/nat-range' },
    { multiDataSource: false, path: 'adc/ip-source-nat/static-nat' },
    { multiDataSource: true, path: 'adc/ip-source-nat/virtual-ethernets' },
    { multiDataSource: false, path: 'adc/slb/global' },
    { multiDataSource: false, path: 'adc/slb/policy-limits' },
    { multiDataSource: false, path: 'adc/slb/servers.port' },
    { multiDataSource: true, path: 'adc/slb/servers' },
    { multiDataSource: false, path: 'adc/slb/service-groups.member' },
    { multiDataSource: true, path: 'adc/slb/service-groups' },
    { multiDataSource: false, path: 'adc/slb/session-filter' },
    { multiDataSource: true, path: 'adc/slb/virtual-servers' },
    { multiDataSource: false, path: 'adc/slb/virtual-services' },
    { multiDataSource: false, path: 'adc/ssl-management/expiration-mail' },
    {
      multiDataSource: false,
      path: 'adc/templates/application/connection-reuse'
    },
    { multiDataSource: false, path: 'adc/templates/application/dblb' },
    { multiDataSource: false, path: 'adc/templates/application/ram-caching' },
    { multiDataSource: false, path: 'adc/templates/general/external-service' },
    { multiDataSource: false, path: 'adc/templates/general/logging' },
    { multiDataSource: false, path: 'adc/templates/l4-protocols/tcp' },
    { multiDataSource: false, path: 'adc/templates/l4-protocols/udp' },
    { multiDataSource: false, path: 'adc/templates/l7-protocols/diameter' },
    { multiDataSource: false, path: 'adc/templates/l7-protocols/dns' },
    { multiDataSource: false, path: 'adc/templates/l7-protocols/fix' },
    { multiDataSource: false, path: 'adc/templates/l7-protocols/ftp' },
    { multiDataSource: false, path: 'adc/templates/l7-protocols/http-policy' },
    { multiDataSource: false, path: 'adc/templates/l7-protocols/http' },
    { multiDataSource: false, path: 'adc/templates/l7-protocols/imap-pop3' },
    { multiDataSource: false, path: 'adc/templates/l7-protocols/policy' },
    { multiDataSource: false, path: 'adc/templates/l7-protocols/reqmod' },
    { multiDataSource: false, path: 'adc/templates/l7-protocols/resmod' },
    { multiDataSource: false, path: 'adc/templates/l7-protocols/sip' },
    { multiDataSource: false, path: 'adc/templates/l7-protocols/smpp' },
    { multiDataSource: false, path: 'adc/templates/l7-protocols/smtp' },
    { multiDataSource: false, path: 'adc/templates/l7-protocols/tcp-proxy' },
    { multiDataSource: false, path: 'adc/templates/persistence/cookie' },
    {
      multiDataSource: false,
      path: 'adc/templates/persistence/destination-ip'
    },
    { multiDataSource: false, path: 'adc/templates/persistence/source-ip' },
    { multiDataSource: false, path: 'adc/templates/persistence/ssl-sid' },
    { multiDataSource: false, path: 'adc/templates/slb/port' },
    { multiDataSource: false, path: 'adc/templates/slb/server' },
    { multiDataSource: false, path: 'adc/templates/slb/virtual-port' },
    { multiDataSource: false, path: 'adc/templates/slb/virtual-server' },
    { multiDataSource: false, path: 'adc/templates/ssl/client-ssl' },
    { multiDataSource: false, path: 'adc/templates/ssl/server-ssl' },
    { multiDataSource: false, path: 'adc/templates/ssl/ssl-cipher' },
    { multiDataSource: true, path: 'adc/templates/waf' },
    { multiDataSource: false, path: 'cgn/ddos-protection' },
    { multiDataSource: false, path: 'cgn/dns64/templates/dns' },
    { multiDataSource: false, path: 'cgn/dns64/templates/policy' },
    { multiDataSource: false, path: 'cgn/dns64/virtual-servers.port' },
    { multiDataSource: true, path: 'cgn/dns64/virtual-servers' },
    { multiDataSource: true, path: 'cgn/ds-lite/global' },
    { multiDataSource: false, path: 'cgn/ds-lite/port-reservations' },
    { multiDataSource: false, path: 'cgn/fixed-nat/global' },
    { multiDataSource: false, path: 'cgn/fixed-nat/inside/ip-list' },
    { multiDataSource: false, path: 'cgn/fixed-nat/inside/ipv4-address' },
    { multiDataSource: false, path: 'cgn/fixed-nat/inside/ipv6-address' },
    { multiDataSource: false, path: 'cgn/fixed-nat/ip-lists' },
    { multiDataSource: false, path: 'cgn/lsn/class-lists' },
    { multiDataSource: true, path: 'cgn/lsn/full-cone' },
    { multiDataSource: true, path: 'cgn/lsn/global' },
    {
      multiDataSource: false,
      path: 'cgn/lsn/lsn-interfaces/ethernet.nptv6.domain'
    },
    { multiDataSource: true, path: 'cgn/lsn/lsn-interfaces/ethernet' },
    {
      multiDataSource: false,
      path: 'cgn/lsn/lsn-interfaces/trunk.nptv6.domain'
    },
    { multiDataSource: true, path: 'cgn/lsn/lsn-interfaces/trunk' },
    { multiDataSource: false, path: 'cgn/lsn/lsn-interfaces/ve.nptv6.domain' },
    { multiDataSource: true, path: 'cgn/lsn/lsn-interfaces/ve' },
    { multiDataSource: false, path: 'cgn/lsn/lsn-lid' },
    { multiDataSource: false, path: 'cgn/lsn/lsn-pool-groups' },
    { multiDataSource: false, path: 'cgn/lsn/lsn-pools' },
    { multiDataSource: false, path: 'cgn/lsn/lsn-rule-list.domain-list-name' },
    { multiDataSource: false, path: 'cgn/lsn/lsn-rule-list.domain-name' },
    { multiDataSource: false, path: 'cgn/lsn/lsn-rule-list.ip' },
    { multiDataSource: true, path: 'cgn/lsn/lsn-rule-list' },
    { multiDataSource: false, path: 'cgn/lsn/port-reservations' },
    { multiDataSource: false, path: 'cgn/lsn/radius-profile' },
    { multiDataSource: true, path: 'cgn/lsn/rule-lists' },
    { multiDataSource: false, path: 'cgn/lsn/templates/http-alg' },
    { multiDataSource: false, path: 'cgn/lsn/templates/logging' },
    { multiDataSource: false, path: 'cgn/lsn/templates/pcp' },
    { multiDataSource: true, path: 'cgn/lw-4over6/global' },
    { multiDataSource: true, path: 'cgn/nat64' },
    { multiDataSource: false, path: 'cgn/one-to-one-nat/global' },
    { multiDataSource: false, path: 'cgn/one-to-one-nat/pool-groups' },
    { multiDataSource: false, path: 'cgn/one-to-one-nat/pools' },
    { multiDataSource: false, path: 'cgn/services/servers.port' },
    { multiDataSource: true, path: 'cgn/services/servers' },
    { multiDataSource: false, path: 'cgn/services/service-groups.member' },
    { multiDataSource: true, path: 'cgn/services/service-groups' },
    { multiDataSource: true, path: 'cgn/session/global' },
    { multiDataSource: true, path: 'cgn/six-rd' },
    { multiDataSource: true, path: 'cgn/stateless-nat46/global' },
    { multiDataSource: false, path: 'cgn/stateless-nat46/static-mappings' },
    { multiDataSource: false, path: 'cgn/static-nat/range-list' },
    { multiDataSource: false, path: 'cgn/static-nat/static' },
    { multiDataSource: true, path: 'gslb/sites.slb-device' },
    { multiDataSource: true, path: 'gslb/sites' },
    { multiDataSource: true, path: 'gslb/zone' },
    { multiDataSource: false, path: 'network/arp/global' },
    { multiDataSource: false, path: 'network/arp/ipv4' },
    { multiDataSource: false, path: 'network/arp/ipv6' },
    { multiDataSource: false, path: 'network/bpdu-fwd-groups' },
    { multiDataSource: true, path: 'network/interfaces/interface-global' },
    { multiDataSource: false, path: 'network/interfaces/lan' },
    { multiDataSource: false, path: 'network/interfaces/lldp' },
    { multiDataSource: false, path: 'network/interfaces/management' },
    { multiDataSource: true, path: 'network/interfaces/transparent' },
    { multiDataSource: false, path: 'network/interfaces/trunk' },
    { multiDataSource: false, path: 'network/interfaces/tunnel' },
    { multiDataSource: false, path: 'network/interfaces/virtual-ethernet' },
    { multiDataSource: false, path: 'network/lacp/lacp' },
    { multiDataSource: false, path: 'network/mldb/scaleout' },
    {
      multiDataSource: false,
      path: 'network/routes/ipv4-static-routes/ipv4-bfd'
    },
    {
      multiDataSource: false,
      path: 'network/routes/ipv4-static-routes/ipv4-rib'
    },
    {
      multiDataSource: false,
      path: 'network/routes/ipv6-static-routes/ipv6-bfd/bfd'
    },
    {
      multiDataSource: false,
      path: 'network/routes/ipv6-static-routes/ipv6-bfd/ethernet'
    },
    {
      multiDataSource: false,
      path: 'network/routes/ipv6-static-routes/ipv6-bfd/trunk'
    },
    {
      multiDataSource: false,
      path: 'network/routes/ipv6-static-routes/ipv6-bfd/ve'
    },
    {
      multiDataSource: false,
      path: 'network/routes/ipv6-static-routes/ipv6-rib'
    },
    { multiDataSource: true, path: 'network/vlan/global' },
    { multiDataSource: false, path: 'network/vlan/mac' },
    { multiDataSource: false, path: 'network/vlan/vlan' },
    {
      multiDataSource: false,
      path: 'security/forward-proxy/class-lists/configuration'
    },
    { multiDataSource: false, path: 'security/forward-proxy/servers' },
    { multiDataSource: false, path: 'security/forward-proxy/service-group' },
    { multiDataSource: false, path: 'security/forward-proxy/services' },
    {
      multiDataSource: false,
      path: 'security/forward-proxy/templates/client-ssl'
    },
    {
      multiDataSource: false,
      path: 'security/forward-proxy/templates/dynamic-service'
    },
    { multiDataSource: false, path: 'security/forward-proxy/templates/policy' },
    {
      multiDataSource: false,
      path: 'security/shared-objects/object-group/network'
    },
    { multiDataSource: false, path: 'security/shared-objects/object' },
    { multiDataSource: true, path: 'security/ssli/services' },
    {
      multiDataSource: false,
      path: 'system/admin/external-authentication/ldap/hostname'
    },
    {
      multiDataSource: false,
      path: 'system/admin/external-authentication/ldap/ipv4'
    },
    {
      multiDataSource: false,
      path: 'system/admin/external-authentication/ldap/ipv6'
    },
    {
      multiDataSource: false,
      path: 'system/admin/external-authentication/radius/ipv4'
    },
    {
      multiDataSource: false,
      path: 'system/admin/external-authentication/radius/ipv6'
    },
    {
      multiDataSource: false,
      path: 'system/admin/external-authentication/radius/name'
    },
    {
      multiDataSource: false,
      path: 'system/admin/external-authentication/settings'
    },
    {
      multiDataSource: true,
      path: 'system/admin/external-authentication/tacacs-host'
    },
    {
      multiDataSource: false,
      path: 'system/admin/external-authentication/tacacs-monitor'
    },
    { multiDataSource: false, path: 'system/admin/lockout' },
    { multiDataSource: false, path: 'system/admin/partitions' },
    { multiDataSource: false, path: 'system/admin/users' },
    { multiDataSource: true, path: 'system/avcs/actions' },
    { multiDataSource: false, path: 'system/avcs/device' },
    { multiDataSource: true, path: 'system/avcs/settings' },
    {
      multiDataSource: false,
      path: 'system/maintenance/backup/backup-periodic'
    },
    { multiDataSource: false, path: 'system/maintenance/backup/log' },
    { multiDataSource: false, path: 'system/maintenance/backup/restore' },
    { multiDataSource: false, path: 'system/maintenance/backup/system' },
    { multiDataSource: true, path: 'system/monitoring/monitors' },
    { multiDataSource: true, path: 'system/monitoring/sflow' },
    { multiDataSource: false, path: 'system/monitoring/snmp.community' },
    { multiDataSource: true, path: 'system/monitoring/snmp/snmpv1-v2c-user' },
    { multiDataSource: true, path: 'system/monitoring/snmp' },
    { multiDataSource: true, path: 'system/settings/actions' },
    { multiDataSource: true, path: 'system/settings/dns' },
    { multiDataSource: false, path: 'system/settings/general' },
    { multiDataSource: true, path: 'system/settings/logging' },
    { multiDataSource: true, path: 'system/settings/templates' },
    { multiDataSource: true, path: 'system/settings/terminal' },
    { multiDataSource: false, path: 'system/settings/web' },
    { multiDataSource: false, path: 'system/vrrpa/interface/interface' },
    { multiDataSource: false, path: 'system/vrrpa/interface/trunk' },
    { multiDataSource: true, path: 'system/vrrpa/settings/global' },
    { multiDataSource: false, path: 'system/vrrpa/settings/vrid' },
    { multiDataSource: false, path: 'test' }
  ]
} as any

export const dataSourceJson = () => {
  const { 'uijson-list': list } = dataSource
  const uiJsonList: string[] = []
  const search = ''
  const map = list.reduce((result: any, item: any) => {
    const { path } = item
    if (!search || path.includes(search)) {
      _.set(result, path.replace(/\//g, '.'), item)
    }
    uiJsonList.push(path)
    return result
  }, {})

  const process = (obj: any, parentPath: string = '') => {
    return Object.keys(obj).map(key => {
      const nodePath = parentPath ? `${parentPath}/${key}` : key
      const item = obj[key]
      const { path, multiDataSource } = item
      const node: any = {
        name: key,
        // active: false,
        // toggled: true,
        children: !item.hasOwnProperty('multiDataSource')
          ? process(item, nodePath)
          : null,
        // status: multiDataSource ? 'warning' : 'success',
        // statusTitle: key,
        // uiJsonPath: path
        type: 'file',
        datasource: {
          source: path
        }
      }
      if (uiJsonList.includes(nodePath) && node.children) {
        node.children = [
          {
            name: key,
            // active: false,
            // toggled: true,
            children: null,
            // status: 'success',
            // statusTitle: key,
            // uiJsonPath: nodePath
            type: 'file',
            datasource: {
              source: path
            }
          },
          ...(node.children || [])
        ]
      }
      return node
    })
  }
  return process(map)
}
