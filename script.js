// ================================
// GET HTML ELEMENTS
// ================================

let addTyre =
    document.getElementById("addTyre");

let calculate =
    document.getElementById("calculate");

let order =
    document.getElementById("order");

let receipt =
    document.getElementById("receipt");

let newSale =
    document.getElementById("newSale");    


// ================================
// STORE TYRES
// ================================

let tyres = [];


// ================================
// ADD TYRE
// ================================

addTyre.addEventListener("click", function() {

    let tyre =
        document.getElementById("tyreSize");


    let tyreSize =
        tyre.options[tyre.selectedIndex].text;


    let price =
        Number(tyre.value);


    let quantity =
        Number(
            document.getElementById("quantity").value
        );


    // Check quantity

    if (quantity <= 0) {

        alert("Please enter a valid quantity.");

        return;

    }


    // Create tyre

    let tyreItem = {

        size: tyreSize,

        price: price,

        quantity: quantity

    };


    // Save tyre

    tyres.push(tyreItem);


    // Show order

    displayOrder();

});


// ================================
// DISPLAY ORDER
// ================================

function displayOrder() {

    // Clear the old order
    order.innerHTML = "";


    // Create the table headings
    order.innerHTML +=
        '<div class="order-row order-header">' +
        '<div>Tyre Size</div>' +
        '<div>Price</div>' +
        '<div>Qty</div>' +
        '<div>Total</div>' +
        '<div>Action</div>' +
        '</div>';


    // Store the total of all tyres
    let orderTotal = 0;


    // Display every tyre
    for (let i = 0; i < tyres.length; i++) {

        // Calculate this tyre's total
        let itemTotal =
            tyres[i].price *
            tyres[i].quantity;


        // Add this item to the order total
        orderTotal += itemTotal;


        // Display the tyre
        order.innerHTML +=
            '<div class="order-row">' +

            '<div>' +
            tyres[i].size +
            '</div>' +

            '<div>KSh ' +
            tyres[i].price +
            '</div>' +

            '<div>' +
            tyres[i].quantity +
            '</div>' +

            '<div>KSh ' +
            itemTotal +
            '</div>' +

            '<div>' +
            '<button onclick="removeTyre(' + i + ')">' +
            'Remove' +
            '</button>' +
            '</div>' +

            '</div>';
    }


    // Display the total
    order.innerHTML +=
        '<div class="order-total">' +
        'Order Total: KSh ' +
        orderTotal +
        '</div>';
}


// ================================
// REMOVE TYRE
// ================================

function removeTyre(index) {

    tyres.splice(index, 1);

    displayOrder();

}


// ================================
// CALCULATE SALE
// ================================

calculate.addEventListener("click", function() {

    // Get the current date and time
    let now = new Date();

    let saleDate = now.toLocaleDateString("en-GB");

    let saleTime = now.toLocaleTimeString();

    let customerName =
        document.getElementById(
            "customerName"
        ).value;


    let phone =
        document.getElementById(
            "phone"
        ).value;


    let discount =
        Number(
            document.getElementById(
                "discount"
            ).value

        );

        let paymentMethod =
    document.getElementById("paymentMethod").value;


    // Check customer name

    if (customerName === "") {

        receipt.textContent =
            "Please enter customer name.";

        return;

    }


    // Check phone

    if (phone === "") {

        receipt.textContent =
            "Please enter phone number.";

        return;

    }


    // Check tyres

    if (tyres.length === 0) {

        receipt.textContent =
            "Please add at least one tyre.";

        return;

    }


    // Calculate subtotal

    let subtotal = 0;


    for (
        let i = 0;
        i < tyres.length;
        i++
    ) {

        subtotal +=
            tyres[i].price *
            tyres[i].quantity;

    }


    // Calculate final amount

    let finalAmount =
        subtotal - discount;



// Start the receipt
let receiptHTML =

    "<strong>TAIBAH AUTO TYRES</strong><br>" +

    "DRIVE WITH CONFIDENCE<br><br>" +

    "Date: " +
    saleDate +
    "<br>" +

    "Time: " +
    saleTime +
    "<br><br>" +

    "Customer: " +
    customerName +
    "<br>" +

    "Phone: " +
    phone +
    "<br>"+

    "Payment Method: " +
    paymentMethod +
    "<br><br>";



// Add a heading for the tyres
receiptHTML +=
    "<strong>TYRE DETAILS</strong><br><br>" +

    "<table class='receipt-table'>" +

    "<tr>" +
    "<th>Tyre Size</th>" +
    "<th>Price</th>" +
    "<th>Qty</th>" +
    "<th>Total</th>" +
    "</tr>";

for (let i = 0; i < tyres.length; i++) {

    let itemTotal =
        tyres[i].price *
        tyres[i].quantity;

    receiptHTML +=
        "<tr>" +
        "<td>" + tyres[i].size + "</td>" +
        "<td>KSh " + tyres[i].price + "</td>" +
        "<td>" + tyres[i].quantity + "</td>" +
        "<td>KSh " + itemTotal + "</td>" +
        "</tr>";
}

receiptHTML +=
    "</table>";


// Add space
receiptHTML +=
    "<br>" +


// Subtotal
    "Subtotal: KSh " +
    subtotal +
    "<br>" +


// Discount
    "Discount: KSh " +
    discount +
    "<br><br>" +


// Final amount
    "<strong>Final Amount: KSh " +
    finalAmount +
    "</strong>" +


// Thank you message
    "<br><br>" +

    "<div class='receipt-footer'>" +

    "<strong>THANK YOU!</strong><br>" +

    "DRIVE SAFELY" +

    "</div>";


// Show receipt
receipt.innerHTML = receiptHTML;

});


// ================================
// PRINT RECEIPT
// ================================

function printReceipt() {

    window.print();

}

newSale.addEventListener("click", function() {

    document.getElementById("customerName").value = "";

    document.getElementById("phone").value = "";

    document.getElementById("quantity").value = 1;

    document.getElementById("discount").value = 0;

    document.getElementById("paymentMethod").value = "Cash";

    tyres = [];

    displayOrder();

    receipt.innerHTML =
        "<p>No sale calculated yet.</p>";
});