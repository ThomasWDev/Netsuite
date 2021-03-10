/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */
define([
		'N/https',
		'N/record',
		'N/search',
		'N/ui/serverWidget',
		'N/log',
		'N/file',
		'./moment.js'],
	function (https, record, search, serverWidget, log, file, moment) {

		function getfile(fileid) {
			var cabinatefile = file.load({
				id: fileid
			});

			return {
				"id": cabinatefile.id,
				"name": cabinatefile.name,
				"path": cabinatefile.path,
				"url": cabinatefile.url,
			}

		}

		function getSubItemType(divisiontype) {
			var subItemsType = {
				oh: {
					'pcr': 209,
					'pnr': 503,
					'psr': 639,
				},
				liquidation: {
					'pcr': 207,
					'pnr': 504,
					'psr': 640,
				},
				claims: {
					'pcr': 206,
					'pnr': 501,
					'psr': 641,
				},
				moisture: {
					'pcr': 211,
					'pnr': 500,
					'psr': 642,
				},
				trapping: {
					'pcr': 210,
					'pnr': 537,
					'psr': 644,
				},
				trucking: {
					'pcr': 208,
					'pnr': 499,
					'psr': 643,
				},
			};
			if (divisiontype === 'pcr') {
				return {
					oh: subItemsType.oh.pcr,
					liquidation: subItemsType.liquidation.pcr,
					claims: subItemsType.claims.pcr,
					moisture: subItemsType.moisture.pcr,
					trapping: subItemsType.trapping.pcr,
					trucking: subItemsType.trucking.pcr,
				}
			}
			else if (divisiontype === 'pnr') {
				return {
					oh: subItemsType.oh.pnr,
					liquidation: subItemsType.liquidation.pnr,
					claims: subItemsType.claims.pnr,
					moisture: subItemsType.moisture.pnr,
					trapping: subItemsType.trapping.pnr,
					trucking: subItemsType.trucking.pnr,
				}
			}
			else if (divisiontype === 'psr') {
				return {
					oh: subItemsType.oh.psr,
					liquidation: subItemsType.liquidation.psr,
					claims: subItemsType.claims.psr,
					moisture: subItemsType.moisture.psr,
					trapping: subItemsType.trapping.psr,
					trucking: subItemsType.trucking.psr,
				}
			}
			else {
				return false
			}

		}

		// get division type
		function getdivisiontype(id) {
			var pcr = [5, 6, 13]; // department ids for pcr
			var pnr = [7, 11, 14]; // department ids for pnr
			var psr = [15, 16, 17]; // department ids for psr

			if (pcr.indexOf(id) > -1){
				return 'pcr';
			}
			else if (pnr.indexOf(id) > -1){
				return 'pnr';
			}
			else if (psr.indexOf(id) > -1){
				return 'psr';
			}
			else {
				return false;
			}
		}

		function getStacks(datain) {
			var id = datain.id;
			var division = datain.division;
			var itemname = datain.itemname;
			var item = datain.item;
			var start = datain.start ? datain.start : 0;
			var end = datain.end ? datain.end : 100;

			try {
				if (id) {

					// var file1 = theitem.custitemnumber_qap_stack_image_01[0] && getfile(theitem.custitemnumber_qap_stack_image_01[0].value);
					// var file2 = theitem.custitemnumber_qap_stack_image_02[0] && getfile(theitem.custitemnumber_qap_stack_image_02[0].value);
					// var file3 = theitem.custitemnumber_qap_stack_image_03[0] && getfile(theitem.custitemnumber_qap_stack_image_03[0].value);
					// var file4 = theitem.custitemnumber_qap_stack_image_04[0] && getfile(theitem.custitemnumber_qap_stack_image_04[0].value);
					// theitem.custitemnumber_qap_stack_image_01 = file1;
					// theitem.custitemnumber_qap_stack_image_02 = file2;
					// theitem.custitemnumber_qap_stack_image_03 = file3;
					// theitem.custitemnumber_qap_stack_image_04 = file4;

					var inventorynumberSearchObj = search.create({
						type: "inventorynumber",
						filters:
							[
								["internalid", "is", id],
								// 'AND',
								// ["item.name","doesnotstartwith","**"],
								// "AND",
								// ["item.name","doesnotcontain","test"],
								// "AND",
								// ["item.name","doesnotcontain","KO"]
							],
						columns:
							[
								"inventorynumber",
								"internalid",
								"item",
								"custitemnumber_item_gd",
								"memo",
								"expirationdate",
								"location",
								"quantityonhand",
								"quantityavailable",
								"quantityonorder",
								"isonhand",
								"quantityintransit",
								"custitemnumber_grower_pmt_terms_gd",
								"custitemnumber_qap_stack_image_01",
								"custitemnumber_qap_stack_image_02",
								"custitemnumber_qap_stack_image_03",
								"custitemnumber_qap_stack_image_04",
								"custitemnumber_purchase_price",
								"custitemnumber_payment_terms_gd",
								"custitemnumberpo_number_gd",
								"custitemnumber_tbl_notes",
								"custitemnumbergrower_gd",
								"custitemnumber_gco_texture_gd",
								"custitemnumber_gco_color_gd",
								"custitemnumber_gcd_leaf_gd",
								"custitemnumber_bale_count_gd",
								"custitemnumber_gps_gd",
								"custitemnumber_tbl_balesize",
								"custitemnumber_stack_year_gd",
								"custitemnumber_tbl_grade",
								"custitemnumber_tbl_cutting",
								"custitemnumber_estimate",
								"custitemnumber_gco_characteristics_gd",
								"custitemnumber_gco_origin_gd",
								"custitemnumber_tbl_deliver_price",
								"custitemnumber_tbl_overhead",
								"custitemnumber_tbl_division",
								"custitemnumber_gco_stem_gd",
								"custitemnumber_grower_stack_number_gd",
								"custitemnumber_moisture_purchase_gd",
								"custitemnumber_moisture_reserve_gd",
								"custitemnumber_claim_reserve",
								"custitemnumber_tarping_storage_reserve_gd"	,
								"custitemnumber_inbound_trucking_reserve_gd",
								"custitemnumber_tbl_active",
								"custitemnumber_dom_liquid_gd",
								"custitemnumber_oh_reserve_gd"
							]
					});

					var myResultSet = inventorynumberSearchObj.run();

					var result = myResultSet.getRange({
						start: 0,
						end: 1
					});

					// var file1id = result[0].getValue("custitemnumber_qap_stack_image_01");
					// var newResult = result[0];
					//
					// var mergeRecord = record.load({
					// 	type: 'inventorynumber',
					// 	id: id,
					// 	isDynamic: true
					// });
					//
					// mergeRecord.custitemnumber_qap_stack_image_01 = getfile(file1id);

					// newResult.values.stackimage = getfile(file1id);
					return result;
				}
				else if(division && itemname) {
					var inventorynumberSearchObj = search.create({
						type: "inventorynumber",
						filters:
							[
								["custitemnumber_tbl_division", "is", division],
								'AND',
								["item.name","haskeywords", itemname],
								// 'AND',
								// ["item.name","doesnotstartwith","**"],
								// "AND",
								// ["item.name","doesnotcontain","test"],
								// "AND",
								// ["item.name","doesnotcontain","KO"]
							],
						columns:
							[
								search.createColumn({
									name: "internalid",
									sort: search.Sort.DESC
								}),
								"inventorynumber",
								"item",
								"custitemnumber_item_gd",
								"memo",
								"expirationdate",
								"location",
								"quantityonhand",
								"quantityavailable",
								"quantityonorder",
								"isonhand",
								"quantityintransit",
								"custitemnumber_grower_pmt_terms_gd",
								"custitemnumber_qap_stack_image_01",
								"custitemnumber_qap_stack_image_02",
								"custitemnumber_qap_stack_image_03",
								"custitemnumber_qap_stack_image_04",
								"custitemnumber_purchase_price",
								"custitemnumber_payment_terms_gd",
								"custitemnumberpo_number_gd",
								"custitemnumber_tbl_notes",
								"custitemnumbergrower_gd",
								"custitemnumber_gco_texture_gd",
								"custitemnumber_gco_color_gd",
								"custitemnumber_gcd_leaf_gd",
								"custitemnumber_bale_count_gd",
								"custitemnumber_gps_gd",
								"custitemnumber_tbl_balesize",
								"custitemnumber_stack_year_gd",
								"custitemnumber_tbl_grade",
								"custitemnumber_tbl_cutting",
								"custitemnumber_estimate",
								"custitemnumber_gco_characteristics_gd",
								"custitemnumber_gco_origin_gd",
								"custitemnumber_tbl_deliver_price",
								"custitemnumber_tbl_overhead",
								"custitemnumber_tbl_division",
								"custitemnumber_gco_stem_gd",
								"custitemnumber_grower_stack_number_gd",
								"custitemnumber_moisture_purchase_gd",
								"custitemnumber_moisture_reserve_gd",
								"custitemnumber_claim_reserve",
								"custitemnumber_tarping_storage_reserve_gd"	,
								"custitemnumber_inbound_trucking_reserve_gd",
								"custitemnumber_tbl_active",
								"custitemnumber_dom_liquid_gd",
								"custitemnumber_oh_reserve_gd"
							]
					});
					var stackObjects = inventorynumberSearchObj.run();
					return stackObjects.getRange({
						start: start,
						end: end
					});
				}
				else if(division && item) {
					var inventorynumberSearchObj = search.create({
						type: "inventorynumber",
						filters:
							[
								["custitemnumber_tbl_division","anyof",division],
								"AND",
								["custitemnumber_item_gd","anyof",item],
								// 'AND',
								// ["item.name","doesnotstartwith","**"],
								// "AND",
								// ["item.name","doesnotcontain","test"],
								// "AND",
								// ["item.name","doesnotcontain","KO"]
							],
						columns:
							[
								search.createColumn({
									name: "internalid",
									sort: search.Sort.DESC
								}),
								"inventorynumber",
								"item",
								"custitemnumber_item_gd",
								"memo",
								"expirationdate",
								"location",
								"quantityonhand",
								"quantityavailable",
								"quantityonorder",
								"isonhand",
								"quantityintransit",
								"custitemnumber_grower_pmt_terms_gd",
								"custitemnumber_qap_stack_image_01",
								"custitemnumber_qap_stack_image_02",
								"custitemnumber_qap_stack_image_03",
								"custitemnumber_qap_stack_image_04",
								"custitemnumber_purchase_price",
								"custitemnumber_payment_terms_gd",
								"custitemnumberpo_number_gd",
								"custitemnumber_tbl_notes",
								"custitemnumbergrower_gd",
								"custitemnumber_gco_texture_gd",
								"custitemnumber_gco_color_gd",
								"custitemnumber_gcd_leaf_gd",
								"custitemnumber_bale_count_gd",
								"custitemnumber_gps_gd",
								"custitemnumber_tbl_balesize",
								"custitemnumber_stack_year_gd",
								"custitemnumber_tbl_grade",
								"custitemnumber_tbl_cutting",
								"custitemnumber_estimate",
								"custitemnumber_gco_characteristics_gd",
								"custitemnumber_gco_origin_gd",
								"custitemnumber_tbl_deliver_price",
								"custitemnumber_tbl_overhead",
								"custitemnumber_tbl_division",
								"custitemnumber_gco_stem_gd",
								"custitemnumber_grower_stack_number_gd",
								"custitemnumber_moisture_purchase_gd",
								"custitemnumber_moisture_reserve_gd",
								"custitemnumber_claim_reserve",
								"custitemnumber_tarping_storage_reserve_gd"	,
								"custitemnumber_inbound_trucking_reserve_gd",
								"custitemnumber_tbl_active",
								"custitemnumber_dom_liquid_gd",
								"custitemnumber_oh_reserve_gd"
							]
					});
					var stackObjects = inventorynumberSearchObj.run();
					return stackObjects.getRange({
						start: start,
						end: end
					});
				}
				else {
					var inventorynumberSearchObj = search.create({
						type: "inventorynumber",
						filters:
							[
								// ["item.name","doesnotstartwith","**"],
								// "AND",
								// ["item.name","doesnotcontain","test"],
								// "AND",
								// ["item.name","doesnotcontain","KO"]
							],
						columns:
							[
								search.createColumn({
									name: "internalid",
									sort: search.Sort.DESC
								}),
								"inventorynumber",
								"item",
								"custitemnumber_item_gd",
								"memo",
								"expirationdate",
								"location",
								"quantityonhand",
								"quantityavailable",
								"quantityonorder",
								"isonhand",
								"quantityintransit",
								"custitemnumber_grower_pmt_terms_gd",
								"custitemnumber_qap_stack_image_01",
								"custitemnumber_qap_stack_image_02",
								"custitemnumber_qap_stack_image_03",
								"custitemnumber_qap_stack_image_04",
								"custitemnumber_purchase_price",
								"custitemnumber_payment_terms_gd",
								"custitemnumberpo_number_gd",
								"custitemnumber_tbl_notes",
								"custitemnumbergrower_gd",
								"custitemnumber_gco_texture_gd",
								"custitemnumber_gco_color_gd",
								"custitemnumber_gcd_leaf_gd",
								"custitemnumber_bale_count_gd",
								"custitemnumber_gps_gd",
								"custitemnumber_tbl_balesize",
								"custitemnumber_stack_year_gd",
								"custitemnumber_tbl_grade",
								"custitemnumber_tbl_cutting",
								"custitemnumber_estimate",
								"custitemnumber_gco_characteristics_gd",
								"custitemnumber_gco_origin_gd",
								"custitemnumber_tbl_deliver_price",
								"custitemnumber_tbl_overhead",
								"custitemnumber_tbl_division",
								"custitemnumber_gco_stem_gd",
								"custitemnumber_grower_stack_number_gd",
								"custitemnumber_moisture_purchase_gd",
								"custitemnumber_moisture_reserve_gd",
								"custitemnumber_claim_reserve",
								"custitemnumber_tarping_storage_reserve_gd",
								"custitemnumber_inbound_trucking_reserve_gd",
								"custitemnumber_tbl_active",
								"custitemnumber_dom_liquid_gd",
								"custitemnumber_oh_reserve_gd"
							]
					});
					var stackObjects = inventorynumberSearchObj.run();
					return stackObjects.getRange({
						start: start,
						end: end
					});
				}

			} catch (err) {
				log.audit({
					title: 'GET Stacks',
					details: JSON.stringify(err)
				});

				return err;
			}
		}

		function addLineItem(poRecord, line, value) {
			// set line item
			poRecord.setSublistValue({
				sublistId: 'item',
				fieldId: 'item',
				line: line,
				value: value.itemid // this will be the item id
			});

			// set line item quantity
			poRecord.setSublistValue({
				sublistId: 'item',
				fieldId: 'quantity',
				line: line,
				value: value.quantity
			});

			// set line item amount
			poRecord.setSublistValue({
				sublistId: 'item',
				fieldId: 'amount',
				line: line,
				value: value.amount
			});

			// set line item rate
			poRecord.setSublistValue({
				sublistId: 'item',
				fieldId: 'rate',
				line: line,
				value: value.rate
			});

			// set line item division
			poRecord.setSublistValue({
				sublistId: 'item',
				fieldId: 'department',
				line: line,
				value: value.department
			});

			// set line item location
			poRecord.setSublistValue({
				sublistId: 'item',
				fieldId: 'location',
				line: line,
				value: value.location
			});
		}

		function createStack(request) {

			try {

				var poRecord = record.create({
					type: 'purchaseorder',
				});

				poRecord.setValue('entity', request.custitemnumbergrower_gd);
				poRecord.setValue('department', request.custitemnumber_tbl_division);
				poRecord.setValue('location', request.custitemnumber_tbl_location);
				poRecord.setValue('memo', request.inventorynumber);
				poRecord.setValue('custbody16', request.custitemnumber_purchase_price);

				// line item start
				// poRecord.setSublistValue({
				// 	sublistId: 'item',
				// 	fieldId: 'item',
				// 	line: 0,
				// 	value: request.itemid // this will be the item id
				// });
				//
				// poRecord.setSublistValue({
				// 	sublistId: 'item',
				// 	fieldId: 'quantity',
				// 	line: 0,
				// 	value: request.quantity
				// });
				//
				// poRecord.setSublistValue({
				// 	sublistId: 'item',
				// 	fieldId: 'amount',
				// 	line: 0,
				// 	value: parseFloat(request.quantity) * parseFloat(request.custitemnumber_purchase_price)
				// });
				//
				// poRecord.setSublistValue({
				// 	sublistId: 'item',
				// 	fieldId: 'rate',
				// 	line: 0,
				// 	value: request.custitemnumber_purchase_price
				// });
				// line item end
				// O/H, Moisture are item need to increase line: 0, and the value param with the line item id

				// add all line items

				addLineItem(poRecord, 0, {
					itemid: request.itemid,
					quantity: request.quantity,
					amount: parseFloat(request.quantity) * parseFloat(request.custitemnumber_purchase_price),
					rate: request.custitemnumber_purchase_price,
					department: request.custitemnumber_tbl_division,
					location: request.custitemnumber_tbl_location,
				});

				// create others line items
				var divisionType = getdivisiontype(request.custitemnumber_tbl_division);
				if (divisionType) {
					var lineitems = getSubItemType(divisionType);
					if (lineitems) {

						// add O/H reserve
						addLineItem(poRecord, 1, {
							itemid: lineitems.oh,
							quantity: request.quantity,
							amount: parseFloat(request.quantity) * parseFloat(request.custitemnumber_oh_reserve_gd),
							rate: request.custitemnumber_oh_reserve_gd,
							department: request.custitemnumber_tbl_division,
							location: request.custitemnumber_tbl_location,
						});

						// add Domestic Liquidation Reserve
						addLineItem(poRecord, 2, {
							itemid: lineitems.liquidation,
							quantity: request.quantity,
							amount: parseFloat(request.quantity) * parseFloat(request.custitemnumber_dom_liquid_gd),
							rate: request.custitemnumber_dom_liquid_gd,
							department: request.custitemnumber_tbl_division,
							location: request.custitemnumber_tbl_location,
						});

						// add Claims Reserve
						addLineItem(poRecord, 3, {
							itemid: lineitems.claims,
							quantity: request.quantity,
							amount: parseFloat(request.quantity) * parseFloat(request.custitemnumber_claim_reserve),
							rate: request.custitemnumber_claim_reserve,
							department: request.custitemnumber_tbl_division,
							location: request.custitemnumber_tbl_location,
						});

						// add Moisture Reserve
						addLineItem(poRecord, 4, {
							itemid: lineitems.moisture,
							quantity: request.quantity,
							amount: parseFloat(request.quantity) * parseFloat(request.custitemnumber_moisture_reserve_gd),
							rate: request.custitemnumber_moisture_reserve_gd,
							department: request.custitemnumber_tbl_division,
							location: request.custitemnumber_tbl_location,
						});

						// add Trapping and storage Reserve
						addLineItem(poRecord, 5, {
							itemid: lineitems.trapping,
							quantity: request.quantity,
							amount: parseFloat(request.quantity) * parseFloat(request.custitemnumber_tarping_storage_reserve_gd),
							rate: request.custitemnumber_tarping_storage_reserve_gd,
							department: request.custitemnumber_tbl_division,
							location: request.custitemnumber_tbl_location,
						});

						// add Inbound Trucking Reserve
						addLineItem(poRecord, 6, {
							itemid: lineitems.trucking,
							quantity: request.quantity,
							amount: parseFloat(request.quantity) * parseFloat(request.custitemnumber_inbound_trucking_reserve_gd),
							rate: request.custitemnumber_inbound_trucking_reserve_gd,
							department: request.custitemnumber_tbl_division,
							location: request.custitemnumber_tbl_location,
						});
					}
				}

				var inventoryDetail = poRecord.getSublistSubrecord({
					sublistId: 'item',
					fieldId: 'inventorydetail',
					line: 0
				});

				log.debug('Inventory Detail Subrecord', inventoryDetail);

				inventoryDetail.setSublistValue({
					sublistId: 'inventoryassignment',
					fieldId: 'receiptinventorynumber',
					line: 0,
					value: request.inventorynumber
				});

				inventoryDetail.setSublistValue({
					sublistId: 'inventoryassignment',
					fieldId: 'quantity',
					line: 0,
					value: request.quantity
				});

				var recordID = poRecord.save();

				log.debug('Record ID', recordID);

				var transactionSearchObj = search.create({
					type: "purchaseorder",
					filters: [
						["internalid", "anyof", recordID],
						"AND",
						["mainline", "is", "F"],
						"AND",
						["taxline", "is", "F"],
						"AND",
						["shipping", "is", "F"],
						"AND",
						["item", "anyof", request.itemid]
					],
					columns: [
						search.createColumn({
							name: "internalid",
							join: "itemNumber"
						})
					]
				});

				var itemNumberID;

				transactionSearchObj.run().each(function(result) {
					log.debug('Search Result', result);
					itemNumberID = result.getValue({
						name: 'internalid',
						join: 'itemNumber'
					});
					return false;
				});

				record.submitFields({
					type: 'inventorynumber',
					id: itemNumberID,
					values: {
						memo: request.memo,
						units: request.units ? request.units : "ST",
						custitemnumberpo_number_gd: recordID,
						custitemnumber_item_gd: request.custitemnumber_item_gd,
						custitemnumbergrower_gd: request.custitemnumbergrower_gd,
						expirationdate: request.expirationdate ? new Date(request.expirationdate) : new Date(),
						custitemnumber_bale_count_gd: request.custitemnumber_bale_count_gd,
						custitemnumber_tbl_balesize: request.custitemnumber_tbl_balesize,
						custitemnumber_estimate: request.custitemnumber_estimate,
						custitemnumber_tbl_cutting: request.custitemnumber_tbl_cutting,
						custitemnumber_gco_color_gd: request.custitemnumber_gco_color_gd,
						custitemnumber_gcd_leaf_gd: request.custitemnumber_gcd_leaf_gd,
						custitemnumber_gco_texture_gd: request.custitemnumber_gco_texture_gd,
						custitemnumber_purchase_price: request.custitemnumber_purchase_price,
						custitemnumber_tbl_division: request.custitemnumber_tbl_division,
						custitemnumber_qap_stack_image_01: request.custitemnumber_qap_stack_image_01,
						custitemnumber_qap_stack_image_02: request.custitemnumber_qap_stack_image_02,
						custitemnumber_qap_stack_image_03: request.custitemnumber_qap_stack_image_03,
						custitemnumber_qap_stack_image_04: request.custitemnumber_qap_stack_image_04,
						custitemnumber_gps_gd: request.custitemnumber_gps_gd,
						custitemnumber_tbl_notes: request.custitemnumber_tbl_notes,
						custitemnumber_grower_pmt_terms_gd: request.custitemnumber_grower_pmt_terms_gd,
						custitemnumber_gco_characteristics_gd: request.custitemnumber_gco_characteristics_gd,
						custitemnumber_tbl_grade: request.custitemnumber_tbl_grade,
						custitemnumber_oh_reserve_gd: request.custitemnumber_oh_reserve_gd,
						custitemnumber_gco_origin_gd: request.custitemnumber_gco_origin_gd,
						custitemnumber_stack_year_gd: request.custitemnumber_stack_year_gd,
						custitemnumber_gco_stem_gd: request.custitemnumber_gco_stem_gd,
						custitemnumber_grower_stack_number_gd: request.custitemnumber_grower_stack_number_gd,
						custitemnumber_moisture_purchase_gd: request.custitemnumber_moisture_purchase_gd,
						custitemnumber_moisture_reserve_gd: request.custitemnumber_moisture_reserve_gd,
						custitemnumber_claim_reserve: request.custitemnumber_claim_reserve,
						custitemnumber_tarping_storage_reserve_gd: request.custitemnumber_tarping_storage_reserve_gd,
						custitemnumber_inbound_trucking_reserve_gd: request.custitemnumber_inbound_trucking_reserve_gd,
						custitemnumber_tbl_active: request.custitemnumber_tbl_active,
						custitemnumber_dom_liquid_gd: request.custitemnumber_dom_liquid_gd,
					}
				});

				if (request.responsetype && request.responsetype === 'json'){
					return [
						{
							success: true,
							poid: recordID,
							inventoryid: itemNumberID
						}
					];
				}
				else {
					return JSON.stringify({
						poid: recordID,
						inventoryid: itemNumberID
					});
				}
			} catch (e) {
				log.error('Error', e.message);
				return JSON.stringify(e);
			}
		}

		// update line items
		function updateLineItem(poRecord, line, value) {
			// set line item
			poRecord.selectLine({
				sublistId: 'item',
				line: line,
			});
			poRecord.setCurrentSublistValue({
				sublistId: 'item',
				fieldId: 'item',
				line: line,
				value: value.itemid // this will be the item id
			});

			// set line item quantity
			poRecord.setCurrentSublistValue({
				sublistId: 'item',
				fieldId: 'quantity',
				line: line,
				value: value.quantity
			});

			// set line item amount
			poRecord.setCurrentSublistValue({
				sublistId: 'item',
				fieldId: 'amount',
				line: line,
				value: value.amount
			});

			// set line item rate
			poRecord.setCurrentSublistValue({
				sublistId: 'item',
				fieldId: 'rate',
				line: line,
				value: value.rate
			});

			// set line item division
			poRecord.setCurrentSublistValue({
				sublistId: 'item',
				fieldId: 'department',
				line: line,
				value: value.department
			});

			// set line item location
			poRecord.setCurrentSublistValue({
				sublistId: 'item',
				fieldId: 'location',
				line: line,
				value: value.location
			});
			poRecord.commitLine({
				"sublistId": "item"
			});
		}

		// update PO
		function updatePO(request) {
			var lotid = request.lotid;
			var stackData = request.stackdata;
			var poId = request.poid && request.poid;
			var itemrecord = record.load({
				type: 'inventorynumber',
				id: lotid,
				isDynamic: true,
			});

			// memo will be in the stack number
			//

			// var poRecord = record.load({
			// 	type: 'purchaseorder',
			// 	id: poId,
			// 	isDynamic: true,
			// });
			// //
			// // var transactionSearchObj = search.create({
			// // 	type: "purchaseorder",
			// // 	filters: [
			// // 		["internalid", "anyof", poId],
			// // 		"AND",
			// // 		["mainline", "is", "F"],
			// // 		"AND",
			// // 		["taxline", "is", "F"],
			// // 		"AND",
			// // 		["shipping", "is", "F"],
			// // 		"AND",
			// // 		["item", "anyof", request.stackdata.itemid]
			// // 	],
			// // 	columns: [
			// // 		search.createColumn({
			// // 			name: "internalid",
			// // 			join: "itemNumber"
			// // 		})
			// // 	]
			// // });
			// //
			// // var itemNumberID;
			// //
			// // transactionSearchObj.run().each(function(result) {
			// // 	log.debug('Search Result', result);
			// // 	itemNumberID = result.getValue({
			// // 		name: 'internalid',
			// // 		join: 'itemNumber'
			// // 	});
			// // 	return false;
			// // });
			// //
			// poRecord.setValue('entity', stackData.custitemnumbergrower_gd);
			// poRecord.setValue('department', stackData.custitemnumber_tbl_division);
			// poRecord.setValue('location', stackData.custitemnumber_tbl_location);
			// poRecord.setValue('memo', stackData.memo);
			// poRecord.setValue('custbody16', stackData.custitemnumber_purchase_price);
			//
			//
			// // update all line items
			// updateLineItem(poRecord, 0, {
			// 	itemid: stackData.itemid,
			// 	quantity: stackData.quantity,
			// 	amount: parseFloat(stackData.quantity) * parseFloat(stackData.custitemnumber_purchase_price),
			// 	rate: stackData.custitemnumber_purchase_price,
			// 	department: stackData.custitemnumber_tbl_division,
			// 	location: stackData.custitemnumber_tbl_location,
			// });
			//
			// // update O/H reserve
			// updateLineItem(poRecord, 1, {
			// 	itemid: 209,
			// 	quantity: stackData.quantity,
			// 	amount: parseFloat(stackData.quantity) * parseFloat(stackData.custitemnumber_oh_reserve_gd),
			// 	rate: stackData.custitemnumber_oh_reserve_gd,
			// 	department: stackData.custitemnumber_tbl_division,
			// 	location: stackData.custitemnumber_tbl_location,
			// });
			//
			// // update Domestic Liquidation Reserve
			// updateLineItem(poRecord, 2, {
			// 	itemid: 207,
			// 	quantity: stackData.quantity,
			// 	amount: parseFloat(stackData.quantity) * parseFloat(stackData.custitemnumber_dom_liquid_gd),
			// 	rate: stackData.custitemnumber_dom_liquid_gd,
			// 	department: stackData.custitemnumber_tbl_division,
			// 	location: stackData.custitemnumber_tbl_location,
			// });
			//
			// // update Claims Reserve
			// updateLineItem(poRecord, 3, {
			// 	itemid: 206,
			// 	quantity: stackData.quantity,
			// 	amount: parseFloat(stackData.quantity) * parseFloat(stackData.custitemnumber_claim_reserve),
			// 	rate: stackData.custitemnumber_claim_reserve,
			// 	department: stackData.custitemnumber_tbl_division,
			// 	location: stackData.custitemnumber_tbl_location,
			// });
			//
			// // update Moisture Reserve
			// updateLineItem(poRecord, 4, {
			// 	itemid: 211,
			// 	quantity: stackData.quantity,
			// 	amount: parseFloat(stackData.quantity) * parseFloat(stackData.custitemnumber_moisture_reserve_gd),
			// 	rate: stackData.custitemnumber_moisture_reserve_gd,
			// 	department: stackData.custitemnumber_tbl_division,
			// 	location: stackData.custitemnumber_tbl_location,
			// });
			//
			// // update Trapping and storage Reserve
			// updateLineItem(poRecord, 5, {
			// 	itemid: 210,
			// 	quantity: stackData.quantity,
			// 	amount: parseFloat(stackData.quantity) * parseFloat(stackData.custitemnumber_tarping_storage_reserve_gd),
			// 	rate: stackData.custitemnumber_tarping_storage_reserve_gd,
			// 	department: stackData.custitemnumber_tbl_division,
			// 	location: stackData.custitemnumber_tbl_location,
			// });
			//
			// // update Inbound Trucking Reserve
			// updateLineItem(poRecord, 6, {
			// 	itemid: 208,
			// 	quantity: stackData.quantity,
			// 	amount: parseFloat(stackData.quantity) * parseFloat(stackData.custitemnumber_inbound_trucking_reserve_gd),
			// 	rate: stackData.custitemnumber_inbound_trucking_reserve_gd,
			// 	department: stackData.custitemnumber_tbl_division,
			// 	location: stackData.custitemnumber_tbl_location,
			// });
			//
			// // poRecord.setValue({
			// // 	sublistId: 'inventoryassignment',
			// // 	fieldId: 'receiptinventorynumber',
			// // 	line: 0,
			// // 	value: stackData.inventorynumber
			// // });
			// // poRecord.setValue({
			// // 	sublistId: 'inventoryassignment',
			// // 	fieldId: 'quantity',
			// // 	line: 0,
			// // 	value: stackData.quantity
			// // });
			//
			// for (var key in stackData) {
			// 	if (stackData.hasOwnProperty(key)) {
			//
			// 		if (key === "expirationdate"){
			// 			itemrecord.setValue({
			// 				fieldId: key,
			// 				value: new Date(stackData[key])
			// 			});
			// 		}
			// 		else {
			// 			itemrecord.setValue({
			// 				fieldId: key,
			// 				value: stackData[key]
			// 			});
			// 		}
			// 	}
			// }
			//
			// try {
			// 	poRecord.save();
			// 	itemrecord.save({
			// 		ignoreMandatoryFields: false
			// 	});
			//
			// 	return [
			// 		{
			// 			success: true,
			// 			lotid: lotid,
			// 			message: "Stack successfully updated.",
			// 			stackData: stackData
			// 		}
			// 	];
			// } catch (e) {
			// 	return e;
			// }

			try {

				for (var key in stackData) {
					if (stackData.hasOwnProperty(key)) {

						if (key === "expirationdate"){
							itemrecord.setValue({
								fieldId: key,
								value: new Date(stackData[key])
							});
						}
						else {
							itemrecord.setValue({
								fieldId: key,
								value: stackData[key]
							});
						}
					}
				}

				itemrecord.save();
				return [
					{
						success: true,
						lotid: lotid,
						message: "Stack successfully updated.",
						stackData: stackData
					}
				];
			} catch (e) {
				return e;
			}
		}

		return {
			get: getStacks,
			post: createStack,
			put: updatePO,
			//delete: delete,
		};
	}
);
