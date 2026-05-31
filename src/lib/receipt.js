export const downloadReceiptPDF = (p) => {
  const printWindow = window.open("", "_blank", "width=850,height=900");
  if (!printWindow) {
    alert("Please allow popups to download/print the receipt PDF.");
    return;
  }

  // Determine pricing breakdowns based on amount paid
  // Regular pricing base is 2,800 per month
  let itemDescription = "Monthly Maintenance Charges";
  let baseAmount = p.amount;
  let lateFee = 0;
  let discount = 0;

  if (p.amount === 3300) {
    // 2,800 (overdue with late fee)
    itemDescription = "Monthly Maintenance Charges";
    baseAmount = 2800;
    lateFee = 500;
  } else if (p.amount === 8900) {
    // Quarterly with late fee (8,400 + 500)
    itemDescription = "Quarterly Maintenance Charges (3 Months)";
    baseAmount = 8400;
    lateFee = 500;
  } else if (p.amount === 8400) {
    // Quarterly normal (3 months * 2,800)
    itemDescription = "Quarterly Maintenance Charges (3 Months)";
    baseAmount = 8400;
  } else if (p.amount === 32600) {
    // Yearly with discount (12 * 2,800 = 33,600 minus 1,000 discount)
    itemDescription = "Yearly Maintenance Charges (12 Months)";
    baseAmount = 33600;
    discount = 1000;
  } else if (p.amount === 2800) {
    // Standard mock transaction amount
    itemDescription = "Monthly Maintenance Charges";
    baseAmount = 2800;
  }

  const receiptHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Receipt_${p.period.replace(" ", "_")}_${p.id || 'Nirvana_Beyond'}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * {
          box-sizing: border-box;
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        body {
          margin: 0;
          padding: 40px;
          color: #1e293b;
          background: #ffffff;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .receipt-card {
          max-width: 750px;
          margin: 0 auto;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
          background: #fff;
        }
        .header {
          background: linear-gradient(135deg, #0f3f22, #1b663b);
          color: white;
          padding: 40px;
          position: relative;
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo-area {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .logo-img {
          width: 64px;
          height: 50px;
          object-fit: cover;
          border-radius: 8px;
          background: #ffffff;
          padding: 3px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .society-title {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0;
          color: #ffffff;
        }
        .society-sub {
          font-size: 13px;
          color: #86efac;
          margin-top: 4px;
          font-weight: 400;
        }
        .receipt-badge {
          text-align: right;
        }
        .receipt-id-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #a7f3d0;
          font-weight: 600;
        }
        .receipt-id-val {
          font-size: 24px;
          font-weight: 900;
          margin-top: 4px;
          color: #ffffff;
        }
        .content {
          padding: 40px;
        }
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 40px;
          background: #f8fafc;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #f1f5f9;
        }
        .detail-item {
          display: flex;
          flex-direction: column;
        }
        .detail-label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
        }
        .detail-val {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          margin-top: 5px;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 32px;
        }
        .table th {
          background: #f1f5f9;
          padding: 14px 20px;
          text-align: left;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #475569;
          font-weight: 700;
          border-bottom: 2px solid #cbd5e1;
        }
        .table td {
          padding: 16px 20px;
          font-size: 14px;
          color: #334155;
          border-bottom: 1px solid #e2e8f0;
          font-weight: 500;
        }
        .table td.right, .table th.right {
          text-align: right;
        }
        .total-box {
          background: #f0fdf4;
          border: 1px dashed #22c55e;
          border-radius: 16px;
          padding: 28px;
          text-align: center;
          margin-bottom: 32px;
          position: relative;
        }
        .total-label {
          font-size: 12px;
          font-weight: 800;
          color: #15803d;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        .total-amount {
          font-size: 42px;
          font-weight: 900;
          color: #14532d;
          margin: 8px 0;
          letter-spacing: -0.02em;
        }
        .total-status {
          font-size: 14px;
          font-weight: 700;
          color: #16a34a;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .paid-stamp {
          position: absolute;
          right: 30px;
          top: 50%;
          transform: translateY(-50%) rotate(-12deg);
          border: 3px double #16a34a;
          color: #16a34a;
          font-size: 20px;
          font-weight: 900;
          padding: 6px 14px;
          border-radius: 6px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.85;
          pointer-events: none;
        }
        .footer-note {
          font-size: 11px;
          color: #94a3b8;
          text-align: center;
          line-height: 1.6;
          border-top: 1px solid #f1f5f9;
          padding-top: 24px;
        }
        @media print {
          body {
            padding: 0;
            background: white;
          }
          .receipt-card {
            border: none;
            box-shadow: none;
          }
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt-card">
        <div class="header">
          <div class="header-content">
            <div class="logo-area">
              <img src="/images/logo.jpg" class="logo-img" alt="Nirvana Beyond Logo" onerror="this.style.display='none'" />
              <div>
                <h1 class="society-title">Nirvana Beyond</h1>
                <div class="society-sub">Reg No: MH/MUM/CHS/12345/2020 · Wing E</div>
              </div>
            </div>
            <div class="receipt-badge">
              <div class="receipt-id-label">Receipt Number</div>
              <div class="receipt-id-val">${p.id || 'RCP-' + Math.floor(1000 + Math.random() * 9000)}</div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="details-grid">
            <div class="detail-item">
              <div class="detail-label">Resident Name</div>
              <div class="detail-val">Arjun Patel</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Flat Number</div>
              <div class="detail-val">Flat E-101 (Wing E)</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Billing Cycle</div>
              <div class="detail-val">${p.period}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Payment Date</div>
              <div class="detail-val">${p.date || '02 Apr 2025'}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Method of Payment</div>
              <div class="detail-val">${p.mode || 'UPI'}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Transaction Ref No</div>
              <div class="detail-val" style="font-family: monospace; letter-spacing: 0.05em;">${p.txn || 'UPI5511XYZQ'}</div>
            </div>
          </div>
          
          <table class="table">
            <thead>
              <tr>
                <th>Billing Particulars</th>
                <th class="right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${itemDescription}</td>
                <td class="right">₹${baseAmount.toLocaleString('en-IN')}.00</td>
              </tr>
              ${lateFee > 0 ? `
              <tr style="color: #ef4444;">
                <td style="font-weight: 600;">Late Payment Penalty Fee</td>
                <td class="right" style="font-weight: 700;">₹${lateFee.toLocaleString('en-IN')}.00</td>
              </tr>
              ` : ''}
              ${discount > 0 ? `
              <tr style="color: #22c55e;">
                <td style="font-weight: 600;">Yearly Payment Discount</td>
                <td class="right" style="font-weight: 700;">- ₹${discount.toLocaleString('en-IN')}.00</td>
              </tr>
              ` : ''}
            </tbody>
          </table>

          <div class="total-box">
            <div class="total-label">Total Amount Credited</div>
            <div class="total-amount">₹${p.amount.toLocaleString('en-IN')}.00</div>
            <div class="total-status">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: inline; vertical-align: middle; margin-right: 4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
              PAID IN FULL — CLEAR BALANCE
            </div>
            <div class="paid-stamp">PAID</div>
          </div>

          <div class="footer-note">
            <strong>Nirvana Beyond Society Management System</strong><br>
            This is an official, digitally-authorized secure electronic document.<br>
            For any queries or administrative support, please log in to the Nirvana Beyond portal or contact the Wing E Committee.
          </div>
        </div>
      </div>
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
            window.close();
          }, 350);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(receiptHtml);
  printWindow.document.close();
};

export const downloadBulkReceiptsPDF = (receipts) => {
  const printWindow = window.open("", "_blank", "width=850,height=900");
  if (!printWindow) {
    alert("Please allow popups to download/print the bulk receipt PDF.");
    return;
  }

  let cardsHtml = "";
  receipts.forEach((p, idx) => {
    let itemDescription = "Monthly Maintenance Charges";
    let baseAmount = p.amount;
    let lateFee = 0;
    let discount = 0;

    if (p.amount === 3300) {
      itemDescription = "Monthly Maintenance Charges";
      baseAmount = 2800;
      lateFee = 500;
    } else if (p.amount === 8900) {
      itemDescription = "Quarterly Maintenance Charges (3 Months)";
      baseAmount = 8400;
      lateFee = 500;
    } else if (p.amount === 8400) {
      itemDescription = "Quarterly Maintenance Charges (3 Months)";
      baseAmount = 8400;
    } else if (p.amount === 32600) {
      itemDescription = "Yearly Maintenance Charges (12 Months)";
      baseAmount = 33600;
      discount = 1000;
    } else if (p.amount === 2800) {
      itemDescription = "Monthly Maintenance Charges";
      baseAmount = 2800;
    }

    cardsHtml += `
      <div class="receipt-page" style="${idx < receipts.length - 1 ? 'page-break-after: always;' : ''} padding: 20px 0;">
        <div class="receipt-card">
          <!-- Header -->
          <div class="header">
            <div class="header-content">
              <div class="logo-area">
                <img class="logo-img" src="/images/logo.jpg" alt="Logo">
                <div>
                  <h1 class="society-title">Nirvana Beyond</h1>
                  <div class="society-sub">Plot 12, Sector 9, Navi Mumbai – 400706</div>
                </div>
              </div>
              <div class="receipt-badge">
                <div class="badge-title">PAYMENT RECEIPT</div>
                <div class="badge-id">${p.id || 'MOCK-RCPT'}</div>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="content-body">
            <div class="receipt-meta">
              <div class="meta-item">
                <span class="meta-label">Flat Number</span>
                <span class="meta-val highlight-green">${p.flat || 'E-101'}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Resident Name</span>
                <span class="meta-val">${p.name || 'Resident'}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Billing Period</span>
                <span class="meta-val">${p.period}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Payment Date</span>
                <span class="meta-val">${p.date}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Payment Mode</span>
                <span class="meta-val badge-mode">${p.mode}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Transaction ID</span>
                <span class="meta-val" style="font-family: monospace; font-size: 13px;">${p.txn || '—'}</span>
              </div>
            </div>

            <div class="section-title">Billing Particulars Breakdown</div>

            <table class="particulars-table">
              <thead>
                <tr>
                  <th>Particulars Description</th>
                  <th class="right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${itemDescription}</td>
                  <td class="right">₹${baseAmount.toLocaleString('en-IN')}.00</td>
                </tr>
                ${lateFee > 0 ? `
                <tr style="color: #ef4444;">
                  <td style="font-weight: 600;">Late Payment Penalty Fee</td>
                  <td class="right" style="font-weight: 700;">₹${lateFee.toLocaleString('en-IN')}.00</td>
                </tr>
                ` : ''}
                ${discount > 0 ? `
                <tr style="color: #22c55e;">
                  <td style="font-weight: 600;">Yearly Payment Discount</td>
                  <td class="right" style="font-weight: 700;">- ₹${discount.toLocaleString('en-IN')}.00</td>
                </tr>
                ` : ''}
              </tbody>
            </table>

            <div class="total-box">
              <div class="total-label">Total Amount Credited</div>
              <div class="total-amount">₹${p.amount.toLocaleString('en-IN')}.00</div>
              <div class="total-status">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display: inline; vertical-align: middle; margin-right: 4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
                PAID IN FULL — CLEAR BALANCE
              </div>
              <div class="paid-stamp">PAID</div>
            </div>

            <div class="footer-note">
              <strong>Nirvana Beyond Society Management System</strong><br>
              This is an official, digitally-authorized secure electronic document.<br>
              For any queries or administrative support, please log in to the Nirvana Beyond portal or contact the Wing E Committee.
            </div>
          </div>
        </div>
      </div>
    `;
  });

  const bulkHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Bulk_Receipts_Export</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * {
          box-sizing: border-box;
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        body {
          margin: 0;
          padding: 20px;
          color: #1e293b;
          background: #f8fafc;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .receipt-card {
          max-width: 750px;
          margin: 0 auto;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
          background: #fff;
        }
        .header {
          background: linear-gradient(135deg, #0f3f22, #1b663b);
          color: white;
          padding: 35px 40px;
          position: relative;
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo-area {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .logo-img {
          width: 64px;
          height: 50px;
          object-fit: cover;
          border-radius: 8px;
          background: #ffffff;
          padding: 3px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .society-title {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0;
          color: #ffffff;
        }
        .society-sub {
          font-size: 13px;
          color: #86efac;
          margin-top: 4px;
          font-weight: 400;
        }
        .receipt-badge {
          text-align: right;
        }
        .badge-title {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #86efac;
        }
        .badge-id {
          font-size: 24px;
          font-weight: 900;
          color: #ffffff;
          margin-top: 4px;
          letter-spacing: -0.01em;
        }
        .content-body {
          padding: 40px;
          position: relative;
        }
        .receipt-meta {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          border-bottom: 2px dashed #e2e8f0;
          padding-bottom: 30px;
          margin-bottom: 30px;
        }
        .meta-item {
          display: flex;
          flex-direction: column;
        }
        .meta-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-bottom: 6px;
        }
        .meta-val {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
        }
        .highlight-green {
          color: #16a34a;
        }
        .badge-mode {
          display: inline-block;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 13px;
        }
        .section-title {
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #1e293b;
          margin-bottom: 16px;
        }
        .particulars-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 35px;
        }
        .particulars-table th {
          text-align: left;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #475569;
          border-bottom: 2px solid #cbd5e1;
          padding: 10px 0;
        }
        .particulars-table td {
          font-size: 15px;
          font-weight: 500;
          color: #334155;
          border-bottom: 1px solid #e2e8f0;
          padding: 16px 0;
        }
        .particulars-table .right {
          text-align: right;
        }
        .total-box {
          background: #f0fdf4;
          border: 1px dashed #86efac;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
          margin-bottom: 30px;
        }
        .total-label {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #16a34a;
        }
        .total-amount {
          font-size: 42px;
          font-weight: 900;
          color: #14532d;
          margin: 8px 0;
          letter-spacing: -0.02em;
        }
        .total-status {
          font-size: 12px;
          font-weight: 700;
          color: #15803d;
          letter-spacing: 0.05em;
        }
        .paid-stamp {
          position: absolute;
          right: -15px;
          bottom: -15px;
          font-size: 90px;
          font-weight: 900;
          color: rgba(22, 163, 74, 0.05);
          transform: rotate(-15deg);
          user-select: none;
          pointer-events: none;
        }
        .footer-note {
          font-size: 11px;
          color: #94a3b8;
          text-align: center;
          line-height: 1.6;
          border-top: 1px solid #f1f5f9;
          padding-top: 25px;
        }
        @media print {
          body {
            padding: 0 !important;
            background: transparent !important;
          }
          .receipt-page {
            page-break-after: always;
            padding: 0 !important;
          }
          .receipt-card {
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
            page-break-inside: avoid !important;
          }
        }
      </style>
    </head>
    <body>
      ${cardsHtml}
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
            window.close();
          }, 500);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(bulkHtml);
  printWindow.document.close();
};
