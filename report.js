(function () {
  function clean(v) {
    return (v || "").toString();
  }

  function loadJsPDF(callback) {
    if (window.jspdf && window.jspdf.jsPDF) {
      callback();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = callback;
    script.onerror = function () {
      alert("PDF library failed to load. Please check your internet connection.");
    };
    document.head.appendChild(script);
  }

  function addHeader(doc, name) {
    doc.setDrawColor(28, 56, 41);
    doc.setLineWidth(1.2);
    doc.line(15, 22, 195, 22);

    doc.setTextColor(28, 56, 41);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("MONEY LEAK AUDIT REPORT", 15, 15);

    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Personalised for " + clean(name), 15, 20);
  }

  function addFooter(doc, pageNum) {
    doc.setDrawColor(220, 220, 220);
    doc.line(15, 282, 195, 282);

    doc.setTextColor(120, 120, 120);
    doc.setFontSize(8);
    doc.text("© 2026 Success Resources | Millionaire Mind Intensive", 15, 288);

    doc.setTextColor(28, 56, 41);
    doc.setFont("helvetica", "bold");
    doc.text("Page " + pageNum, 180, 288);
  }

  function addWrappedText(doc, text, x, y, maxWidth, lineHeight) {
    const lines = doc.splitTextToSize(clean(text), maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * lineHeight;
  }

  function savePDF(data) {
    loadJsPDF(function () {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF("p", "mm", "a4");

      const name = clean(data.name) || "Report";

      // PAGE 1
      addHeader(doc, name);

      doc.setFillColor(28, 56, 41);
      doc.roundedRect(15, 35, 180, 45, 4, 4, "F");

      doc.setTextColor(221, 184, 78);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("YOUR ESTIMATED ANNUAL MONEY LEAK", 105, 47, { align: "center" });

      doc.setFontSize(32);
      doc.text(clean(data.total), 105, 62, { align: "center" });

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.text("per year slipping through the cracks", 105, 72, { align: "center" });

      doc.setTextColor(28, 56, 41);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(17);
      doc.text("Your Primary Leak Type", 15, 95);

      doc.setDrawColor(201, 168, 76);
      doc.setLineWidth(1);
      doc.roundedRect(15, 102, 180, 42, 3, 3);

      doc.setTextColor(201, 168, 76);
      doc.setFontSize(9);
      doc.text("IDENTIFIED FROM YOUR ANSWERS", 22, 113);

      doc.setTextColor(28, 56, 41);
      doc.setFontSize(16);
      doc.text(clean(data.archName), 22, 124);

      doc.setTextColor(40, 40, 40);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      addWrappedText(doc, data.archDesc, 22, 133, 165, 5);

      doc.setTextColor(28, 56, 41);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(17);
      doc.text("Where Your Money Is Leaking", 15, 165);

      doc.setFontSize(11);
      doc.setTextColor(40, 40, 40);

      const rows = [
        ["Pricing Leaks", data.pricing],
        ["Time Leaks", data.time],
        ["Systems Leaks", data.systems],
        ["Blueprint Tax", data.blueprint]
      ];

      let y = 180;
      rows.forEach(function (row) {
        doc.setFont("helvetica", "normal");
        doc.text(row[0], 22, y);

        doc.setFont("helvetica", "bold");
        doc.setTextColor(220, 38, 38);
        doc.text(clean(row[1]), 175, y, { align: "right" });

        doc.setTextColor(40, 40, 40);
        y += 13;
      });

      addFooter(doc, 1);

      // PAGE 2
      doc.addPage();
      addHeader(doc, name);

      doc.setTextColor(28, 56, 41);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Your Money Blueprint Pattern", 15, 40);

      doc.setFontSize(13);
      doc.text("Core Belief", 15, 58);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      let y2 = addWrappedText(doc, data.bpBelief, 15, 68, 180, 6);

      y2 += 10;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("The Little Voice In Your Head", 15, y2);

      y2 += 10;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      y2 = addWrappedText(doc, data.bpVoice, 15, y2, 180, 6);

      y2 += 12;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text("The Upgrade", 15, y2);

      y2 += 10;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      y2 = addWrappedText(doc, data.bpUpgrade, 15, y2, 180, 6);

      y2 += 16;
      doc.setTextColor(28, 56, 41);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("The Complete Solution", 15, y2);

      y2 += 10;
      doc.setTextColor(40, 40, 40);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      y2 = addWrappedText(
        doc,
        "Your quick wins are the start, not the seal. The real solution is to fix both the outer habit and the inner money blueprint that keeps recreating the leak.",
        15,
        y2,
        180,
        6
      );

      y2 += 8;
      doc.setFont("helvetica", "bold");
      addWrappedText(
        doc,
        "Visit millionairemindworld.com to claim your spot at Millionaire Mind Hybrid.",
        15,
        y2,
        180,
        6
      );

      addFooter(doc, 2);

      const fileName =
        "Money-Leak-Audit-" + name.replace(/\s+/g, "-") + ".pdf";

      doc.save(fileName);
    });
  }

  window.MoneyLeakReport = {
    save: savePDF
  };
})();
