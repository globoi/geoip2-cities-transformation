tables = ["city_blocks_ipv4", "city_blocks_ipv6"]

tables.map((table) => assert(`conformity_${table}`).query((ctx) => `
    SELECT
        NOT REGEXP_CONTAINS(network, r'^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/([0-9]|[1-2][0-9]|3[0-2])$')
    FROM
        ${ctx.ref(table)}
`))