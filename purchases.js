/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define([
        'N/https',
        'N/record',
        'N/search',
        'N/runtime',
        'N/format',
        './moment.js'],
    function (https, record, search, runtime, format, moment) {
        function getPurchase(datain) {
            var itemid = datain.internalid;
            var start = datain.start ? datain.start : 0;
            var end = datain.end ? datain.end : 100;

            try {
                if (itemid) {
                    var purchaseorderSearchObj = search.create({
                        type: "purchaseorder",
                        filters:
                            [
                                ["type", "anyof", "PurchOrd"],
                                "AND",
                                ["internalidnumber","equalto",itemid]
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "ordertype",
                                    sort: search.Sort.ASC
                                }),
                                "mainline",
                                "trandate",
                                "asofdate",
                                "postingperiod",
                                "taxperiod",
                                "type",
                                "tranid",
                                "entity",
                                "account",
                                "memo",
                                "amount",
                                "custbody_dest_country_field",
                                "custbody21",
                                "custbody_4599_mx_operation_type",
                                "custbody_4599_sg_import_permit_num",
                                "custbody_my_import_declaration_num"
                            ]
                    });
                    var myResultSet = purchaseorderSearchObj.run();
                    return myResultSet.getRange({
                        start: 0,
                        end: 1
                    });
                } else {
                    var purchaseorderSearchObj = search.create({
                        type: "purchaseorder",
                        filters:
                            [
                                ["type","anyof","PurchOrd"]
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "ordertype",
                                    sort: search.Sort.ASC
                                }),
                                "mainline",
                                "trandate",
                                "asofdate",
                                "postingperiod",
                                "taxperiod",
                                "type",
                                "tranid",
                                "entity",
                                "account",
                                "memo",
                                "amount",
                                "custbody_dest_country_field",
                                "custbody21",
                                "custbody_4599_mx_operation_type",
                                "custbody_4599_sg_import_permit_num",
                                "custbody_my_import_declaration_num"
                            ]
                    });
                    // var searchResultCount = itemSearchObj.runPaged().count;
                    var itemResultSet = purchaseorderSearchObj.run();
                    return itemResultSet.getRange({
                        start: start,
                        end: end
                    });
                }

            }catch (err) {
                log.audit({
                    title: 'GET items',
                    details: JSON.stringify(err)
                });

                return err;
            }
        }

        function createPurchase(request) {

            // var currentdate = moment().format("M/D/YYYY");

            var stackData = request.values;
            var items = request.items;
            var newPurchaseOrder = record.create({
                type: "purchaseorder",
                // isDynamic: true,
                defaultValues: null
            });
            //
            // newPurchaseOrder.setValue({
            //     fieldId: 'trandate',
            //     value: moment().format("MM/DD/YYYY")
            // });

            for (var key in stackData) {
                if (stackData.hasOwnProperty(key)) {
                    newPurchaseOrder.setValue({
                        fieldId: key,
                        value: stackData[key]
                    });
                }
            }

            for (var s in items){
                newPurchaseOrder.selectNewLine({sublistId: "item"});
                newPurchaseOrder.setCurrentSublistValue({
                    sublistId: "item",
                    fieldId: "item",
                    value: items[s].id
                });
                newPurchaseOrder.setCurrentSublistValue({
                    sublistId: "item",
                    fieldId: "quantity",
                    value: items[s].quantity
                });
                newPurchaseOrder.setCurrentSublistValue({
                    sublistId: "item",
                    fieldId: "location",
                    value: items[s].location
                });
                newPurchaseOrder.commitLine({sublistId:"item"});
            }

            // return newPurchaseOrder;
            var savePurchase = newPurchaseOrder.save({
                enableSourcing: false,
                ignoreMandatoryFields: false
            });

            if (savePurchase.error) {
                return {
                    code: savePurchase.error.code,
                    message: JSON.parse(savePurchase.error.message)
                };
            } else {
                return savePurchase;
            }
        }

        return {
            get: getPurchase,
            post: createPurchase,
            //delete: delete,
            //put: put
        };
    }
);
