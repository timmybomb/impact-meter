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

  // === Wrapper ===
  const wrapper = document.createElement("div");
  wrapper.style.width = "100%";
  wrapper.style.maxWidth = "720px";
  wrapper.style.margin = "20px auto";
  wrapper.style.fontFamily = "system-ui, sans-serif";
  wrapper.style.color = "#023854";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.gap = "10px";

  // === Title ===
  if (title) {
    const heading = document.createElement("div");
    heading.textContent = title;
    heading.style.fontSize = "20px";
    heading.style.fontWeight = "600";
    heading.style.textAlign = "left";
    heading.style.marginBottom = "4px";
    wrapper.appendChild(heading);
  }

  // === Bar Background ===
  const bar = document.createElement("div");
  bar.style.width = "100%";
  bar.style.height = "20px";
  bar.style.background = "rgba(2, 56, 84, 0.18)"; // subtle Impact Nations blue tint
  bar.style.borderRadius = "999px";
  bar.style.position = "relative";
  bar.style.overflow = "hidden";

  // === Progress Fill ===
  const fill = document.createElement("div");
  fill.style.height = "100%";
  fill.style.width = pct + "%";
  fill.style.background = "#A71F24"; // Impact Nations red
  fill.style.borderRadius = "999px";
  fill.style.transition = "width 0.9s ease-out";

  bar.appendChild(fill);

  // === Amount Label ===
  const label = document.createElement("div");
  label.style.fontSize = "16px";
  label.style.fontWeight = "500";

  function formatMoney(v) {
    return "$" + Number(v).toLocaleString("en-US", { minimumFractionDigits: 0 });
  }

  label.textContent = `${formatMoney(current)} of ${formatMoney(goal)} raised`;

  // === Append elements ===
  wrapper.appendChild(bar);
  wrapper.appendChild(label);
  container.appendChild(wrapper);
}
