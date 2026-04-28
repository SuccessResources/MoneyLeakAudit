(function () {

  function clean(v) {
    return (v || "").toString();
  }

  function savePDF(data) {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    const name = clean(data.name);

    // ===== PAGE 1 =====
    doc.setFontSize(18);
    doc.text("Money Leak Audit Report", 20, 20);

    doc.setFontSize(10);
    doc.text("Personalised for " + name, 20, 28);

    doc.setFontSize(14);
    doc.text("Your Estimated Annual Money Leak", 20, 50);

    doc.setFontSize(24);
    doc.text(clean(data.total), 20, 60);

    doc.setFontSize(14);
    doc.text("Your Primary Leak Type", 20, 90);

    doc.setFontSize(16);
    doc.text(clean(data.archName), 20, 100);

    doc.setFontSize(11);
    doc.text(doc.splitTextToSize(clean(data.archDesc), 170), 20, 110);

    doc.setFontSize(14);
    doc.text("Where Your Money Is Leaking", 20, 140);

    doc.setFontSize(11);
    doc.text("Pricing: " + clean(data.pricing), 20, 150);
    doc.text("Time: " + clean(data.time), 20, 160);
    doc.text("Systems: " + clean(data.systems), 20, 170);
    doc.text("Blueprint: " + clean(data.blueprint), 20, 180);

    // ===== PAGE 2 =====
    doc.addPage();

    doc.setFontSize(16);
    doc.text("Your Money Blueprint Pattern", 20, 20);

    doc.setFontSize(12);
    doc.text("Core Belief:", 20, 40);
    doc.text(doc.splitTextToSize(clean(data.bpBelief), 170), 20, 48);

    doc.text("Inner Voice:", 20, 70);
    doc.text(doc.splitTextToSize(clean(data.bpVoice), 170), 20, 78);

    doc.text("Upgrade:", 20, 100);
    doc.text(doc.splitTextToSize(clean(data.bpUpgrade), 170), 20, 108);

    doc.setFontSize(12);
    doc.text("Visit millionairemindworld.com", 20, 140);

    const fileName = "Money-Leak-" + name.replace(/\s+/g, "-") + ".pdf";

    doc.save(fileName);
  }

  window.MoneyLeakReport = {
    save: savePDF
  };

})();
