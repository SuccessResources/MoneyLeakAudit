/**
 * Money Leak Audit — Personalised PDF Report Generator
 * report.js  |  Success Resources  |  Millionaire Mind Intensive
 *
 * Usage:  MoneyLeakReport.open(data)
 *
 * data: { name, total, pricing, time, systems, blueprint,
 *         barP, barT, barS, barB, calcNote,
 *         archName, archDesc, archBridge,
 *         bpName, bpBelief, bpVoice, bpBehaviours[], bpWatchout[], bpUpgrade,
 *         wins[{label,text,action}] }
 */
(function (global) {
  'use strict';

  const LOGO    = 'https://cch-files.edge.live.ds25.io/cch/v/a4e3489d-6bf3-48c8-affb-c268ba45a538/files/ff96df6f1fde9_b0cbdd4d2f0ff-605c893fed0f4-sr-percent-20logo-percent-20white.png';
  const GREEN   = '#1c3829';
  const GOLD    = '#c9a84c';
  const GOLD_L  = '#ddb84e';
  const RED     = '#dc2626';
  const ORA     = '#ea580c';
  const YEL     = '#ca8a04';
  const PUR     = '#7c3aed';
  const GRN     = '#16a34a';
  const TOTAL   = 4; /* total pages */

  function h(s){ return (s||'').toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  /* ── Page header (inside every page) ───────────────── */
  function hdr(name){
    return `
    <div class="ph">
      <div>
        <span class="ph-title">MONEY LEAK AUDIT REPORT</span>
        <span class="ph-sub">Personalized for ${h(name)} &nbsp;&middot;&nbsp; Millionaire Mind Intensive &nbsp;&middot;&nbsp; T. Harv Eker</span>
      </div>
      <img class="ph-logo" src="${LOGO}" alt="Success Resources">
    </div>
    <div class="ph-rule"></div>`;
  }

  /* ── Page footer (inside every page) ───────────────── */
  function ftr(n){
    return `
    <div class="pf">
      <span class="pf-copy">&copy; 2026 Success Resources &nbsp;|&nbsp; Millionaire Mind Intensive</span>
      <span class="pf-num">Page ${n} of ${TOTAL}</span>
    </div>`;
  }

  /* ── Section label ──────────────────────────────────── */
  function sl(t){ return `<div class="sl"><span>${h(t)}</span></div>`; }

  /* ── Bar row ────────────────────────────────────────── */
  function bar(label, amount, pct, colour, dc){
    return `
    <div class="brow">
      <div class="brow-top">
        <span class="bcat"><span class="bdot" style="background:${colour}"></span>${h(label)}</span>
        <span class="bamt" style="color:${colour}">${h(amount)}</span>
      </div>
      <div class="bt"><div class="bf" style="width:${pct}%;background:${colour}"></div></div>
    </div>`;
  }

  /* ── Full HTML ──────────────────────────────────────── */
  function build(d){

    const beh = (d.bpBehaviours||[]).map(b=>`<div class="beh"><span class="arr">&rarr;</span><span>${h(b)}</span></div>`).join('');
    const wo  = (d.bpWatchout||[]).map(w=>`<span class="wtag">${h(w)}</span>`).join('');
    const ws  = (d.wins||[]).map((w,i)=>`
      <div class="wcard">
        <div class="wnum">${i+1}</div>
        <div>
          <div class="wlbl">${h(w.label)}</div>
          <div class="wtxt">${h(w.text)}</div>
          <div class="wdo">&rarr; ${h(w.action)}</div>
        </div>
      </div>`).join('');

    const css = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{
  font-family:'Inter',system-ui,sans-serif;
  font-size:10pt;line-height:1.65;color:#111;
  background:#aaa;
  -webkit-print-color-adjust:exact;
  print-color-adjust:exact;
}

/* ── TOOLBAR (screen only) ── */
.bar{
  position:fixed;top:0;left:0;right:0;z-index:9999;
  background:${GREEN};
  display:flex;align-items:center;justify-content:space-between;
  padding:10px 24px;
  font-family:'Inter',sans-serif;font-size:12px;color:#fff;
}
.bar em{color:${GOLD};font-style:normal;font-weight:700}
.save-btn{
  background:${GOLD};color:${GREEN};
  font-family:'Inter',sans-serif;font-size:13px;font-weight:800;
  padding:9px 24px;border-radius:6px;border:none;cursor:pointer;
  white-space:nowrap;
}
.save-btn:hover{opacity:.9}
.save-note{
  font-size:10px;color:rgba(255,255,255,.5);margin-top:3px;text-align:right;
}

/* ── PAGE CARD ── */
.page{
  background:#fff;
  width:210mm;
  height:297mm;           /* exact A4 — nothing overflows */
  margin:52px auto 20px;
  display:flex;
  flex-direction:column;
  overflow:hidden;        /* hard clip at A4 boundary */
  box-shadow:0 4px 24px rgba(0,0,0,.25);
}

/* ── HEADER INSIDE PAGE ── */
.ph{
  display:flex;align-items:flex-end;justify-content:space-between;
  padding:5mm 14mm 3mm;flex-shrink:0;
}
.ph-title{
  font-family:'Playfair Display',Georgia,serif;
  font-size:13pt;font-weight:900;color:${GREEN};
  letter-spacing:-.01em;display:block;margin-bottom:1.5mm;
}
.ph-sub{font-size:7.5pt;color:#666;display:block}
.ph-logo{height:20px;opacity:.5;filter:grayscale(1);display:block}
.ph-rule{height:2.5px;background:${GREEN};flex-shrink:0}

/* ── CONTENT AREA ── */
.pc{flex:1;padding:6mm 14mm 4mm;overflow:hidden;display:flex;flex-direction:column;gap:0}

/* ── FOOTER INSIDE PAGE ── */
.pf{
  display:flex;align-items:center;justify-content:space-between;
  padding:3mm 14mm;border-top:1px solid #ddd;flex-shrink:0;
}
.pf-copy{font-size:7pt;color:#999}
.pf-num{
  background:${GREEN};color:#fff;
  font-size:7pt;font-weight:700;padding:2px 10px;letter-spacing:.05em;
}

/* ── SECTION LABEL ── */
.sl{
  display:flex;align-items:center;gap:8px;
  font-size:7pt;text-transform:uppercase;letter-spacing:.14em;
  font-weight:700;color:#888;margin:4mm 0 3mm;flex-shrink:0;
}
.sl::before,.sl::after{content:'';flex:1;height:1px;background:#ddd}

/* ── NUMBER CARD ── */
.nc{
  background:${GREEN};border-radius:8px;padding:8mm 12mm;
  text-align:center;position:relative;overflow:hidden;flex-shrink:0;
}
.nc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,${GOLD},${GOLD_L},${GOLD});}
.nc-lbl{font-size:7pt;text-transform:uppercase;letter-spacing:.14em;
  color:rgba(255,255,255,.6);font-weight:700;margin-bottom:3mm;}
.nc-num{font-family:'Playfair Display',serif;font-size:34pt;font-weight:900;
  color:${GOLD_L};line-height:1;letter-spacing:-.02em;margin-bottom:2mm;}
.nc-sub{font-size:10pt;color:rgba(255,255,255,.7);margin-bottom:3mm}
.nc-note{font-size:7pt;color:rgba(255,255,255,.5);background:rgba(255,255,255,.08);
  border-radius:100px;padding:2px 11px;display:inline-block;}

/* ── ARCHETYPE CARD ── */
.ac{border:1.5px solid ${GOLD};border-radius:8px;padding:5mm 7mm;
  flex-shrink:0;position:relative;overflow:hidden;margin-top:0}
.ac::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:${GOLD};}
.ac-eye{font-size:7pt;text-transform:uppercase;letter-spacing:.12em;
  font-weight:700;color:${GOLD};margin-bottom:1.5mm;}
.ac-name{font-family:'Playfair Display',serif;font-size:13pt;font-weight:800;
  color:${GREEN};margin-bottom:1.5mm;}
.ac-desc{font-size:9pt;color:#222;line-height:1.65}

/* ── BREAKDOWN CARD ── */
.bdc{border:1px solid #ccc;border-radius:8px;padding:5mm 7mm;flex-shrink:0}
.bdc-h{font-size:9.5pt;font-weight:800;color:${GREEN};margin-bottom:3.5mm}
.brow{margin-bottom:2.5mm}.brow:last-child{margin-bottom:0}
.brow-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5mm}
.bcat{font-size:9pt;font-weight:700;color:#111;display:flex;align-items:center;gap:5px}
.bdot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
.bamt{font-size:9.5pt;font-weight:800}
.bt{height:7px;background:#e8e3dc;border-radius:4px;overflow:hidden}
.bf{height:100%;border-radius:4px}

/* ── BLUEPRINT WRAP ── */
.bpw{border-radius:8px;overflow:hidden;flex-shrink:0}
.bpb{background:${GREEN};padding:5mm 7mm}
.bpb-eye{font-size:7pt;text-transform:uppercase;letter-spacing:.14em;
  font-weight:800;color:rgba(255,255,255,.55);margin-bottom:2mm;}
.bpb-q{font-family:'Playfair Display',serif;font-size:11.5pt;font-style:italic;
  color:#fff;line-height:1.4;border-left:3px solid ${GOLD};padding-left:3mm;}
.blk{padding:3.5mm 7mm;border:1px solid #ddd;border-top:none}
.blk:last-child{border-radius:0 0 8px 8px}
.blk-eye{font-size:7pt;text-transform:uppercase;letter-spacing:.12em;
  font-weight:800;margin-bottom:1.5mm;}
.eg{color:${GOLD}}.edk{color:${GREEN}}.er{color:${RED}}.egrn{color:${GRN}}
.bpv{font-size:9pt;color:#333;line-height:1.65;font-style:italic}
.behl{display:flex;flex-direction:column;gap:1.5mm}
.beh{display:flex;gap:6px;font-size:9pt;color:#222;line-height:1.4}
.arr{color:${GOLD};font-weight:700;flex-shrink:0}
.wtags{display:flex;flex-wrap:wrap;gap:4px}
.wtag{background:#fef2f2;border:1px solid #fecaca;color:${RED};
  font-size:7.5pt;font-weight:700;padding:2px 8px;border-radius:100px;}
.upg{background:#f0fdf4;border:1px solid #bbf7d0;
  padding:3.5mm 7mm;border-top:none;border-radius:0 0 8px 8px;}
.upg-eye{font-size:7pt;text-transform:uppercase;letter-spacing:.12em;
  font-weight:800;color:${GRN};margin-bottom:1.5mm;}
.upg-txt{font-size:9pt;color:#15803d;line-height:1.65;font-weight:500}

/* ── WIN CARDS ── */
.wcard{display:flex;gap:3.5mm;align-items:flex-start;
  border:1px solid #ccc;border-radius:8px;padding:4mm 5mm;flex-shrink:0}
.wnum{width:7mm;height:7mm;min-width:7mm;border-radius:50%;
  background:${GREEN};color:${GOLD};font-size:10pt;font-weight:800;
  font-family:'Playfair Display',serif;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.wlbl{font-size:7pt;text-transform:uppercase;letter-spacing:.1em;
  font-weight:800;color:${GOLD};margin-bottom:1.5mm;}
.wtxt{font-size:9pt;color:#222;line-height:1.6;margin-bottom:1.5mm}
.wdo{font-size:8pt;color:${GRN};font-weight:700;font-style:italic}

/* ── BRIDGE CARD ── */
.brc{background:#f5f0e9;border:1px solid #ddd5c8;
  border-radius:8px;padding:5mm 7mm;flex-shrink:0}
.brc-h{font-family:'Playfair Display',serif;font-size:11pt;
  font-weight:800;color:${GREEN};margin-bottom:2.5mm;}
.brc-p{font-size:9pt;color:#333;line-height:1.75;margin-bottom:2mm}
.brc-p:last-child{margin-bottom:0}

/* ── OUTCOMES ── */
.out-lbl{font-size:7.5pt;text-transform:uppercase;letter-spacing:.1em;
  font-weight:700;color:#777;margin-bottom:2mm;flex-shrink:0}
.oi{display:flex;gap:3mm;align-items:flex-start;
  padding:2mm 0;border-bottom:1px solid #eee;font-size:9pt;color:#222;flex-shrink:0}
.oi:last-child{border-bottom:none}
.ock{color:${GRN};font-weight:800;flex-shrink:0;margin-top:0.5mm}

/* ── CLOSE BOX ── */
.cbox{margin-top:4mm;padding:5mm 7mm;border:1px solid #ddd5c8;
  border-radius:8px;background:#f5f0e9;flex-shrink:0}
.cbox-h{font-family:'Playfair Display',serif;font-size:10.5pt;
  font-weight:800;color:${GREEN};margin-bottom:2mm;}
.cbox-p{font-size:9pt;color:#333;line-height:1.65;margin-bottom:2mm}
.cbox-l{font-size:9pt;font-weight:700;color:${GREEN}}

/* ── SIGN-OFF ── */
.so{margin-top:auto;text-align:center;padding-top:4mm;border-top:1px solid #ddd}
.so-h{font-family:'Playfair Display',serif;font-size:10.5pt;
  color:${GREEN};font-weight:700;}
.so-s{font-size:7.5pt;color:#888;margin-top:1.5mm}
.so-t{font-size:7.5pt;color:#bbb;margin-top:1mm}

/* ── PRINT ── */
@media print{
  body{background:#fff!important}
  .bar{display:none!important}
  .page{
    box-shadow:none!important;
    margin:0 auto!important;
    page-break-after:always;
    break-after:page;
    width:100%!important;
    height:100vh!important;
  }
  .page:last-of-type{page-break-after:auto;break-after:auto}
  *{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}
}
@page{size:A4;margin:0}
`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Money Leak Audit Report — ${h(d.name)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>

<!-- TOOLBAR -->
<div class="bar">
  <span>&#128196; Your personalised report is ready &nbsp;&mdash;&nbsp;
    click <em>Save as PDF</em> then choose where to save it on your laptop</span>
  <div>
    <button class="save-btn" onclick="window.print()">&#8681;&nbsp; Save as PDF</button>
    <div class="save-note">Chrome will open a dialog &rarr; click Save</div>
  </div>
</div>


<!-- ═══════════════════════════════════
     PAGE 1 — Number · Archetype · Bars
     ═══════════════════════════════════ -->
<div class="page">
  ${hdr(d.name)}
  <div class="pc">

    <div class="nc">
      <div class="nc-lbl">Your Estimated Annual Money Leak</div>
      <div class="nc-num">${h(d.total)}</div>
      <div class="nc-sub">per year slipping through the cracks</div>
      <div class="nc-note">${h(d.calcNote)}</div>
    </div>

    ${sl('Your Primary Leak Type')}
    <div class="ac">
      <div class="ac-eye">Identified from your answers</div>
      <div class="ac-name">${h(d.archName)}</div>
      <div class="ac-desc">${h(d.archDesc)}</div>
    </div>

    ${sl('Where Your Money Is Leaking')}
    <div class="bdc">
      <div class="bdc-h">Annual Cost by Category</div>
      ${bar('Pricing Leaks',  d.pricing,  d.barP, RED, '')}
      ${bar('Time Leaks',     d.time,     d.barT, ORA, '')}
      ${bar('Systems Leaks',  d.systems,  d.barS, YEL, '')}
      ${bar('Blueprint Tax',  d.blueprint,d.barB, PUR, '')}
    </div>

  </div>
  ${ftr(1)}
</div>


<!-- ═══════════════════════════════════
     PAGE 2 — Blueprint Deep-Dive
     ═══════════════════════════════════ -->
<div class="page">
  ${hdr(d.name)}
  <div class="pc">

    ${sl('Your Money Blueprint Pattern')}
    <div class="bpw">
      <div class="bpb">
        <div class="bpb-eye">Your Money Blueprint &nbsp;&middot;&nbsp; Core Belief</div>
        <div class="bpb-q">${h(d.bpBelief)}</div>
      </div>
      <div class="blk">
        <div class="blk-eye eg">The Little Voice In Your Head</div>
        <div class="bpv">${h(d.bpVoice)}</div>
      </div>
      <div class="blk">
        <div class="blk-eye edk">How It Shows Up In Your Business</div>
        <div class="behl">${beh}</div>
      </div>
      <div class="blk">
        <div class="blk-eye er">Watch Out For</div>
        <div class="wtags">${wo}</div>
      </div>
      <div class="upg">
        <div class="upg-eye egrn">The Upgrade</div>
        <div class="upg-txt">${h(d.bpUpgrade)}</div>
      </div>
    </div>

  </div>
  ${ftr(2)}
</div>


<!-- ═══════════════════════════════════════
     PAGE 3 — 3 Quick Wins + Complete Solution
     ═══════════════════════════════════════ -->
<div class="page">
  ${hdr(d.name)}
  <div class="pc">

    ${sl('3 Things You Can Do This Week')}
    <p style="font-size:8.5pt;color:#777;margin-bottom:3mm;flex-shrink:0">
      Three immediate actions based on your primary leak. Start this week.
    </p>
    ${ws}

    ${sl('The Complete Solution')}
    <div class="brc">
      <div class="brc-h">These quick wins are the start. Not the seal.</div>
      <p class="brc-p">${h(d.archBridge)}</p>
      <p class="brc-p">Every leak has two layers. The outer layer is the habit: charging too little, working too many hours, missing metrics. The inner layer is the blueprint, the belief that keeps recreating the habit even after you know better. Fixing the outer without addressing the inner is why most people improve briefly, then reset.</p>
    </div>

  </div>
  ${ftr(3)}
</div>


<!-- ══════════════════════════════════════════
     PAGE 4 — MMI Image + What Changes in 3 Days
     ══════════════════════════════════════════ -->
<div class="page">
  ${hdr(d.name)}
  <div class="pc">

    <img
      src="https://cch-files.edge.live.ds25.io/cch/v/a4e3489d-6bf3-48c8-affb-c268ba45a538/files/69f059e55e8f9_mmo22-web.png"
      alt="Millionaire Mind Intensive"
      style="width:100%;border-radius:8px;display:block;flex-shrink:0;margin-bottom:4mm;object-fit:cover;max-height:52mm"
    >

    ${sl('What Changes in 3 Days')}
    <div class="out-lbl">Millionaire Mind Hybrid Programme Outcomes</div>
    <div class="oi"><span class="ock">&#10003;</span><span><strong>Day 1:</strong> Complete money management system, 6 accounts set up and running, including your Financial Freedom Account</span></div>
    <div class="oi"><span class="ock">&#10003;</span><span><strong>Day 2:</strong> Blueprint pattern identified at the root, where it formed, what it costs, and what it sounds like in real time</span></div>
    <div class="oi"><span class="ock">&#10003;</span><span><strong>Day 3:</strong> Pattern released through a proven conditioning process used with 1.5 million graduates worldwide</span></div>
    <div class="oi"><span class="ock">&#10003;</span><span>Personalised passive income plan and your specific Financial Freedom number</span></div>
    <div class="oi"><span class="ock">&#10003;</span><span>Pricing and leverage frameworks specific to your business size and industry</span></div>

    <div class="cbox">
      <div class="cbox-h">Ready to seal these leaks permanently?</div>
      <p class="cbox-p">You have seen the number. You know the blueprint. You have your first three steps. The question now is how fast you want to seal it, and whether you want to do it alone or with 23 years of proven methodology behind you.</p>
      <div class="cbox-l">Visit millionairemind.online/money &nbsp;&middot;&nbsp; Claim your spot at Millionaire Mind Hybrid</div>
    </div>

    <div class="so">
      <div class="so-h">Millionaire Mind Intensive</div>
      <div class="so-s">T. Harv Eker &nbsp;&middot;&nbsp; Success Resources &nbsp;&middot;&nbsp; millionairemind.online/money</div>
      <div class="so-t">10 million attendees &nbsp;&middot;&nbsp; 30 countries &nbsp;&middot;&nbsp; 23 years</div>
    </div>

  </div>
  ${ftr(4)}
</div>


<script>
/* Auto-trigger print after fonts fully load */
document.fonts.ready.then(function(){
  setTimeout(function(){ window.print(); }, 900);
});
</script>
</body>
</html>`;

  } /* end build */

  /* ── Build HTML (autoprint flag controls the inline script) ── */
  function buildHTML(data, autoprint){
    /* Temporarily swap the auto-print script based on context */
    const original = build(data);
    if(autoprint) return original;
    /* Strip the auto-print <script> block for iframe use */
    return original.replace(/<script>[\s\S]*?document\.fonts\.ready[\s\S]*?<\/script>/,'');
  }

  /* ── SAVE: direct download via html2pdf.js (zero dialog) ───── */
  function saveAsPDF(data){

    function doSave(){
      /* Parse the built HTML */
      const raw     = build(data, false);
      const parser  = new DOMParser();
      const doc     = parser.parseFromString(raw, 'text/html');

      /* Pull the CSS text out of the <style> tag */
      const styleTag = doc.querySelector('style');
      const cssText  = styleTag ? styleTag.textContent : '';

      /* Remove toolbar + scripts from the pages we'll render */
      doc.querySelectorAll('.bar, script').forEach(el => el.remove());

      /* Inject CSS into <head> temporarily so html2canvas can see it */
      const tmpStyle = document.createElement('style');
      tmpStyle.id = '_rpt_css';
      /* Add page-break rule outside @media so html2pdf respects it */
      tmpStyle.textContent = cssText + '\n.page{page-break-after:always;break-after:page;}';
      document.head.appendChild(tmpStyle);

      /* Create off-screen container with the page divs */
      const wrap = document.createElement('div');
      wrap.id    = '_rpt_wrap';
      wrap.style.cssText = [
        'position:fixed','left:-300%','top:0',
        'width:210mm','background:#fff',
        'z-index:-9999','pointer-events:none'
      ].join(';');
      wrap.innerHTML = doc.body.innerHTML;
      document.body.appendChild(wrap);

      /* Clean up helper */
      function cleanup(){ tmpStyle.remove(); wrap.remove(); }

      /* Name the file */
      const fname = 'Money-Leak-Audit-'
        + (data.name || 'Report').replace(/[^\w\s-]/g,'').replace(/\s+/g,'-')
        + '.pdf';

      html2pdf()
        .set({
          margin:     0,
          filename:   fname,
          image:      { type:'jpeg', quality:0.95 },
          html2canvas:{ scale:2, useCORS:true, allowTaint:true, logging:false },
          jsPDF:      { unit:'mm', format:'a4', orientation:'portrait' },
          pagebreak:  { before:'.page', mode:['css','legacy'] }
        })
        .from(wrap)
        .save()
        .then(cleanup)
        .catch(err => {
          console.warn('html2pdf failed, falling back to print dialog:', err);
          cleanup();
          printInPage(data); /* fallback: iframe print */
        });
    }

    /* Lazy-load html2pdf.js from CDN on first use */
    if(typeof html2pdf !== 'undefined'){
      doSave();
    } else {
      const s    = document.createElement('script');
      s.src      = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      s.onload   = doSave;
      s.onerror  = function(){
        console.warn('html2pdf CDN unavailable, falling back to print dialog');
        printInPage(data);
      };
      document.head.appendChild(s);
    }
  }

  /* ── PRINT: inside current page via hidden iframe ───────────── */
  function printInPage(data){
    /* Remove any leftover iframe from a previous click */
    const old = document.getElementById('_mmi_rpt');
    if(old) old.remove();

    const frame = document.createElement('iframe');
    frame.id = '_mmi_rpt';
    /* Off-screen, invisible — user never sees it */
    frame.style.cssText = [
      'position:fixed','top:-9999px','left:-9999px',
      'width:210mm','height:297mm',
      'border:none','opacity:0','pointer-events:none','z-index:-1'
    ].join(';');
    document.body.appendChild(frame);

    const html = buildHTML(data, false); /* no auto-print inside iframe */

    /* Use a blob: URL so Chrome does NOT inject the parent page URL
       as a print header — this prevents blank pages on mobile       */
    const blob    = new Blob([html], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    frame.src = blobUrl;

    /* Wait for fonts + images to load, then trigger print dialog */
    frame.addEventListener('load', function(){
      frame.contentWindow.focus();
      setTimeout(function(){
        frame.contentWindow.print();
        /* Clean up after dialog closes (5s grace) */
        setTimeout(function(){
          URL.revokeObjectURL(blobUrl);
          frame.remove();
        }, 5000);
      }, 1200);
    });
  }

  /* ── Open in new tab (kept as fallback) ─────────────────────── */
  function openReport(data){
    const html = build(data);
    const win  = window.open('', '_blank');
    if(!win){ alert('Pop-ups are blocked. Please allow pop-ups for this site.'); return; }
    win.document.open();
    win.document.write(html);
    win.document.close();
  }

  global.MoneyLeakReport = {
    save:  saveAsPDF,     /* zero dialog — direct download ✓ */
    print: printInPage,   /* same-page print dialog          */
    open:  openReport     /* new tab — fallback              */
  };

})(window);
