/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define([
        'N/https',
        'N/record',
        'N/search',
        'N/log',
        './moment.js'],
    function (https, record, search, log, moment) {

        function getCampaigns(datain) {
            var start = datain.start ? datain.start : 0;
            var end = datain.end ? datain.end : 100;
            var id = datain.id;
            var isinactive = datain.isinactive;

            try {
                if (id){

                    var customrecord_tbl_campaignSearchObj = search.create({
                        type: "customrecord_tbl_campaign",
                        filters:
                            [
                                ["id","equalto",id]
                            ],
                        columns:
                            [
                                "name",
                                "id",
                                "custrecord_tbl_campaign_end_users",
                                "custrecord_tbl_campaign_markets",
                                "custrecord_tbl_campaign_quantity",
                                "custrecord_tbl_campaign_price",
                                "custrecord_tbl_campaign_region",
                                "custrecord_tbl_campaign_division",
                                "custrecord_tbl_campaign_item",
                                "custrecord_tbl_campaign_start_date",
                                "custrecord_tbl_campaign_end_date",
                                "custrecord_tbl_campaign_comments",
                                "custrecord_tbl_campaign_customers",
                                search.createColumn({
                                    name: "created",
                                    sort: search.Sort.DESC
                                }),
                                "isinactive",
                                "custrecord_tbl_campaign_notes",
                                "custrecord_tbl_campaign_stack_number"
                            ]
                    });
                    var myResultSet = customrecord_tbl_campaignSearchObj.run();
                    return myResultSet.getRange({
                        start: start,
                        end: 1
                    });
                }
                else if (isinactive){

                    var customrecord_tbl_campaignSearchObj = search.create({
                        type: "customrecord_tbl_campaign",
                        filters:
                            [
                                ["isinactive","is", isinactive]
                            ],
                        columns:
                            [
                                "name",
                                "id",
                                "custrecord_tbl_campaign_end_users",
                                "custrecord_tbl_campaign_markets",
                                "custrecord_tbl_campaign_quantity",
                                "custrecord_tbl_campaign_price",
                                "custrecord_tbl_campaign_region",
                                "custrecord_tbl_campaign_division",
                                "custrecord_tbl_campaign_item",
                                "custrecord_tbl_campaign_start_date",
                                "custrecord_tbl_campaign_end_date",
                                "custrecord_tbl_campaign_comments",
                                "custrecord_tbl_campaign_customers",
                                search.createColumn({
                                    name: "created",
                                    sort: search.Sort.DESC
                                }),
                                "isinactive",
                                "custrecord_tbl_campaign_notes",
                                "custrecord_tbl_campaign_stack_number"
                            ]
                    });
                    var myResultSet = customrecord_tbl_campaignSearchObj.run();
                    return myResultSet.getRange({
                        start: start,
                        end: end
                    });
                }
                else {
                    var customrecord_tbl_campaignSearchObj = search.create({
                        type: "customrecord_tbl_campaign",
                        filters:
                            [],
                        columns:
                            [
                                "name",
                                "id",
                                "custrecord_tbl_campaign_end_users",
                                "custrecord_tbl_campaign_markets",
                                "custrecord_tbl_campaign_quantity",
                                "custrecord_tbl_campaign_price",
                                "custrecord_tbl_campaign_region",
                                "custrecord_tbl_campaign_division",
                                "custrecord_tbl_campaign_item",
                                "custrecord_tbl_campaign_start_date",
                                "custrecord_tbl_campaign_end_date",
                                "custrecord_tbl_campaign_comments",
                                "custrecord_tbl_campaign_customers",
                                search.createColumn({
                                    name: "created",
                                    sort: search.Sort.DESC
                                }),
                                "isinactive",
                                "custrecord_tbl_campaign_notes",
                                "custrecord_tbl_campaign_stack_number"
                            ]
                    });
                    var totalcount = 0;

                    customrecord_tbl_campaignSearchObj.run().each(function(result){
                        totalcount +=1;
                        return true;
                    });

                    var myResultSet = customrecord_tbl_campaignSearchObj.run();
                    return myResultSet.getRange({
                        start: 0,
                        end: totalcount
                    });
                }
            } catch (err) {
                return [
                    {
                        status: 'error',
                        msg: "Sorry campaigns not found!",
                        err: err.message
                    }
                ];
            }
        }

        function createCampaign(request) {

            try {
                var campaignRecord = record.create({
                    type: 'customrecord_tbl_campaign',
                });

                campaignRecord.setValue('name', request.name);
                campaignRecord.setValue('custrecord_tbl_campaign_stack_number', request.custrecord_tbl_campaign_stack_number);

                campaignRecord.setValue({
                    fieldId: 'custrecord_tbl_campaign_customers',
                    value: request.custrecord_tbl_campaign_customers
                });

                campaignRecord.setValue('custrecord_tbl_campaign_end_users', request.custrecord_tbl_campaign_end_users);
                campaignRecord.setValue('custrecord_tbl_campaign_markets', request.custrecord_tbl_campaign_markets);
                campaignRecord.setValue('custrecord_tbl_campaign_quantity', request.custrecord_tbl_campaign_quantity);
                campaignRecord.setValue('custrecord_tbl_campaign_price', request.custrecord_tbl_campaign_price);
                campaignRecord.setValue('custrecord_tbl_campaign_region', request.custrecord_tbl_campaign_region);
                campaignRecord.setValue('custrecord_tbl_campaign_division', request.custrecord_tbl_campaign_division);
                campaignRecord.setValue('custrecord_tbl_campaign_item', request.custrecord_tbl_campaign_item);
                campaignRecord.setValue('custrecord_tbl_campaign_start_date', new Date(request.custrecord_tbl_campaign_start_date));
                campaignRecord.setValue('custrecord_tbl_campaign_end_date', new Date(request.custrecord_tbl_campaign_end_date));
                campaignRecord.setValue('custrecord_tbl_campaign_notes', request.custrecord_tbl_campaign_notes);
                campaignRecord.setValue('custrecord_tbl_campaign_comments', request.custrecord_tbl_campaign_comments);

                campaignRecord.save();
                return [
                    {
                        success: true,
                        message: "Campaign successfully created."
                    }
                ];
            } catch (e) {
                return e
            }
        }

        function updateCampaign(request) {
            var id = request.id;
            var campaigndata = request.campaigndata;
            var campaignrecord = record.load({
                type: 'customrecord_tbl_campaign',
                id: id,
                isDynamic: true,
            });

            try {

                for (var key in campaigndata) {
                    if (campaigndata.hasOwnProperty(key)) {

                        if (key === "custrecord_tbl_campaign_start_date" || key === "custrecord_tbl_campaign_end_date"){
                            campaignrecord.setValue({
                                fieldId: key,
                                value: new Date(campaigndata[key])
                            });
                        }
                        else {
                            campaignrecord.setValue({
                                fieldId: key,
                                value: campaigndata[key]
                            });
                        }
                    }
                }

                campaignrecord.save();
                return [
                    {
                        success: true,
                        id: id,
                        message: "Campaign successfully updated."
                    }
                ];
            } catch (e) {
                return [
                    {
                        error: true,
                        respons: e
                    }
                ];
            }
        }

        function deleteCampaign(datain) {
            var id = datain.id;

            try {
                record.delete({
                    type: 'customrecord_tbl_campaign',
                    id: id
                });
                return [
                    {
                        success: true,
                        id: id,
                        message: "Campaign successfully deleted."
                    }
                ];
            } catch (e) {
                return [
                    {
                        error: true,
                        respons: e
                    }
                ];
            }
        }

        return {
            get: getCampaigns,
            post: createCampaign,
            put: updateCampaign,
            delete: deleteCampaign,
        };
    }
);
