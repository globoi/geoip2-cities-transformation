rules = [
    {
        table_name: "city_blocks_ipv4",
        regex: "r'^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/([0-9]|[1-2][0-9]|3[0-2])$'"
    },
    {
        table_name: "city_blocks_ipv6",
        regex: "r'^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8])$'"
    }]

rules.map((rule) => assert(`conformity_${rule.table_name}`).query((ctx) => `
    SELECT
        NOT REGEXP_CONTAINS(network, ${rule.regex})
    FROM
        ${ctx.ref(rule.table_name)}
`))