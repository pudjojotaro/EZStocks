document.addEventListener('DOMContentLoaded', (event) => {
    let currentLanguage = 'EN'; // State variable to track the current language

    const updateNamesButton = document.getElementById('updateNamesButton');
    const ruText = document.getElementById('ruText');
    const enText = document.getElementById('enText');
    enText.classList.remove('selected');
    ruText.classList.add('selected');
    updateNamesButton.addEventListener('click', () => {
        updateStockNames();
        if (currentLanguage === 'RU') {
            ruText.classList.remove('selected');
            enText.classList.add('selected');
        } else {
            enText.classList.remove('selected');
            ruText.classList.add('selected');
        }
    });
    
    
    
    const favoritesFilter = document.getElementById('favoritesFilter');
    let allStockItems = document.querySelectorAll('.stock-item'); // Ensure this is updated if items can change dynamically

    favoritesFilter.addEventListener('click', function() {
        this.classList.toggle('active'); // Toggle the 'active' class on click
        const isActive = this.classList.contains('active');

        updateStockItemsVisibility(isActive);
    });

    function updateStockItemsVisibility(isActive) {
        allStockItems = document.querySelectorAll('.stock-item'); // Re-fetch items to capture any updates

        if (isActive) {
            allStockItems.forEach(item => {
                const heartIcon = item.querySelector('.heart-icon');
                if (!heartIcon || !heartIcon.classList.contains('active')) {
                    item.style.display = 'none'; // Hide non-favorites
                }
            });
        } else {
            allStockItems.forEach(item => {
                item.style.display = ''; // Show all items
            });
        }
    }

    function getSvgIndex(ticker, alphabeticalIndex) {
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
    const ticker_names_RU = [     
        ['ЯТЭК', 'YAKG'],
        ['Яндекс', 'YNDX'],
        ['Яковлев', 'IRKT'],
        ['ЮУНК', 'UNKL'],
        ['Юнипро', 'UPRO'],
        ['Южуралзолото ГК', 'UGLD'],
        ['ЭсЭфАй', 'SFIN'],
        ['Эн+', 'ENPG'],
        ['ЭЛ5-Энерго', 'ELFV'],
        ['ЧМК', 'CHMK'],
        ['ЧЗПСН', 'PRFN'],
        ['Циан АДР', 'CIAN'],
        ['Центральный Телеграф - акции привилегированные', 'CNTLP'],
        ['Центральный Телеграф', 'CNTL'],
        ['ФСК Россети', 'FEES'],
        ['ФосАгро', 'PHOR'],
        ['Фармсинтез', 'LIFE'],
        ['Трубная Металлургическая Компания', 'TRMK'],
        ['Транснефть - привилегированные акции', 'TRNFP'],
        ['ТНС энерго Воронеж', 'VRSB'],
        ['ТКС Холдинг', 'TCSG'],
        ['ТГК-2 - акции привилегированные', 'TGKBP'],
        ['ТГК-2', 'TGKB'],
        ['ТГК-14', 'TGKN'],
        ['ТГК-1', 'TGKA'],
        ['Таттелеком', 'TTLK'],
        ['Татнефть - привилегированные акции', 'TATNP'],
        ['Татнефть', 'TATN'],
        ['Сургутнефтегаз - привилегированные акции', 'SNGSP'],
        ['Сургутнефтегаз', 'SNGS'],
        ['Софтлайн', 'SOFL'],
        ['СОЛЛЕРС', 'SVAV'],
        ['Совкомфлот', 'FLOT'],
        ['Совкомбанк', 'SVCB'],
        ['Селигдар', 'SELG'],
        ['Сегежа', 'SGZH'],
        ['Северсталь', 'CHMF'],
        ['Сбер Банк ап', 'SBERP'],
        ['Сбер Банк', 'SBER'],
        ['Саратовский НПЗ - акции привилегированные', 'KRKNP'],
        ['РуссНефть', 'RNFT'],
        ['Русолово', 'ROLO'],
        ['РусГидро', 'HYDR'],
        ['РУСАЛ', 'RUAL'],
        ['РусАгро', 'AGRO'],
        ['Ростелеком - Привилегированные акции', 'RTKMP'],
        ['Ростелеком', 'RTKM'],
        ['Россети Центр и Приволжье', 'MRKP'],
        ['Россети Центр', 'MRKC'],
        ['Россети Урал', 'MRKU'],
        ['Россети Северо-Запад', 'MRKZ'],
        ['Россети Московский регион', 'MSRS'],
        ['Роснефть', 'ROSN'],
        ['РКК Энергия им.С.П.Королева', 'RKKE'],
        ['Ренессанс Страхование', 'RENI'],
        ['РБК', 'RBCM'],
        ['Распадская', 'RASP'],
        ['Полюс', 'PLZL'],
        ['ПИК', 'PIKK'],
        ['Пермэнергосбыт - акции привилегированные', 'PMSBP'],
        ['Пермэнергосбыт', 'PMSB'],
        ['ОВК', 'UWGN'],
        ['Объединенная авиастроительная корпорация', 'UNAC'],
        ['Норильский никель', 'GMKN'],
        ['НОВАТЭК', 'NVTK'],
        ['НМТП', 'NMTP'],
        ['НЛМК', 'NLMK'],
        ['НКХП', 'NKHP'],
        ['Нижнекамскнефтехим (привилегированные)', 'NKNCP'],
        ['Нижнекамскнефтехим', 'NKNC'],
        ['Наука-Связь', 'NSVZ'],
        ['МФК Займер', 'ZAYM'],
        ['МТС-Банк', 'MBNK'],
        ['МТС', 'MTSS'],
        ['МРСК Юга', 'MRKY'],
        ['МРСК Сибири', 'MRKS'],
        ['МРСК Волги', 'MRKV'],
        ['Мосэнерго', 'MSNG'],
        ['Мостотрест', 'MSTT'],
        ['Московская Биржа', 'MOEX'],
        ['Мосгорломбард', 'MGKL'],
        ['ММК', 'MAGN'],
        ['МКБ', 'CBOM'],
        ['Мечел - Привилегированные акции', 'MTLRP'],
        ['Мечел', 'MTLR'],
        ['МГТС - акции привилегированные', 'MGTSP'],
        ['Магнит', 'MGNT'],
        ['М.Видео', 'MVID'],
        ['ЛУКОЙЛ', 'LKOH'],
        ['Ленэнерго - акции привилегированные', 'LSNGP'],
        ['Ленэнерго', 'LSNG'],
        ['Лента', 'LENT'],
        ['Лензолото - привилегированные акции', 'LNZLP'],
        ['Лензолото', 'LNZL'],
        ['КуйбышевАзот - Акции привилегированные', 'KAZTP'],
        ['КуйбышевАзот', 'KAZT'],
        ['Красный Октябрь', 'KROT'],
        ['КарМани', 'CARM'],
        ['КАМАЗ', 'KMAZ'],
        ['Калужская сбытовая компания', 'KLSB'],
        ['Казаньоргсинтез - ап', 'KZOSP'],
        ['Казаньоргсинтез - ао', 'KZOS'],
        ['Интер РАО ЕЭС', 'IRAO'],
        ['ИНАРКТИКА', 'AQUA'],
        ['ЕвроТранс', 'EUTR'],
        ['Европлан', 'LEAS'],
        ['ДЭК', 'DVEC'],
        ['Диасофт', 'DIAS'],
        ['Детский Мир', 'DSKY'],
        ['Делимобиль', 'DELI'],
        ['ДВМП', 'FESH'],
        ['ГТМ', 'GTRK'],
        ['Группа Черкизово', 'GCHE'],
        ['Группа ЛСР', 'LSRG'],
        ['Группа Астра', 'ASTR'],
        ['ГК Самолет', 'SMLT'],
        ['Генетико', 'GECO'],
        ['Газпром нефть', 'SIBN'],
        ['Газпром', 'GAZP'],
        ['Вторая генерирующая компания оптового рынка электроэнергии', 'OGKB'],
        ['ВСМПО-АВИСМА', 'VSMO'],
        ['ВК', 'VKCO'],
        ['Белон', 'BLNG'],
        ['Башнефть - привилегированные акции', 'BANEP'],
        ['Башнефть', 'BANE'],
        ['Банк Санкт-Петербург', 'BSPB'],
        ['Банк ВТБ', 'VTBR'],
        ['Аэрофлот', 'AFLT'],
        ['Ашинский метзавод', 'AMEZ'],
        ['АФК Система', 'AFKS'],
        ['Артген', 'ABIO'],
        ['Аптечная сеть 36,6', 'APTK'],
        ['АЛРОСА', 'ALRS'],
        ['Акрон', 'AKRN'],
        ['Абрау-Дюрсо', 'ABRD'],
        ['Whoosh', 'WUSH'],
        ['United medical group', 'GEMC'],
        ['QIWI', 'QIWI'],
        ['Positive Technologies', 'POSI'],
        ['Polymetal', 'POLY'],
        ['Ozon Holdings PLC', 'OZON'],
        ["O'Key Group SA", 'OKEY'],
        ['Novabev Group', 'BELU'],
        ['IVA Technologies', 'IVAT'],
        ['HENDERSON', 'HNFG'],
        ['HeadHunter Group PLC', 'HHRU'],
        ['Globaltrans Investment PLC', 'GLTR'],
        ['Fix Price Group', 'FIXP'],
        ['Etalon Group PLC ГДР', 'ETLN']
    ]

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


    const stockTickers = [];
    for (let i = 0; i < tickers_names.length; i++) {
        stockTickers.push(tickers_names[i][0]);

    }



    async function getLastStockPrice(securityName) {
        const baseUrl = 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/';
        const queryParams = '.json?iss.meta=off&iss.only=marketdata&marketdata.columns=SECID,LAST';
        const url = `${baseUrl}${securityName}${queryParams}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            //console.log(data)
            const marketData = data.marketdata.data;
            if (marketData.length > 0) {
                return marketData[0][1]; // Return the LAST value
            } else {
                throw new Error('No market data found');
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return null; // Return null in case of an error
        }
    }


    //const url = 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/SBER.json?iss.meta=off&iss.only=marketdata&marketdata.columns=SECID,LAST';





    // Function to process each ticker
    function processTicker(ticker, index) {
        const randomNum = Math.floor(Math.random() * 15) + 1; // Random number from 1 to 15
        const chevronIcon = Math.random() < 0.5 ? 'fa-chevron-up' : 'fa-chevron-down'; // 50% chance for up or down
        
        return getLastStockPrice(ticker).then(lastValue => {
            if (lastValue !== null) {
                const price_tmp = lastValue; // Assign lastValue to price_tmp here
                // Call updateOrCreateStockItem inside the .then block
                updateOrCreateStockItem(`stock${ticker}`, ticker, chevronIcon, price_tmp.toString() + " ₽", tickers_names[index][1], index); // adding names 
            } else {
                updateOrCreateStockItem(`stock${ticker}`, ticker, chevronIcon, "N/A", tickers_names[index][1], index); // adding names 
                console.log(ticker);
            }
        });
    }

    // Create an array of promises for each ticker
    const promises = stockTickers.map((ticker, index) => processTicker(ticker, index));

    // Wait for all promises to resolve
    Promise.all(promises).then(() => {
        // Call the sort function after all items are initialized
        sortStockItemsAlphabetically();
    });

    // Function to get the Russian name by ticker
    function getRussianNameByTicker(ticker) {
        const found = ticker_names_RU.find(pair => pair[1] === ticker);
        return found ? found[0] : null;
    }


    // Function to get the English name by ticker
    function getEnglishNameByTicker(ticker) {
        const found = tickers_names.find(pair => pair[0] === ticker);
        return found ? found[1] : null;
    }

    // Function to update stock item names
    function updateStockNames() {
        stockTickers.forEach((ticker) => {
            const stockItem = document.getElementById(`stock${ticker}`);
            if (stockItem) {
                const nameElement = stockItem.querySelector('.company-name');
                if (nameElement) {
                    if (currentLanguage === 'EN') {
                        const russianName = getRussianNameByTicker(ticker);
                        if (russianName) {
                            nameElement.textContent = russianName;
                        }
                    } else {
                        const englishName = getEnglishNameByTicker(ticker);
                        if (englishName) {
                            nameElement.textContent = englishName;
                        }
                    }
                }
            }
        });


        currentLanguage = currentLanguage === 'EN' ? 'RU' : 'EN';
    }




    const searchInput = document.querySelector('.search-bar');

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const stocks = document.querySelectorAll('.stock-item');

        stocks.forEach(stock => {
            // Assuming the stock name or relevant text is directly within the stock-item div.
            // Adjust the text selector if the name/text is nested deeper within the element.
            const stockName = stock.textContent.toLowerCase().trim();
            if (stockName.includes(query)) {
                stock.style.display = ''; // Show the stock item if query matches
            } else {
                stock.style.display = 'none';
            }
        });
    });
    document.querySelector('.stock-grid').addEventListener('click', (event) => {
        if (event.target.classList.contains('heart-icon')) {
            event.target.classList.toggle('active');
            event.target.classList.toggle('far');
            event.target.classList.toggle('fas');
        }
    });

    const stocksTab = document.getElementById('stocksTab');
    const cryptoTab = document.getElementById('cryptoTab');

    stocksTab.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            cryptoTab.classList.remove('active');
            // Additional logic for showing "stocks" content
        }
    });

    cryptoTab.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            this.classList.add('active');
            stocksTab.classList.remove('active');
            // Additional logic for showing "crypto" content
        }
    });


    const mentionsFilter = document.getElementById('mentionsFilter');
    const iconMentions = document.getElementById('iconMentions');
    let currentState = 0; // 0 = default, 1 = first icon, 2 = second icon

    mentionsFilter.addEventListener('click', function() {
        currentState = (currentState + 1) % 2; // Cycle through 0, 1, 2
        sortStockItems((currentState + 1) % 2);
        updateIcon();
    });

    function updateIcon() {
        switch (currentState) {

            case 0:
                iconMentions.className = 'fa-solid fa-arrow-down-wide-short'; // First alternative
                break;
            case 1:
                iconMentions.className = 'fa-solid fa-arrow-down-short-wide'; // Second alternative
                break;
        }
    }

    function sortStockItemsAlphabetically() {
        const container = document.querySelector('.stock-grid');
        let items = Array.from(container.querySelectorAll('.stock-item'));
        items.sort(function(a, b) {
            // Assuming the stock name is directly within the stock-item div.
            // Modify the selector if it's within a child element.
            const aName = a.textContent.trim(); // Get text content and trim whitespace
            const bName = b.textContent.trim();
            return aName.localeCompare(bName); // Compare strings alphabetically
        });

        // Re-append items in sorted order
        items.forEach(item => container.appendChild(item));
    }


    function sortStockItems(order) {
        const container = document.querySelector('.stock-grid');
        let items = Array.from(container.querySelectorAll('.stock-item'));
        items.sort(function(a, b) {
            const aValue = parseInt(a.querySelector('.bottom-right-text').textContent, 10);
            const bValue = parseInt(b.querySelector('.bottom-right-text').textContent, 10);

            if (order === 0) { // Ascending sort
                return aValue - bValue;
            } else { // Descending sort
                return bValue - aValue;
            }
        });

        // Re-append items in sorted order
        items.forEach(item => container.appendChild(item));
    }

    const timeFilterButton = document.getElementById('timeFilter');
    const timeDropdown = document.getElementById('timeDropdown');
    const timeOptions = document.querySelectorAll('.dropdown-option');

    let maxWidthTime = 0;

    // Create a temporary element to measure the widths of options
    const tempSpanTime = document.createElement('span');
    tempSpanTime.style.visibility = 'hidden'; // Hide the element
    tempSpanTime.style.position = 'absolute'; // Remove from the document flow
    tempSpanTime.style.whiteSpace = 'nowrap'; // Prevent text wrapping
    document.body.appendChild(tempSpanTime); // Append to body to get width

    // Find the maximum width required
    timeOptions.forEach(option => {
        tempSpanTime.innerHTML = option;
        maxWidthTime = Math.max(maxWidthTime, tempSpanTime.offsetWidth);
    });

    // Clean up by removing the temporary span from the document
    document.body.removeChild(tempSpanTime);

    // Apply the maximum width + some padding to the filter button
    timeFilter.style.width = `${maxWidthTime + 20}px`; // Add a little extra for padding

    // Toggle the dropdown
    timeFilterButton.addEventListener('click', () => {
        timeDropdown.hidden = !timeDropdown.hidden;
    });

    // Set the button text to the selected option and hide the dropdown
    timeOptions.forEach(option => {
        option.addEventListener('click', () => {
            timeFilterButton.textContent = option.textContent;
            timeFilterButton.classList.add('active');
            timeDropdown.hidden = true;
        });
    });

    const resetFiltersButton = document.getElementById('resetFilter');
    const filterButtons = document.querySelectorAll('.filter-button');
    const stockItems = document.querySelectorAll('.stock-item'); // Assuming this is the class for stock items
    const favoriteIcons = document.querySelectorAll('.heart-icon'); // Assuming this is the class for the favorite icons

    resetFiltersButton.addEventListener('click', () => {
        // Reset each filter button to its initial state
        filterButtons.forEach(button => {
            if (button.id === 'timeFilter') {
                button.textContent = 'Choose a time frame'; // Reset to default text
            }
            button.classList.remove('active'); // Remove the 'active' class to reset color
        });

        // Ensure all stock items are visible
        stockItems.forEach(item => {
            item.style.display = ''; // Make sure all stock items are visible
        });
        sortStockItemsAlphabetically();
        if (mentionsFilter) {
            mentionsFilter.innerHTML = `Mentions <i class="fa-solid fa-arrows-up-down" id="iconMentions"></i>`;
        }
        // Optionally, reset the 'Show Favorites' button text if it toggles
        const favoritesFilterButton = document.getElementById('favoritesFilter');
        if (favoritesFilterButton) {
            favoritesFilterButton.textContent = 'Favorites';
            favoritesFilterButton.classList.remove('active'); // Reset any toggled states
        }

        // Hide the dropdown if it's visible
        const timeDropdown = document.getElementById('timeDropdown'); // Ensure this is correct
        if (timeDropdown) {
            timeDropdown.hidden = true;
        }
    });

    function updateOrCreateStockItem(stockId, stockName, iconClass, textContent, company_name, alphabeticalIndex) {
        let stockItem = document.querySelector('.stock-grid').querySelector(`#${stockId}`);

        if (!stockItem) {
            // Create the stock item div if it doesn't exist
            stockItem = document.createElement('div');
            stockItem.id = stockId;
            stockItem.className = 'stock-item'; 
            document.querySelector('.stock-grid').appendChild(stockItem);
        }
        updateSvg(stockItem, stockName, alphabeticalIndex);
        updateElement(stockItem, '.stock-name', 'div', stockName);
        updateElement(stockItem, '.heart-icon', 'i', '', 'far fa-heart heart-icon');
        updateElement(stockItem, '.top-right-icon', 'i', '', `fa-solid ${iconClass} top-right-icon`);
        updateElement(stockItem, '.bottom-right-text', 'div', textContent, "bottom-right-text");
        updateElement(stockItem, '.company-name', 'div', company_name, "company-name");


        function updateElement(parent, selector, elementType, text, className) {
            let element = parent.querySelector(selector);
            if (!element) {
                element = document.createElement(elementType);
                parent.appendChild(element);
            }
            if (text) element.textContent = text;
            if (className) element.className = className;
        }

        function updateSvg(stockItem, ticker, alphabeticalIndex) {
            let svgContainer = stockItem.querySelector('.svg-container');
            if (!svgContainer) {
                svgContainer = document.createElement('div');
                svgContainer.className = 'svg-container';
                stockItem.appendChild(svgContainer);
            }
            const svgIndex = getSvgIndex(ticker, alphabeticalIndex);
            if (svgIndex === null) {
                svgContainer.innerHTML = ''; // Clear any existing SVG or ensure none is added
            } else {
                svgContainer.innerHTML = `<img src="web/img/svg_${svgIndex}.svg" alt="Logo for ${ticker}">`;
            }

        }
    }



});