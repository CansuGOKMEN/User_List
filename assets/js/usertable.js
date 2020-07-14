(function ($) {
    $.fn.tableCreater = function (settings) {
        var property = $.extend({
            columns: [],
            totalCount: 0,
            class: null,
            data: [],
            url: null,
            params: null,
        }, settings);

        var table = this;

        return this.each(function () {
            $(this).html('<thead></thead>');
            $(this).addClass(property.class);
            $(this).find('thead').append(createHeader());

            if (property.data.length > 0) setData(); else getData();

            function createHeader() {
                var heading = '<tr class="text-left text-uppercase">';
                property.columns.forEach(function (column) {
                    heading += '<th style="' + ((column.style) ? column.style : '') + '">' + column.title + '</th>';
                });
                heading += '</tr>';
                return heading;
            }

            function setData() {
                //$(table).find('tbody').empty();
                var rows = '';
                property.data.forEach(function (item) {
                    rows += '<tbody><tr>';
                    property.columns.forEach(function (column) {
                        rows += '<td class="text-dark-75 font-weight-bolder">';
                        rows += mapping(item, column.name);
                        rows += '</td>';
                    });
                    rows += '</tr>';
                    if (item.children != null && item.children.length > 0) {
                        item.children.forEach(function (object, index) {
                            rows += '<tr class="toggle">';
                            property.columns.forEach(function (column) {
                                rows += '<td class="text-muted font-weight-bold">';
                                rows += mapping(object, column.name);
                                rows += '</td>';
                            });
                            rows += '</tr>';
                        });
                    }
                    rows += '</tbody>';
                });
                $(table).append(rows);
            }

            function getData() {
                $.ajax({
                    type: "Get",
                    url: "data.json",
                    dataType: "json",
                    cache: false,
                    async: true,
                    success: function (obj) { property.data = obj.data; setData() },
                    error: function () {
                        alert("Not found");
                    }
                });
            }

            function mapping(object, keypattern) {
                keypattern = keypattern.toString();
                var returnableValue = object;
                keys = keypattern.split('.');
                keys.forEach(function (key) {
                    if (returnableValue) {
                        returnableValue = returnableValue[key];
                    }
                    if (key == "identityNumber") {
                        returnableValue = '<a href="#" class="text-dark text-hover-primary" data-toggle="modal" data-target="#userInformationModal">' + returnableValue + '</a>';
                    }

                    if(key == "phone"){
                        returnableValue = '<a href="#" class="text-dark text-hover-primary" data-toggle="modal" data-target="#phoneModal">' + returnableValue + '</a>';
                    }
                });
                return (returnableValue != null) ? returnableValue : '';
            }

        });
    }
}(jQuery));