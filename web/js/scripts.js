document.addEventListener('DOMContentLoaded', (event) => {
    const favoritesFilter = document.getElementById('favoritesFilter');

    favoritesFilter.addEventListener('click', function() {
      this.classList.toggle('active'); // Toggle the 'active' class on click
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

    resetFiltersButton.addEventListener('click', () => {
      // Reset each filter button to its initial state
      filterButtons.forEach(button => {
        if (button.id === 'timeFilter') {
          button.textContent = 'Choose a time frame'; // Reset to default text
        }
        button.classList.remove('active'); // Remove the 'selected' class to reset color
      });
      // Hide the dropdown if it's visible
      timeDropdown.hidden = true;
    });


    const heartIcon = document.querySelector('.heart-icon');
    heartIcon.addEventListener('click', function() {
      this.classList.toggle('active');  // Toggle the 'active' class to change appearance
      this.classList.toggle('fas');     // Switch to solid heart
      this.classList.toggle('far');     // Switch from regular (outline) heart
    });
  });
  