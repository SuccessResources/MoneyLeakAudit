(function () {

  function clean(text) {
    return (text || "").toString();
  }

  function buildReport(data) {
    return `
      <div class="page">
        <div class="header">
          <h1>Money Leak Audit Report</h1>
          <p>Personalised for ${clean(data.name)}</p>
        </div>

        <div class="big-card">
          <p>Your Estimated Annual Money Leak</p>
          <h2>${clean(data.total)}</h2>
          <p>per year slipping through the cracks</p>
        </div>

        <h3>Your Primary Leak Type</h3>
        <div class="card gold">
          <h2>${clean(data.archName)}</h2>
          <p>${clean(data.archDesc)}</p>
        </div>

        <h3>Where Your Money Is Leaking</h3>
        <div class="card">
          <p><strong>Pricing Leaks:</strong> ${clean(data.pricing)}</p>
          <p><strong>Time Leaks:</strong> ${clean(data.time)}</p>
          <p><strong>Systems Leaks:</strong> ${clean(data.systems)}</p>
          <p><strong>Blueprint Tax:</strong> ${clean(data.blueprint)}</p>
        </div>
      </div>

      <div class="page">
        <div class="header">
          <h1>Your Money Blueprint Pattern</h1>
          <p>Personalised for ${clean(data.name)}</p>
        </div>

        <h3>Core Belief</h3>
        <div class="card">
          <p>${clean(data.bpBelief)}</p>
        </div>

        <h3>The Little Voice In Your Head</h3>
        <div class="card">
          <p>${clean(data.bpVoice)}</p>
        </div>

        <h3>The Upgrade</h3>
        <div class="card gold">
          <p>${clean(data.bpUpgrade)}</p>
        </div>

        <h3>The Complete Solution</h3>
        <div class="card">
          <p>Your quick wins are the start, not the seal. The real solution is to fix both the outer habit and the inner money blueprint.</p>
          <p><strong>Visit millionairemindworld.com to claim your spot at Millionaire Mind Hybrid.</strong></p>
        </div>
      </div>
    `;
  }

  function savePDF(data) {
    function generate() {
      const report = document.createElement("div");
      report.id = "pdf-report";
      report.innerHTML = buildReport(data);

      report.style.width = "210mm";
      report.style.background = "#ffffff";
      report.style.position = "absolute";
      report.style.left = "0";
      report.style.top = "0";
      report.style.zIndex = "999999";

      const style = document.createElement("style");
      style.innerHTML = `
        #pdf-report * {
          box-sizing: border-box;
        }

        #pdf-report {
          font-family: Arial, sans-serif;
          color: #222;
        }

        #pdf-report .page {
          width: 210mm;
          min-height: 297mm;
          padding: 24mm 18mm;
          background: #ffffff;
          page-break-after: always;
        }

        #pdf-report .page:last-child {
          page-break-after: auto;
        }

        #pdf-report .header {
          border-bottom: 3px solid #1c3829;
          padding-bottom: 14px;
          margin-bottom: 30px;
        }

        #pdf-report h1 {
          color: #1c3829;
          font-size: 30px;
          margin: 0 0 8px;
        }

        #pdf-report h2 {
          color: #1c3829;
        }

        #pdf-report h3 {
          color: #1c3829;
          font-size: 22px;
          margin-top: 28px;
        }

        #pdf-report .big-card {
          background: #1c3829;
          color: white;
          padding: 40px;
          border-radius: 14px;
          text-align: center;
          margin-bottom: 30px;
        }

        #pdf-report .big-card h2 {
          color: #ddb84e;
          font-size: 56px;
          margin: 12px 0;
        }

        #pdf-report .card {
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 18px;
          background: #ffffff;
          font-size: 16px;
          line-height: 1.6;
        }

        #pdf-report .gold {
          border: 2px solid #c9a84c;
        }
      `;

      document.head.appendChild(style);
      document.body.appendChild(report);

      const fileName =
        "Money-Leak-Audit-" +
        clean(data.name).replace(/\s+/g, "-") +
        ".pdf";

      html2pdf()
        .set({
          margin: 0,
          filename: fileName,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff"
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
          },
          pagebreak: {
            mode: ["css", "legacy"]
          }
        })
        .from(report)
        .save()
        .then(function () {
          document.body.removeChild(report);
          document.head.removeChild(style);
        });
    }

    if (typeof html2pdf === "undefined") {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.onload = generate;
      document.head.appendChild(script);
    } else {
      generate();
    }
  }

  window.MoneyLeakReport = {
    save: savePDF
  };

})();
