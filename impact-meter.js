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

  // Wrapper
  const wrapper = document.createElement("div");
  wrapper.style.width = "100%";
  wrapper.style.maxWidth = "700px";
  wrapper.style.fontFamily = "system-ui, sans-serif";

  // Bar background
  const bar = document.createElement("div");
  bar.style.width = "100%";
  bar.style.height = "18px";
  bar.style.borderRadius = "999px";
  bar.style.background = "rgba(2, 56, 84, 0.18)";
  bar.style.position = "relative";
  bar.style.overflow = "hidden";

  // Progress fill
  const fill = document.createElement("div");
  fill.style.height = "100%";
  fill.style.width = pct + "%";
  fill.style.background = "#A71F24"; // your red
  fill.style.borderRadius = "999px";
  fill.style.transition = "width 0.75s ease-out";

  bar.appendChild(fill);

  // Label
  const label = document.createElement("div");
  label.style.marginTop = "6px";
  label.style.fontSize = "13px";
  label.style.color = "#023854";

  function formatMoney(v) {
    return "$" + Number(v).toLocaleString("en-US", {
      maximumFractionDigits: 0
    });
  }

  label.textContent =
    formatMoney(current) +
    " of " +
    formatMoney(goal) +
    " raised";

  wrapper.appendChild(bar);
  wrapper.appendChild(label);

  if (title) {
    const t = document.createElement("div");
    t.textContent = title;
    t.style.marginTop = "10px";
    t.style.fontWeight = "600";
    wrapper.appendChild(t);
  }

  container.appendChild(wrapper);
}
