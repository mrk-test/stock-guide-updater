var firebase = require('firebase');
var stockGuideDataFetcher = require('./stockGuideDataFetcher');
var stockGuideDataScraper = require('./stockGuideDataScraper');

firebase.initializeApp({
    serviceAccount: process.env.SG_FIREBASE_SVC_ACCT_KEY_PATH,
    databaseURL: process.env.SG_FIREBASE_DB_URL,
    databaseAuthVariableOverride: {
        uid: process.env.SG_FIREBASE_BATCH_UID
    }
});

function saveDataToFirebase(stocks) {
    console.log('Saving to Firebase...');
    return firebase.database().ref('stocks').set(stocks).then(function(error) {
        if (error)
            throw new Error('Error saving to Firebase', error);
        console.log('Saving to Firebase...succeeded!');
        return stocks;
    });
}

function saveDataToFile(stocks) {
    require('fs').writeFileSync('stocks.json', JSON.stringify(stocks, undefined, 5));
}

function errorHandler(error) {
    console.error("Error handler: ", error);
}

function updateStockGuide() {
    return stockGuideDataFetcher.getStocksData().then(stockGuideDataScraper.scrapeData).then(saveDataToFirebase).catch(errorHandler);
}

module.exports = {
    updateStockGuide: updateStockGuide
}
