sap.ui.define([
	"RevenueReport/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"jquery.sap.global",
    "sap/viz/ui5/data/FlattenedDataset",
	"../model/CustomerFormat"
], function(BaseController, History, JSONModel, jQuery, FlattenedDataset, CustomerFormat) {
	"use strict";

	return BaseController.extend("RevenueReport.controller.MaterialbyCountry", {
				dataPath : "model/",
	        
		        settingsModel : {
		            dataset : {
		                name: "Dataset",
		                defaultSelected : 2,
		                values : [{
		                    name : "Large",
		                    value : "/MaterialbyCountryChart.json"
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
					
					var otblMain=this.getView().byId("tblMaterialbyCountry");
					var oModel = new JSONModel("model/MaterialbyCountry.json");
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
		                    text: 'Material by Ship To Country'
		                }
	            	});
	            
		            var dataModel = new JSONModel(this.dataPath + "/MaterialbyCountryChart.json");
		            oVizFrame.setModel(dataModel);
		           
		            var oPopOver = this.getView().byId("idPopOver");
		            oPopOver.connect(oVizFrame.getVizUid());
		            oPopOver.setFormatString(CustomerFormat.FIORI_LABEL_FORMAT_2);	
		            
		            //this.getRouter().getRoute("MaterialbyCountry").attachPatternMatched(this._onObjectMatched, this);
						// Store original busy indicator delay, so it can be restored later on
						
					//this.setModel(oViewModel, "materialbycountryView");
					
					
					//this.setModel(oModel, "materialbycountryView");
				
			},
			
			_onObjectMatched: function(oEvent) {
				// var sObjectPath	 = "/Level2(" + oEvent.getParameter("arguments").H2Text + ")";
				// 	this._bindView(sObjectPath);
				// 	this.path =  oEvent.getParameter("arguments").H2Text;	
			},
			
			onNavBack: function() {
				this.getRouter().navTo("Main");
			},
			
			_bindView: function(sObjectPath) {
				var oViewModel = this.getModel("materialbycountryView"),
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
			}
		/*	_onBindingChange: function(oEvent) {
				var oView = this.getView(),
					oViewModel = this.getModel("materialbycountryView");
	
				var oResourceBundle = this.getResourceBundle(),
					oObject = oView.getBindingContext().getObject(),
					sId = oObject.ID;
					//sType = oObject.Type;

			}*/
	
	});

});