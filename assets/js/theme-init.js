/* Synchronous <head> execution to prevent flash of incorrect theme. */
(function () {
  var root = document.documentElement;
  var mode = "system";
  try { mode = localStorage.getItem("theme") || "system"; } catch (e) {}
  var dark = mode === "dark" ||
    (mode === "system" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.setAttribute("data-theme", dark ? "dark" : "light");
  root.setAttribute("data-theme-mode", mode);
  root.classList.add("js");
})();
