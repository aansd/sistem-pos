const { subject } = require('@casl/ability');
const Invoice = require('./model');
const { policyFor } = require('../../utils');

const show = async (req, res, next) => {
    try {
        let { order_id } = req.params;

       
        let invoice = await Invoice.findOne({ order: order_id })
            .populate('order')
            .populate('user');

       
        if (!invoice) {
            return res.json({
                error: 1,
                message: 'Invoice tidak ditemukan.'
            });
        }

       
        let policy = policyFor(req.user);
        let subjectInvoice = subject('Invoice', { ...invoice, user_id: invoice.user._id });

       
        if (!policy.can('read', subjectInvoice)) {
            return res.json({
                error: 1,
                message: 'Anda tidak memiliki akses untuk melihat invoice.'
            });
        }

        return res.json(invoice);
    } catch (err) {
        console.error(err); 
        return res.json({
            error: 1,
            message: 'Error when getting invoice.'
        });
    }
};

module.exports = {
    show
};
