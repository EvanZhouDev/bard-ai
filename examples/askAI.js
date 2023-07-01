import Bard, { askAI } from  '../index.js'
const token = "XwgvO9G3bK43s2lN_TkMY79sSkwKGYNeR-Ynhmr3q-d7-JkXLtdd-gGWs8gNsYC_H72bOA."
const app = await Bard.init("XwgvO9G3bK43s2lN_TkMY79sSkwKGYNeR-Ynhmr3q-d7-JkXLtdd-gGWs8gNsYC_H72bOA.");
// const app = await Bard.
console.log(await askAI("Apple Product"));
