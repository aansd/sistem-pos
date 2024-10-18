import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import Spinner from 'react-bootstrap/Spinner';

const InvoiceItem = () => {
  const { invoice, order, fetchInvoice, token } = useContext(StoreContext);

  useEffect(() => {
    if (order && order._id) {
      fetchInvoice(order._id);
    }
  }, [order, fetchInvoice, token]);

 
  if (!invoice) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

 
  return (
    <div className="card">
      <div className="card-body">
        <div className="container mb-5 mt-3">
          <div className="row d-flex align-items-baseline">
            <div className="col-xl-9">
              <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                Invoice &gt;&gt; <strong>ID: #{invoice?.order?.order_number || 'N/A'}</strong>
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-8">
              <ul className="list-unstyled">
                To: <span style={{ color: "#8f8061" }}>{invoice?.delivery_address?.nama || 'N/A'}</span>
                {invoice.delivery_address && (
                  <>
                    <li className="text-muted">{invoice.delivery_address.provinsi}, {invoice.delivery_address.kabupaten}</li>
                    <li className="text-muted">{invoice.delivery_address.kecamatan}, {invoice.delivery_address.kelurahan}</li>
                    <li className="text-muted">{invoice.delivery_address.detail}</li>
                  </>
                )}
                <li className="text-muted"><i className="fas fa-phone"></i> {invoice.customer_phone || 'N/A'}</li>
              </ul>
            </div>
            <div className="col-xl-4">
              <p className="text-muted">Invoice</p>
              <ul className="list-unstyled">
                <li className="text-muted">
                  <i className="fas fa-circle" style={{ color: "#8f8061" }}></i> <span className="fw-bold">Creation Date:</span> {new Date(invoice.createdAt).toLocaleString() || 'N/A'}
                </li>
                <li className="text-muted">
                  <i className="fas fa-circle" style={{ color: "#8f8061" }}></i> <span className="me-1 fw-bold">Status:</span> <span className="badge bg-warning text-black fw-bold">{invoice.payment_status || 'N/A'}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-8">
              <ul className="list-unstyled">
                Payment To: <span style={{ color: "#8f8061" }}>Septiyan</span>
                {invoice.delivery_address && (
                  <>
                    <li className="text-muted">Septiyan@gmail.com</li>
                    <li className="text-muted">BCA</li>
                    <li className="text-muted">xxxx-xxxx-xxxx</li>
                  </>
                )}
              </ul>
            </div>
            <div className="col-xl-3">
              <ul className="list-unstyled">
                <li className="text-muted ms-3"><span className="text-black me-4">SubTotal</span>${invoice.sub_total || 0}</li>
                <li className="text-muted ms-3 mt-2"><span className="text-black me-4">Shipping</span>${invoice.delivery_fee || 0}</li>
              </ul>
              <p className="text-black float-start">
                <span className="text-black me-3">Total Amount</span><span style={{ fontSize: "25px" }}>${invoice.total || 0}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceItem;
