sap.ui.define([
	"RevenueReport/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"jquery.sap.global",
    "sap/viz/ui5/data/FlattenedDataset",
	"../model/CustomerFormat"
], function(BaseController, History, JSONModel, jQuery, FlattenedDataset, CustomerFormat) {
	"use strict";

	return BaseController.extend("RevenueReport.controller.MaterialbyEndCustomer", {
			dataPath : "model/",
        
	        settingsModel : {
	            dataset : {
	                name: "Dataset",
	                defaultSelected : 2,
	                values : [{
	                    name : "Large",
	                    value : "/MaterialbyEndcustomerChart.json"
	                }]
	            },
	             
	            dataLabel : {
	                name : "Revenue",
	                defaultState : true
	            },
	            axisTitle : {
	                name : "Revenue",
	                defaultState : true
	            },
	            dimensions: {
	                Large: [{
	                    name: 'Month',
	                    value: "{Month}"
	                }]
	            },
	            measures: [{
	               name: 'Material01',
	               value: '{Material01}'
	            },{
	               name: 'Material02',
	               value: '{Material02}'
	            },{
	               name: 'Material03',
	               value: '{Material03}'
	            }]
	        },
        
        	oVizFrame : null,
			onInit: function() {
					
				var oViewModel;
				
				var otblMain=this.getView().byId("tblMaterialbyEndCustomer");
				var oModel = new JSONModel("model/MaterialbyEndCustomer.json");
				otblMain.setModel(oModel);
					
				oViewModel = new JSONModel(this.settingsModel);
        		oViewModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
            	
            	CustomerFormat.registerCustomFormat();
            	
            	var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            	oVizFrame.setVizProperties({
	                plotArea: {
	                    dataLabel: {
	                        formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
	                        visible: true
	                    }
	                },
	                valueAxis: {
	                    label: {
	                        formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
	                    },
	                    title: {
	                        visible: false
	                    }
	                },
	                categoryAxis: {
	                    title: {
	                        visible: true
	                    }
	                },
	                title: {
	                    visible: true,
	                    text: 'Material by End Customer'
	                }
            	});
            
	            var dataModel = new JSONModel(this.dataPath + "/MaterialbyEndcustomerChart.json");
	            oVizFrame.setModel(dataModel);
	           
	            var oPopOver = this.getView().byId("idPopOver");
	            oPopOver.connect(oVizFrame.getVizUid());
	            oPopOver.setFormatString(CustomerFormat.FIORI_LABEL_FORMAT_2);

				//	this.getRouter().getRoute("MaterialbyEndCustomer").attachPatternMatched(this._onObjectMatched, this);
					// Store original busy indicator delay, so it can be restored later on
					
				//	this.setModel(oViewModel, "materialbyEndCustomerView");
					
				
			},
			_onObjectMatched: function(oEvent) {
				// var sObjectPath	 = "/Level3(" + oEvent.getParameter("arguments").H3Text + ")";
				// 	this._bindView(sObjectPath);
				// this.backPath = oEvent.getParameter("arguments").BackId;	
			},
			
			onNavBack: function() {
				this.getRouter().navTo("Main");
			},
			
			_bindView: function(sObjectPath) {
				var oViewModel = this.getModel("materialbyendcustomerView"),
					oDataModel = this.getModel();
	
				this.getView().bindElement({
					path: sObjectPath,
					events: {
						change: this._onBindingChange.bind(this),
						dataRequested: function() {
							oDataModel.metadataLoaded().then(function() {
								// Busy indicator on view should only be set if metadata is loaded,
								// otherwise there may be two busy indications next to each other on the
								// screen. This happens because route matched handler already calls '_bindView'
								// while metadata is loaded.
								oViewModel.setProperty("/busy", true);
							});
						},
						dataReceived: function() {
							oViewModel.setProperty("/busy", false);
						}
					}
				});
			}/*,
			_onBindingChange: function(oEvent) {
				var oView = this.getView(),
					oViewModel = this.getModel("materialbyendcustomerView");
	
				var oResourceBundle = this.getResourceBundle(),
					oObject = oView.getBindingContext().getObject(),
					sId = oObject.ID;
					//sType = oObject.Type;

			},*/

	});

});