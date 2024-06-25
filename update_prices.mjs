import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { DateTime } from 'luxon';
import { fileURLToPath } from 'url';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Path to your JSON file
const jsonFilePath = path.join(__dirname, 'web/json/stock_data.json');

// List of tickers to fetch prices for
const tickers_names = [
    ["ABIO", "Artgen"],
    ["ABRD", "Abrau-Durso"],
    ["AFKS", "AFK Sistema"],
    ["AFLT", "Aeroflot"],
    ["AKRN", "Acron"],
    ["ALRS", "ALROSA"],
    ["AMEZ", "Ashinckiy metzavod PAO"],
    ["APTK", "Apteki 36,6"],
    ["AQUA", "INARCTIKA"],
    ["ARSA", "UK Arsagera"],
    ["ASSB", "Astrakhan Energo Sbyt"],
    ["ASTR", "Astra Group"],
    ["AVAN", "AKB 'AVANGARD'"],
    ["BANE", "Bashneft BANK"],
    ["BELU", "NovaBev Group"],
    ["BLNG", "Belon"],
    ["BRZL", "Buryatzoloto"],
    ["BSPB", "BSP"],
    ["CARM", "STG"],
    ["CBOM", "MKB"],
    ["CHGZ", "RN-Western Siberia"],
    ["CHKZ", "CKPZ"],
    ["CHMF", "Severstal"],
    ["CHMK", "CMK"],
    ["CNTL", "Centrlnyi Telegraf"],
    ["DELI", "Carsharing Russia"],
    ["DIAS", "Diasoft"],
    ["DIOD", "Zavod DIOD"],
    ["DSKY", "Detsky mir"],
    ["DVEC", "DEC"],
    ["DZRD", "DZRD"],
    ["EELT", "European Eltech"],
    ["ELFV", "El5-Ener"],
    ["ENPG", "EN+ GROUP IPJSC ORD SHS"],
    ["EUTR", "EvroTrans"],
    ["FEES", "FGC ROSSETI"],
    ["FESH", "DVMP"],
    ["FLOT", "Sovcomflot"],
    ["GAZA", "Gaz"],
    ["GAZP", "Gazprom"],
    ["GCHE", "Cherkizovo Group"],
    ["GECO", "GENETICO"],
    ["GEMA", "IMCB PJSC"],
    ["GEMC", "IPJSC UMG"],
    ["GMKN", "NorNickel GMK"],
    ["GTRK", "GTM"],
    ["HNFG", "HENDERSON"],
    ["HYDR", "RusGidro"],
    ["IGST", "Izhstal 2ao"],
    ["INGR", "INGRAD"],
    ["IRAO", "Inter RAO"],
    ["IRKT", "Yakovlev-3"],
    ["JNOS", "Slavneft-JANOS"],
    ["KAZT", "Kuib.Azot"],
    ["KBSB", "TNS energo Kuban Company"],
    ["KCHE", "Kamchatskenergo"],
    ["KGKC", "Kurganskaja Gener.Kompanija"],
    ["KLSB", "Kalugsk. Sbyt. Company"],
    ["KLVZ", "KLVZ KRISTALL"],
    ["KMAZ", "KAMAZ"],
    ["KMEZ", "Kovrov Mech. Zavod"],
    ["KOGK", "Korshunovskii GOK"],
    ["KRKN", "Saratovskiy NPZ"],
    ["KROT", "KrasnyiOctyabr"],
    ["KRSB", "Krashojarskenergosbyt"],
    ["KUBE", "Rosseti Kuban"],
    ["KUZB", "Bank 'Kuzneckiy'"],
    ["KZOS", "PAO Organicheskiy Sintez"],
    ["LEAS", "Europlan"],
    ["LENT", "Lenta IPJSC ORD SHS"],
    ["LIFE", "Farmsintez"],
    ["LKOH", "LUKOIL"],
    ["LNZL", "Lenzoloto"],
    ["LPSB", "LESK"],
    ["LSNG", "Rosseti LenEnrg"],
    ["LSRG", "LSR"],
    ["LVHK", "Levenguk"],
    ["MAGE", "Magadanenergo"],
    ["MAGN", "MMK"],
    ["MBNK", "MTS Bank"],
    ["MFGS", "Megion"],
    ["MGKL", "MGKL"],
    ["MGNT", "Magnit"],
    ["MGTS", "MGTS-5"],
    ["MISB", "TNS energo Mariy El"],
    ["MOEX", "MoscowExchange"],
    ["MRKC", "Rosseti Centr"],
    ["MRKK", "Rosseti Severnyy Kavkaz"],
    ["MRKP", "Rosseti Centr i Privoljye"],
    ["MRKS", "Rosseti Sibir"],
    ["MRKU", "Rosseti Ural"],
    ["MRKV", "Rosseti Volga"],
    ["MRKY", "Rosseti South"],
    ["MRKZ", "Rosseti Severo-Zapad"],
    ["MRSB", "Mordovskaya EnergoSbyt Comp."],
    ["MSNG", "MosEnrg"],
    ["MSRS", "Rosseti Moscow Region"],
    ["MSTT", "Mostotrest"],
    ["MTLR", "Mechel"],
    ["MTSS", "MTS"],
    ["MVID", "M.video"],
    ["NAUK", "NPO Nauka"],
    ["NFAZ", "NEFAZ PAO"],
    ["NKHP", "NKHP"],
    ["NKNC", "Niznekamskneftekhim"],
    ["NKSH", "Nizhnekamskshina"],
    ["NLMK", "NLMK"],
    ["NMTP", "NMTP"],
    ["NNSB", "TNS energo Nizhniy-Novgorod"],
    ["NSVZ", "Nauka-Svyaz"],
    ["NVTK", "NOVATEK"],
    ["OGKB", "OGK-2"],
    ["PAZA", "Pavlovo Bus"],
    ["PHOR", "PhosAgro"],
    ["PIKK", "PIK SZ"],
    ["PLZL", "Polus"],
    ["PMSB", "Perm' EnergoSbyt"],
    ["POLY", "Polymetal International plc"],
    ["POSI", "PJSC Positive Group"],
    ["PRFN", "CZPSN-Profnasteel"],
    ["PRMB", "AKB Primorye"],
    ["RASP", "Raspadskaya"],
    ["RBCM", "GK RBK"],
    ["RDRB", "RosDor Bank"],
    ["RENI", "Renaissance Insurance"],
    ["RGSS", "Rosgosstrakh"],
    ["RKKE", "RKK Energia"],
    ["RNFT", "RussNeft NK"],
    ["ROLO", "Rusolovo PAO"],
    ["ROSB", "ROSBANK"],
    ["ROSN", "Rosneft"],
    ["ROST", "ROSINTER RESTAURANTS"],
    ["RTGZ", "Gazprom gazorasp. Rostov"],
    ["RTKM", "Rostelecom"],
    ["RTSB", "TNS energo Rostov-na-Dony"],
    ["RUAL", "RUSAL"],
    ["RUSI", "RUSS-INVEST IC"],
    ["RZSB", "JSC 'Ryazanenergosbyt'"],
    ["SAGO", "SamaraEnergo"],
    ["SARE", "SaratovEnergo"],
    ["SBER", "Sberbank"],
    ["SELG", "Seligdar"],
    ["SFIN", "SFI"],
    ["SGZH", "Segezha"],
    ["SIBN", "Gazprom neft"],
    ["SLEN", "Sakhalinenergo"],
    ["SMLT", "Samolet"],
    ["SNGS", "Surgut"],
    ["SOFL", "Softline"],
    ["SPBE", "SPB Exchange"],
    ["STSB", "StavropolEnergoSbyt"],
    ["SVAV", "Sollers Avto"],
    ["SVCB", "Sovcombank"],
    ["SVET", "Svetofor Group"],
    ["TASB", "Tambov EnergoSbyt Company"],
    ["TATN", "Tatneft-3"],
    ["TCSG", "IPJSC TCS Holding"],
    ["TGKA", "TGK-1"],
    ["TGKB", "TGK-2"],
    ["TGKN", "TGK-14"],
    ["TNSE", "PAO GK 'TNS energo'"],
    ["TORS", "Tomsk raspredelit. komp"],
    ["TRMK", "TMK"],
    ["TTLK", "Tattelekom"],
    ["TUZA", "Tuimaz. Zavod Avtobetonovozov"],
    ["UGLD", "UGC"],
    ["UKUZ", "Uzhnyi Kuzbass"],
    ["UNAC", "Ob.aviastroitelnaya korp."],
    ["UNKL", "Uzhno-Uralskiy nikel. komb."],
    ["UPRO", "Unipro PAO"],
    ["URKZ", "Uralskaya kuznica"],
    ["USBN", "BANK URALSIB"],
    ["UTAR", "UTAir Aviacompany"],
    ["UWGN", "OVK"],
    ["VEON-RX", "VEON Ltd. ORD SHS"],
    ["VGSB", "Volgograd EnergoSbyt"],
    ["VJGZ", "Var'eganneftegaz"],
    ["VKCO", "VK International Public JS Com"],
    ["VLHZ", "VHZ"],
    ["VRSB", "TNS energo Voroneg"],
    ["VSMO", "Corp. VSMPO-AVISMA"],
    ["VSYD", "Viborgskii sudostr. Zavod"],
    ["VTBR", "VTB"],
    ["WTCM", "CMT"],
    ["WUSH", "WHOOSH Holding"],
    ["YAKG", "YaTEK"],
    ["YKEN", "YakutskEnergo"],
    ["YNDX", "PLLC Yandex N.V."],
    ["YRSB", "TNS energo Yaroslavl'"],
    ["ZAYM", "Zaymer"],
    ["ZILL", "ZIL"],
    ["ZVEZ", "Zvezda"]
]


const tickers = [];
for (let i = 0; i < tickers_names.length; i++) {
    tickers.push(tickers_names[i][0]);

}


// MOEX trading hours (Moscow time)
const TRADING_START_HOUR = 1;
const TRADING_START_MINUTE = 30;
const TRADING_END_HOUR = 19;
const TRADING_END_MINUTE = 0;

async function fetchStockPrices(ticker) {
    const baseUrl = 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/';
    const queryParams = '.json?iss.meta=off&iss.only=marketdata&marketdata.columns=SECID,LAST,OPEN,HIGH,LOW';
    const url = `${baseUrl}${ticker}${queryParams}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data for ${ticker}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(`Data for ${ticker}:`, JSON.stringify(data)); // Debugging log
        const marketData = data.marketdata.data[0];
        if (!marketData || marketData[1] === null) {
            throw new Error(`No valid market data available for ${ticker}`);
        }
        //console.log(marketData[1],marketData[2], marketData[3], marketData[4])
        return {
            last: marketData[1],
            open: marketData[2],
            high: marketData[3],
            low: marketData[4],
        };
    } catch (error) {
        console.error(`Error fetching stock prices for ${ticker}:`, error);
        return null;
    }
}

function isMarketOpen() {
    const now = DateTime.local().setZone('Europe/Moscow');
    const dayOfWeek = now.weekday; // Monday = 1, Sunday = 7

    // Check if it's a weekday
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        const start = now.set({ hour: TRADING_START_HOUR, minute: TRADING_START_MINUTE, second: 0 });
        const end = now.set({ hour: TRADING_END_HOUR, minute: TRADING_END_MINUTE, second: 0 });

        return now >= start && now <= end;
    }

    return false;
}

async function updatePrices() {
    if (!isMarketOpen()) {
        console.log('Market is closed. Skipping price update.');
        return;
    }

    const date = new Date();
    const currentDate = date.toISOString().split('T')[0];

    // Read the existing JSON data
    const rawData = fs.readFileSync(jsonFilePath);
    const stockData = JSON.parse(rawData);

    for (const ticker of tickers) {
        const prices = await fetchStockPrices(ticker);
        if (prices !== null) {
            if (!stockData[ticker].prices[currentDate]) {
                stockData[ticker].prices[currentDate] = {
                    "open-price": prices.open,
                    "max-price": prices.high,
                    "lowest-price": prices.low,
                    "prices": []
                };
            }

            const dayData = stockData[ticker].prices[currentDate];
            dayData.prices.push(prices.last);

            if (prices.high !== null && prices.high > dayData["max-price"]) {
                dayData["max-price"] = prices.high;
            }

            
            dayData["lowest-price"] = prices.low;
            
        }
    }

    // Write updated data back to the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(stockData, null, 2));
}

// Run the update function
updatePrices().catch(error => console.error('Error updating prices:', error));