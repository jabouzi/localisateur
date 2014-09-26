jQuery(document).ready(function() {

    $("table tbody tr:nth-child(2n)").css("background-color", "#F9F9F9");
    //script jquery pour liste de tableau (click-expand):
    $(".equipement_detail").hide();
    $(".equipement_serie").click(function() {
        $(this).parent().find('.equipement_serie').removeClass("active");
        $(this).parent().find(".equipement_detail").not($(this).next()).slideUp("fast");

        if ($(this).next().is(':hidden')) {
            $(this).addClass("active").next().slideDown("fast");
        } else {
            $(this).removeClass('active').next().slideUp("fast");
        }
    });

    $('.add_comparison').click(function() {
        var id = $(this).attr("id").split('_');
        $.getJSON("/ajax/locationhewitt.php", {action: 'add_comparison', pcat: id[1], pclass: id[2]},
        function(data) {
            if (data.length)
            {
                $('.comparer_produit_wrapper').show();
                var elem_id = data.length - 1;
                $('#prod_' + elem_id).val(id[1] + '_' + id[2]);
                if (data.length >= 3)
                    $('.add_comparison').hide();
                else
                    $('#comp_' + id[1] + '_' + id[2]).hide();
                $.each(data, function(i, item) {
                    $('#compared_item_text_' + i).find('p').html('<b>' + item + '</b>');
                    $('#img_prod_' + i).show();
                });
            }
        });
    });

    $('.cancel_order').click(function() {
        $.get("/ajax/locationhewitt.php", {action: 'cancel_reservation'}, function(data) {
            window.location.reload();
        });
    });

    $('.add_reservation').click(function() {
        var id = $(this).attr("id").split('_');
        $.get("/ajax/locationhewitt.php", {action: 'add_reservation', pcat: id[1], pclass: id[2], qte: $('#qte_' + id[1] + '_' + id[2]).find('input').val()}, function(data) {
            $('#res_' + id[1] + '_' + id[2]).hide();
            $('#qte_tr_' + id[1] + '_' + id[2]).hide();
            $('#my_cart').html(parseInt($('#my_cart').html()) + parseInt($('#qte_' + id[1] + '_' + id[2]).find('input').val()));
        });
    });

    $('.remove_comparison').click(function() {
        var id = $(this).find('input').val().split('_');
        $('.compared_item_text').find('p').empty();
        $('.'+id[0]+'_'+id[1]).remove();
        $.getJSON("/ajax/locationhewitt.php", {action: 'remove_comparison', pcat: id[0], pclass: id[1]}, function(data) {
            //~ console.log(data.length);        
            if (!data.length)
            {
                $('.comparer_produit_wrapper').hide();
                $('.add_comparison').show();
                if ($('#fiche_comparer').length > 0) window.location.reload();
            }
            $('#comp_' + id[0] + '_' + id[1]).show();
            //~ console.log(id);
            $(".img_prod").hide();
            $.each(data, function(i, item) {
                $('#compared_item_text_' + i).find('p').html('<b>' + item + '</b>');
                $('#img_prod_' + i).show();
            });
        });   
        //if ($('#fiche_comparer').length > 0) window.location.reload();     
    });

    $('.remove_all').click(function() {
        $.get("/ajax/locationhewitt.php", {action: 'remove_all'}, function(data) {
            $('.comparer_produit_wrapper').hide();
            $('.add_comparison').show();
            window.location.reload();
        });        
    });

    spinbox = [];
    $('.prod_recherche').click(function() {
        window.location = $("#product_subcategory").val();
    });

    $('.qte_reservation').each(function(index) {
        spinbox[index] = new SpinBox($(this).attr("id"), {'minimum': 1, 'maximum': 999});
    });

    $('.update_cart').click(function() {
        var index = parseInt($("#count_reservation").val());
        var jsonObj = [];
        for (var i = 0; i < index; i++)
        {
            var from = $("#from" + i).datepicker().val();
            var to = $("#to" + i).datepicker().val();;
            jsonObj[i] = {"from": from, "to": to, "qte": $("#qte" + i).val(), "pcat": $("#cat" + i).val(), "pclass": $("#class" + i).val()};
        }
        $.getJSON("/ajax/locationhewitt.php", {action: 'update_reservation', res_data: jsonObj}, function(data) {
            $.each(data, function(i, item) {
                var lang = $('body').attr("lang");
                if (lang == 'fr') $('#price' + i).html('<b>' + item + ' $</b>');
                else $('#price' + i).html('<b>$' + item + '</b>');
                $('#loc_price' + i).val(item);
            });
        });
    });
    
    $('.reservation_delete').click(function() {
        var id = $(this).attr("id").split('_');
        //$('#reservation_'+id[2]).remove();        
        $.getJSON("/ajax/locationhewitt.php", {action: 'delete_reservation', index : id[2]}, function(data) {
            window.location.reload();
        });
        //var count = parseInt($('#count_reservation').val()) - 1;
        //console.log(count);
        //if (count == 0) window.location.reload();
        //else $('#count_reservation').val(count);
    });

    $(function() {
       // var dateformat = ["mm/dd/yy", "fr": "dd/mm/yy"];
        var lang = $('body').attr("lang");
        var dateformat = "mm/dd/yy";
        if (lang == 'fr') dateformat = "dd/mm/yy";
        $('.from_date').each(function(index) {
            $("#from" + index).datepicker({
                minDate: 0,
                onSelect: function(dateText, inst) {
                    var date = $.datepicker.parseDate(dateformat, dateText);
                    var $to_date = $("#to" + index);
                    $to_date.datepicker("option", "defaultDate", date);
                }}
                , $.datepicker.regional[lang], "option", "dateFormat", dateformat);
        });
        $('.to_date').each(function(index) {
                $("#to" + index).datepicker({minDate: 0},                
                $.datepicker.regional[lang], "option", "dateFormat", dateformat);
        });

        $(".datepicker").each(function(index) {
            $("#" + $(this).attr("id")).datepicker({minDate: 0}, $.datepicker.regional[lang], "option", "dateFormat", dateformat);
        });
    });

    $(".telephone").keydown(function(event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39) {

        }
        else {
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });

    jQuery('.cat').click(function()
    {
        el_id = jQuery(this).attr('id');
        jQuery('.subcat').hide();
        jQuery('#subcat' + el_id).show();
        jQuery('.catlink').removeClass('active');
        jQuery('#' + el_id + 'link').addClass('active');
    });

    jQuery('.page_root').click(function()
    {
        jQuery('.page_root_cats').show();
    });


    jQuery('.menu_main td').hover(function() {
        //jQuery('.menu_main td').removeClass('active');
        jQuery('td:eq(1)').addClass('active');
        //alert(jQuery(this).parent("tr").children().index(this))
        jQuery(this).addClass('active');
    });

    jQuery('.submenu').hover(function() {
        //alert(jQuery('.submenu').attr('class'));
        //jQuery('td:eq('+jQuery(this).attr('class').match(/sub(\d+)/)[1]+')').addClass('active');
        jQuery('td:eq(1)').addClass('active');
    });

    jQuery('#imperiales_link').click(function()
    {
        jQuery('#table_metrics').hide();
        jQuery('#table_imperiales').show();
    });

    jQuery('#metrics_link').click(function()
    {
        jQuery('#table_imperiales').hide();
        jQuery('#table_metrics').show();
    });

    $('.validate_form').click(function()
    {
        validate_from($(this.form).attr('name'));
    });

    $(".dialog-modal").dialog({
        height: 140,
        modal: true,
        autoOpen: false,
    });

    $('#type_livraison').click(function() {
        $('.reservation_pickup_wrapper').hide();
        $('.reservation_livraison_wrapper').show();
        $('#livraison_ad').val('');
        $('#livraison_suite').val('');
        $('#livraison_ville').val('');
        $('#livraison_prov').val('');
        $('#livraison_cp1').val('');
        $('#livraison_cp2').val('');
    });

    $('#type_pickup').click(function() {
        $('.reservation_pickup_wrapper').show();
        $('.reservation_livraison_wrapper').hide();
        $('#livraison_ad').val('NULL');
        $('#livraison_suite').val('NULL');
        $('#livraison_ville').val('NULL');
        $('#livraison_prov').val('NULL');
        $('#livraison_cp1').val('NULL');
        $('#livraison_cp2').val('NULL');
    });

    $('.captcha_refresh_img').click(function() {
        refresh_captcha($('.captcha_img').attr('id'));
    });

    $('.add_fuser').click(function() {
        $('#nfusers').val(parseInt($('#nfusers').val()) + 1);
        $('#fusers').append($('#fuser').html());
    });
});

function remove_fuser(elem)
{
    //console.log($(elem).val());
    var parent = $(elem).closest('.row_fuser');
    parent.remove();
}

function validate_from(form_name)
{
    //console.log(form_name);
    var lang = $('body').attr("lang");
    var required = [];
    $('.error').removeClass('error');
    $("#" + form_name).find('[validate]').each(function() {
        if ($(this).attr('validate') == 'text')
        {
            //console.log($(this).val());
            if ($(this).val() == '')
            {
                $(this).addClass('red');
                required.push($(this).attr('title'));
            }
        }
        else if ($(this).attr('validate') == 'email')
        {
            var ok = 0;
            if ($(this).val() == '')
                ok++;
            else if (!check_email($(this).val()))
                ok++;
            else if ($("#" + $(this).attr('id') + '_confirmation').length > 0 && $("#" + $(this).attr('id') + '_confirmation').val() != $(this).val())
                ok++;

            if (ok)
            {
                required.push($(this).attr('title'));
                $(this).addClass('red');
            }
        }
        else if ($(this).attr('validate') == 'option')
        {
            if ($(this).val() == '')
            {
                required.push($(this).attr('title'));
                $(this).addClass('red');
            }
        }
        else if ($(this).attr('validate') == 'date')
        {
            var ok = 0;
            if ($(this).val() == '')
                ok++;
            else if (!isValideDate($(this).val()))
                ok++;

            if (ok)
            {
                required.push($(this).attr('title'));
                $(this).addClass('red');
            }
        }

    });

    //console.log(required);

    if (required.length)
    {
        $('#error_' + form_name).removeClass('form_good');
        $('#error_' + form_name).addClass('form_error');

        if (lang == "fr")
        {
            $('#error_' + form_name).show().html('Veuillez vérifier les champs suivants : <br/>' + required.join('<br/>'));
            $("html, body").animate({scrollTop: 0}, "slow");
            return false;
        }
        else
        {
            $('#error_' + form_name).show().html('Please check following fields : <br/>' + required.join('<br/>'));
            $("html, body").animate({scrollTop: 0}, "slow");
            return false;
        }
    }

    else
    {
        $.post("/ajax/check_captcha.php", {captcha: $("#captcha_" + form_name).val()}, function(data)
        {
            if (!parseInt(data))
            {
                $('#error_' + form_name).removeClass('form_good');
                $('#error_' + form_name).addClass('form_error');
                if (lang == "fr")
                {
                    $('#error_' + form_name).show().html('Veuillez vérifier le captcha ');
                    $("html, body").animate({scrollTop: 0}, "slow");
                    return false;
                }
                else
                {
                    $('#error_' + form_name).show().html('Please check following the captcha ');
                    $("html, body").animate({scrollTop: 0}, "slow");
                    return false;
                }
            }
            else
            {
                if (form_name == 'slidepanel')
                {
                    $('#dialog-modal_'+form_name).dialog('open');
                    var formdata = {};
                    $("#"+form_name).find('.formdata').each(function(index){
                        //console.log(jQuery(this).attr("name"),$(this).is(':radio'),$('input[name="'+jQuery(this).attr("name")+'"]').val(),this);
                        if ($(this).is(':radio')) {
                            formdata[jQuery(this).attr("name")] = [$('input[name="'+jQuery(this).attr("name")+'"]:checked').val(),jQuery(this).attr("title")];
                        }
                        else
                        {
                            formdata[jQuery(this).attr("name")] = [jQuery(this).val(),jQuery(this).attr("title")];
                        }
                    });
                    //console.log(formdata);
                    $.post("/ajax/add_contact_form.php", {contact_form: formdata }, function(insert) {
                        var hidden_lang = $("#hidden_lang").val();
                        $('#dialog-modal_'+form_name).dialog( "close" );
                        $('#error_'+form_name).removeClass('form_error');
                        $('#error_'+form_name).addClass('form_good');
                        document.forms[form_name].reset();
                        if (hidden_lang == "fr")
                        {
                            $('#error_'+form_name).show().html('Votre message a été bien reçu');
                            $("html, body").animate({ scrollTop: 0 }, "slow");
                            return false;
                        }
                        else
                        {
                            $('#error_'+form_name).show().html('Your message have been received');
                            $("html, body").animate({ scrollTop: 0 }, "slow");
                            return false;
                        }
                    });
                }
                else $("#" + form_name).submit();
            }
        });
    }
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    return pattern.test(emailAddress);
}

function remove_spaces(field_id) {
    jQuery('#' + field_id).val(jQuery('#' + field_id).val().split(' ').join(''));
}

function focus_next_field(field_from, field_to, num_chars) {
    var chars = jQuery('#' + field_from).val().length;

    if (chars == num_chars) {
        jQuery('#' + field_from).next('input').focus();
    }
}

function explode(item, delimiter) {
    tmp_array = new Array(1);
    var count = 0;
    var tempstring = new String(item);

    while (tempstring.indexOf(delimiter) > 0) {
        tmp_array[count] = tempstring.substr(0, tempstring.indexOf(delimiter));
        tempstring = tempstring.substr(tempstring.indexOf(delimiter) + 1, tempstring.length - tempstring.indexOf(delimiter) + 1);
        count = count + 1;
    }

    tmp_array[count] = tempstring;
    return tmp_array;
}

function in_array(what, where) {
    var out = false;

    for (i = 0; i < where.length; i++) {
        if (what == where[i]) {
            out = true;
            break;
        }
    }

    return out;
}

function print_1d_array(array) {
    document.write("<table border=1>");
    document.write("<tr>");
    for (row = 0; row < array.length; row++) {
        document.write("<td>" + array[row] + "</td>");
    }
    document.write("</tr>");
    document.write("</table>");
}

function print_2d_array(array) {
    document.write("<table border=1>");
    for (row = 0; row < array.length; row++) {
        document.write("<tr>");
        for (col = 0; col < array[row].length; col++) {
            document.write("<td>" + array[row][col] + "</td>");
        }
        document.write("</tr>");
    }
    document.write("</table>");
}

function is_array(obj) {
    return obj && !(obj.propertyIsEnumerable('length')) && typeof obj === 'object' && typeof obj.length === 'number';
}

function round_decimals(original_number, decimals) {
    var result1 = original_number * Math.pow(10, decimals);
    var result2 = Math.round(result1);
    var result3 = result2 / Math.pow(10, decimals);

    return pad_with_zeros(result3, decimals);
}

function pad_with_zeros(rounded_value, decimal_places) {
    // Convert the number to a string
    var value_string = rounded_value.toString();

    // Locate the decimal point
    var decimal_location = value_string.indexOf('.');

    // Is there a decimal point?
    if (decimal_location == -1) {
        // If no, then all decimal places will be padded with 0s
        decimal_part_length = 0;

        // If decimal_places is greater than zero, tack on a decimal point
        value_string += decimal_places > 0 ? '.' : '';
    }
    else {
        // If yes, then only the extra decimal places will be padded with 0s
        decimal_part_length = value_string.length - decimal_location - 1;
    }

    // Calculate the number of decimal places that need to be padded with 0s
    var pad_total = decimal_places - decimal_part_length;

    if (pad_total > 0) {
        // Pad the string with 0s
        for (var counter = 1; counter <= pad_total; counter++) {
            value_string += '0';
        }
    }

    return value_string;
}

function format_float(obj) {
    var o = document.getElementById(obj);
    var oo = o.value.replace(',', '.');

    if (isFloat(oo)) {
        o.value = round_decimals(oo, 2);
    }
    else {
        o.value = '';
    }
}

function toInt(n) {
    return n * 1;
}

function isFloat(n) {
    if (n == 0 || n == 0.00) {
        return false;
    }

    // Test for integer
    if ((n.length > 0) && !(/[^0-9]/).test(n)) {
        return true;
    }
    else {
        // Test for float
        if ((n.length > 0) && !(/[^0-9.]/).test(n) && (/\.\d/).test(n)) {
            return true;
        }
        else {
            return false;
        }
    }
}

function left(str, n) {
    if (n <= 0) {
        return '';
    } else if (n > String(str).length) {
        return str;
    } else {
        return String(str).substring(0, n);
    }
}

function right(str, n) {
    if (n <= 0) {
        return '';
    } else if (n > String(str).length) {
        return str;
    } else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
}

function mid(str, start, len) {
    // Make sure start and len are within proper bounds
    if (start < 0 || len < 0) {
        return '';
    }

    var iEnd, iLen = String(str).length;

    if (start + len > iLen) {
        iEnd = iLen;
    } else {
        iEnd = start + len;
    }

    return String(str).substring(start, iEnd);
}

function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function check_email(email) {
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if (filter.test(email)) {
        return true;
    }

    return false;
}

function moveOnMax(field, nextFieldID) {
    if (field.value.length >= field.maxLength) {
        document.getElementById(nextFieldID).focus();
    }
}

function generate_rid()
{
    var d = new Date();
    var n = d.getTime();
    var rid = Math.floor((Math.random() * n) + 1);
    return rid;
}

function refresh_captcha(id)
{
    var rand = generate_rid();
    $('#' + id).attr('src', '/skins/default/includes/captcha/captcha.php?rid=' + rand);
}

function update_subcats()
{
    $('#product_subcategory').empty();
    $.getJSON("/ajax/locationhewitt.php", {action: 'update_subcats', category: $("#product_category").val()}, function(data) {
        $.each(data, function(i, item) {
            $('#product_subcategory').append(('<option value="' + item.id + '">' + item.name + '</option>'));
        });
    });
}

function update_products()
{
    $('#products').empty();
    $.getJSON("/ajax/locationhewitt.php", {action: 'update_products', subcategory: $("#product_subcategory").val()}, function(data) {
        $.each(data, function(i, item) {
            $('#products').append(('<option value="' + item.id + '">' + item.name + '</option>'));
        });
    });
}

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}
