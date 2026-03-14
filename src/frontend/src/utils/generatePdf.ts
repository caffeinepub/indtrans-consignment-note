import type { ConsignmentNote } from "../backend.d";

function buildCopyHtml(
  data: ConsignmentNote,
  copyLabel: string,
  logoUrl: string,
  watermarkUrl: string,
  isLast: boolean,
): string {
  const pageBreak = isLast ? "" : "page-break-after: always;";
  return `
    <div class="page-wrapper" style="${pageBreak}">
      <img class="watermark" src="${watermarkUrl}" alt="watermark" />
      <div class="wrapper">
        <!-- HEADER -->
        <div class="header">
          <div class="header-logo">
            <img src="${logoUrl}" alt="INDTRANS logo" />
            <div class="header-logo-text">
              <div class="company-name">INDTRANS</div>
              <div class="freight-name">FREIGHT SOLUTIONS</div>
              <div class="tag-line">TRANSPORT CONTRACTOR &amp; FLEET OWNER</div>
              <div class="address">
                103, Grohitam Premises APMC market Sector 19 Vashi<br/>
                Navi Mumbai Maharashtra 400703
              </div>
            </div>
          </div>
          <div class="header-gst">
            <div class="gst-label">GST NO:</div>
            <div>27AAJF1355P1ZQ</div>
            <div style="margin-top:6px; font-size:6.5pt;">
              <div>Mobile: 9820009090</div>
            </div>
          </div>
        </div>

        <!-- TITLE -->
        <div class="title-bar">GOODS CONSIGNMENT NOTE</div>
        <div class="sub-title-bar">
          <span style="font-weight:bold;">${copyLabel}</span>
          <span>SUBJECT TO MUMBAI JURISDICTION</span>
          <span>INSURANCE COVERED BY CONSIGNOR/CONSIGNEE</span>
        </div>

        <!-- GC INFO BOX + Consignor/Consignee -->
        <table>
          <tr>
            <td style="width:65%; border-right: 1px solid #000; padding:0;">
              <table style="width:100%; border:none;">
                <tr>
                  <td colspan="4" class="section-header">CONSIGNOR &amp; CONSIGNEE DETAILS</td>
                </tr>
                <tr>
                  <td style="width:50%; border-right:1px solid #000; padding:0;">
                    <table style="width:100%;border:none;">
                      <tr><td colspan="2" style="font-weight:bold; font-size:7pt; background:#e8ecf4; border-bottom:1px solid #000;">CONSIGNOR (SENDER)</td></tr>
                      <tr>
                        <td class="label-cell">Name</td>
                        <td class="value-cell">${data.consignorName}</td>
                      </tr>
                      <tr>
                        <td class="label-cell">Address</td>
                        <td class="value-cell" style="min-height:24px;">${data.consignorAddress}</td>
                      </tr>
                      <tr>
                        <td class="label-cell">GST No.</td>
                        <td class="value-cell">${data.consignorGST}</td>
                      </tr>
                    </table>
                  </td>
                  <td style="width:50%; padding:0;">
                    <table style="width:100%;border:none;">
                      <tr><td colspan="2" style="font-weight:bold; font-size:7pt; background:#e8ecf4; border-bottom:1px solid #000;">CONSIGNEE (RECEIVER)</td></tr>
                      <tr>
                        <td class="label-cell">Name</td>
                        <td class="value-cell">${data.consigneeName}</td>
                      </tr>
                      <tr>
                        <td class="label-cell">Address</td>
                        <td class="value-cell" style="min-height:24px;">${data.consigneeAddress}</td>
                      </tr>
                      <tr>
                        <td class="label-cell">GST No.</td>
                        <td class="value-cell">${data.consigneeGST}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
            <td style="width:35%; vertical-align:top; padding:6px 8px;">
              <div style="font-weight:bold; font-size:8pt; margin-bottom:4px; border-bottom:1px solid #000; padding-bottom:2px;">SHIPMENT DETAILS</div>
              <div class="info-row">
                <span class="info-label">G.C. No.</span>
                <span class="info-value">${data.gcNo}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Date</span>
                <span class="info-value">${data.date}</span>
              </div>
              <div class="info-row">
                <span class="info-label">From</span>
                <span class="info-value">${data.fromCity}</span>
              </div>
              <div class="info-row">
                <span class="info-label">To</span>
                <span class="info-value">${data.toCity}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Truck No.</span>
                <span class="info-value">${data.truckNo}</span>
              </div>
            </td>
          </tr>
        </table>

        <!-- GOODS DETAILS -->
        <table>
          <tr>
            <td class="section-header" colspan="6">GOODS &amp; INVOICE DETAILS</td>
          </tr>
          <tr>
            <td class="label-cell" style="width:22%;">Description<br/>(Said to Contain)</td>
            <td class="value-cell" style="width:28%;">${data.description}</td>
            <td class="label-cell" style="width:14%;">No. of Articles</td>
            <td class="value-cell" style="width:12%;">${data.noOfArticles}</td>
            <td class="label-cell" style="width:12%;">Mode of Packing</td>
            <td class="value-cell" style="width:12%;">${data.modePacking}</td>
          </tr>
          <tr>
            <td class="label-cell">Invoice No. &amp; Date</td>
            <td class="value-cell">${data.invoiceNo}${data.invoiceDate ? ` / ${data.invoiceDate}` : ""}</td>
            <td class="label-cell">Invoice Value (Rs.)</td>
            <td class="value-cell" colspan="3">${data.invoiceValue}</td>
          </tr>
        </table>

        <!-- WEIGHT/RATE + CHARGES -->
        <table>
          <tr>
            <td style="width:60%; padding:0; border-right:1px solid #000;">
              <table style="width:100%;border:none;">
                <tr>
                  <td colspan="6" class="section-header">WEIGHT &amp; RATE</td>
                </tr>
                <tr>
                  <td class="label-cell" style="width:25%;">Weight Actual (Kgs)</td>
                  <td class="value-cell" style="width:15%;">${data.weightActual}</td>
                  <td class="label-cell" style="width:28%;">Weight Chanded (Kgs)</td>
                  <td class="value-cell" style="width:15%;">${data.weightChanded}</td>
                  <td class="label-cell" style="width:17%;">Rate (Rs/Kg)</td>
                  <td class="value-cell">${data.rate}</td>
                </tr>
              </table>
            </td>
            <td style="width:40%; padding:0; vertical-align:top;">
              <table class="charges-table" style="width:100%;border:none;">
                <tr>
                  <td colspan="3" class="section-header">CHARGES</td>
                </tr>
                <tr>
                  <td class="label-cell" style="width:50%;">Freight (Rs.)</td>
                  <td class="value-cell" colspan="2">${data.freight}</td>
                </tr>
                <tr>
                  <td class="label-cell">Advance (Rs.)</td>
                  <td class="value-cell" colspan="2">${data.advance}</td>
                </tr>
                <tr>
                  <td class="label-cell">Hamaali</td>
                  <td class="value-cell" colspan="2">${data.hamaali}</td>
                </tr>
                <tr>
                  <td class="label-cell">S.T. Change</td>
                  <td class="value-cell" colspan="2">${data.stChange}</td>
                </tr>
                <tr>
                  <td class="label-cell">Duty</td>
                  <td class="value-cell" colspan="2">${data.duty}</td>
                </tr>
                <tr>
                  <td class="label-cell">Taxes</td>
                  <td class="value-cell" colspan="2">${data.taxes}</td>
                </tr>
                <tr class="total-row">
                  <td style="font-weight:bold; font-size:8pt;">GRAND TOTAL</td>
                  <td colspan="2" style="font-weight:bold; font-size:9pt;">${data.grandTotal}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- PAYMENT -->
        <table>
          <tr>
            <td class="section-header" colspan="8">PAYMENT DETAILS</td>
          </tr>
          <tr>
            <td class="label-cell" style="width:18%;">Amount to Pay</td>
            <td class="label-cell" style="width:8%; font-weight:normal;">Rs.</td>
            <td class="value-cell" style="width:12%;">${data.amountToPayRs}</td>
            <td class="label-cell" style="width:4%; font-weight:normal;">P.</td>
            <td class="value-cell" style="width:10%;">${data.amountToPayP}</td>
            <td class="label-cell" style="width:18%;">Amount Paid</td>
            <td class="label-cell" style="width:5%; font-weight:normal;">Rs.</td>
            <td class="value-cell">${data.amountPaidRs}</td>
            <td class="label-cell" style="width:4%; font-weight:normal;">P.</td>
            <td class="value-cell">${data.amountPaidP}</td>
          </tr>
          <tr>
            <td class="label-cell">Remarks</td>
            <td class="value-cell" colspan="9">${data.remarks}</td>
          </tr>
        </table>

        <!-- CAUTION BOX -->
        <div style="padding: 6px 8px; border-top: 1px solid #000;">
          <div class="caution-box">
            <img class="caution-box-logo" src="${watermarkUrl}" alt="" />
            <div class="caution-title">CAUTION</div>
            <div class="caution-text">
              This consignment will not be detained delivered re-routed or re-book without<br/>
              consignee's Bank's written permission will be delivered at the destination
            </div>
          </div>
        </div>

        <!-- PAN NOTE -->
        <div class="pan-note">
          <strong>PAN NO: AAJF1355SP</strong> &nbsp;|&nbsp; Goods transported at owner's risk. Company is not responsible for any damage/loss. GST liability on consignor/consignee.
        </div>

        <!-- FOOTER -->
        <div class="footer-bar">
          <div>
            <div class="billed-to">
              <span class="billed-option ${data.billedTo === "TO PAY" ? "active" : ""}">TO PAY</span>
              <span class="billed-option ${data.billedTo === "PAID" ? "active" : ""}">PAID</span>
              <span class="billed-option ${data.billedTo === "TO BE BILLED" ? "active" : ""}">TO BE BILLED</span>
            </div>
          </div>
          <div style="text-align:center;">
            <div style="font-size:6.5pt; color:#555;">This is a computer generated document</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:7pt; font-weight:bold;">FOR INDTRANS FREIGHT SOLUTIONS</div>
            <div style="margin-top:20px; border-top:1px solid #000; font-size:6.5pt;">Booking Authority / Signature</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function generateConsignmentPdf(data: ConsignmentNote) {
  const logoUrl = `${window.location.origin}/assets/uploads/IMG-20250909-WA0012-1-1.jpg`;
  const watermarkUrl = `${window.location.origin}/assets/generated/indtrans-logo-transparent.png`;

  const copies = [
    { label: "DRIVER COPY", isLast: false },
    { label: "CONSIGNEE COPY", isLast: false },
    { label: "CONSIGNOR COPY", isLast: true },
  ];

  const copiesHtml = copies
    .map((c) => buildCopyHtml(data, c.label, logoUrl, watermarkUrl, c.isLast))
    .join("\n");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Consignment Note - GC No. ${data.gcNo}</title>
      <style>
        @page {
          size: A4;
          margin: 8mm 8mm 8mm 8mm;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 8pt;
          color: #000;
          background: #fff;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .page-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 4mm;
        }
        .watermark {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.07;
          width: 300px;
          z-index: 0;
          pointer-events: none;
        }
        .wrapper {
          width: 100%;
          border: 2px solid #000;
          position: relative;
          z-index: 1;
        }
        .header {
          display: flex;
          align-items: stretch;
          border-bottom: 2px solid #000;
          background: #fff;
        }
        .header-logo {
          flex: 1;
          padding: 6px 10px;
          border-right: 1px solid #000;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .header-logo img {
          height: 70px;
          width: auto;
          object-fit: contain;
        }
        .header-logo-text .company-name {
          font-size: 18pt;
          font-weight: 900;
          letter-spacing: 1px;
          color: #E87722;
          line-height: 1.1;
        }
        .header-logo-text .freight-name {
          font-size: 11pt;
          font-weight: 900;
          color: #333;
          line-height: 1.1;
        }
        .header-logo-text .tag-line {
          font-size: 7pt;
          color: #555;
          margin-top: 2px;
        }
        .header-logo-text .address {
          font-size: 6.5pt;
          color: #444;
          margin-top: 4px;
          line-height: 1.4;
        }
        .header-gst {
          width: 160px;
          padding: 6px 8px;
          font-size: 7pt;
          text-align: right;
          color: #000;
        }
        .header-gst .gst-label {
          font-weight: bold;
          font-size: 7.5pt;
          color: #000;
        }
        .title-bar {
          background: #e8e8e8;
          color: #000;
          text-align: center;
          padding: 4px;
          font-size: 9pt;
          font-weight: bold;
          letter-spacing: 1.5px;
          border-bottom: 1px solid #000;
        }
        .sub-title-bar {
          display: flex;
          justify-content: space-between;
          padding: 3px 8px;
          font-size: 6.5pt;
          border-bottom: 1px solid #000;
          background: #f5f7fa;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        td, th {
          border: 1px solid #000;
          padding: 3px 5px;
          vertical-align: top;
        }
        .label-cell {
          font-weight: bold;
          background: #f0f3f8;
          width: 30%;
          font-size: 7pt;
        }
        .value-cell {
          font-size: 8pt;
          min-height: 16px;
        }
        .section-header {
          background: #d0d5e0;
          color: #000;
          font-weight: bold;
          text-align: center;
          font-size: 7.5pt;
          padding: 3px;
          letter-spacing: 0.5px;
        }
        .charges-table td {
          padding: 2px 5px;
        }
        .charges-table .total-row {
          background: #333;
          color: #fff;
          font-weight: bold;
        }
        .footer-bar {
          border-top: 1px solid #000;
          padding: 5px 10px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-size: 7pt;
        }
        .pan-note {
          border-top: 1px solid #000;
          padding: 3px 8px;
          font-size: 7pt;
          background: #f9f9f9;
        }
        .billed-to {
          display: flex;
          gap: 20px;
          font-size: 8pt;
          font-weight: bold;
        }
        .billed-option {
          padding: 2px 10px;
          border: 1.5px solid #000;
          display: inline-block;
          color: #000;
          background: #fff;
        }
        .billed-option.active {
          background: #1a3a5c !important;
          color: #fff !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .info-row {
          display: flex;
          margin-bottom: 2px;
        }
        .info-label {
          font-weight: bold;
          width: 70px;
          font-size: 7pt;
        }
        .info-value {
          flex: 1;
          font-size: 7.5pt;
          border-bottom: 1px dotted #999;
        }
        .caution-box {
          position: relative;
          border: 1.5px solid #000;
          border-radius: 4px;
          padding: 8px 12px;
          text-align: center;
          overflow: hidden;
          min-height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .caution-box-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          opacity: 0.12;
          pointer-events: none;
          z-index: 0;
        }
        .caution-title {
          font-weight: bold;
          font-size: 8pt;
          letter-spacing: 1px;
          margin-bottom: 4px;
          position: relative;
          z-index: 1;
        }
        .caution-text {
          font-size: 6.5pt;
          line-height: 1.5;
          position: relative;
          z-index: 1;
        }
      </style>
    </head>
    <body>
      ${copiesHtml}
    </body>
    </html>
  `;

  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) {
    alert("Please allow popups to generate the PDF.");
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
  };
}
