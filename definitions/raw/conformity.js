const rules = [
  {
    table_name: 'city_blocks_ipv4',
    regex: "r'^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/([0-9]|[1-2][0-9]|3[0-2])$'",
    /*
    * Este regex valida se o campo network possui um formato valido, ou  seja:
    * ex de valor válido: 192.168.0.2/24
    * ex de valor inválido: 257.0.0.1/21 - os endereços IPv4 são 4 octais de 0 a 255
    */
  },
  {
    table_name: 'city_blocks_ipv6',
    regex: "r'^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8])$'",
    /*
    * Este regex valida se o campo network possui um formato válido, ou seja:
    * ex valor válido: 2002::1234:abcd:ffff:c0a8:101/64
    * ex valor invalido: 2002::1234:abcd:ffff:c0a8:101/129 - a máscara de subrede
    * vai de 2ˆ2 a 2ˆ7 (4 a 128, em potências de 2)
    */
  },
]

rules.map((rule) => assert(`conformity_${rule.table_name}`).query((ctx) => `
    SELECT
        network
    FROM
        ${ctx.ref('raw', rule.table_name)}
    WHERE
        NOT REGEXP_CONTAINS(network, ${rule.regex}) AND
        last_modified_date = ${ctx.dataform.projectConfig.vars.lastModifiedDate}
`).config(
  {
    description: 'Confere se o valor do campo network possui o formato esperado',
  },
))
