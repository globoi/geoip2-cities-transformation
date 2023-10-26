tables = ["city_blocks_ipv4", "city_blocks_ipv6"]
fields = [
    {
        name: "latitude",
        minValue: -90,
        maxValue: 90
    },
    {
        name: "longitude",
        minValue: -180,
        maxValue: 180
    }
]

tables.map((table) => {
    fields.map((field) => {
        assert(`precision_${table}_${field.name}`).query((ctx) => `
            SELECT
                ${field.name} AS limite_${field.name}
            FROM
                ${ctx.ref("raw", table)}
            WHERE
                ${field.name} <= ${field.minValue} AND ${field.name} >= ${field.maxValue}
        `)
    })
});