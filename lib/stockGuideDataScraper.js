var cheerio = require('cheerio');
var columnDefs = require('./columnDefinitions');

function scrapeData(htmlContent) {
    var $ = cheerio.load(htmlContent);
    var $mainTable = $('table').first();
    var stocks = {};

    var columnNames = $mainTable.find("thead>tr>th,thead>tr>td").map(function() {
        return columnDefs.resolveColumnName(getInnerText($(this)));
    });

    $mainTable.find("tbody>tr").each(function() {
        var stock = {};
        $(this).find('th,td').each(function(i, elem) {
            var textContent = getInnerText($(this));
            var columnName = columnNames.get(i);
            stock[columnName.name] = (columnName.type === 'number') ? parseFloat(textContent) : textContent;
        })
        stock.lastUpdated = new Date().toUTCString();
        stocks[stock.stockCode] = stock;
    });

    return stocks;
}

function getInnerText($element) {
    while ($element.contents().length > 0)
        $element = $element.contents();
    return $element.text();
}

module.exports = {
    scrapeData: scrapeData
}
