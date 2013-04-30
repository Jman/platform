var OroApp = OroApp || {};
OroApp.Datagrid = OroApp.Datagrid || {};
OroApp.Datagrid.Action = OroApp.Datagrid.Action || {};

/**
 * Delete action with confirm dialog, triggers REST DELETE request
 *
 * @class   OroApp.Datagrid.Action.DeleteAction
 * @extends OroApp.Datagrid.Action.ModelAction
 */
OroApp.Datagrid.Action.DeleteAction = OroApp.Datagrid.Action.ModelAction.extend({

    /** @property Backbone.BootstrapModal */
    errorModal: undefined,

    /** @property Backbone.BootstrapModal */
    confirmModal: undefined,

    /**
     * Execute delete model
     */
    execute: function() {
        this.getConfirmDialog().open();
    },

    /**
     * Confirm delete item
     */
    doDelete: function() {
        var self = this;
        this.model.destroy({
            url: this.getLink(),
            wait: true,
            error: function() {
                self.getErrorDialog().open();
            }
        });
    },

    /**
     * Get view for confirm modal
     *
     * @return {Oro.BootstrapModal}
     */
    getConfirmDialog: function() {
        if (!this.confirmModal) {
            this.confirmModal = new Oro.BootstrapModal({
                title: 'Delete Confirmation',
                content: 'Are you sure you want to delete this item?',
                okText: 'Yes, Delete'
            });
            this.confirmModal.on('ok', _.bind(this.doDelete, this));
        }
        return this.confirmModal;
    },

    /**
     * Get view for error modal
     *
     * @return {Oro.BootstrapModal}
     */
    getErrorDialog: function() {
        if (!this.errorModal) {
            this.confirmModal = new Oro.BootstrapModal({
                title: 'Delete Error',
                content: 'Cannot delete item.',
                cancelText: false
            });
        }
        return this.confirmModal;
    }
});
