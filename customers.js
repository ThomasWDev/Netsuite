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

        function getCustomers(datain) {
            var start = datain.start ? datain.start : 0;
            var end = datain.end ? datain.end : 100;
            var email = datain.email;
            var name = datain.name;

            try {
                if (email){
                    var customerSearchObj = search.create({
                        type: "customer",
                        filters:
                            [
                                ["email","is",email],
                                "AND",
                                ["hasduplicates","is","F"],
                                "AND",
                                ["stage","anyof","CUSTOMER"]
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "entityid",
                                    sort: search.Sort.ASC
                                }),
                                "altname",
                                "email",
                                "phone",
                                "altphone",
                                "fax",
                                "contact",
                                "altemail",
                                "custentity_leaddestinationcountry",
                                "custentity_4599_sg_uen",
                                "custentity_my_brn",
                                search.createColumn({
                                    name: "accountnumber",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "altemail",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "city",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "country",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "countrycode",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "datecreated",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "isdefaultbilling",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "isdefaultshipping",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "department",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "externalid",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "firstname",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "gender",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "entityid",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "image",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "internalid",
                                    join: "user"
                                })
                            ]
                    });
                    var myResultSet = customerSearchObj.run();
                    return myResultSet.getRange({
                        start: start,
                        end: 1
                    });
                }
                else if(name){
                    var customerSearchObj = search.create({
                        type: "customer",
                        filters:
                            [
                                ["stage","anyof","CUSTOMER"],
                                "AND",
                                ["altname","contains",name],
                                // ["user.firstname","contains",name],
                                // "OR",
                                // ["lastname","contains",name]
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "entityid",
                                    sort: search.Sort.ASC
                                }),
                                "altname",
                                "email",
                                "phone",
                                "altphone",
                                "fax",
                                "contact",
                                "altemail",
                                "custentity_leaddestinationcountry",
                                "custentity_4599_sg_uen",
                                "custentity_my_brn",
                                search.createColumn({
                                    name: "accountnumber",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "altemail",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "city",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "country",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "countrycode",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "datecreated",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "isdefaultbilling",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "isdefaultshipping",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "department",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "externalid",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "firstname",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "gender",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "entityid",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "image",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "internalid",
                                    join: "user"
                                })
                            ]
                    });

                    var totalcount = 0;

                    customerSearchObj.run().each(function(result){
                        totalcount +=1;
                        return true;
                    });

                    var myResultSet = customerSearchObj.run();
                    return myResultSet.getRange({
                        start: start,
                        end: totalcount
                    });
                }
                else {
                    var customerSearchObj = search.create({
                        type: "customer",
                        filters:
                            [
                            ],
                        columns:
                            [
                                search.createColumn({
                                    name: "entityid",
                                    sort: search.Sort.ASC
                                }),
                                "altname",
                                "email",
                                "phone",
                                "altphone",
                                "fax",
                                "contact",
                                "altemail",
                                "custentity_leaddestinationcountry",
                                "custentity_4599_sg_uen",
                                "custentity_my_brn",
                                search.createColumn({
                                    name: "accountnumber",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "altemail",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "city",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "country",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "countrycode",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "datecreated",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "isdefaultbilling",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "isdefaultshipping",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "department",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "externalid",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "firstname",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "gender",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "entityid",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "image",
                                    join: "user"
                                }),
                                search.createColumn({
                                    name: "internalid",
                                    join: "user"
                                })
                            ]
                    });
                    var myResultSet = customerSearchObj.run();
                    return myResultSet.getRange({
                        start: start,
                        end: end
                    });
                }
            } catch (err) {
                return [
                    {
                        status: 'error',
                        msg: "Sorry customer not found!",
                        err: err.message
                    }
                ];
            }
        }

        return {
            get: getCustomers,
            //delete: delete,
        };
    }
);
