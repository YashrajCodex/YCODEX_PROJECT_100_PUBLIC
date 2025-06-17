
// timer-widget.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("timer-widget");

  let timeLeft = 25 * 60;
  let isActive = false;
  let sessionType = "work";
  let workDuration = 25;
  let breakDuration = 5;
  let intervalId = null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const createButton = (cls, label, onClick, icon) => {
    const btn = document.createElement("button");
    btn.className = cls;
    btn.innerHTML = icon;
    btn.addEventListener("click", onClick);
    return btn;
  };

  const render = () => {
    container.innerHTML = "";

    const outer = document.createElement("div");
    outer.className = "timer-container";

    const heading = document.createElement("div");
    heading.innerHTML = `
      <h2>${sessionType === "work" ? "Work Session" : "Break Time"}</h2>
      <p>${sessionType === "work" ? "Stay focused!" : "Take a breather"}</p>
    `;
    outer.appendChild(heading);

    // Progress
    const progressWrap = document.createElement("div");
    progressWrap.className = "progress-ring";

    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progress =
      sessionType === "work"
        ? ((workDuration * 60 - timeLeft) / (workDuration * 60)) * 100
        : ((breakDuration * 60 - timeLeft) / (breakDuration * 60)) * 100;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");

    const bgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    bgCircle.setAttribute("cx", 50);
    bgCircle.setAttribute("cy", 50);
    bgCircle.setAttribute("r", radius);
    bgCircle.setAttribute("class", "bg");
    svg.appendChild(bgCircle);

    const fgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    fgCircle.setAttribute("cx", 50);
    fgCircle.setAttribute("cy", 50);
    fgCircle.setAttribute("r", radius);
    fgCircle.setAttribute("class", sessionType === "work" ? "fg-work" : "fg-break");
    fgCircle.setAttribute("stroke-dasharray", circumference);
    fgCircle.setAttribute("stroke-dashoffset", circumference * (1 - progress / 100));
    svg.appendChild(fgCircle);

    progressWrap.appendChild(svg);

    const timeDiv = document.createElement("div");
    timeDiv.className = "timer-time";
    timeDiv.textContent = formatTime(timeLeft);
    progressWrap.appendChild(timeDiv);

    outer.appendChild(progressWrap);

    // Controls
    const controls = document.createElement("div");
    controls.className = "controls";

    const playIcon = "▶";
    const pauseIcon = "⏸";
    const resetIcon = "↻";
    const stopIcon = "■";

    if (!isActive) {
      controls.appendChild(
        createButton("btn-green", "Start", () => {
          isActive = true;
          tick();
        }, playIcon)
      );
    } else {
      controls.appendChild(
        createButton("btn-yellow", "Pause", () => {
          isActive = false;
          clearInterval(intervalId);
          render();
        }, pauseIcon)
      );
    }

    controls.appendChild(
      createButton("btn-gray", "Reset", () => {
        isActive = false;
        clearInterval(intervalId);
        timeLeft = (sessionType === "work" ? workDuration : breakDuration) * 60;
        render();
      }, resetIcon)
    );

    controls.appendChild(
      createButton("btn-red", "Stop", () => {
        isActive = false;
        clearInterval(intervalId);
        sessionType = "work";
        timeLeft = workDuration * 60;
        render();
      }, stopIcon)
    );

    outer.appendChild(controls);

    const settingsBtn = document.createElement("button");
    settingsBtn.className = "settings-toggle";
    settingsBtn.textContent = "Settings ⚙";
    settingsBtn.onclick = () => {
      showSettings = !showSettings;
      render();
    };
    outer.appendChild(settingsBtn);

    // Settings
    if (showSettings) {
      const settings = document.createElement("div");
      settings.className = "settings-panel";

      settings.innerHTML = `
        <h3>Timer Settings</h3>
        <div class="settings-row">
          <label>Work Duration (min)</label>
          <input type="number" min="1" max="60" value="${workDuration}" id="workInput" />
        </div>
        <div class="settings-row">
          <label>Break Duration (min)</label>
          <input type="number" min="1" max="30" value="${breakDuration}" id="breakInput" />
        </div>
      `;

      outer.appendChild(settings);

      settings.querySelector("#workInput").addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        workDuration = val;
        if (sessionType === "work" && !isActive) timeLeft = val * 60;
        render();
      });

      settings.querySelector("#breakInput").addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        breakDuration = val;
        if (sessionType === "break" && !isActive) timeLeft = val * 60;
        render();
      });
    }

    container.appendChild(outer);
  };

  const tick = () => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        render();
      } else {
        clearInterval(intervalId);
        isActive = false;
        if (sessionType === "work") {
          sessionType = "break";
          timeLeft = breakDuration * 60;
        } else {
          sessionType = "work";
          timeLeft = workDuration * 60;
        }
        render();
        if (isActive) tick();
      }
    }, 1000);
    render();
  };

  let showSettings = false;
  render();
});
