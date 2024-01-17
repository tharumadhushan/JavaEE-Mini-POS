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
        $('#order_qty').val(qty);
    }
})
loadAllItemCode();
loadAllCustomerCode();
$("#add_cart").click(function () {
    updateTotal();
});
$("#unit_price, #qty_on_hand").on("input", updateTotal);

function updateTotal() {
    const unitPrice = parseFloat($("#unit_price").val()) || 0;
    const quantity = parseInt($("#qty_on_hand").val()) || 0;
    const total = (unitPrice * quantity).toFixed(2);
    $("#final_total").val(total);
}
