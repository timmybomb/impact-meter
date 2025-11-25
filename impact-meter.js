{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 function initImpactMeter(config) \{\
  const url = config.source;\
  const container = document.getElementById("impact-meter");\
  if (!container) return;\
\
  fetch(url)\
    .then(r => r.json())\
    .then(data => \{\
      const goal = data.goal || 0;\
      const current = data.current || 0;\
      const pct = goal > 0 ? Math.min(100, (current / goal) * 100) : 0;\
\
      // Wrapper\
      const wrapper = document.createElement("div");\
      wrapper.style.width = "100%";\
      wrapper.style.maxWidth = "700px";\
      wrapper.style.fontFamily = "system-ui, sans-serif";\
\
      // Bar background\
      const bar = document.createElement("div");\
      bar.style.width = "100%";\
      bar.style.height = "18px";\
      bar.style.borderRadius = "999px";\
      bar.style.background = "rgba(2, 56, 84, 0.18)";\
      bar.style.position = "relative";\
      bar.style.overflow = "hidden";\
\
      // Progress fill\
      const fill = document.createElement("div");\
      fill.style.height = "100%";\
      fill.style.width = pct + "%";\
      fill.style.background = "#A71F24";\
      fill.style.borderRadius = "999px";\
      fill.style.transition = "width 0.7s ease-out";\
\
      bar.appendChild(fill);\
\
      // Label\
      const label = document.createElement("div");\
      label.style.marginTop = "6px";\
      label.style.fontSize = "13px";\
      label.style.color = "#023854";\
\
      function formatMoney(v) \{\
        return "$" + Number(v).toLocaleString("en-US", \{\
          maximumFractionDigits: 0\
        \});\
      \}\
\
      label.textContent = formatMoney(current) + " of " + formatMoney(goal) + " raised";\
\
      wrapper.appendChild(bar);\
      wrapper.appendChild(label);\
\
      container.appendChild(wrapper);\
    \})\
    .catch(err => \{\
      console.error("ImpactMeter error:", err);\
    \});\
\}}