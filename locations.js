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
        function getLocation(datain) {
            var division = datain.division;

            try {
                if (division){

                    // 5 - Pacific Central Division
                    // 13 - Pacific Central Division : VIA - PCD
                    // 7 - Pacific Northern Division
                    // 14 - Pacific Northern Division : VIA - PND
                    // 15 - Pacific Southern Division
                    // 17 - Pacific Southern Division Trade : VIA - PSD
                    var locationSearchObj = search.create({
                        type: "location",
                        filters:
                            [
                                // ['custrecord_tbl_division', 'anyof', division],
                                // ['parent', 'anyof', division],
                                ['custrecord_acs_division', 'anyof', division],
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "name",
                                    sort: search.Sort.ASC
                                }),
                                "phone",
                                "city",
                                "state",
                                "country",
                                "custrecord_tbl_division",
                                "custrecord_ns_off_site_loc"
                            ]
                    });

                    var totalcount = 0;

                    locationSearchObj.run().each(function(result){
                        totalcount +=1;
                        return true;
                    });

                    var myResultSet = locationSearchObj.run();
                    return myResultSet.getRange({
                        start: 0,
                        end: totalcount
                    });

                }
                else {
                    var locationSearchObj = search.create({
                        type: "location",
                        filters:
                            [
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "name",
                                    sort: search.Sort.ASC
                                }),
                                "phone",
                                "city",
                                "state",
                                "country",
                                "custrecord_tbl_division",
                                "custrecord_ns_off_site_loc"
                            ]
                    });
                    var totalcount = 0;

                    locationSearchObj.run().each(function(result){
                        totalcount +=1;
                        return true;
                    });

                    var myResultSet = locationSearchObj.run();
                    return myResultSet.getRange({
                        start: 0,
                        end: totalcount
                    });
                }
            } catch (err) {
                return [
                    {
                        status: 'error',
                        msg: "Sorry user not found!",
                        err: err.message
                    }
                ];
            }
        }

        return {
            get: getLocation,
            // put: get,
            //delete: delete,
        };
    }
);
