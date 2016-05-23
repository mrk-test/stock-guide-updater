module.exports = function() {

    var columnDefinitions = [{
        name: 'stockCode',
        aliases: ['STOCKS']
    }, {
        name: 'currentPrice',
        type: 'number',
        aliases: ['Current Price']
    }, {
        name: 'buyBelowPrice',
        type: 'number',
        aliases: ['Buy Below Price']
    }, {
        name: 'targetPrice',
        type: 'number',
        aliases: ['Target Price']
    }, {
        name: 'expectedGrowth',
        type: 'number',
        aliases: ['EXPECTED GROWTH']
    }, {
        name: 'maxPortfolioPercentage',
        type: 'number',
        aliases: ['Max %*']
    }, {
        name: 'action',
        aliases: ['Action to Take']
    }];

    return {
        getDefinitions: function() {
            return columnDefinitions;
        },
        resolveColumnName: function resolveColumnName(rawName) {
            var defs = columnDefinitions;
            for (x in defs) {
                if (defs[x].aliases.indexOf(rawName) > -1) {
                    return defs[x];
                }
            }
            return { name: rawName.toLowerCase().split(' ').join('_') }
        }
    };
}();
