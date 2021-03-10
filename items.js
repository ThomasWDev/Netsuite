/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define([
        'N/https',
        'N/record',
        'N/search',
        'N/log'
    ],
    function(https, record, search, log) {
        function getItems(datain) {
            var start = datain.start ? datain.start : 0;
            var item = datain.item;
            var division = datain.division;
            var itemtype = datain.itemtype;
            // var email = datain.email;

            try {

                if (item){
                    var itemSearchObj = search.create({
                        type: "item",
                        filters:
                            [
                                ["matrixchild","is","T"],
                                "AND",
                                ["internalid","anyof",item]
                            ],
                        columns:
                            [
                                "itemid",
                                "department",
                                "location",
                                "unitstype",
                                "expenseaccount",
                                "assetaccount",
                                "incomeaccount",
                                "internalid",
                                "stockunit",
                                "saleunit"
                            ]
                    });
                    var myResultSet = itemSearchObj.run();
                    return myResultSet.getRange({
                        start: 0,
                        end: 1
                    })[0];

                }
                else if (division && itemtype){
                    var itemSearchObj = search.create({
                        type: "item",
                        filters:
                            [
                                ["matrixchild","is","T"],
                                "AND",
                                ["custitem_tbl_items_name_list","anyof",division],
                                "AND",
                                ["department","anyof",itemtype],
                                "AND",
                                ["name","doesnotstartwith","*"],
                                "AND",
                                ["name","doesnotstartwith","Test"],
                                "AND",
                                ["name","doesnotcontain","KO"]
                            ],
                        columns:
                            [
                                "itemid",
                                "department",
                                "location",
                                "unitstype",
                                "expenseaccount",
                                "assetaccount",
                                "incomeaccount",
                                "internalid",
                                "stockunit",
                                "saleunit"
                            ]
                    });

                    var totalcount = 0;

                    itemSearchObj.run().each(function(result){
                        totalcount +=1;
                        return true;
                    });


                    var myResultSet = itemSearchObj.run();
                    return myResultSet.getRange({
                        start: 0,
                        end: totalcount
                    });

                }
                else {
                    var itemSearchObj = search.create({
                        type: "item",
                        filters:
                            [
                                ["matrixchild","is","T"],
                                "AND",
                                ["name","doesnotstartwith","*"],
                                "AND",
                                ["name","doesnotstartwith","Test"],
                                "AND",
                                ["name","doesnotcontain","KO"]
                            ],
                        columns:
                            [
                                "itemid",
                                "department",
                                "location",
                                "unitstype",
                                "expenseaccount",
                                "assetaccount",
                                "incomeaccount",
                                "internalid",
                                "stockunit",
                                "saleunit"
                            ]
                    });

                    var totalcount = 0;

                    itemSearchObj.run().each(function(result){
                        totalcount +=1;
                        return true;
                    });

                    var end = datain.end ? datain.end : totalcount;
                    var myResultSet = itemSearchObj.run();
                    return myResultSet.getRange({
                        start: 0,
                        end: end
                    });
                }


            } catch (err) {
                return err;
            }
        }

        return {
            get: getItems,
            //delete: delete,
        };
    }
);
