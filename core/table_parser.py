from playwright.sync_api import sync_playwright # type: ignore

def extract_table_data(page):
    # Extract table data
    table_data = page.evaluate('''(xpath) => {
        const table = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!table) return null;
        const rows = table.querySelectorAll("tr");
        const data = [];
        rows.forEach(row => {
            const rowData = [];
            row.querySelectorAll("td").forEach(cell => {
                rowData.append(cell.innerText);
            });
            data.append(rowData);
        });
        return data;
    }''', '/html/body/div[4]/div[4]/div/div[2]/div/div[4]/div[2]/div[2]/div/div/table')

    return table_data

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()

    # Navigate to the page with the table
    page.goto('https://ru.tradingview.com/markets/stocks-russia/market-movers-all-stocks/')

    # Wait for the table to be rendered
    page.wait_for_selector('/html/body/div[4]/div[4]/div/div[2]/div/div[4]/div[2]/div[2]/div/div/table')

    # Extract table data
    table_data = extract_table_data(page)
    print(table_data)

    # Close the browser
    browser.close()
