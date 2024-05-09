document.addEventListener('DOMContentLoaded', (event) => {
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
          console.log(ticker + " uses a specific SVG index: " + svgMapping[ticker]);
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
      console.log(ticker + " dynamically assigned SVG index: " + count);
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
    const tickers_names = [["ABIO", "Artgen"], ["ABRD", "Abrau-Durso"], ["AFKS", "AFK Sistema"], ["AFLT", "Aeroflot"], ["AKRN", "Acron"], ["ALRS", "ALROSA"], ["AMEZ", "Ashinckiy metzavod PAO"], ["APTK", "Apteki 36,6"], ["AQUA", "INARCTIKA"], ["ARSA", "UK Arsagera"], ["ASSB", "Astrakhan Energo Sbyt"], ["ASTR", "Astra Group"], ["AVAN", "AKB 'AVANGARD'"], ["BANE", "Bashneft ANK"], ["BELU", "NovaBev Group"], ["BLNG", "Belon"], ["BRZL", "Buryatzoloto"], ["BSPB", "BSP"], ["CARM", "STG"], ["CBOM", "MKB"], ["CHGZ", "RN-Western Siberia"], ["CHKZ", "CKPZ"], ["CHMF", "Severstal"], ["CHMK", "CMK"], ["CNTL", "Centrlnyi Telegraf"], ["DELI", "Carsharing Russia"], ["DIAS", "Diasoft"], ["DIOD", "Zavod DIOD"], ["DSKY", "Detsky mir"], ["DVEC", "DEC"], ["DZRD", "DZRD"], ["EELT", "European Eltech"], ["ELFV", "El5-Ener"], ["ENPG", "EN+ GROUP IPJSC ORD SHS"], ["EUTR", "EvroTrans"], ["FEES", "FGC ROSSETI"], ["FESH", "DVMP"], ["FLOT", "Sovcomflot"], ["GAZA", "Gaz"], ["GAZP", "Gazprom"], ["GCHE", "Cherkizovo Group"], ["GECO", "GENETICO"], ["GEMA", "IMCB PJSC"], ["GEMC", "IPJSC UMG"], ["GMKN", "NorNickel GMK"], ["GTRK", "GTM"], ["HNFG", "HENDERSON"], ["HYDR", "RusGidro"], ["IGST", "Izhstal 2ao"], ["INGR", "INGRAD"], ["IRAO", "Inter RAO"], ["IRKT", "Yakovlev-3"], ["JNOS", "Slavneft-JANOS"], ["KAZT", "Kuib.Azot"], ["KBSB", "TNS energo Kuban Company"], ["KCHE", "Kamchatskenergo"], ["KGKC", "Kurganskaja Gener.Kompanija"], ["KLSB", "Kalugsk. Sbyt. Company"], ["KLVZ", "KLVZ KRISTALL"], ["KMAZ", "KAMAZ"], ["KMEZ", "Kovrov Mech. Zavod"], ["KOGK", "Korshunovskii GOK"], ["KRKN", "Saratovskiy NPZ"], ["KROT", "KrasnyiOctyabr"], ["KRSB", "Krashojarskenergosbyt"], ["KUBE", "Rosseti Kuban"], ["KUZB", "Bank 'Kuzneckiy'"], ["KZOS", "PAO Organicheskiy Sintez"], ["LEAS", "Europlan"], ["LENT", "Lenta IPJSC ORD SHS"], ["LIFE", "Farmsintez"], ["LKOH", "LUKOIL"], ["LNZL", "Lenzoloto"], ["LPSB", "LESK"], ["LSNG", "Rosseti LenEnrg"], ["LSRG", "LSR"], ["LVHK", "Levenguk"], ["MAGE", "Magadanenergo"], ["MAGN", "MMK"], ["MBNK", "MTS Bank"], ["MFGS", "Megion"], ["MGKL", "MGKL"], ["MGNT", "Magnit"], ["MGTS", "MGTS-5"], ["MISB", "TNS energo Mariy El"], ["MOEX", "MoscowExchange"], ["MRKC", "Rosseti Centr"], ["MRKK", "Rosseti Severnyy Kavkaz"], ["MRKP", "Rosseti Centr i Privoljye"], ["MRKS", "Rosseti Sibir"], ["MRKU", "Rosseti Ural"], ["MRKV", "Rosseti Volga"], ["MRKY", "Rosseti South"], ["MRKZ", "Rosseti Severo-Zapad"], ["MRSB", "Mordovskaya EnergoSbyt Comp."], ["MSNG", "MosEnrg"], ["MSRS", "Rosseti Moscow Region"], ["MSTT", "Mostotrest"], ["MTLR", "Mechel"], ["MTSS", "MTS"], ["MVID", "M.video"], ["NAUK", "NPO Nauka"], ["NFAZ", "NEFAZ PAO"], ["NKHP", "NKHP"], ["NKNC", "Niznekamskneftekhim"], ["NKSH", "Nizhnekamskshina"], ["NLMK", "NLMK"], ["NMTP", "NMTP"], ["NNSB", "TNS energo Nizhniy-Novgorod"], ["NSVZ", "Nauka-Svyaz"], ["NVTK", "NOVATEK"], ["OGKB", "OGK-2"], ["PAZA", "Pavlovo Bus"], ["PHOR", "PhosAgro"], ["PIKK", "PIK SZ"], ["PLZL", "Polus"], ["PMSB", "Perm' EnergoSbyt"], ["POLY", "Polymetal International plc"], ["POSI", "PJSC Positive Group"], ["PRFN", "CZPSN-Profnasteel"], ["PRMB", "AKB Primorye"], ["RASP", "Raspadskaya"], ["RBCM", "GK RBK"], ["RDRB", "RosDor Bank"], ["RENI", "Renaissance Insurance"], ["RGSS", "Rosgosstrakh"], ["RKKE", "RKK Energia"], ["RNFT", "RussNeft NK"], ["ROLO", "Rusolovo PAO"], ["ROSB", "ROSBANK"], ["ROSN", "Rosneft"], ["ROST", "ROSINTER RESTAURANTS"], ["RTGZ", "Gazprom gazorasp. Rostov"], ["RTKM", "Rostelecom"], ["RTSB", "TNS energo Rostov-na-Dony"], ["RUAL", "RUSAL"], ["RUSI", "RUSS-INVEST IC"], ["RZSB", "JSC 'Ryazanenergosbyt'"], ["SAGO", "SamaraEnergo"], ["SARE", "SaratovEnergo"], ["SBER", "Sberbank"], ["SELG", "Seligdar"], ["SFIN", "SFI"], ["SGZH", "Segezha"], ["SIBN", "Gazprom neft"], ["SLEN", "Sakhalinenergo"], ["SMLT", "Samolet"], ["SNGS", "Surgut"], ["SOFL", "Softline"], ["SPBE", "SPB Exchange"], ["STSB", "StavropolEnergoSbyt"], ["SVAV", "Sollers Avto"], ["SVCB", "Sovcombank"], ["SVET", "Svetofor Group"], ["TASB", "Tambov EnergoSbyt Company"], ["TATN", "Tatneft-3"], ["TCSG", "IPJSC TCS Holding"], ["TGKA", "TGK-1"], ["TGKB", "TGK-2"], ["TGKN", "TGK-14"], ["TNSE", "PAO GK 'TNS energo'"], ["TORS", "Tomsk raspredelit. komp"], ["TRMK", "TMK"], ["TTLK", "Tattelekom"], ["TUZA", "Tuimaz. Zavod Avtobetonovozov"], ["UGLD", "UGC"], ["UKUZ", "Uzhnyi Kuzbass"], ["UNAC", "Ob.aviastroitelnaya korp."], ["UNKL", "Uzhno-Uralskiy nikel. komb."], ["UPRO", "Unipro PAO"], ["URKZ", "Uralskaya kuznica"], ["USBN", "BANK URALSIB"], ["UTAR", "UTAir Aviacompany"], ["UWGN", "OVK"], ["VEON-RX", "VEON Ltd. ORD SHS"], ["VGSB", "Volgograd EnergoSbyt"], ["VJGZ", "Var'eganneftegaz"], ["VKCO", "VK International Public JS Com"], ["VLHZ", "VHZ"], ["VRSB", "TNS energo Voroneg"], ["VSMO", "Corp. VSMPO-AVISMA"], ["VSYD", "Viborgskii sudostr. Zavod"], ["VTBR", "VTB"], ["WTCM", "CMT"], ["WUSH", "WHOOSH Holding"], ["YAKG", "YaTEK"], ["YKEN", "YakutskEnergo"], ["YNDX", "PLLC Yandex N.V."], ["YRSB", "TNS energo Yaroslavl'"], ["ZAYM", "Zaymer"], ["ZILL", "ZIL"], ["ZVEZ", "Zvezda"]]


  //console.log(tickers_names)
  const stockTickers = [];
  for (let i = 0; i < tickers_names.length; i++) {
      stockTickers.push(tickers_names[i][0]);
      //console.log(tickers_names[i]);
  }
    console.log(stockTickers);

  stockTickers.forEach((ticker, index) => {
    const randomNum = Math.floor(Math.random() * 15) + 1; // Random number from 1 to 15
    const chevronIcon = Math.random() < 0.5 ? 'fa-chevron-up' : 'fa-chevron-down'; // 50% chance for up or down
    updateOrCreateStockItem(`stock${ticker}`, ticker, chevronIcon, randomNum.toString(), index);
});

    sortStockItemsAlphabetically()

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
                stock.style.display = 'none'; // Hide the stock item if query does not match
            }
        });
    });

    document.querySelector('.stock-grid').addEventListener('click', function(event) {
      if (event.target.classList.contains('heart-icon')) {
          // Toggle the 'active' class to change appearance
          event.target.classList.toggle('active');
          // Switch between solid and outline heart icons
          event.target.classList.toggle('fas');
          event.target.classList.toggle('far');
      }
  });
  document.querySelector('.stock-grid').addEventListener('click', (event) => {
    console.log("Clicked element:", event.target);
    if (event.target.classList.contains('heart-icon')) {
        console.log("Toggling heart icon for:", event.target.parentNode.querySelector('.stock-name').textContent);
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
    let currentState = 0;  // 0 = default, 1 = first icon, 2 = second icon

    mentionsFilter.addEventListener('click', function() {
      currentState = (currentState + 1) % 2;  // Cycle through 0, 1, 2
      sortStockItems((currentState+1)%2);
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
          const aName = a.textContent.trim();  // Get text content and trim whitespace
          const bName = b.textContent.trim();
          return aName.localeCompare(bName);  // Compare strings alphabetically
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


    const heartIcon = document.querySelector('.heart-icon');
    heartIcon.addEventListener('click', function() {
      this.classList.toggle('active');  // Toggle the 'active' class to change appearance
      this.classList.toggle('fas');     // Switch to solid heart
      this.classList.toggle('far');     // Switch from regular (outline) heart
    });

    function updateOrCreateStockItem(stockId, stockName, iconClass, textContent, alphabeticalIndex) {
      let stockItem = document.querySelector('.stock-grid').querySelector(`#${stockId}`);
  
      if (!stockItem) {
          // Create the stock item div if it doesn't exist
          stockItem = document.createElement('div');
          stockItem.id = stockId;
          stockItem.className = 'stock-item green'; // Default to 'green' for new items
          document.querySelector('.stock-grid').appendChild(stockItem);
      }
      updateSvg(stockItem, stockName, alphabeticalIndex);
      updateElement(stockItem, '.stock-name', 'div', stockName);
      updateElement(stockItem, '.heart-icon', 'i', '', 'far fa-heart heart-icon');
      updateElement(stockItem, '.top-right-icon', 'i', '', `fa-solid ${iconClass} top-right-icon`);
      updateElement(stockItem, '.bottom-right-text', 'div', textContent, "bottom-right-text");
      

      /*
      // Create or update the bottom-right text
      let textDiv = stockItem.querySelector('.bottom-right-text');
      if (!textDiv) {
          textDiv = document.createElement('div');
          textDiv.className = 'bottom-right-text';
          textDiv.textContent = textContent;
          stockItem.appendChild(textDiv);
      } else {
          textDiv.textContent = textContent;
      }
      
      */
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
      console.log('No SVG for ' + ticker);
      svgContainer.innerHTML = ''; // Clear any existing SVG or ensure none is added
    } else {
      svgContainer.innerHTML = `<img src="web/img/svg_${svgIndex}.svg" alt="Logo for ${ticker}">`;
    }
    
  }}
  
    

  });
  