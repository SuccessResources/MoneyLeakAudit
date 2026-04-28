/**
 * Money Leak Audit — Personalised PDF Report Generator
 * report.js  |  Success Resources  |  Millionaire Mind Intensive
 *
 * Usage:
 *   MoneyLeakReport.open(data)
 *
 * data shape: {
 *   name         — "Jason Fan"
 *   total        — formatted total e.g. "S$234,000"
 *   pricing      — formatted pricing leak
 *   time         — formatted time leak
 *   systems      — formatted systems leak
 *   blueprint    — formatted blueprint tax
 *   barP/T/S/B   — 0-100 integers (bar fill %)
 *   calcNote     — "3 identified leaks across your solopreneur business..."
 *   archName     — "The Underprizer"
 *   archDesc     — paragraph
 *   archBridge   — bridge paragraph for complete solution
 *   bpName       — "The Hard Worker"
 *   bpBelief     — '"I must earn every cent..."'
 *   bpVoice      — '"If you are not exhausted..."'
 *   bpBehaviours — string[] e.g. ["Works 60-80 hours...", ...]
 *   bpWatchout   — string[] e.g. ["Burnout", "Income ceiling", ...]
 *   bpUpgrade    — upgrade paragraph
 *   wins         — [{label, text, action}, {}, {}]
 * }
 */

(function (global) {
  'use strict';

  /* ── Constants ───────────────────────────────────────── */
  const LOGO = 'https://cch-files.edge.live.ds25.io/cch/v/a4e3489d-6bf3-48c8-affb-c268ba45a538/files/ff96df6f1fde9_b0cbdd4d2f0ff-605c893fed0f4-sr-percent-20logo-percent-20white.png';

  const GREEN  = '#1c3829';
  const GOLD   = '#c9a84c';
  const GOLD_L = '#ddb84e';
  const RED    = '#dc2626';
  const ORA    = '#ea580c';
  const YEL    = '#ca8a04';
  const PUR    = '#7c3aed';
  const GRN    = '#16a34a';

  /* ── HTML escaping ───────────────────────────────────── */
  function h(s) {
    return (s || '').toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Shared page header (embedded in each page) ──────── */
  function pageHeader(name, page, total) {
    return `
      <div class="ph">
        <div class="ph-left">
          <span class="ph-title">MONEY LEAK AUDIT REPORT</span>
          <span class="ph-sub">Personalized for ${h(name)} &nbsp;&middot;&nbsp; Millionaire Mind Intensive &nbsp;&middot;&nbsp; T. Harv Eker</span>
        </div>
        <img class="ph-logo" src="${LOGO}" alt="Success Resources">
      </div>
      <div class="ph-line"></div>`;
  }

  /* ── Shared page footer (embedded in each page) ──────── */
  function pageFooter(pageNum, totalPages) {
    return `
      <div class="pf">
        <span class="pf-copy">&copy; 2026 Success Resources &nbsp;|&nbsp; Millionaire Mind Intensive</span>
        <span class="pf-page">Page ${pageNum} of ${totalPages}</span>
      </div>`;
  }

  /* ── Section label ───────────────────────────────────── */
  function secLabel(text) {
    return `<div class="sec-lbl"><span>${h(text)}</span></div>`;
  }

  /* ── Colour bar row ──────────────────────────────────── */
  function barRow(label, amount, pct, colour, dotClass) {
    return `
      <div class="brow">
        <div class="brow-top">
          <span class="bcat"><span class="bdot ${dotClass}"></span>${h(label)}</span>
          <span class="bamt" style="color:${colour}">${h(amount)}</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${pct}%;background:${colour}"></div>
        </div>
      </div>`;
  }

  /* ── Build complete HTML ─────────────────────────────── */
  function buildHTML(d) {

    /* Behaviour list */
    const behHTML = (d.bpBehaviours || []).map(b =>
      `<div class="beh-item"><span class="beh-arrow">&rarr;</span><span>${h(b)}</span></div>`
    ).join('');

    /* Watchout chips */
    const woHTML = (d.bpWatchout || []).map(w =>
      `<span class="wtag">${h(w)}</span>`
    ).join('');

    /* Quick wins */
    const winsHTML = (d.wins || []).map((w, i) => `
      <div class="win-card">
        <div class="win-num">${i + 1}</div>
        <div class="win-body">
          <div class="win-lbl">${h(w.label)}</div>
          <div class="win-text">${h(w.text)}</div>
          <div class="win-do">&rarr; ${h(w.action)}</div>
        </div>
      </div>`
    ).join('');

    const TOTAL_PAGES = 3;

    const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

/* ── SCREEN: grey background, pages as cards ── */
body{
  font-family:'Inter',system-ui,sans-serif;
  font-size:10pt;
  line-height:1.65;
  color:#111;
  background:#b0b0b0;
  -webkit-print-color-adjust:exact;
  print-color-adjust:exact;
}

/* Toolbar shown on screen only */
.toolbar{
  position:fixed;top:0;left:0;right:0;
  background:${GREEN};
  color:#fff;
  display:flex;align-items:center;justify-content:space-between;
  padding:10px 24px;
  z-index:9999;
  font-size:12px;
}
.toolbar strong{color:${GOLD}}
.print-btn{
  background:${GOLD};color:${GREEN};
  font-family:'Inter',sans-serif;font-size:13px;font-weight:800;
  padding:8px 22px;border-radius:6px;border:none;cursor:pointer;
}
.print-btn:hover{opacity:.9}

/* Page wrapper */
.page{
  background:#fff;
  width:210mm;
  min-height:297mm;
  margin:52px auto 20px;
  padding:0;
  box-shadow:0 4px 24px rgba(0,0,0,.25);
  display:flex;
  flex-direction:column;
  overflow:hidden;
  position:relative;
}

/* Page inner (gives the margin) */
.page-inner{
  flex:1;
  display:flex;
  flex-direction:column;
  padding:8mm 16mm 6mm;
  min-height:0;
}

/* ── PAGE HEADER ── */
.ph{
  display:flex;align-items:flex-end;justify-content:space-between;
  padding:5mm 16mm 3mm;
  background:#fff;
}
.ph-title{
  font-family:'Playfair Display',Georgia,serif;
  font-size:13.5pt;font-weight:900;
  color:${GREEN};letter-spacing:-.01em;
  display:block;margin-bottom:1.5mm;
}
.ph-sub{font-size:8pt;color:#666;letter-spacing:.02em;display:block}
.ph-logo{height:22px;display:block;opacity:.5;filter:grayscale(1)}
.ph-line{height:2.5px;background:${GREEN};margin:0 0 0}

/* ── PAGE FOOTER ── */
.pf{
  display:flex;align-items:center;justify-content:space-between;
  padding:3mm 16mm;
  border-top:1px solid #ddd;
  background:#fff;
  margin-top:auto;
}
.pf-copy{font-size:7.5pt;color:#999}
.pf-page{
  background:${GREEN};color:#fff;
  font-size:7.5pt;font-weight:700;
  padding:2px 10px;letter-spacing:.05em;
}

/* ── SECTION LABEL ── */
.sec-lbl{
  display:flex;align-items:center;gap:8px;
  font-size:7.5pt;text-transform:uppercase;letter-spacing:.14em;
  font-weight:700;color:#888;
  margin:6mm 0 3mm;
}
.sec-lbl::before,.sec-lbl::after{content:'';flex:1;height:1px;background:#ddd}

/* ── NUMBER CARD ── */
.number-card{
  background:${GREEN};
  border-radius:8px;
  padding:9mm 12mm;
  text-align:center;
  margin-bottom:5mm;
  position:relative;
  overflow:hidden;
}
.number-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,${GOLD},${GOLD_L},${GOLD});
}
.nc-lbl{
  font-size:7.5pt;text-transform:uppercase;letter-spacing:.14em;
  color:rgba(255,255,255,.6);font-weight:700;margin-bottom:3mm;
}
.nc-num{
  font-family:'Playfair Display',Georgia,serif;
  font-size:36pt;font-weight:900;
  color:${GOLD_L};line-height:1;letter-spacing:-.02em;margin-bottom:2.5mm;
}
.nc-sub{font-size:10.5pt;color:rgba(255,255,255,.7);margin-bottom:3.5mm}
.nc-note{
  font-size:7.5pt;color:rgba(255,255,255,.5);
  background:rgba(255,255,255,.08);
  border-radius:100px;padding:2.5px 11px;display:inline-block;
}

/* ── ARCHETYPE CARD ── */
.arch-card{
  border:1.5px solid ${GOLD};border-radius:8px;
  padding:5mm 7mm;margin-bottom:4mm;
  position:relative;overflow:hidden;
}
.arch-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:${GOLD};
}
.arch-eye{
  font-size:7.5pt;text-transform:uppercase;letter-spacing:.12em;
  font-weight:700;color:${GOLD};margin-bottom:1.5mm;
}
.arch-name{
  font-family:'Playfair Display',Georgia,serif;
  font-size:14pt;font-weight:800;color:${GREEN};margin-bottom:2mm;
}
.arch-desc{font-size:9.5pt;color:#222;line-height:1.65}

/* ── BREAKDOWN BARS ── */
.breakdown-card{
  border:1px solid #ccc;border-radius:8px;
  padding:5mm 7mm;margin-bottom:4mm;
}
.bcard-title{font-size:10pt;font-weight:800;color:${GREEN};margin-bottom:3.5mm}
.brow{margin-bottom:3mm}.brow:last-child{margin-bottom:0}
.brow-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5mm}
.bcat{font-size:9.5pt;font-weight:700;color:#111;display:flex;align-items:center;gap:5px}
.bdot{
  width:9px;height:9px;border-radius:50%;flex-shrink:0;
}
.bdot-r{background:${RED}}.bdot-o{background:${ORA}}
.bdot-y{background:${YEL}}.bdot-b{background:${PUR}}
.bamt{font-size:10pt;font-weight:800}
.bar-track{
  height:8px;background:#e8e3dc;border-radius:4px;overflow:hidden;
}
.bar-fill{height:100%;border-radius:4px}

/* ── BLUEPRINT DEEP-DIVE ── */
.bp-wrap{border-radius:8px;overflow:hidden;margin-bottom:4mm}
.bp-belief{
  background:${GREEN};padding:5mm 7mm;
}
.bp-belief-eye{
  font-size:7pt;text-transform:uppercase;letter-spacing:.14em;
  font-weight:800;color:rgba(255,255,255,.55);margin-bottom:2mm;
}
.bp-belief-q{
  font-family:'Playfair Display',Georgia,serif;
  font-size:12pt;font-style:italic;color:#fff;
  line-height:1.4;border-left:3px solid ${GOLD};padding-left:3mm;
}
.bp-block{padding:3.5mm 7mm;border:1px solid #ddd;border-top:none}
.bp-block:last-child{border-radius:0 0 8px 8px}
.bp-block-eye{
  font-size:7pt;text-transform:uppercase;letter-spacing:.12em;
  font-weight:800;margin-bottom:1.5mm;
}
.eye-g{color:${GOLD}}.eye-dk{color:${GREEN}}.eye-r{color:${RED}}.eye-grn{color:${GRN}}
.bp-voice-text{font-size:9.5pt;color:#333;line-height:1.65;font-style:italic}
.beh-list{display:flex;flex-direction:column;gap:1.5mm}
.beh-item{display:flex;gap:6px;font-size:9.5pt;color:#222;line-height:1.45}
.beh-arrow{color:${GOLD};font-weight:700;flex-shrink:0}
.watch-tags{display:flex;flex-wrap:wrap;gap:4px}
.wtag{
  background:#fef2f2;border:1px solid #fecaca;
  color:${RED};font-size:7.5pt;font-weight:700;
  padding:2px 8px;border-radius:100px;
}
.upgrade-block{
  background:#f0fdf4;border:1px solid #bbf7d0;
  padding:3.5mm 7mm;border-top:none;border-radius:0 0 8px 8px;
}
.upgrade-eye{
  font-size:7pt;text-transform:uppercase;letter-spacing:.12em;
  font-weight:800;color:${GRN};margin-bottom:1.5mm;
}
.upgrade-text{font-size:9.5pt;color:#15803d;line-height:1.65;font-weight:500}

/* ── QUICK WIN CARDS ── */
.win-card{
  display:flex;gap:3.5mm;align-items:flex-start;
  border:1px solid #ccc;border-radius:8px;
  padding:4mm 5mm;margin-bottom:2.5mm;
}
.win-num{
  width:7mm;height:7mm;min-width:7mm;
  border-radius:50%;background:${GREEN};color:${GOLD};
  font-size:10pt;font-weight:800;font-family:'Playfair Display',serif;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;margin-top:0.5mm;
}
.win-lbl{
  font-size:7pt;text-transform:uppercase;letter-spacing:.1em;
  font-weight:800;color:${GOLD};margin-bottom:1.5mm;
}
.win-text{font-size:9.5pt;color:#222;line-height:1.6;margin-bottom:1.5mm}
.win-do{font-size:8.5pt;color:${GRN};font-weight:700;font-style:italic}

/* ── BRIDGE CARD ── */
.bridge-card{
  background:#f5f0e9;border:1px solid #ddd5c8;
  border-radius:8px;padding:5mm 7mm;margin-bottom:3.5mm;
}
.bridge-h{
  font-family:'Playfair Display',serif;font-size:11.5pt;
  font-weight:800;color:${GREEN};margin-bottom:2.5mm;
}
.bridge-p{font-size:9.5pt;color:#333;line-height:1.75;margin-bottom:2mm}
.bridge-p:last-child{margin-bottom:0}

/* ── OUTCOMES ── */
.out-lbl{
  font-size:7.5pt;text-transform:uppercase;letter-spacing:.1em;
  font-weight:700;color:#777;margin-bottom:2.5mm;
}
.out-item{
  display:flex;gap:3mm;align-items:flex-start;
  padding:2mm 0;border-bottom:1px solid #eee;
  font-size:9.5pt;color:#222;
}
.out-item:last-child{border-bottom:none}
.out-chk{color:${GRN};font-weight:800;flex-shrink:0;margin-top:0.5mm}

/* ── CLOSING BOX ── */
.close-box{
  margin-top:5mm;padding:5mm 7mm;
  border:1px solid #ddd5c8;border-radius:8px;background:#f5f0e9;
}
.close-h{
  font-family:'Playfair Display',serif;
  font-size:11pt;font-weight:800;color:${GREEN};margin-bottom:2mm;
}
.close-p{font-size:9.5pt;color:#333;line-height:1.65;margin-bottom:2.5mm}
.close-link{font-size:9.5pt;font-weight:700;color:${GREEN}}

/* ── SIGN-OFF ── */
.sign-off{
  margin-top:5mm;text-align:center;
  padding-top:4mm;border-top:1px solid #ddd;
}
.sign-off-h{
  font-family:'Playfair Display',serif;
  font-size:11pt;color:${GREEN};font-weight:700;
}
.sign-off-s{font-size:7.5pt;color:#888;margin-top:1.5mm}
.sign-off-t{font-size:7.5pt;color:#bbb;margin-top:1mm}

/* ── PRINT MODE ── */
@media print {
  body{background:#fff!important}
  .toolbar{display:none!important}
  .page{
    box-shadow:none!important;
    margin:0 auto!important;
    page-break-after:always;
    break-after:page;
    width:100%!important;
  }
  .page:last-of-type{
    page-break-after:auto;
    break-after:auto;
  }
  *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
}
@page{size:A4;margin:0}
`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Money Leak Audit Report — ${h(d.name)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>

<div class="toolbar">
  <span>&#128196; Your personalised report is ready &nbsp;&mdash;&nbsp; click <strong>Save as PDF</strong> to download</span>
  <button class="print-btn" onclick="window.print()">&#8681;&nbsp; Save as PDF</button>
</div>


<!-- ═══════════════════════════════════════════
     PAGE 1 — Your Leak Number + Archetype + Bars
     ═══════════════════════════════════════════ -->
<div class="page">
  ${pageHeader(d.name, 1, TOTAL_PAGES)}
  <div class="page-inner">

    <div class="number-card">
      <div class="nc-lbl">Your Estimated Annual Money Leak</div>
      <div class="nc-num">${h(d.total)}</div>
      <div class="nc-sub">per year slipping through the cracks</div>
      <div class="nc-note">${h(d.calcNote)}</div>
    </div>

    ${secLabel('Your Primary Leak Type')}
    <div class="arch-card">
      <div class="arch-eye">Identified from your answers</div>
      <div class="arch-name">${h(d.archName)}</div>
      <div class="arch-desc">${h(d.archDesc)}</div>
    </div>

    ${secLabel('Where Your Money Is Leaking')}
    <div class="breakdown-card">
      <div class="bcard-title">Annual Cost by Category</div>
      ${barRow('Pricing Leaks',  d.pricing,  d.barP, RED, 'bdot-r')}
      ${barRow('Time Leaks',     d.time,     d.barT, ORA, 'bdot-o')}
      ${barRow('Systems Leaks',  d.systems,  d.barS, YEL, 'bdot-y')}
      ${barRow('Blueprint Tax',  d.blueprint,d.barB, PUR, 'bdot-b')}
    </div>

  </div>
  ${pageFooter(1, TOTAL_PAGES)}
</div>


<!-- ═══════════════════════════════════════════
     PAGE 2 — Blueprint Deep-Dive + Quick Wins
     ═══════════════════════════════════════════ -->
<div class="page">
  ${pageHeader(d.name, 2, TOTAL_PAGES)}
  <div class="page-inner">

    ${secLabel('Your Money Blueprint Pattern')}
    <div class="bp-wrap">
      <div class="bp-belief">
        <div class="bp-belief-eye">Your Money Blueprint &nbsp;&middot;&nbsp; Core Belief</div>
        <div class="bp-belief-q">${h(d.bpBelief)}</div>
      </div>
      <div class="bp-block">
        <div class="bp-block-eye eye-g">The Little Voice In Your Head</div>
        <div class="bp-voice-text">${h(d.bpVoice)}</div>
      </div>
      <div class="bp-block">
        <div class="bp-block-eye eye-dk">How It Shows Up In Your Business</div>
        <div class="beh-list">${behHTML}</div>
      </div>
      <div class="bp-block">
        <div class="bp-block-eye eye-r">Watch Out For</div>
        <div class="watch-tags">${woHTML}</div>
      </div>
      <div class="upgrade-block">
        <div class="upgrade-eye eye-grn">The Upgrade</div>
        <div class="upgrade-text">${h(d.bpUpgrade)}</div>
      </div>
    </div>

    ${secLabel('3 Things You Can Do This Week')}
    <p style="font-size:8.5pt;color:#777;margin-bottom:3mm">Specific to your primary leak. No event needed to start here.</p>
    ${winsHTML}

  </div>
  ${pageFooter(2, TOTAL_PAGES)}
</div>


<!-- ═══════════════════════════════════════════
     PAGE 3 — The Complete Solution
     ═══════════════════════════════════════════ -->
<div class="page">
  ${pageHeader(d.name, 3, TOTAL_PAGES)}
  <div class="page-inner">

    ${secLabel('The Complete Solution')}
    <div class="bridge-card">
      <div class="bridge-h">These quick wins are the start. Not the seal.</div>
      <p class="bridge-p">${h(d.archBridge)}</p>
      <p class="bridge-p">Every leak has two layers. The outer layer is the habit: charging too little, working too many hours, missing metrics. The inner layer is the blueprint, the belief that keeps recreating the habit even after you know better. Fixing the outer without addressing the inner is why most people improve briefly, then reset.</p>
      <p class="bridge-p">The <strong>Millionaire Mind Hybrid</strong> addresses both in 3 days. Day 1 installs the financial systems framework. Days 2 and 3 do the deep blueprint work, identifying where the pattern formed, releasing it, and rewiring it permanently.</p>
    </div>

    ${secLabel('What Changes in 3 Days')}
    <div class="out-lbl">Millionaire Mind Hybrid Programme Outcomes</div>
    <div class="out-item"><span class="out-chk">&#10003;</span><span><strong>Day 1:</strong> Complete money management system, 6 accounts set up and running, including your Financial Freedom Account</span></div>
    <div class="out-item"><span class="out-chk">&#10003;</span><span><strong>Day 2:</strong> Blueprint pattern identified at the root, where it formed, what it costs, and what it sounds like in real time</span></div>
    <div class="out-item"><span class="out-chk">&#10003;</span><span><strong>Day 3:</strong> Pattern released through a proven conditioning process used with 1.5 million graduates worldwide</span></div>
    <div class="out-item"><span class="out-chk">&#10003;</span><span>Personalised passive income plan and your specific Financial Freedom number</span></div>
    <div class="out-item"><span class="out-chk">&#10003;</span><span>Pricing and leverage frameworks specific to your business size and industry</span></div>

    <div class="close-box">
      <div class="close-h">Ready to seal these leaks permanently?</div>
      <p class="close-p">You have seen the number. You know the blueprint. You have your first three steps. The question now is how fast you want to seal it, and whether you want to do it alone or with 23 years of proven methodology behind you.</p>
      <div class="close-link">Visit millionairemindworld.com &nbsp;&middot;&nbsp; Claim your spot at Millionaire Mind Hybrid</div>
    </div>

    <div class="sign-off">
      <div class="sign-off-h">Millionaire Mind Intensive</div>
      <div class="sign-off-s">T. Harv Eker &nbsp;&middot;&nbsp; Success Resources &nbsp;&middot;&nbsp; millionairemindworld.com</div>
      <div class="sign-off-t">10 million attendees &nbsp;&middot;&nbsp; 30 countries &nbsp;&middot;&nbsp; 23 years</div>
    </div>

  </div>
  ${pageFooter(3, TOTAL_PAGES)}
</div>

<script>
/* Auto-trigger print after fonts load */
document.fonts.ready.then(function(){
  setTimeout(function(){ window.print(); }, 800);
});
</script>

</body>
</html>`;
  } /* end buildHTML */

  /* ── Public API ──────────────────────────────────────── */
  function openReport(data) {
    const html = buildHTML(data);
    const win  = window.open('', '_blank');
    if (!win) {
      alert('Please allow pop-ups in your browser, then click Download Report again.');
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
  }

  global.MoneyLeakReport = { open: openReport };

})(window);
