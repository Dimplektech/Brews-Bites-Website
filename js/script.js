// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('nav ul li a');
    
    // Close mobile menu when a nav link is clicked
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            document.getElementById('check').checked = false;
        });
    });

      const menuLinks = document.querySelectorAll('.menu-tabs a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            menuLinks.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to the corresponding section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Offset for sticky header and menu navigation
            const offset = 140;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the menu item details
            // Assuming each menu item has a class of 'menu-item' and contains the name and price
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h4').textContent;
            const itemPriceText = menuItem.querySelector('.menu-item-price span').textContent;
            const itemPrice = parseFloat(itemPriceText.replace('£', ''));
            

            // Add item to cart in localspace
            addToCart(itemName,itemPrice);
            // Here you would typically add the item to a cart object and update the UI
            console.log(`Added to cart: ${itemName} - ${itemPrice}`);
            
            // Show a brief confirmation
            const confirmation = document.createElement('div');
            confirmation.className = 'add-confirmation';
            confirmation.textContent = 'Added to cart!';
            menuItem.appendChild(confirmation);
            
            setTimeout(() => {
                confirmation.remove();
            }, 1500);
        });
    });

    //Function to add item to Cart
    function addToCart(name,price){
        console.log(`Adding to cart: ${name}, price: ${price}`);
        // Get the current cart from Losacal storage
        let cart=JSON.parse(localStorage.getItem('cart')) || [];
        
        // chek if item already in the cart
        const existingItemIndex = cart.findIndex(item => item.name === name);
        if(existingItemIndex!== -1){
            // if existing item found, increase the quantity
            cart[existingItemIndex].quantity++;
        }else {
            // If not found, add new item to the cart
            cart.push({
                name:name,
                price:parseFloat(price),
                quantity:1
            });
        }
        // Save updated cart to local Storage
        localStorage.setItem('cart',JSON.stringify(cart));
        // Update the cart count in the haeder
        console.log("Updated cart:", cart);
        updateCartCount();

    }

    function updateCartCount(){
        const cartCountElement = document.querySelector('.cart-count');
        if(cartCountElement){
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const count = cart.reduce((total,item)=> total+ item.quantity,0);
            cartCountElement.textContent = count;
           
            if(count > 0){
                cartCountElement.style.display = 'inline-flex';
            } else {
                cartCountElement.style.display = 'none';
            }
        }
      }

    // Initialize cart count on page load
    updateCartCount();
    // Make it globally accessible
    window.addToCart = addToCart;

    // Make updateCartCount globally accessible
    window.updateCartCount = updateCartCount;  

});



  
