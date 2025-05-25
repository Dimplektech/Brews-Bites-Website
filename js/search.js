document.addEventListener("DOMContentLoaded",function(){
    console.log("search script loaded");

    const searchInput = document.getElementById("menu-search-input");
    const searchButton = document.getElementById("search-button");
    const clearSearchButton = document.getElementById("clear-search");
    const searchResults = document.getElementById("search-results");
    const searchResultsItems = document.getElementById("search-results-items");
    const menuSections = document.querySelectorAll(".menu-section");

    //Check if elements exist
    if(!searchInput || !searchButton || !clearSearchButton || !searchResults || !searchResultsItems){ 
        console.log("One or more elements are missing in the DOM");
        return;
    }


    function performSearch(){
        const searchTerm = searchInput.value.toLowerCase().trim();
        console.log("search term:",searchTerm);
        searchResultsItems.innerHTML = ""; // clear previous results

        // don't search if term is too short
        if(searchTerm<2){
            return;
        }

        // Hide Menu section during search
        menuSections.forEach(section=>{
            section.classList.add("hidden");

        });
        // Show search results section
        searchResults.classList.remove("hidden");

       
        // Finding matching items
        const allMenuItems = document.querySelectorAll(".menu-item");
        let matchFound = false;
        allMenuItems.forEach(item=>{
            try{
            
                const itemName = item.querySelector("h4").textContent.toLowerCase();
                const itemDescription = item.querySelector("p").textContent.toLowerCase();

                if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
                    // Clone the item and add it to the search results
                    const clonedItem = item.cloneNode(true);
                    
                    // Re-attach event listeners to the clone 
                    const addButton = clonedItem.querySelector(".add-to-cart");
                    if(addButton){
                    addButton.addEventListener("click", function(){
                        const menuItem = this.closest(".menu-item");
                        const itemName = menuItem.querySelector("h4").textContent;
                        const itemPriceText = menuItem.querySelector(".menu-item-price span").textContent;
                        const itemPrice = parseFloat(itemPriceText.replace("£", ""));

                        // Use the same function addTocart function to add item to the basket
                        addToCart(itemName, itemPrice);                

                        // Show a brief Confirmation messagew
                        const confirmationMessage = document.createElement("div");
                        confirmationMessage.classList.add("add-confirmation");
                        confirmationMessage.textContent = `Added to the Cart`;
                        menuItem.appendChild(confirmationMessage);
                        setTimeout(() => {
                            confirmationMessage.remove();
                        },1500); // 1.5 seconds

                        });
                    }
                    if (searchResultsItems){
                        searchResultsItems.appendChild(clonedItem);
                    }   
                    matchFound = true;
                }
            } catch(error) {
                console.log("Error processing menu item:",error);
            }   
        });

// Show "No Results Found" if no matches found
        if(!matchFound){
            searchResultsItems.innerHTML =`
            <div class="no-results">
                <p>No Menu item found matching "${searchTerm}"</p>
                <p> Try searching for something else!</p>

            </div>
            `;
        }
    }

    searchButton.addEventListener("click",performSearch);
    searchInput.addEventListener("keydown",function(e){
        if(e.key === "Enter"){
            performSearch();
        }
    })

    clearSearchButton.addEventListener("click",function(){
        searchInput.value = "";
        searchResultsItems.innerHTML = ""; // clear previous results
        searchResults.classList.add("hidden");

        // Show all menu sections again
        menuSections.forEach(section=>{
            section.classList.remove("hidden");
        });
    });
});     
                   

         

