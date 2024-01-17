const loadAllCustomerCode = () => {
    $('#customer_id').empty();
    $('#customer_id').append("<option selected>Select customer code</option>");

    $.ajax({
        url: "http://localhost:8081/mini_pos_war_exploded/customer",
        method: "GET",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            for (const customer of resp) {
                let option = `<option data-name="${customer.name}">${customer.customer_id}</option>;`
                $("#customer_id").append(option);
            }
        },
        error: function (xhr, exception) {
            console.log("Error loading customer codes:", exception);
        }
    });
}

$('#customer_id').change((e) => {
    const customer_id = e.target.value;
    if ('Select customer code' !== customer_id) {
        const name = e.target.options[e.target.selectedIndex].dataset.name;
        const qty = e.target.options[e.target.selectedIndex].dataset.qty;

        $('#customer_name').val(name);
        // $('#customer_qty').val(qty);
    }
})



const loadAllItemCode = () => {
    $('#order_item_id').empty();
    $('#order_item_id').append("<option selected>Select item code</option>");

    $.ajax({
        url: "http://localhost:8081/mini_pos_war_exploded/item",
        method: "GET",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            for (const item of resp) {
                let option = `<option data-description="${item.description}" data-unitPrice="${item.unitPrice}" data-qty="${item.qty}">${item.code}</option>;`

                $("#order_item_id").append(option);
            }
        },
        error: function (xhr, exception) {
            console.log("Error loading item codes:", exception);
        }
    });
}

$('#order_item_id').change((e) => {
    const order_item_id = e.target.value;
    if ('Select item code' !== order_item_id) {
        const description = e.target.options[e.target.selectedIndex].getAttribute('data-description');
        $('#description').val(description);

        const unitPrice = e.target.options[e.target.selectedIndex].getAttribute('data-unitPrice');
        $('#unit_price').val(unitPrice);

        const qty = e.target.options[e.target.selectedIndex].getAttribute('data-qty');
        $('#qty_on_hand').val(qty);
    }
})
loadAllItemCode();
loadAllCustomerCode();
$("#add_cart").click(function () {
    updateTotal();
});
$("#unit_price, #qty_on_hand").on("input", updateTotal);


let itemsArray = [
    { item_id: '1', description: 'Item 1', qty: 10, item_price: 5.00 },
    { item_id: '2', description: 'Item 2', qty: 20, item_price: 10.00 },
    // Add more items as needed
];

function loadItemData() {
    // Implement your loadItemData logic here
    // This is just a placeholder
}

function updateTotal() {
    // Implement your updateTotal logic here
    // This is just a placeholder
}

function calculateTotal() {
    // Implement your calculateTotal logic here
    // This is just a placeholder
}

function addToCart() {
    let item_id = $('#order_item_id option:selected').text();
    let itemExists = false;

    $('#order_table_body .item_id').each(function () {
        if ($(this).text() === item_id) {
            itemExists = true;
            let existingQty = parseInt($(this).closest('tr').find('.qty').text());
            let qty = parseInt($('#order_qty').val());
            let newQty = existingQty + qty;

            let existingTotal = parseFloat($(this).closest('tr').find('.total').text());
            let add_total = updateTotal();
            let newTotal = existingTotal + add_total;

            let selectedItem = itemsArray.find(item => item.item_id === item_id);

            if (selectedItem) {
                if (selectedItem.qty < qty) {
                    toastr.error('Error: Not enough items in stock.');
                    return;
                } else {
                    selectedItem.qty -= qty;
                    $(this).closest('tr').find('.qty').text(newQty);
                    $(this).closest('tr').find('.total').text(newTotal);
                    loadItemData();
                }
            }

            return false; // Break the loop if a match is found
        }
    });

    if (!itemExists) {
        console.log('Item with ID ' + item_id + ' is not in the table.');

        let desc = $('#description').val();
        let total = updateTotal();
        let qty = $('#order_qty').val();

        let selectedItem = itemsArray.find(item => item.item_id === item_id);

        if (selectedItem) {
            if (selectedItem.qty < qty) {
                toastr.error('Error: Not enough items in stock.');
                return;
            } else {
                selectedItem.qty -= parseInt(qty);
                loadItemData();
            }
        }

        let record = `<tr><td class="item_id">${item_id}</td><td class="desc">${desc}</td><td class="qty">${qty}</td><td class="total">${total}</td></tr>`;
        $("#order_table_body").append(record);

        toastr.success("Add to cart...🛒");
    } else {
        console.log('Item not found in itemsArray.');
    }
    function updateTotal() {
        const unitPrice = parseFloat($("#unit_price").val()) || 0;
        const quantity = parseInt($("#qty_on_hand").val()) || 0;
        const total = (unitPrice * quantity).toFixed(2);
        $("#final_total").val(total);
    }

    // let final_total = 0;
    // $('#order_table_body tr').each(function () {
    //     let total = parseFloat($(this).find('.total').text());
    //     final_total += total;
    // });

    // $('#final_total').val(final_total);

    /*const cmbItemId = document.getElementById('customer_id');
    cmbItemId.innerHTML = '';*/
    $('#description').val('');
    $('#unit_price').val('');
    $('#qty_on_hand').val('');
    $('#order_qty').val('');
}

$('#add_cart').on('click', addToCart);

// let itemsArray = [
//     { item_id: '1', description: 'Item 1', qty_on_hand: 10, item_price: 5.00 },
//     { item_id: '2', description: 'Item 2', qty_on_hand: 20, item_price: 10.00 },
//     // Add more items as needed
// ];
//
// function loadItemData() {
//     // Implement your loadItemData logic here
//     // This is just a placeholder
// }
//
// function calculateTotal(unitPrice, qty) {
//     return (unitPrice * qty).toFixed(2);
// }
//
// function addToCart() {
//     let item_id = $('#order_item_id option:selected').text();
//     let itemExists = false;
//
//     $('#order_table_body .item_id').each(function () {
//         if ($(this).text() === item_id) {
//             itemExists = true;
//             let existingQty = parseInt($(this).closest('tr').find('.qty').text());
//             let qty = parseInt($('#order_qty').val());
//             let newQty = existingQty + qty;
//
//             let existingTotal = parseFloat($(this).closest('tr').find('.total').text());
//             let selectedItem = itemsArray.find(item => item.item_id === item_id);
//
//             if (selectedItem) {
//                 if (selectedItem.qty_on_hand < newQty) {
//                     toastr.error('Error: Not enough items in stock.');
//                     return;
//                 } else {
//                     selectedItem.qty_on_hand -= newQty;
//                     $(this).closest('tr').find('.qty').text(newQty);
//                     $(this).closest('tr').find('.total').text(calculateTotal(selectedItem.item_price, newQty));
//                     loadItemData();
//                 }
//             }
//
//             return false; // Break the loop if a match is found
//         }
//     });
//
//     if (!itemExists) {
//         console.log('Item with ID ' + item_id + ' is not in the table.');
//
//         let desc = $('#description').val();
//         let selectedItem = itemsArray.find(item => item.item_id === item_id);
//
//         if (selectedItem) {
//             let qty = parseInt($('#order_qty').val());
//             if (selectedItem.qty_on_hand < qty) {
//                 toastr.error('Error: Not enough items in stock.');
//                 return;
//             } else {
//                 selectedItem.qty_on_hand -= qty;
//                 loadItemData();
//             }
//
//             let total = calculateTotal(selectedItem.item_price, qty);
//
//             let record = `<tr><td class="item_id">${item_id}</td><td class="desc">${desc}</td><td class="qty">${qty}</td><td class="total">${total}</td></tr>`;
//             $("#order_table_body").append(record);
//
//             toastr.success("Add to cart...🛒");
//         }
//     } else {
//         console.log('Item not found in itemsArray.');
//     }
//
//     let final_total = 0;
//     $('#order_table_body tr').each(function () {
//         let total = parseFloat($(this).find('.total').text());
//         final_total += total;
//     });
//
//     $('#final_total').val(final_total);
//
//     // Clear form fields
//     $('#description').val('');
//     $('#unit_price').val('');
//     $('#qty_on_hand').val('');
//     $('#order_qty').val('');
// }
//
// $('#add_cart').on('click', addToCart);

