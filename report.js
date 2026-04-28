/**
 * Money Leak Audit — Personalised PDF Report Generator
 * Usage:
 * MoneyLeakReport.save(data)
 */

(function (global) {
  "use strict";

  const LOGO =
    "https://cch-files.edge.live.ds25.io/cch/v/a4e3489d-6bf3-48c8-affb-c268ba45a538/files/ff96df6f1fde9_b0cbdd4d2f0ff-605c893fed0f4-sr-percent-20logo-percent-20white.png";

  const HERO_IMG =
    "https://cch-files.edge.live.ds25.io/cch/v/a4e3489d-6bf3-48c8-affb-c268ba45a538/files/69f059e55e8f9_mmo22-web.png";

  const TOTAL = 4;

  function h(s) {
    return (s || "")
      .toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function safeFileName(name) {
    return (name || "Report")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  function hdr(name) {
    return `
      <div class="ph">
        <div>
          <span class="ph-title">MONEY LEAK AUDIT REPORT</span>
          <span class="ph-sub">Personalized for ${h(name)} &nbsp;·&nbsp; Millionaire Mind Intensive &nbsp;·&nbsp; T. Harv Eker</span>
        </div>
        <img class="ph-logo" src="${LOGO}" alt="Success Resources">
      </div>
      <div class="ph-rule"></div>
    `;
  }

  function ftr(n) {
    return `
      <div class="pf">
        <span class="pf-copy">© 2026 Success Resources &nbsp;|&nbsp; Millionaire Mind Intensive</span>
        <span class="pf-num">Page ${n} of ${TOTAL}</span>
      </div>
    `;
  }

  function sl(t) {
    return `<div class="sl"><span>${h(t)}</span></div>`;
  }

  function bar(label, amount, pct, colour) {
    return `
      <div class="brow">
        <div class="brow-top">
          <span class="bcat"><span class="bdot" style="background:${colour}"></span>${h(label)}</span>
          <span class="bamt" style="color:${colour}">${h(amount)}</span>
        </div>
        <div class="bt">
          <div class="bf" style="width:${pct || 0}%;background:${colour}"></div>
        </div>
      </div>
    `;
  }

  function build(data) {
    const d = data || {};

    const name = d.name || "Your Name";

    const behaviours = (d.bpBehaviours || [])
      .map(
        (b) => `
          <div class="beh">
            <span class="arr">→</span>
            <span>${h(b)}</span>
          </div>
        `
      )
      .join("");

    const watchout = (d.bpWatchout || [])
      .map((w) => `<span class="wtag">${h(w)}</span>`)
      .join("");

    const wins = (d.wins || [])
      .map(
        (w, i) => `
          <div class="wcard">
            <div class="wnum">${i + 1}</div>
            <div>
              <div class="wlbl">${h(w.label)}</div>
              <div class="wtxt">${h(w.text)}</div>
              <div class="wdo">→ ${h(w.action)}</div>
            </div>
          </div>
        `
      )
      .join("");

    const css = `
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

      body{
        font-family:'Inter',system-ui,sans-serif;
        font-size:10pt;
        line-height:1.55;
        color:#111;
        background:#fff;
        -webkit-print-color-adjust:exact;
        print-color-adjust:exact;
      }

      .bar{display:none!important}

      .page{
        background:#fff;
        width:210mm;
        height:297mm;
        min-height:297mm;
        max-height:297mm;
        display:flex;
        flex-direction:column;
        overflow:hidden;
        page-break-after:always;
        break-after:page;
      }

      .page:last-child{
        page-break-after:auto;
        break-after:auto;
      }

      .ph{
        display:flex;
        align-items:flex-end;
        justify-content:space-between;
        padding:5mm 14mm 3mm;
        flex-shrink:0;
      }

      .ph-title{
        font-family:'Playfair Display',Georgia,serif;
        font-size:13pt;
        font-weight:900;
        color:#1c3829;
        display:block;
        margin-bottom:1.5mm;
      }

      .ph-sub{
        font-size:7.5pt;
        color:#666;
        display:block;
      }

      .ph-logo{
        height:20px;
        opacity:.5;
        filter:grayscale(1);
        display:block;
      }

      .ph-rule{
        height:2.5px;
        background:#1c3829;
        flex-shrink:0;
      }

      .pc{
        flex:1;
        padding:6mm 14mm 4mm;
        overflow:hidden;
        display:flex;
        flex-direction:column;
      }

      .pf{
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:3mm 14mm;
        border-top:1px solid #ddd;
        flex-shrink:0;
      }

      .pf-copy{
        font-size:7pt;
        color:#999;
      }

      .pf-num{
        background:#1c3829;
        color:#fff;
        font-size:7pt;
        font-weight:700;
        padding:2px 10px;
        letter-spacing:.05em;
      }

      .sl{
        display:flex;
        align-items:center;
        gap:8px;
        font-size:7pt;
        text-transform:uppercase;
        letter-spacing:.14em;
        font-weight:700;
        color:#888;
        margin:4mm 0 3mm;
        flex-shrink:0;
      }

      .sl::before,.sl::after{
        content:'';
        flex:1;
        height:1px;
        background:#ddd;
      }

      .nc{
        background:#1c3829;
        border-radius:8px;
        padding:8mm 12mm;
        text-align:center;
        position:relative;
        overflow:hidden;
        flex-shrink:0;
      }

      .nc::before{
        content:'';
        position:absolute;
        top:0;
        left:0;
        right:0;
        height:3px;
        background:linear-gradient(90deg,#c9a84c,#ddb84e,#c9a84c);
      }

      .nc-lbl{
        font-size:7pt;
        text-transform:uppercase;
        letter-spacing:.14em;
        color:rgba(255,255,255,.6);
        font-weight:700;
        margin-bottom:3mm;
      }

      .nc-num{
        font-family:'Playfair Display',Georgia,serif;
        font-size:34pt;
        font-weight:900;
        color:#ddb84e;
        line-height:1;
        margin-bottom:2mm;
      }

      .nc-sub{
        font-size:10pt;
        color:rgba(255,255,255,.7);
        margin-bottom:3mm;
      }

      .nc-note{
        font-size:7pt;
        color:rgba(255,255,255,.55);
        background:rgba(255,255,255,.08);
        border-radius:100px;
        padding:2px 11px;
        display:inline-block;
      }

      .ac{
        border:1.5px solid #c9a84c;
        border-radius:8px;
        padding:5mm 7mm;
        flex-shrink:0;
        position:relative;
        overflow:hidden;
      }

      .ac::before{
        content:'';
        position:absolute;
        top:0;
        left:0;
        right:0;
        height:3px;
        background:#c9a84c;
      }

      .ac-eye{
        font-size:7pt;
        text-transform:uppercase;
        letter-spacing:.12em;
        font-weight:700;
        color:#c9a84c;
        margin-bottom:1.5mm;
      }

      .ac-name{
        font-family:'Playfair Display',Georgia,serif;
        font-size:13pt;
        font-weight:800;
        color:#1c3829;
        margin-bottom:1.5mm;
      }

      .ac-desc{
        font-size:9pt;
        color:#222;
        line-height:1.6;
      }

      .bdc{
        border:1px solid #ccc;
        border-radius:8px;
        padding:5mm 7mm;
        flex-shrink:0;
      }

      .bdc-h{
        font-size:9.5pt;
        font-weight:800;
        color:#1c3829;
        margin-bottom:3.5mm;
      }

      .brow{
        margin-bottom:2.5mm;
      }

      .brow:last-child{
        margin-bottom:0;
      }

      .brow-top{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:1.5mm;
      }

      .bcat{
        font-size:9pt;
        font-weight:700;
        color:#111;
        display:flex;
        align-items:center;
        gap:5px;
      }

      .bdot{
        width:9px;
        height:9px;
        border-radius:50%;
        flex-shrink:0;
      }

      .bamt{
        font-size:9.5pt;
        font-weight:800;
      }

      .bt{
        height:7px;
        background:#e8e3dc;
        border-radius:4px;
        overflow:hidden;
      }

      .bf{
        height:100%;
        border-radius:4px;
      }

      .bpw{
        border-radius:8px;
        overflow:hidden;
        flex-shrink:0;
      }

      .bpb{
        background:#1c3829;
        padding:5mm 7mm;
      }

      .bpb-eye{
        font-size:7pt;
        text-transform:uppercase;
        letter-spacing:.14em;
        font-weight:800;
        color:rgba(255,255,255,.55);
        margin-bottom:2mm;
      }

      .bpb-q{
        font-family:'Playfair Display',Georgia,serif;
        font-size:11.5pt;
        font-style:italic;
        color:#fff;
        line-height:1.4;
        border-left:3px solid #c9a84c;
        padding-left:3mm;
      }

      .blk{
        padding:3.5mm 7mm;
        border:1px solid #ddd;
        border-top:none;
      }

      .blk-eye{
        font-size:7pt;
        text-transform:uppercase;
        letter-spacing:.12em;
        font-weight:800;
        margin-bottom:1.5mm;
      }

      .eg{color:#c9a84c}
      .edk{color:#1c3829}
      .er{color:#dc2626}
      .egrn{color:#16a34a}

      .bpv{
        font-size:9pt;
        color:#333;
        line-height:1.65;
        font-style:italic;
      }

      .behl{
        display:flex;
        flex-direction:column;
        gap:1.5mm;
      }

      .beh{
        display:flex;
        gap:6px;
        font-size:9pt;
        color:#222;
        line-height:1.4;
      }

      .arr{
        color:#c9a84c;
        font-weight:700;
        flex-shrink:0;
      }

      .wtags{
        display:flex;
        flex-wrap:wrap;
        gap:4px;
      }

      .wtag{
        background:#fef2f2;
        border:1px solid #fecaca;
        color:#dc2626;
        font-size:7.5pt;
        font-weight:700;
        padding:2px 8px;
        border-radius:100px;
      }

      .upg{
        background:#f0fdf4;
        border:1px solid #bbf7d0;
        padding:3.5mm 7mm;
        border-top:none;
        border-radius:0 0 8px 8px;
      }

      .upg-eye{
        font-size:7pt;
        text-transform:uppercase;
        letter-spacing:.12em;
        font-weight:800;
        color:#16a34a;
        margin-bottom:1.5mm;
      }

      .upg-txt{
        font-size:9pt;
        color:#15803d;
        line-height:1.65;
        font-weight:500;
      }

      .wcard{
        display:flex;
        gap:3.5mm;
        align-items:flex-start;
        border:1px solid #ccc;
        border-radius:8px;
        padding:4mm 5mm;
        margin-bottom:3mm;
        flex-shrink:0;
      }

      .wnum{
        width:7mm;
        height:7mm;
        min-width:7mm;
        border-radius:50%;
        background:#1c3829;
        color:#c9a84c;
        font-size:10pt;
        font-weight:800;
        font-family:'Playfair Display',Georgia,serif;
        display:flex;
        align-items:center;
        justify-content:center;
        flex-shrink:0;
      }

      .wlbl{
        font-size:7pt;
        text-transform:uppercase;
        letter-spacing:.1em;
        font-weight:800;
        color:#c9a84c;
        margin-bottom:1.5mm;
      }

      .wtxt{
        font-size:9pt;
        color:#222;
        line-height:1.55;
        margin-bottom:1.5mm;
      }

      .wdo{
        font-size:8pt;
        color:#16a34a;
        font-weight:700;
        font-style:italic;
      }

      .brc{
        background:#f5f0e9;
        border:1px solid #ddd5c8;
        border-radius:8px;
        padding:5mm 7mm;
        flex-shrink:0;
      }

      .brc-h{
        font-family:'Playfair Display',Georgia,serif;
        font-size:11pt;
        font-weight:800;
        color:#1c3829;
        margin-bottom:2.5mm;
      }

      .brc-p{
        font-size:9pt;
        color:#333;
        line-height:1.7;
        margin-bottom:2mm;
      }

      .brc-p:last-child{
        margin-bottom:0;
      }

      .hero-img{
        width:100%;
        border-radius:8px;
        display:block;
        flex-shrink:0;
        margin-bottom:4mm;
        object-fit:cover;
        max-height:52mm;
      }

      .out-lbl{
        font-size:7.5pt;
        text-transform:uppercase;
        letter-spacing:.1em;
        font-weight:700;
        color:#777;
        margin-bottom:2mm;
        flex-shrink:0;
      }

      .oi{
        display:flex;
        gap:3mm;
        align-items:flex-start;
        padding:2mm 0;
        border-bottom:1px solid #eee;
        font-size:9pt;
        color:#222;
        flex-shrink:0;
      }

      .ock{
        color:#16a34a;
        font-weight:800;
        flex-shrink:0;
      }

      .cbox{
        margin-top:4mm;
        padding:5mm 7mm;
        border:1px solid #ddd5c8;
        border-radius:8px;
        background:#f5f0e9;
        flex-shrink:0;
      }

      .cbox-h{
        font-family:'Playfair Display',Georgia,serif;
        font-size:10.5pt;
        font-weight:800;
        color:#1c3829;
        margin-bottom:2mm;
      }

      .cbox-p{
        font-size:9pt;
        color:#333;
        line-height:1.6;
        margin-bottom:2mm;
      }

      .cbox-l{
        font-size:9pt;
        font-weight:700;
        color:#1c3829;
      }

      .so{
        margin-top:auto;
        text-align:center;
        padding-top:4mm;
        border-top:1px solid #ddd;
      }

      .so-h{
        font-family:'Playfair Display',Georgia,serif;
        font-size:10.5pt;
        color:#1c3829;
        font-weight:700;
      }

      .so-s{
        font-size:7.5pt;
        color:#888;
        margin-top:1.5mm;
      }

      .so-t{
        font-size:7.5pt;
        color:#bbb;
        margin-top:1mm;
      }

      @page{
        size:A4;
        margin:0;
      }

      @media print{
        body{
          margin:0!important;
          background:#fff!important;
        }

        .page{
          margin:0!important;
          box-shadow:none!important;
          width:210mm!important;
          height:297mm!important;
          min-height:297mm!important;
          max-height:297mm!important;
        }

        *{
          -webkit-print-color-adjust:exact!important;
          print-color-adjust:exact!important;
        }
      }
    `;

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Money Leak Audit Report — ${h(name)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>

<div class="page">
  ${hdr(name)}
  <div class="pc">
    <div class="nc">
      <div class="nc-lbl">Your Estimated Annual Money Leak</div>
      <div class="nc-num">${h(d.total)}</div>
      <div class="nc-sub">per year slipping through the cracks</div>
      <div class="nc-note">${h(d.calcNote)}</div>
    </div>

    ${sl("Your Primary Leak Type")}

    <div class="ac">
      <div class="ac-eye">Identified from your answers</div>
      <div class="ac-name">${h(d.archName)}</div>
      <div class="ac-desc">${h(d.archDesc)}</div>
    </div>

    ${sl("Where Your Money Is Leaking")}

    <div class="bdc">
      <div class="bdc-h">Annual Cost by Category</div>
      ${bar("Pricing Leaks", d.pricing, d.barP, "#dc2626")}
      ${bar("Time Leaks", d.time, d.barT, "#ea580c")}
      ${bar("Systems Leaks", d.systems, d.barS, "#ca8a04")}
      ${bar("Blueprint Tax", d.blueprint, d.barB, "#7c3aed")}
    </div>
  </div>
  ${ftr(1)}
</div>

<div class="page">
  ${hdr(name)}
  <div class="pc">
    ${sl("Your Money Blueprint Pattern")}

    <div class="bpw">
      <div class="bpb">
        <div class="bpb-eye">Your Money Blueprint &nbsp;·&nbsp; Core Belief</div>
        <div class="bpb-q">${h(d.bpBelief)}</div>
      </div>

      <div class="blk">
        <div class="blk-eye eg">The Little Voice In Your Head</div>
        <div class="bpv">${h(d.bpVoice)}</div>
      </div>

      <div class="blk">
        <div class="blk-eye edk">How It Shows Up In Your Business</div>
        <div class="behl">${behaviours}</div>
      </div>

      <div class="blk">
        <div class="blk-eye er">Watch Out For</div>
        <div class="wtags">${watchout}</div>
      </div>

      <div class="upg">
        <div class="upg-eye">The Upgrade</div>
        <div class="upg-txt">${h(d.bpUpgrade)}</div>
      </div>
    </div>
  </div>
  ${ftr(2)}
</div>

<div class="page">
  ${hdr(name)}
  <div class="pc">
    ${sl("3 Things You Can Do This Week")}

    <p style="font-size:8.5pt;color:#777;margin-bottom:3mm;flex-shrink:0">
      Specific to your primary leak. No event needed to start here.
    </p>

    ${wins}

    ${sl("The Complete Solution")}

    <div class="brc">
      <div class="brc-h">These quick wins are the start. Not the seal.</div>
      <p class="brc-p">${h(d.archBridge)}</p>
      <p class="brc-p">Every leak has two layers. The outer layer is the habit: charging too little, working too many hours, missing metrics. The inner layer is the blueprint, the belief that keeps recreating the habit even after you know better.</p>
      <p class="brc-p">The Millionaire Mind Hybrid addresses both in 3 days. Day 1 installs the financial systems framework. Days 2 and 3 do the deep blueprint work.</p>
    </div>
  </div>
  ${ftr(3)}
</div>

<div class="page">
  ${hdr(name)}
  <div class="pc">
    <img class="hero-img" src="${HERO_IMG}" alt="Millionaire Mind Intensive">

    ${sl("What Changes in 3 Days")}

    <div class="out-lbl">Millionaire Mind Hybrid Programme Outcomes</div>

    <div class="oi"><span class="ock">✓</span><span><strong>Day 1:</strong> Complete money management system, 6 accounts set up and running, including your Financial Freedom Account</span></div>
    <div class="oi"><span class="ock">✓</span><span><strong>Day 2:</strong> Blueprint pattern identified at the root, where it formed, what it costs, and what it sounds like in real time</span></div>
    <div class="oi"><span class="ock">✓</span><span><strong>Day 3:</strong> Pattern released through a proven conditioning process used with 1.5 million graduates worldwide</span></div>
    <div class="oi"><span class="ock">✓</span><span>Personalised passive income plan and your specific Financial Freedom number</span></div>
    <div class="oi"><span class="ock">✓</span><span>Pricing and leverage frameworks specific to your business size and industry</span></div>

    <div class="cbox">
      <div class="cbox-h">Ready to seal these leaks permanently?</div>
      <p class="cbox-p">You have seen the number. You know the blueprint. You have your first three steps. The question now is how fast you want to seal it.</p>
      <div class="cbox-l">Visit millionairemindworld.com &nbsp;·&nbsp; Claim your spot at Millionaire Mind Hybrid</div>
    </div>

    <div class="so">
      <div class="so-h">Millionaire Mind Intensive</div>
      <div class="so-s">T. Harv Eker &nbsp;·&nbsp; Success Resources &nbsp;·&nbsp; millionairemindworld.com</div>
      <div class="so-t">10 million attendees &nbsp;·&nbsp; 30 countries &nbsp;·&nbsp; 23 years</div>
    </div>
  </div>
  ${ftr(4)}
</div>

</body>
</html>`;
  }

  function saveAsPDF(data) {
    function doSave() {
      const raw = build(data);
      const parser = new DOMParser();
      const doc = parser.parseFromString(raw, "text/html");

      const styleTag = doc.querySelector("style");
      const cssText = styleTag ? styleTag.textContent : "";

      doc.querySelectorAll("script,.bar").forEach((el) => el.remove());

      const oldStyle = document.getElementById("_money_leak_report_css");
      if (oldStyle) oldStyle.remove();

      const oldWrap = document.getElementById("_money_leak_report_wrap");
      if (oldWrap) oldWrap.remove();

      const tmpStyle = document.createElement("style");
      tmpStyle.id = "_money_leak_report_css";
      tmpStyle.textContent = cssText;
      document.head.appendChild(tmpStyle);

      const wrap = document.createElement("div");
      wrap.id = "_money_leak_report_wrap";
      wrap.style.cssText = [
        "position:fixed",
        "left:0",
        "top:0",
        "width:210mm",
        "height:auto",
        "background:#fff",
        "z-index:-9999",
        "opacity:0",
        "pointer-events:none",
        "overflow:hidden"
      ].join(";");

      wrap.innerHTML = doc.body.innerHTML;
      document.body.appendChild(wrap);

      const fname =
        "Money-Leak-Audit-" + safeFileName(data && data.name) + ".pdf";

      function cleanup() {
        if (tmpStyle && tmpStyle.parentNode) tmpStyle.remove();
        if (wrap && wrap.parentNode) wrap.remove();
      }

      const options = {
        margin: [0, 0, 0, 0],
        filename: fname,
        image: {
          type: "jpeg",
          quality: 0.98
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 794
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait"
        },
        pagebreak: {
          mode: ["css", "legacy"],
          before: ".page"
        }
      };

      html2pdf()
        .set(options)
        .from(wrap)
        .save()
        .then(cleanup)
        .catch(function (err) {
          console.error("PDF generation failed:", err);
          cleanup();
          alert("Sorry, the PDF could not be generated. Please try again.");
        });
    }

    if (typeof html2pdf !== "undefined") {
      doSave();
    } else {
      const s = document.createElement("script");
      s.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      s.onload = doSave;
      s.onerror = function () {
        alert("PDF library could not load. Please check your internet connection and try again.");
      };
      document.head.appendChild(s);
    }
  }

  global.MoneyLeakReport = {
    save: saveAsPDF
  };
})(window);
