import View from "./view";
import $l from './DOMain.js';

$l(()=> {
  const rootEl = $('.game');
  const game = new View(rootEl);
  game.setupGrid();
});

window.$l = $l;
