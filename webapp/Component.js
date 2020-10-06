sap.ui.define([
	"sap/ui/core/UIComponent"
], function(UIComponent) {
	"use strict";

	return UIComponent.extend("RevenueReport.Component", {

		metadata: {
			manifest: "json"
		
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			// used only for this lessons to show the request individually...
			//this.getModel().setUseBatch(false);
			this.getRouter().initialize();
			//this.getView().addStyleClass(sap.ui.Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");

			// additional initialization can be done here
		}
		
	});

});