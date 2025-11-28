function initImpactMeter() {
  const data = window.__impactMeterData;
  if (!data) {
    console.error("ImpactMeter: No data found in window.__impactMeterData");
    return;
  }

  const goal = data.goal || 0;
  const current = data.current || 0;
  const title = data.title || "";

  const pct = goal > 0 ? Math.min(100, (current / goal) * 100) : 0;

  const container = document.getElementById("impact-meter");
  if (!container) return;

  // === CARD WRAPPER ===
  const card = document.createElement("div");
  card.style.width = "100%";
  card.style.maxWidth = "700px";
  card.style.margin = "30px auto";
  card.style.padding = "24px";
  card.style.background = "#ffffff";
  card.style.borderRadius = "12px";
  card.style.boxShadow = "0 4px 14px rgba(0,0,0,0.12)";
  card.style.fontFamily = "system-ui, sans-serif";
  card.style.color = "#073D7F";
  card.style.display = "flex";
  card.style.flexDirection = "column";
  card.style.gap = "16px";

  // === TITLE ===
  if (title) {
    const heading = document.createElement("div");
    heading.textContent = title;
    heading.style.fontSize = "26px";
    heading.style.fontWeight = "700";
    heading.style.textAlign = "center";
    heading.style.color = "#073D7F";
    card.appendChild(heading);
  }

  // === LABEL (ABOVE METER) ===
  const label = document.createElement("div");
  label.style.fontSize = "18px";
  label.style.textAlign = "center";
  label.style.fontWeight = "600";
  label.style.color = "#073D7F";

  label.innerHTML = `
    <span style="font-weight:700">$${current.toLocaleString()}</span>
    <span style="font-weight:400"> of $${goal.toLocaleString()} raised</span>
  `;
  card.appendChild(label);

  // === PROGRESS BAR BACKGROUND ===
  const bar = document.createElement("div");
  bar.style.width = "100%";
  bar.style.height = "20px";
  bar.style.borderRadius = "10px";
  bar.style.background = "#E5E9EF"; // subtle grey/blue
  bar.style.overflow = "hidden";
  bar.style.position = "relative";

  // === FILL BAR ===
  const fill = document.createElement("div");
  fill.style.height = "100%";
  fill.style.width = "0%";
  fill.style.background = "#A71F24"; // Impact Nations red
  fill.style.borderRadius = "10px";
  fill.style.transition = "width 0.8s ease-out";

  // Append fill → bar → card
  bar.appendChild(fill);
  card.appendChild(bar);

  // === Append card to page ===
  container.innerHTML = "";
  container.appendChild(card);

  // Animate fill AFTER mount
  setTimeout(() => {
    fill.style.width = pct + "%";
  }, 50);
}
