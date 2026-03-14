import type { ConsignmentNote } from "../backend.d";

function buildCopyHtml(
  data: ConsignmentNote,
  copyLabel: string,
  logoUrl: string,
  watermarkUrl: string,
  isLast: boolean,
  insuranceCoveredBy: string,
): string {
  const pageBreak = isLast ? "" : "page-break-after: always;";

  const consignorTick =
    insuranceCoveredBy === "CONSIGNOR" ||
    insuranceCoveredBy === "CONSIGNOR/CONSIGNEE"
      ? "&#9745;"
      : "&#9744;";
  const consigneeTick =
    insuranceCoveredBy === "CONSIGNEE" ||
    insuranceCoveredBy === "CONSIGNOR/CONSIGNEE"
      ? "&#9745;"
      : "&#9744;";
  const insuranceHtml = `${consignorTick} CONSIGNOR &nbsp;&nbsp; ${consigneeTick} CONSIGNEE`;

  return `
    <div class="page-wrapper" style="${pageBreak}">
      <img class="watermark" src="${watermarkUrl}" alt="watermark" />
      <div class="wrapper">
        <div class="header">
          <div class="header-logo">
            <img src="${logoUrl}" alt="INDTRANS logo" />
            <div class="header-logo-text">
              <div class="company-name">INDTRANS</div>
              <div class="freight-name">FREIGHT SOLUTIONS</div>
              <div class="slogan">Your reliable Transportation Partner</div>
              <div class="address">
                103, Grohitam Premises APMC market Sector 19 Vashi<br/>
                Navi Mumbai Maharashtra 400703
              </div>
            </div>
          </div>
          <div class="header-gst">
            <div class="gst-label">GST NO:</div>
            <div>27AAJF1355P1ZQ</div>
            <div style="margin-top:8px;">
              <div><strong>PAN: AAJFI3555P</strong></div>
            </div>
          </div>
        </div>

        <div class="title-bar">GOODS CONSIGNMENT NOTE</div>
        <div class="sub-title-bar">
          <span style="font-weight:bold;">${copyLabel}</span>
          <span>SUBJECT TO MUMBAI JURISDICTION</span>
          <span>INSURANCE COVERED BY: ${insuranceHtml}</span>
        </div>

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
                      <tr><td colspan="2" style="font-weight:bold; font-size:9pt; background:#e8ecf4; border-bottom:1px solid #000; padding:5px 6px;">CONSIGNOR (SENDER)</td></tr>
                      <tr>
                        <td class="label-cell">Name</td>
                        <td class="value-cell">${data.consignorName}</td>
                      </tr>
                      <tr>
                        <td class="label-cell">Address</td>
                        <td class="value-cell addr-cell">${data.consignorAddress}</td>
                      </tr>
                      <tr>
                        <td class="label-cell">GST No.</td>
                        <td class="value-cell">${data.consignorGST}</td>
                      </tr>
                    </table>
                  </td>
                  <td style="width:50%; padding:0;">
                    <table style="width:100%;border:none;">
                      <tr><td colspan="2" style="font-weight:bold; font-size:9pt; background:#e8ecf4; border-bottom:1px solid #000; padding:5px 6px;">CONSIGNEE (RECEIVER)</td></tr>
                      <tr>
                        <td class="label-cell">Name</td>
                        <td class="value-cell">${data.consigneeName}</td>
                      </tr>
                      <tr>
                        <td class="label-cell">Address</td>
                        <td class="value-cell addr-cell">${data.consigneeAddress}</td>
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
            <td style="width:35%; vertical-align:top; padding:8px 10px;">
              <div style="font-weight:bold; font-size:10pt; margin-bottom:6px; border-bottom:1px solid #000; padding-bottom:3px;">SHIPMENT DETAILS</div>
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

        <table>
          <tr>
            <td class="section-header" colspan="6">GOODS &amp; INVOICE DETAILS</td>
          </tr>
          <tr>
            <td class="label-cell" style="width:20%;">Description<br/>(Said to Contain)</td>
            <td class="value-cell desc-cell" style="width:30%;">${data.description}</td>
            <td class="label-cell" style="width:14%;">No. of Articles</td>
            <td class="value-cell" style="width:12%;">${data.noOfArticles}</td>
            <td class="label-cell" style="width:12%;">Mode of<br/>Packing</td>
            <td class="value-cell" style="width:12%;">${data.modePacking}</td>
          </tr>
          <tr>
            <td class="label-cell">Invoice No. &amp; Date</td>
            <td class="value-cell">${data.invoiceNo}${data.invoiceDate ? ` / ${data.invoiceDate}` : ""}</td>
            <td class="label-cell">Invoice Value (Rs.)</td>
            <td class="value-cell" colspan="3">${data.invoiceValue}</td>
          </tr>
        </table>

        <table>
          <tr>
            <td style="width:58%; padding:0; border-right:1px solid #000;">
              <table style="width:100%;border:none;">
                <tr>
                  <td colspan="6" class="section-header">WEIGHT &amp; RATE</td>
                </tr>
                <tr>
                  <td class="label-cell" style="width:28%;">Weight Actual (Kgs)</td>
                  <td class="value-cell" style="width:14%;">${data.weightActual}</td>
                  <td class="label-cell" style="width:28%;">Weight Chanded (Kgs)</td>
                  <td class="value-cell" style="width:14%;">${data.weightChanded}</td>
                  <td class="label-cell" style="width:16%;">Rate (Rs/Kg)</td>
                  <td class="value-cell">${data.rate}</td>
                </tr>
              </table>
            </td>
            <td style="width:42%; padding:0; vertical-align:top;">
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
                  <td style="font-weight:bold; font-size:10pt; padding:6px;">GRAND TOTAL</td>
                  <td colspan="2" style="font-weight:bold; font-size:11pt; padding:6px;">${data.grandTotal}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <table>
          <tr>
            <td class="section-header" colspan="10">PAYMENT DETAILS</td>
          </tr>
          <tr>
            <td class="label-cell" style="width:18%;">Amount to Pay</td>
            <td class="label-cell" style="width:6%; font-weight:normal; text-align:center;">Rs.</td>
            <td class="value-cell" style="width:11%;">${data.amountToPayRs}</td>
            <td class="label-cell" style="width:4%; font-weight:normal; text-align:center;">P.</td>
            <td class="value-cell" style="width:9%;">${data.amountToPayP}</td>
            <td class="label-cell" style="width:18%;">Amount Paid</td>
            <td class="label-cell" style="width:6%; font-weight:normal; text-align:center;">Rs.</td>
            <td class="value-cell" style="width:11%;">${data.amountPaidRs}</td>
            <td class="label-cell" style="width:4%; font-weight:normal; text-align:center;">P.</td>
            <td class="value-cell">${data.amountPaidP}</td>
          </tr>
          <tr>
            <td class="label-cell">Remarks</td>
            <td class="value-cell remarks-cell" colspan="9">${data.remarks}</td>
          </tr>
        </table>

        <div class="footer-for-label">FOR INDTRANS FREIGHT SOLUTIONS</div>

        <div class="footer-bar">
          <div>
            <div class="billed-to">
              <span class="billed-option ${data.billedTo === "TO PAY" ? "active" : ""}">TO PAY</span>
              <span class="billed-option ${data.billedTo === "PAID" ? "active" : ""}">PAID</span>
              <span class="billed-option ${data.billedTo === "TO BE BILLED" ? "active" : ""}">TO BE BILLED</span>
            </div>
            <div style="font-size:8pt; color:#444; font-style:italic; margin-top:6px;">This is a computer generated document, no need signature</div>
          </div>
          <div style="text-align:right;">
            <div style="height:40px;"></div>
            <div style="border-top: 1.5px solid #000; padding-top: 3px; font-size: 9pt; font-weight: bold;">Authorised Signature</div>
          </div>
        </div>

        <div class="caution-wrapper">
          <div class="caution-box">
            <img class="caution-box-logo" src="${watermarkUrl}" alt="" />
            <div class="caution-title">CAUTION</div>
            <div class="caution-text">
              This consignment will not be detained delivered re-routed or re-book without<br/>
              consignee's Bank's written permission will be delivered at the destination
            </div>
          </div>
        </div>

        <div class="pan-note">
          <div class="pan-note-row">
            <span class="pan-note-pan">PAN NO: AAJFI3555P</span>
            <span class="pan-note-divider">|</span>
            <span class="pan-note-risk">Goods transported at owner's risk.</span>
            <span class="pan-note-divider">|</span>
            <span class="pan-note-liability">GST liability on consignor/consignee.</span>
          </div>
          <div class="pan-note-disclaimer">
            Company is not responsible for any damage or loss of goods during transit.
          </div>
        </div>
      </div>
    </div>
  `;
}

export function generateConsignmentPdf(
  data: ConsignmentNote,
  insuranceCoveredBy = "CONSIGNOR/CONSIGNEE",
) {
  const logoUrl = `${window.location.origin}/assets/uploads/IMG-20250909-WA0012-1-1.jpg`;
  const watermarkUrl = `${window.location.origin}/assets/generated/indtrans-logo-transparent.png`;

  const copies = [
    { label: "DRIVER COPY", isLast: false },
    { label: "CONSIGNEE COPY", isLast: false },
    { label: "CONSIGNOR COPY", isLast: true },
  ];

  const copiesHtml = copies
    .map((c) =>
      buildCopyHtml(
        data,
        c.label,
        logoUrl,
        watermarkUrl,
        c.isLast,
        insuranceCoveredBy,
      ),
    )
    .join("\n");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Consignment Note - GC No. ${data.gcNo}</title>
      <style>
        @page { size: A4; margin: 5mm 5mm 5mm 5mm; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 10pt;
          color: #000;
          background: #fff;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .page-wrapper {
          position: relative;
          width: 100%;
          height: 287mm;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .watermark {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.07;
          width: 320px;
          z-index: 0;
          pointer-events: none;
        }
        .wrapper {
          width: 100%;
          border: 2px solid #000;
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
        }
        .header {
          display: flex;
          align-items: stretch;
          border-bottom: 2px solid #000;
          background: #fff;
        }
        .header-logo {
          flex: 1;
          padding: 8px 12px;
          border-right: 1px solid #000;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .header-logo img { height: 80px; width: auto; object-fit: contain; }
        .header-logo-text .company-name { font-size: 24pt; font-weight: 900; letter-spacing: 1px; color: #E87722; line-height: 1.1; }
        .header-logo-text .freight-name { font-size: 14pt; font-weight: 900; color: #333; line-height: 1.1; }
        .header-logo-text .slogan { font-size: 9pt; color: #1a3a5c; font-style: italic; font-weight: bold; margin-top: 3px; }
        .header-logo-text .address { font-size: 8.5pt; color: #444; margin-top: 5px; line-height: 1.5; }
        .header-gst { width: 170px; padding: 8px 10px; font-size: 9pt; text-align: right; color: #000; }
        .header-gst .gst-label { font-weight: bold; font-size: 9.5pt; color: #000; }
        .title-bar {
          background: #e8e8e8;
          color: #000;
          text-align: center;
          padding: 6px;
          font-size: 12pt;
          font-weight: bold;
          letter-spacing: 2px;
          border-bottom: 1px solid #000;
        }
        .sub-title-bar {
          display: flex;
          justify-content: space-between;
          padding: 4px 10px;
          font-size: 9pt;
          border-bottom: 1px solid #000;
          background: #f5f7fa;
        }
        table { width: 100%; border-collapse: collapse; }
        td, th { border: 1px solid #000; padding: 6px 8px; vertical-align: top; }
        .label-cell { font-weight: bold; background: #f0f3f8; font-size: 9pt; }
        .value-cell { font-size: 10pt; min-height: 24px; }
        .addr-cell { min-height: 42px; }
        .desc-cell { min-height: 42px; }
        .remarks-cell { min-height: 36px; }
        .section-header { background: #d0d5e0; color: #000; font-weight: bold; text-align: center; font-size: 9.5pt; padding: 5px; letter-spacing: 0.5px; }
        .charges-table td { padding: 5px 8px; }
        .charges-table .total-row { background: #333; color: #fff; font-weight: bold; }
        .footer-for-label { text-align: right; font-size: 9pt; font-weight: bold; padding: 5px 12px 2px; border-top: 1px solid #000; }
        .footer-bar { padding: 8px 12px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 9pt; border-bottom: 1px solid #000; }
        .billed-to { display: flex; gap: 16px; font-size: 10pt; font-weight: bold; }
        .billed-option { padding: 4px 12px; border: 1.5px solid #000; display: inline-block; color: #000; background: #fff; }
        .billed-option.active { background: #1a3a5c !important; color: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .info-row { display: flex; margin-bottom: 5px; }
        .info-label { font-weight: bold; width: 80px; font-size: 9pt; }
        .info-value { flex: 1; font-size: 10pt; border-bottom: 1px dotted #999; }
        .caution-wrapper { padding: 8px 10px; border-top: 1px solid #000; }
        .caution-box { position: relative; border: 1.5px solid #000; border-radius: 4px; padding: 10px 14px; text-align: center; overflow: hidden; display: flex; flex-direction: column; justify-content: center; }
        .caution-box-logo { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 90px; opacity: 0.12; pointer-events: none; z-index: 0; }
        .caution-title { font-weight: bold; font-size: 10pt; letter-spacing: 1px; margin-bottom: 5px; position: relative; z-index: 1; }
        .caution-text { font-size: 8.5pt; line-height: 1.6; position: relative; z-index: 1; }
        .pan-note { border-top: 1px solid #ccc; background: #f2f4f8; padding: 5px 12px 6px; text-align: center; }
        .pan-note-row { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 8.5pt; font-weight: bold; color: #1a1a1a; }
        .pan-note-pan { color: #1a3a5c; font-weight: 900; letter-spacing: 0.3px; }
        .pan-note-divider { color: #999; font-weight: normal; }
        .pan-note-risk { color: #333; }
        .pan-note-liability { color: #333; }
        .pan-note-disclaimer { font-size: 7.5pt; color: #666; font-style: italic; margin-top: 2px; text-align: center; }
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
