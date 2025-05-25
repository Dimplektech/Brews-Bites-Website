console.log("Menu page Script.js loaded");

document.addEventListener('DOMContentLoaded',function(){
    // Initialize the cart in local storage
    if(!localStorage.getItem('cart')){
        localStorage.setItem('cart',JSON.stringify([]));
    }

    //Elements on cart page
   const cartItemsContainer = document.getElementById('cart-items');
   const subtotalElement = document.getElementById('subtotal');
   const taxElement = document.getElementById('tax');
   const totalElement = document.getElementById('total');
   const clearCartButton=document.getElementById('clear-cart');
   const checkoutButton=document.getElementById('checkout-btn');
   const checkoutForm=document.getElementById('checkout-form');
   const paymentForm = document.getElementById('payment-form');
   const receiptSection=document.getElementById('receipt');
   const receiptItemsContainer=document.getElementById('receipt-items');
   const receiptSubtotal=document.getElementById('receipt-subtotal');
   const receiptTax=document.getElementById('receipt-tax');
   const receiptTotal=document.getElementById('receipt-total');
   const printReceiptButton=document.getElementById('print-receipt');
   const backToHomeButton = document.getElementById('back-to-home');
   const emptyCartMessage = document.getElementById('empty-cart-message');
    
    // Function to update the cart display
    // get the cart from local Storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [] ;
    
     // Only run cart-specific code if we're on the cart page
    if(window.location.pathname.includes('cart.html')){

        updateCartView();

         // Clear cart button
        
        if (clearCartButton){
            clearCartButton.addEventListener('click',function(){
                localStorage.removeItem('cart');
                cart=[];
                updateCartView();
                updateCartCount();
        });
     }
        
        // Checkout button
        if(checkoutButton){
            checkoutButton.addEventListener('click',function(){
                if (cart.length === 0){
                    alert("Your cart is empty.Please add items to ypur cart before checking out.");
                    return;
                }
            cartItemsContainer.classList.add('hidden')
            document.querySelector('.cart-summary').classList.add('hidden');
            checkoutForm.classList.remove('hidden');
            checkoutForm.scrollIntoView({behavior:'smooth'});
            emptyCartMessage.classList.add('hidden');
                
            });
        }

       
        
        // Payment form Submission
        if(paymentForm){
            paymentForm.addEventListener('submit',function(event){
                event.preventDefault();
                processPayment();
                   
            });
              
       }

       // Print reciept button
       if(printReceiptButton){
            printReceiptButton.addEventListener('click',function(){
                window.print();
            })
       }

        
        if(backToHomeButton){
            backToHomeButton.addEventListener('click',function(){
                window.location.href = 'index.html';
            });
        }

              
    }   


    function updateCartView(){
         console.log("updateCartView running");
          console.log("Cart contents:", cart);
        if(!cartItemsContainer) return;

        cartItemsContainer.innerHTML = ''; // Clear the container
        
        if (cart.length === 0){
            cartItemsContainer.innerHTML = "";
            document.querySelector(".cart-summary").classList.add('hidden');
            emptyCartMessage.classList.remove('hidden');
        } else {
            emptyCartMessage.classList.add('hidden');
            document.querySelector(".cart-summary").classList.remove('hidden');

            // clear the cart items container
            cartItemsContainer.innerHTML = '';

            // Add each cart item to the container

            cart.forEach((item,index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item'
                cartItem.innerHTML = `
                <div class="cart-item-info">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <span class="cart-item-price">£${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <div class="cart-item-actions">
                        <div class="cart-item-quantity">
                            
                            
                            <button class="decrease-quantity" data-index="${index}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-quantity" data-index="${index}">+</button>
                            
                        </div>
                        <div class="cart-item-total">£${(item.price * item.quantity).toFixed(2)}</div>
                        <button class="cart-item-remove" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
                `;
                    cartItemsContainer.appendChild(cartItem);
                });
    
                // Add event listeners to the buttons
                addCartItemEventListeners();

                // Update totals
                updateTotals();
            }
    }
  


    // functions Upadate cart count indicator
    function updateCartCount(){
        const cartCountElement=document.querySelector('.cart-count');
        if (cartCountElement){
            const count = cart.reduce((total,item)=>
            total+ item.quantity,0);
        
        cartCountElement.textContent = count;
        cartCountElement.classList.remove('hidden');
        if(count > 0){
            cartCountElement.style.display = 'inline-flex';
        } else {
             cartCountElement.style.display = 'none';
        }
      }
    }



    function addCartItemEventListeners(){
        // Decrease quantity 
        document.querySelectorAll('.decrease-quantity').forEach(button =>{
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if(cart[index].quantity>1){
                    cart[index].quantity--;
                } else {
                    cart.splice(index,1);
                }
                localStorage.setItem('cart',JSON.stringify(cart));
                updateCartView();
                updateCartCount();
                
            });
        });

        //Increase Quantity
        document.querySelectorAll('.increase-quantity').forEach(button =>{
            button.addEventListener('click', function(){
                const index = parseInt(this.getAttribute('data-index'));
                cart[index].quantity++;
                localStorage.setItem('cart',JSON.stringify(cart));
                updateCartView();
                updateCartCount();
            })
        })

        // Remove item
        document.querySelectorAll('.cart-item-remove').forEach(button =>{
            button.addEventListener('click',function(){
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index,1);
                localStorage.setItem('cart',JSON.stringify(cart));
                updateCartView();
                updateCartCount();
            })
        })
    }    
    
    function updateTotals(){
        if(!subtotalElement) return;

        const subTotal = cart.reduce((total,item)=>
        total +(item.price *item.quantity),0);
        const tax = subTotal * 0.08;
        const total = subTotal + tax;
        subtotalElement.textContent = `£${subTotal.toFixed(2)}`;
        taxElement.textContent =`£${tax.toFixed(2)}`;
        totalElement.textContent =`£${total.toFixed(2)}`;
    }

    function processPayment(){
        generateReceipt();
        checkoutButton.classList.add('hidden');
        receiptSection.classList.remove('hidden');
        receiptSection.scrollIntoView({behavior:'smooth'});
    }

    function generateReceipt(){
        const formData = new FormData(paymentForm);
        const customerName = formData.get('name');
        const customerEmail = formData.get('email')
        const customerPhone = formData.get('phone');
        
        // Add customer details to the receipt
        document.getElementById('receipt-customer-name').textContent = customerName;
        document.getElementById('receipt-customer-email').textContent = customerEmail;
        document.getElementById('receipt-customer-phone').textContent = customerPhone;
        
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08;
        const total = subtotal + tax;
        
        // Clear the container first
        receiptItemsContainer.innerHTML = "";
        
        // Add the header row once
        const headerRow = document.createElement('div');
        headerRow.className = 'receipt-item-header';
        headerRow.style.display = 'grid';
        headerRow.style.gridTemplateColumns = '1fr 1fr 1fr 1fr';
        headerRow.style.gap = '10px';
        headerRow.style.marginBottom = '10px';
        headerRow.style.borderBottom = '1px solid #ddd';
        headerRow.style.paddingBottom = '5px';
        headerRow.innerHTML = `
            <div style="font-weight:bold;">Item Name</div>
            <div style="font-weight:bold; text-align: center;">Price</div>
            <div style="font-weight:bold; text-align: center;">Quantity</div>
            <div style="font-weight:bold; text-align: right;">Total</div>
        `;
        receiptItemsContainer.appendChild(headerRow);
        
        // Add each item row
        cart.forEach(item => {
            const row = document.createElement('div');
            row.className = 'receipt-item-row';
            row.style.display = 'grid';
            row.style.gridTemplateColumns = '1fr 1fr 1fr 1fr';
            row.style.gap = '10px';
            row.style.marginBottom = '5px';
            row.innerHTML = `
                <div class="receipt-item-name">${item.name}</div>
                <div class="receipt-item-price" style="text-align: center;">£${item.price.toFixed(2)}</div>
                <div class="receipt-item-quantity" style="text-align: center;">${item.quantity}</div>
                <div class="receipt-item-total" style="text-align: right;">£${(item.price * item.quantity).toFixed(2)}</div>
            `;
            receiptItemsContainer.appendChild(row);
        });
        
        // Update the receipt details
        receiptSubtotal.textContent = `£${subtotal.toFixed(2)}`;
        receiptTax.textContent = `£${tax.toFixed(2)}`;
        receiptTotal.textContent = `£${total.toFixed(2)}`;

        // Hide the checkout form and show the receipt
        checkoutForm.classList.add('hidden');
        receiptSection.classList.remove('hidden');
        receiptSection.scrollIntoView({behavior:'smooth'});

        // Clear cart after successful purchase
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

    }

    

        

        //Intialize the cart count on page load

        updateCartCount();



});

