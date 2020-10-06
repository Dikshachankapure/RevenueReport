sap.ui.define([
	"RevenueReport/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"jquery.sap.global",
    "sap/viz/ui5/data/FlattenedDataset",
	"../model/CustomerFormat",
	"../model/InitPage",
	 "sap/m/MessageBox"
], function(BaseController, Filter, History, JSONModel, jQuery, FlattenedDataset, CustomerFormat, InitPageUtil, MessageBox) {
	"use strict";

	return BaseController.extend("RevenueReport.controller.Main", {
			
			dataPath : "model/",
        
	        STOCONModel : {
	            dataset : {
	                name: "Dataset",
	                defaultSelected : 2,
	                values : [{
	                    name : "Large",
	                    value : "/ShipToCountryChart.json"
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
	               name: 'Japan',
	               value: '{Japan}'
	            },{
	               name: 'China',
	               value: '{China}'
	            },{
	               name: 'India',
	               value: '{India}'
	            },{
	               name: 'Canada',
	               value: '{Canada}'
	            },{
	               name: 'UK',
	               value: '{UK}'
	            }]
	        },
        	
        	EndCustomerModel : {
	            dataset : {
	                name: "Dataset1",
	                defaultSelected : 2,
	                values : [{
	                    name : "Large",
	                    value : "/EndCustomerChart.json"
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
	               name: 'Customer 01',
	               value: '{Customer 01}'
	            },{
	               name: 'Customer 02',
	               value: '{Customer 02}'
	            },{
	               name: 'Customer 03',
	               value: '{Customer 03}'
	            },{
	               name: 'Customer 04',
	               value: '{Customer 04}'
	            },{
	               name: 'Customer 05',
	               value: '{Customer 05}'
	            }]
	            
	        },
        	oVizFrame : null,
        	oVizFrame1 : null,
        	oVizFrame2 : null,
        	oVizFrame3 : null,
			onInit: function () {
			
			},
			
			fnCompCodeSearchHelp: function(oEvent){
         		var companyCode = new JSONModel("model/CompanyCode.json");
				this.getView().setModel(companyCode);
				this.CompCodeinputId = oEvent.getSource().getId();
				if (!this._valueHelpDialogCompanyCode) {
						this._valueHelpDialogCompanyCode = sap.ui.xmlfragment(
							"RevenueReport.fragments.CompanyCode", this
						);
					this.getView().addDependent(this._valueHelpDialogCompanyCode);
				}
					// open value help dialog filtered by the input value
				this._valueHelpDialogCompanyCode.open();
	        },
	        		
        	fnCloseDialogCompCode:function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
					if (oSelectedItem) {
						var compCodeInput = this.getView().byId(this.CompCodeinputId);
						compCodeInput.setSelectedKey(oSelectedItem.getDescription());
					}
				oEvent.getSource().getBinding("items").filter([]);
		
				this._valueHelpDialogCompanyCode.destroy(true);
				this._valueHelpDialogCompanyCode =  false;
			},
				
			fnCancelDialogCompCode:function() {
				this._valueHelpDialogCompanyCode.destroy(true);
				this._valueHelpDialogCompanyCode =  false;
			},
			
			fnhandleSearchCompCode: function(oEvent) {
				var sValue = oEvent.getParameter("value");
				var oFilter = new Filter("Butxt", sap.ui.model.FilterOperator.Contains,sValue);
				var oBinding = oEvent.getSource().getBinding("items");
				oBinding.filter([oFilter]);
			},

			suggestionItemSelected:function() {
				
			},
			
			fnCurrTypeSearchHelp: function(oEvent){
				
				var currencyType = new JSONModel("model/CurrencyType.json");
				this.getView().setModel(currencyType);
         		
				this.CurrTypeinputId = oEvent.getSource().getId();
				if (!this._valueHelpDialogCurrencyType) {
						this._valueHelpDialogCurrencyType = sap.ui.xmlfragment(
							"RevenueReport.fragments.CurrencyType", this
						);
					this.getView().addDependent(this._valueHelpDialogCurrencyType);
				}
				
				// open value help dialog filtered by the input value
				this._valueHelpDialogCurrencyType.open();
	        },
	        		
        	fnCloseDialogCurrType:function(oEvent) {
				var oSelectedItem = oEvent.getParameter("selectedItem");
					if (oSelectedItem) {
						var currTypeInput = this.getView().byId(this.CurrTypeinputId);
						currTypeInput.setSelectedKey(oSelectedItem.getDescription());
					}
				oEvent.getSource().getBinding("items").filter([]);
		
				this._valueHelpDialogCurrencyType.destroy(true);
				this._valueHelpDialogCurrencyType =  false;
			},
				
			fnCancelDialogCurrType:function() {
				this._valueHelpDialogCurrencyType.destroy(true);
				this._valueHelpDialogCurrencyType =  false;
			},
			
			handleSearchCurrType: function(oEvent) {
				var sCurrTypeValue = oEvent.getParameter("value");
				var oFilter = new Filter("Ddtext", sap.ui.model.FilterOperator.Contains,sCurrTypeValue);
				var oBinding = oEvent.getSource().getBinding("items");
				oBinding.filter([oFilter]);
			},
			
			fnSelectAmount:function() {
				var lbluom= this.getView().byId("lbluom");
				var txtuom= this.getView().byId("txtuom");
				lbluom.setVisible(false);
				txtuom.setVisible(false);
			},
			
			fnSelectQty:function() {
				var lbluom= this.getView().byId("lbluom");
				var txtuom= this.getView().byId("txtuom");
				lbluom.setVisible(true);
				txtuom.setVisible(true);
			},
			onExit: function () {
				this._valueHelpDialogCurrencyType.destroy(true);
				this._valueHelpDialogCurrencyType =  false;
			},
			
			radiobuttonselect: function(oEvent) {
				this.oSelectedIndex = oEvent.getParameter("selectedIndex"); 
			},
			
			radiobuttonselect1: function(oEvent) {
				this.oSelectedIndex1 = oEvent.getParameter("selectedIndex"); 
			},
			
			onPressShipToCountry: function(oEvent) {
				this._showObjectShipToCountry(oEvent.getSource());
			},
			
			_showObjectShipToCountry: function(oItem) {
				this.getRouter().navTo("MaterialbyCountry");
			},
			
			onPressEndCustomer: function(oEvent) {
				this._showObjectEndCustomer(oEvent.getSource());
			},
			
			_showObjectEndCustomer: function(oItem) {
				this.getRouter().navTo("MaterialbyEndCustomer");
			},
			
			fnSearch:function() {
				var mCompanyCode = this.getView().byId("txtCompanyCode");
				var mCurrencyType = this.getView().byId("txtCurrencyType");
				
						
				if(mCompanyCode.getValue().trim().length === 0)
	            	{ MessageBox.error("Company Code is required !"); return false; }
	            /*else if(mCurrencyType.getValue().trim().length === 0)
	            	{ MessageBox.error("Currency Type is required !"); return false; }*/
	            else 
            	{
					var mEndCustomerAmount= this.getView().byId("tblEndCustomerAmount");
					var mShipToCountryAmount= this.getView().byId("tblShipToCountryAmount");
					var mEndCustomerQty= this.getView().byId("tblEndCustomerQty");
					var mShipToCountryQty= this.getView().byId("tblShipToCountryQty");
					
					var mEndCustomerChartAmount= this.getView().byId("idVizFrameEndCustomer");
					var mShiptoCountryChartAmount= this.getView().byId("idVizFrameSTOC");
					var mEndCustomerChartQty= this.getView().byId("idVizFrameEndCustomerQty");
					var mShiptoCountryChartQty= this.getView().byId("idVizFrameSTOCQty");
					
					if(this.oSelectedIndex === undefined)
					{ this.oSelectedIndex = 0;}
					
					if(this.oSelectedIndex1 === undefined)
					{ this.oSelectedIndex1 = 0;}
					
					if(this.oSelectedIndex === 0 && this.oSelectedIndex1 === 0)
					{
						this.getView().byId("lfixflex1").addStyleClass("displaynone");
						this.getView().byId("lfixflex2").removeStyleClass("displaynone");
						this.getView().byId("lfixflex3").addStyleClass("displaynone");
						this.getView().byId("lfixflex4").addStyleClass("displaynone");
						//var x= sap.ui.getCore().byId("rdbEndCustomer").getSelected().getText();
						var oTableEndCustomerAmount = this.getView().byId("tblEndCustomerAmount");
						var oEndcustomerAmount = new JSONModel("model/EndCustomer.json");
						oTableEndCustomerAmount.setModel(oEndcustomerAmount);
						
						mEndCustomerAmount.setVisible(true);
						mShipToCountryAmount.setVisible(false);
						mEndCustomerQty.setVisible(false);
						mShipToCountryQty.setVisible(false);
						
						mEndCustomerChartAmount.setVisible(true);
						mShiptoCountryChartAmount.setVisible(false);
						mEndCustomerChartQty.setVisible(false);
						mShiptoCountryChartQty.setVisible(false);
						
						var oViewModel, oVizFrame, oVizFrame1,oVizFrame3, dataModel, oPopOver;
						
						oViewModel = new JSONModel(this.EndCustomerModel);
		        		oViewModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
		            	
		            	CustomerFormat.registerCustomFormat();
	            	
		            	oVizFrame = this.oVizFrame = this.getView().byId("idVizFrameEndCustomer");
		            	oVizFrame1 = this.oVizFrame1 = this.getView().byId("idVizFrameSTOC");
		            	oVizFrame3 = this.oVizFrame3 = this.getView().byId("idVizFrameEndCustomerQty");
		            	
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
			                    text: 'Revenue Report by End Customer (Amount)'
			                }
		            	});
	            
			            dataModel = new JSONModel(this.dataPath + "/EndCustomerChart.json");
			            oVizFrame.setModel(dataModel);
			           
			            oPopOver = this.getView().byId("idPopOverEndCustomer");
			            oPopOver.connect(oVizFrame.getVizUid());
			            oPopOver.setFormatString(CustomerFormat.FIORI_LABEL_FORMAT_2);
					}
					else if(this.oSelectedIndex === 0 && this.oSelectedIndex1 === 1)
					{
						
						this.getView().byId("lfixflex1").addStyleClass("displaynone");
						this.getView().byId("lfixflex2").addStyleClass("displaynone");
						this.getView().byId("lfixflex3").addStyleClass("displaynone");
						this.getView().byId("lfixflex4").removeStyleClass("displaynone");
						//var x= sap.ui.getCore().byId("rdbEndCustomer").getSelected().getText();
						var oTableEndCustomerQty = this.getView().byId("tblEndCustomerQty");
						var oEndcustomerQty = new JSONModel("model/EndCustomer.json");
						oTableEndCustomerQty.setModel(oEndcustomerQty);
						
						mEndCustomerAmount.setVisible(false);
						mShipToCountryAmount.setVisible(false);
						mEndCustomerQty.setVisible(true);
						mShipToCountryQty.setVisible(false);
						
						mEndCustomerChartAmount.setVisible(false);
						mShiptoCountryChartAmount.setVisible(false);
						mEndCustomerChartQty.setVisible(true);
						mShiptoCountryChartQty.setVisible(false);
						
						var oViewModel2, oVizFrame2, dataModel2, oPopOver2;
						
						oViewModel2 = new JSONModel(this.EndCustomerModel);
		        		oViewModel2.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
		            	
		            	CustomerFormat.registerCustomFormat();
	            	
		            	oVizFrame2 = this.oVizFrame2 = this.getView().byId("idVizFrameEndCustomerQty");
		            	//oVizFrame1 = this.oVizFrame1 = this.getView().byId("idVizFrameSTOC");
		            	
		            	oVizFrame2.setVizProperties({
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
			                    text: 'Revenue Report by End Customer (Quantity)'
			                }
		            	});
	            
			            dataModel2 = new JSONModel(this.dataPath + "/EndCustomerChart.json");
			            oVizFrame2.setModel(dataModel2);
			           
			            oPopOver2 = this.getView().byId("idPopOverEndCustomerQty");
			            oPopOver2.connect(oVizFrame2.getVizUid());
			            oPopOver2.setFormatString(CustomerFormat.FIORI_LABEL_FORMAT_2);
					}
					else if(this.oSelectedIndex === 1 && this.oSelectedIndex1 === 0)
					 {
					 	this.getView().byId("lfixflex1").removeStyleClass("displaynone");
						this.getView().byId("lfixflex2").addStyleClass("displaynone");
						this.getView().byId("lfixflex3").addStyleClass("displaynone");
						this.getView().byId("lfixflex4").addStyleClass("displaynone");
					 
					 	var oViewModel1, oVizFrame1, dataModel1, oPopOver1;
						//	var x= sap.ui.getCore().byId("RB1").getSelected().getText();
						var oTableShipToCountryAmount = this.getView().byId("tblShipToCountryAmount");
						var oShiptoCountryAmount = new JSONModel("model/ShiptoCountry.json");
						oTableShipToCountryAmount.setModel(oShiptoCountryAmount);	
						
						mEndCustomerAmount.setVisible(false);
						mShipToCountryAmount.setVisible(true);
						mEndCustomerQty.setVisible(false);
						mShipToCountryQty.setVisible(false);
						
						mEndCustomerChartAmount.setVisible(false);
						mShiptoCountryChartAmount.setVisible(true);
						mEndCustomerChartQty.setVisible(false);
						mShiptoCountryChartQty.setVisible(false);
						
						oViewModel1 = new JSONModel(this.STOCONModel);
		        		oViewModel1.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
		            	
		            	CustomerFormat.registerCustomFormat();
	            	
		            	oVizFrame1 = this.oVizFrame1 = this.getView().byId("idVizFrameSTOC");
		            	oVizFrame1.setVizProperties({
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
			                    text: 'Revenue Report by Ship To Country (Amount)'
			                }
		            	});
	            
			            dataModel1 = new JSONModel(this.dataPath + "/ShipToCountryChart.json");
			            oVizFrame1.setModel(dataModel1);
			           
			            oPopOver1 = this.getView().byId("idPopOverSTOC");
			            oPopOver1.connect(oVizFrame1.getVizUid());
			            oPopOver1.setFormatString(CustomerFormat.FIORI_LABEL_FORMAT_2);
					 }
					 else if(this.oSelectedIndex === 1 && this.oSelectedIndex1 === 1)
					 {
						this.getView().byId("lfixflex1").addStyleClass("displaynone");
						this.getView().byId("lfixflex2").addStyleClass("displaynone");
						this.getView().byId("lfixflex3").removeStyleClass("displaynone");
						this.getView().byId("lfixflex4").addStyleClass("displaynone");
					 
					 	var oViewModel3, oVizFrame3, dataModel3, oPopOver3;
						//	var x= sap.ui.getCore().byId("RB1").getSelected().getText();
						var oTableShipToCountryQty = this.getView().byId("tblShipToCountryQty");
						var oShiptoCountryQty = new JSONModel("model/ShiptoCountry.json");
						oTableShipToCountryQty.setModel(oShiptoCountryQty);	
						
						mEndCustomerAmount.setVisible(false);
						mShipToCountryAmount.setVisible(false);
						mEndCustomerQty.setVisible(false);
						mShipToCountryQty.setVisible(true);
						
						mEndCustomerChartAmount.setVisible(false);
						mShiptoCountryChartAmount.setVisible(false);
						mEndCustomerChartQty.setVisible(false);
						mShiptoCountryChartQty.setVisible(true);
						
						oViewModel3 = new JSONModel(this.STOCONModel);
		        		oViewModel3.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
		            	
		            	CustomerFormat.registerCustomFormat();
	            	
		            	oVizFrame3 = this.oVizFrame3 = this.getView().byId("idVizFrameSTOCQty");
		            	oVizFrame3.setVizProperties({
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
			                    text: 'Revenue Report by Ship To Country (Quantity)'
			                }
		            	});
	            
			            dataModel3 = new JSONModel(this.dataPath + "/ShipToCountryChart.json");
			            oVizFrame3.setModel(dataModel3);
			           
			            oPopOver3 = this.getView().byId("idPopOverSTOCQty");
			            oPopOver3.connect(oVizFrame3.getVizUid());
			            oPopOver3.setFormatString(CustomerFormat.FIORI_LABEL_FORMAT_2);
					 }
				}
		}	
	});

});