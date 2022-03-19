import Alpine from "alpinejs/src";
import alpinePlugins from "./alpine"

alpinePlugins.forEach((x) => Alpine.plugin(x));

window.Alpine = Alpine;
Alpine.start();
