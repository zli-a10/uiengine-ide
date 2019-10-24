import server from './server'
import virtualServer from './virtualServer'
import slbTemplateTcp from './slbTemplateTcp'
export default [
  {
    "name": "adc",
    "children": [
      {
        "name": "slb",
        "children": [
          {
            "name": "server",
            "children": server,
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "global",
            "children": [],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "policy-limits",
            "children": [],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "service-groups",
            "children": [],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "session-filter",
            "children": [],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "virtual-servers",
            "children": virtualServer,
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "virtual-services",
            "children": [],
            "type": "file",
            "component": "antd:Col"
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "health",
        "children": [
          {
            "name": "global",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "adc/health/global"
            }
          },
          {
            "name": "monitor",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "adc/health/monitor"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "ip-source-nat",
        "children": [
          {
            "name": "acl-bind",
            "children": [
              {
                "name": "ipv4",
                "children": [
                  {
                    "name": "acl-id-list",
                    "children": [],
                    "type": "file",
                    "component": "antd:Col",
                    "datasource": {
                      "source": "adc/ip-source-nat/acl-bind/ipv4/acl-id-list"
                    }
                  },
                  {
                    "name": "acl-name-list",
                    "children": [],
                    "type": "file",
                    "component": "antd:Col",
                    "datasource": {
                      "source": "adc/ip-source-nat/acl-bind/ipv4/acl-name-list"
                    }
                  }
                ],
                "type": "file",
                "component": "antd:Col"
              },
              {
                "name": "ipv6",
                "children": [
                  {
                    "name": "acl-list",
                    "children": [],
                    "type": "file",
                    "component": "antd:Col",
                    "datasource": {
                      "source": "adc/ip-source-nat/acl-bind/ipv6/acl-list"
                    }
                  }
                ],
                "type": "file",
                "component": "antd:Col"
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "groups",
            "children": [
              {
                "name": "ipv4",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/ip-source-nat/groups/ipv4"
                }
              },
              {
                "name": "ipv6",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/ip-source-nat/groups/ipv6"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "ipv4-pools",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "adc/ip-source-nat/ipv4-pools"
            }
          },
          {
            "name": "ipv6-pools",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "adc/ip-source-nat/ipv6-pools"
            }
          },
          {
            "name": "logging",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "adc/ip-source-nat/logging"
            }
          },
          {
            "name": "nat-global",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "adc/ip-source-nat/nat-global"
            }
          },
          {
            "name": "nat-interfaces",
            "children": [
              {
                "name": "ethernets",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/ip-source-nat/nat-interfaces/ethernets"
                }
              },
              {
                "name": "virtual-ethernets",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/ip-source-nat/nat-interfaces/virtual-ethernets"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "nat-range",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "adc/ip-source-nat/nat-range"
            }
          },
          {
            "name": "static-nat",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "adc/ip-source-nat/static-nat"
            }
          },
          {
            "name": "virtual-ethernets",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "adc/ip-source-nat/virtual-ethernets"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "ssl-management",
        "children": [
          {
            "name": "expiration-mail",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "adc/ssl-management/expiration-mail"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "templates",
        "children": [
          {
            "name": "application",
            "children": [
              {
                "name": "connection-reuse",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/application/connection-reuse"
                }
              },
              {
                "name": "dblb",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/application/dblb"
                }
              },
              {
                "name": "ram-caching",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/application/ram-caching"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "general",
            "children": [
              {
                "name": "external-service",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/general/external-service"
                }
              },
              {
                "name": "logging",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/general/logging"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "l4-protocols",
            "children": [
              {
                "name": "tcp",
                "children": slbTemplateTcp,
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l4-protocols/tcp"
                }
              },
              {
                "name": "udp",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l4-protocols/udp"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "l7-protocols",
            "children": [
              {
                "name": "diameter",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l7-protocols/diameter"
                }
              },
              {
                "name": "dns",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l7-protocols/dns"
                }
              },
              {
                "name": "fix",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l7-protocols/fix"
                }
              },
              {
                "name": "ftp",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l7-protocols/ftp"
                }
              },
              {
                "name": "http-policy",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l7-protocols/http-policy"
                }
              },
              {
                "name": "http",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l7-protocols/http"
                }
              },
              {
                "name": "imap-pop3",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l7-protocols/imap-pop3"
                }
              },
              {
                "name": "policy",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l7-protocols/policy"
                }
              },
              {
                "name": "reqmod",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l7-protocols/reqmod"
                }
              },
              {
                "name": "resmod",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l7-protocols/resmod"
                }
              },
              {
                "name": "sip",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l7-protocols/sip"
                }
              },
              {
                "name": "smpp",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l7-protocols/smpp"
                }
              },
              {
                "name": "smtp",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l7-protocols/smtp"
                }
              },
              {
                "name": "tcp-proxy",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/l7-protocols/tcp-proxy"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "persistence",
            "children": [
              {
                "name": "cookie",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/persistence/cookie"
                }
              },
              {
                "name": "destination-ip",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/persistence/destination-ip"
                }
              },
              {
                "name": "source-ip",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/persistence/source-ip"
                }
              },
              {
                "name": "ssl-sid",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/persistence/ssl-sid"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "slb",
            "children": [
              {
                "name": "port",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/slb/port"
                }
              },
              {
                "name": "server",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/slb/server"
                }
              },
              {
                "name": "virtual-port",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/slb/virtual-port"
                }
              },
              {
                "name": "virtual-server",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/slb/virtual-server"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "ssl",
            "children": [
              {
                "name": "client-ssl",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/ssl/client-ssl"
                }
              },
              {
                "name": "server-ssl",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/ssl/server-ssl"
                }
              },
              {
                "name": "ssl-cipher",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "adc/templates/ssl/ssl-cipher"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "waf",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "adc/templates/waf"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      }
    ],
    "type": "file",
    "component": "antd:Col"
  },
  {
    "name": "aam",
    "children": [
      {
        "name": "accounts",
        "children": [
          {
            "name": "kerberos-spns",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/accounts/kerberos-spns"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "auth-clients",
        "children": [
          {
            "name": "logon-form-based",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/auth-clients/logon-form-based"
            }
          },
          {
            "name": "logon-http-auth",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/auth-clients/logon-http-auth"
            }
          },
          {
            "name": "portal",
            "children": [
              {
                "name": "change-password",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "aam/auth-clients/portal/change-password"
                }
              },
              {
                "name": "logon-fail",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "aam/auth-clients/portal/logon-fail"
                }
              },
              {
                "name": "logon",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "aam/auth-clients/portal/logon"
                }
              },
              {
                "name": "notify-change-password",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "aam/auth-clients/portal/notify-change-password"
                }
              },
              {
                "name": "portal",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "aam/auth-clients/portal/portal"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "saml",
            "children": [
              {
                "name": "identity-provider",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "aam/auth-clients/saml/identity-provider"
                }
              },
              {
                "name": "service-provider",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "aam/auth-clients/saml/service-provider"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "auth-relays",
        "children": [
          {
            "name": "form-based",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/auth-relays/form-based"
            }
          },
          {
            "name": "http-basic",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/auth-relays/http-basic"
            }
          },
          {
            "name": "kerberos",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/auth-relays/kerberos"
            }
          },
          {
            "name": "ntlm",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/auth-relays/ntlm"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "auth-servers",
        "children": [
          {
            "name": "ldap",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/auth-servers/ldap"
            }
          },
          {
            "name": "oscp",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/auth-servers/oscp"
            }
          },
          {
            "name": "radius",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/auth-servers/radius"
            }
          },
          {
            "name": "windows",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/auth-servers/windows"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "log-settings",
        "children": [
          {
            "name": "log",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/log-settings/log"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "policies-and-templates",
        "children": [
          {
            "name": "aaa-policy",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/policies-and-templates/aaa-policy"
            }
          },
          {
            "name": "authentication-template",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/policies-and-templates/authentication-template"
            }
          },
          {
            "name": "authorization-policy",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "aam/policies-and-templates/authorization-policy"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "service-groups",
        "children": [],
        "type": "file",
        "component": "antd:Col",
        "datasource": {
          "source": "aam/service-groups"
        }
      }
    ],
    "type": "file",
    "component": "antd:Col"
  },
  {
    "name": "cgn",
    "children": [
      {
        "name": "ddos-protection",
        "children": [],
        "type": "file",
        "component": "antd:Col",
        "datasource": {
          "source": "cgn/ddos-protection"
        }
      },
      {
        "name": "dns64",
        "children": [
          {
            "name": "templates",
            "children": [
              {
                "name": "dns",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "cgn/dns64/templates/dns"
                }
              },
              {
                "name": "policy",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "cgn/dns64/templates/policy"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "virtual-servers",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/dns64/virtual-servers"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "ds-lite",
        "children": [
          {
            "name": "global",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/ds-lite/global"
            }
          },
          {
            "name": "port-reservations",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/ds-lite/port-reservations"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "fixed-nat",
        "children": [
          {
            "name": "global",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/fixed-nat/global"
            }
          },
          {
            "name": "inside",
            "children": [
              {
                "name": "ip-list",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "cgn/fixed-nat/inside/ip-list"
                }
              },
              {
                "name": "ipv4-address",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "cgn/fixed-nat/inside/ipv4-address"
                }
              },
              {
                "name": "ipv6-address",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "cgn/fixed-nat/inside/ipv6-address"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "ip-lists",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/fixed-nat/ip-lists"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "lsn",
        "children": [
          {
            "name": "class-lists",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/lsn/class-lists"
            }
          },
          {
            "name": "full-cone",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/lsn/full-cone"
            }
          },
          {
            "name": "global",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/lsn/global"
            }
          },
          {
            "name": "lsn-interfaces",
            "children": [
              {
                "name": "ethernet",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "cgn/lsn/lsn-interfaces/ethernet"
                }
              },
              {
                "name": "trunk",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "cgn/lsn/lsn-interfaces/trunk"
                }
              },
              {
                "name": "ve",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "cgn/lsn/lsn-interfaces/ve"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "lsn-lid",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/lsn/lsn-lid"
            }
          },
          {
            "name": "lsn-pool-groups",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/lsn/lsn-pool-groups"
            }
          },
          {
            "name": "lsn-pools",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/lsn/lsn-pools"
            }
          },
          {
            "name": "lsn-rule-list",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/lsn/lsn-rule-list"
            }
          },
          {
            "name": "port-reservations",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/lsn/port-reservations"
            }
          },
          {
            "name": "radius-profile",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/lsn/radius-profile"
            }
          },
          {
            "name": "rule-lists",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/lsn/rule-lists"
            }
          },
          {
            "name": "templates",
            "children": [
              {
                "name": "http-alg",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "cgn/lsn/templates/http-alg"
                }
              },
              {
                "name": "logging",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "cgn/lsn/templates/logging"
                }
              },
              {
                "name": "pcp",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "cgn/lsn/templates/pcp"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "lw-4over6",
        "children": [
          {
            "name": "global",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/lw-4over6/global"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "nat64",
        "children": [],
        "type": "file",
        "component": "antd:Col",
        "datasource": {
          "source": "cgn/nat64"
        }
      },
      {
        "name": "one-to-one-nat",
        "children": [
          {
            "name": "global",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/one-to-one-nat/global"
            }
          },
          {
            "name": "pool-groups",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/one-to-one-nat/pool-groups"
            }
          },
          {
            "name": "pools",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/one-to-one-nat/pools"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "services",
        "children": [
          {
            "name": "servers",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/services/servers"
            }
          },
          {
            "name": "service-groups",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/services/service-groups"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "session",
        "children": [
          {
            "name": "global",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/session/global"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "six-rd",
        "children": [],
        "type": "file",
        "component": "antd:Col",
        "datasource": {
          "source": "cgn/six-rd"
        }
      },
      {
        "name": "stateless-nat46",
        "children": [
          {
            "name": "global",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/stateless-nat46/global"
            }
          },
          {
            "name": "static-mappings",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/stateless-nat46/static-mappings"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "static-nat",
        "children": [
          {
            "name": "range-list",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/static-nat/range-list"
            }
          },
          {
            "name": "static",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "cgn/static-nat/static"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      }
    ],
    "type": "file",
    "component": "antd:Col"
  },
  {
    "name": "gslb",
    "children": [
      {
        "name": "sites",
        "children": [],
        "type": "file",
        "component": "antd:Col",
        "datasource": {
          "source": "gslb/sites"
        }
      },
      {
        "name": "zone",
        "children": [],
        "type": "file",
        "component": "antd:Col",
        "datasource": {
          "source": "gslb/zone"
        }
      }
    ],
    "type": "file",
    "component": "antd:Col"
  },
  {
    "name": "network",
    "children": [
      {
        "name": "arp",
        "children": [
          {
            "name": "global",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/arp/global"
            }
          },
          {
            "name": "ipv4",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/arp/ipv4"
            }
          },
          {
            "name": "ipv6",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/arp/ipv6"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "bpdu-fwd-groups",
        "children": [],
        "type": "file",
        "component": "antd:Col",
        "datasource": {
          "source": "network/bpdu-fwd-groups"
        }
      },
      {
        "name": "interfaces",
        "children": [
          {
            "name": "interface-global",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/interfaces/interface-global"
            }
          },
          {
            "name": "lan",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/interfaces/lan"
            }
          },
          {
            "name": "lldp",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/interfaces/lldp"
            }
          },
          {
            "name": "management",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/interfaces/management"
            }
          },
          {
            "name": "transparent",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/interfaces/transparent"
            }
          },
          {
            "name": "trunk",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/interfaces/trunk"
            }
          },
          {
            "name": "tunnel",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/interfaces/tunnel"
            }
          },
          {
            "name": "virtual-ethernet",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/interfaces/virtual-ethernet"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "lacp",
        "children": [
          {
            "name": "lacp",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/lacp/lacp"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "mldb",
        "children": [
          {
            "name": "scaleout",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/mldb/scaleout"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "routes",
        "children": [
          {
            "name": "ipv4-static-routes",
            "children": [
              {
                "name": "ipv4-bfd",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "network/routes/ipv4-static-routes/ipv4-bfd"
                }
              },
              {
                "name": "ipv4-rib",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "network/routes/ipv4-static-routes/ipv4-rib"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "ipv6-static-routes",
            "children": [
              {
                "name": "ipv6-bfd",
                "children": [
                  {
                    "name": "bfd",
                    "children": [],
                    "type": "file",
                    "component": "antd:Col",
                    "datasource": {
                      "source": "network/routes/ipv6-static-routes/ipv6-bfd/bfd"
                    }
                  },
                  {
                    "name": "ethernet",
                    "children": [],
                    "type": "file",
                    "component": "antd:Col",
                    "datasource": {
                      "source": "network/routes/ipv6-static-routes/ipv6-bfd/ethernet"
                    }
                  },
                  {
                    "name": "trunk",
                    "children": [],
                    "type": "file",
                    "component": "antd:Col",
                    "datasource": {
                      "source": "network/routes/ipv6-static-routes/ipv6-bfd/trunk"
                    }
                  },
                  {
                    "name": "ve",
                    "children": [],
                    "type": "file",
                    "component": "antd:Col",
                    "datasource": {
                      "source": "network/routes/ipv6-static-routes/ipv6-bfd/ve"
                    }
                  }
                ],
                "type": "file",
                "component": "antd:Col"
              },
              {
                "name": "ipv6-rib",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "network/routes/ipv6-static-routes/ipv6-rib"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "vlan",
        "children": [
          {
            "name": "global",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/vlan/global"
            }
          },
          {
            "name": "mac",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/vlan/mac"
            }
          },
          {
            "name": "vlan",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "network/vlan/vlan"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      }
    ],
    "type": "file",
    "component": "antd:Col"
  },
  {
    "name": "security",
    "children": [
      {
        "name": "forward-proxy",
        "children": [
          {
            "name": "class-lists",
            "children": [
              {
                "name": "configuration",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "security/forward-proxy/class-lists/configuration"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "servers",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "security/forward-proxy/servers"
            }
          },
          {
            "name": "service-group",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "security/forward-proxy/service-group"
            }
          },
          {
            "name": "services",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "security/forward-proxy/services"
            }
          },
          {
            "name": "templates",
            "children": [
              {
                "name": "client-ssl",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "security/forward-proxy/templates/client-ssl"
                }
              },
              {
                "name": "dynamic-service",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "security/forward-proxy/templates/dynamic-service"
                }
              },
              {
                "name": "policy",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "security/forward-proxy/templates/policy"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "shared-objects",
        "children": [
          {
            "name": "object-group",
            "children": [
              {
                "name": "network",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "security/shared-objects/object-group/network"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "object",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "security/shared-objects/object"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "ssli",
        "children": [
          {
            "name": "services",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "security/ssli/services"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      }
    ],
    "type": "file",
    "component": "antd:Col"
  },
  {
    "name": "system",
    "children": [
      {
        "name": "admin",
        "children": [
          {
            "name": "external-authentication",
            "children": [
              {
                "name": "ldap",
                "children": [
                  {
                    "name": "hostname",
                    "children": [],
                    "type": "file",
                    "component": "antd:Col",
                    "datasource": {
                      "source": "system/admin/external-authentication/ldap/hostname"
                    }
                  },
                  {
                    "name": "ipv4",
                    "children": [],
                    "type": "file",
                    "component": "antd:Col",
                    "datasource": {
                      "source": "system/admin/external-authentication/ldap/ipv4"
                    }
                  },
                  {
                    "name": "ipv6",
                    "children": [],
                    "type": "file",
                    "component": "antd:Col",
                    "datasource": {
                      "source": "system/admin/external-authentication/ldap/ipv6"
                    }
                  }
                ],
                "type": "file",
                "component": "antd:Col"
              },
              {
                "name": "radius",
                "children": [
                  {
                    "name": "ipv4",
                    "children": [],
                    "type": "file",
                    "component": "antd:Col",
                    "datasource": {
                      "source": "system/admin/external-authentication/radius/ipv4"
                    }
                  },
                  {
                    "name": "ipv6",
                    "children": [],
                    "type": "file",
                    "component": "antd:Col",
                    "datasource": {
                      "source": "system/admin/external-authentication/radius/ipv6"
                    }
                  },
                  {
                    "name": "name",
                    "children": [],
                    "type": "file",
                    "component": "antd:Col",
                    "datasource": {
                      "source": "system/admin/external-authentication/radius/name"
                    }
                  }
                ],
                "type": "file",
                "component": "antd:Col"
              },
              {
                "name": "settings",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "system/admin/external-authentication/settings"
                }
              },
              {
                "name": "tacacs-host",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "system/admin/external-authentication/tacacs-host"
                }
              },
              {
                "name": "tacacs-monitor",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "system/admin/external-authentication/tacacs-monitor"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "lockout",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/admin/lockout"
            }
          },
          {
            "name": "partitions",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/admin/partitions"
            }
          },
          {
            "name": "users",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/admin/users"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "avcs",
        "children": [
          {
            "name": "actions",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/avcs/actions"
            }
          },
          {
            "name": "device",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/avcs/device"
            }
          },
          {
            "name": "settings",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/avcs/settings"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "maintenance",
        "children": [
          {
            "name": "backup",
            "children": [
              {
                "name": "backup-periodic",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "system/maintenance/backup/backup-periodic"
                }
              },
              {
                "name": "log",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "system/maintenance/backup/log"
                }
              },
              {
                "name": "restore",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "system/maintenance/backup/restore"
                }
              },
              {
                "name": "system",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "system/maintenance/backup/system"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "monitoring",
        "children": [
          {
            "name": "monitors",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/monitoring/monitors"
            }
          },
          {
            "name": "sflow",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/monitoring/sflow"
            }
          },
          {
            "name": "snmp",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/monitoring/snmp"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "settings",
        "children": [
          {
            "name": "actions",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/settings/actions"
            }
          },
          {
            "name": "dns",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/settings/dns"
            }
          },
          {
            "name": "general",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/settings/general"
            }
          },
          {
            "name": "logging",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/settings/logging"
            }
          },
          {
            "name": "templates",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/settings/templates"
            }
          },
          {
            "name": "terminal",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/settings/terminal"
            }
          },
          {
            "name": "web",
            "children": [],
            "type": "file",
            "component": "antd:Col",
            "datasource": {
              "source": "system/settings/web"
            }
          }
        ],
        "type": "file",
        "component": "antd:Col"
      },
      {
        "name": "vrrpa",
        "children": [
          {
            "name": "interface",
            "children": [
              {
                "name": "interface",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "system/vrrpa/interface/interface"
                }
              },
              {
                "name": "trunk",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "system/vrrpa/interface/trunk"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          },
          {
            "name": "settings",
            "children": [
              {
                "name": "global",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "system/vrrpa/settings/global"
                }
              },
              {
                "name": "vrid",
                "children": [],
                "type": "file",
                "component": "antd:Col",
                "datasource": {
                  "source": "system/vrrpa/settings/vrid"
                }
              }
            ],
            "type": "file",
            "component": "antd:Col"
          }
        ],
        "type": "file",
        "component": "antd:Col"
      }
    ],
    "type": "file",
    "component": "antd:Col"
  }
]
