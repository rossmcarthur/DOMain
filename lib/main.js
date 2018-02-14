import View from "./view";
import $l from '../DOM/DOMain.js';

$l(()=> {
  const rootEl = $('.game');
  const game = new View(rootEl);
  game.setupGrid();
});

window.$l = $l;
