document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const stock = urlParams.get('stock');

    if (stock) {
        loadStockPrices(stock);
        loadStockTitle(stock);
        loadWikiOverview(stock);
    }
});

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

const svgMapping = {
    'LSNG': 36,
    'MRKC': 36,
    'MRKK': 36,
    'MRKP': 36,
    'MRKS': 36,
    'MRKP': 36,
    'MRKV': 36,
    'MRKY': 36,
    'MRKZ': 36,
    'MSRS': 36,
    'RTGZ': 103,
    'SIBN': 103,
    'ZAYM': null,
    'ZILL': 179,
    'ZVEZ': 180
};

const stockTickers = [];
for (let i = 0; i < tickers_names.length; i++) {
    stockTickers.push(tickers_names[i][0]);

}

function getSvgIndex(ticker, alphabeticalIndex) 
{
    if (svgMapping[ticker] === null) {
        return null; // Return null to indicate no SVG should be used
    }
    if (svgMapping[ticker]) {
        //console.log(ticker + " uses a specific SVG index: " + svgMapping[ticker]);
        return svgMapping[ticker]; // Return specific SVG index if defined
    }
    // Calculate dynamic index for tickers not in the mapping
    let count = 1; // Start counting from the first SVG index
    // Iterate through the sorted tickers up to the current alphabetical index
    for (let i = 0; i < alphabeticalIndex; i++) {
        // Assume tickers_names[i][0] if tickers_names is an array of arrays
        let currentTicker = tickers_names[i][0];
        // Only increment if currentTicker is not in svgMapping
        if (!svgMapping[currentTicker]) {
            count++;
        }
    }
    //console.log(ticker + " dynamically assigned SVG index: " + count);
    return count;
}



function loadStockSvg(ticker) {
    const svgContainer = document.getElementById('stock-svg-container');
    const svgIndex = getSvgIndex(ticker, stockTickers.indexOf(ticker));
    console.log(svgIndex)
    if (svgIndex === null) {
        svgContainer.innerHTML = '<p>SVG not available for this stock.</p>';
    } else {
        svgContainer.innerHTML = `<img src="web/img/svg_${svgIndex}.svg" alt="Logo for ${ticker}">`;
    }
}

async function loadStockPrices(stock) {
    const url = 'web/json/stock_data.json'; // Path to your JSON file
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const stockData = data[stock];
        
        if (stockData && Object.keys(stockData.prices).length > 0) {
            // Get the latest date
            const latestDate = Object.keys(stockData.prices).sort().pop();
            const latestPrices = stockData.prices[latestDate];
            

            // Update HTML elements with the extracted prices
            console.log(latestPrices["prices"][latestPrices["prices"].length - 1])

            const firstNonNullPrice = latestPrices["prices"].find(price => price !== null);
            // Update the DOM element
            document.getElementById("current-price").textContent = firstNonNullPrice !== undefined ? firstNonNullPrice : "N/A";

            document.getElementById("open-price").textContent = latestPrices['prices'][latestPrices['prices'].length-1];
            document.getElementById("max-price").textContent = latestPrices['max-price'];
            document.getElementById("lowest-price").textContent = latestPrices['lowest-price'];
        } else {
            document.getElementById("current-price").textContent = "N/A";
            document.getElementById("open-price").textContent = "N/A";
            document.getElementById("max-price").textContent = "N/A";
            document.getElementById("lowest-price").textContent = "N/A";
        }
    } catch (error) {
        console.error('Error fetching stock prices:', error);
        document.getElementById("current-price").textContent = "Error";
        document.getElementById("open-price").textContent = "Error";
        document.getElementById("max-price").textContent = "Error";
        document.getElementById("lowest-price").textContent = "Error";
    }
}

async function loadStockTitle(stock) {
    /*
    const url = 'web/json/stock_data.json';

    try {
        const response = await fetch(url);
        const data = await response.json();
        const stockData = data[stock];

        if (stockData) {
            document.getElementById("stock-title").textContent = stockData.stock_name_EN;
        } else {
            document.getElementById("stock-title").textContent = "Unknown Stock";
        }
    } catch (error) {
        console.error('Error fetching stock data:', error);
        */
        
    document.getElementById("stock-title").textContent = tickers_names.find(pair => pair[0] === stock)[1];
    loadStockSvg(stock);
    //}
}

async function loadWikiOverview(stockName) {
    const wikiBaseUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
    const wikiPageTitle = getWikiPageTitle(stockName);
    const url = `${wikiBaseUrl}${wikiPageTitle}`;

    try {
        const response = await fetch(url);
        
        if (response.status === 404) {
            // If the response status is 404, update the overview with an error message
            document.getElementById("overview").textContent = "Company data not found";
        } else {
            const data = await response.json();
            document.getElementById("overview").textContent = data.extract;
        }
    } catch (error) {
        console.error('Error fetching Wikipedia overview:', error);
        document.getElementById("overview").textContent = "Error loading company data";
    }
}

function getWikiPageTitle(stock) {
    // Map stock symbols to Wikipedia page titles
    
    return tickers_names.find(pair => pair[0] === stock)[1];
}

async function loadMessages(stock) {
    const url = 'web/json/messages.json';
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Filter messages for the current stock
        const stockMessages = [];
        Object.values(data).forEach(channelMessages => {
            channelMessages.forEach(message => {
                if (message.text && message.text.toLowerCase().includes(stock.toLowerCase())) {
                    stockMessages.push(message);
                }
            });
        });

        // Sort messages by date and time
        stockMessages.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Display the messages
        const messagesContainer = document.getElementById('messages-container');
        messagesContainer.innerHTML = ''; // Clear any existing messages
        if (stockMessages.length > 0) {
            stockMessages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.className = 'message';
                messageElement.innerHTML = `
                    <p class="message-date">${new Date(message.date).toLocaleString()}</p>
                    <p>${message.text}</p>
                `;
                messagesContainer.appendChild(messageElement);
            });
        } else {
            messagesContainer.textContent = 'No messages found for this stock.';
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        document.getElementById('messages-container').textContent = 'Error loading messages.';
    }
}

// Example usage: Assuming you have a function to get the stock ticker from the URL or some other source
const urlParams = new URLSearchParams(window.location.search);
const stock = urlParams.get('stock');
if (stock) {
    document.addEventListener('DOMContentLoaded', () => {
        loadMessages(stock);
    });
}