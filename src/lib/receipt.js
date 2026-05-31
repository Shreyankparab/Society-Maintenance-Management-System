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
  
  if (p.amount === 3700) {
    // 3,200 (overdue with late fee)
    itemDescription = "Monthly Maintenance Charges";
    baseAmount = 3200;
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
  } else if (p.amount === 3500) {
    // Standard mock transaction amount
    itemDescription = "Monthly Maintenance Charges";
    baseAmount = 3500;
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
                <div class="society-sub">Reg No: MH/MUM/CHS/12345/2020 · Whing E</div>
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
              <div class="detail-val">Flat E-101 (Whing E)</div>
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
            For any queries or administrative support, please log in to the Nirvana Beyond portal or contact the Whing E Committee.
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
