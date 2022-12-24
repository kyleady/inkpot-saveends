import { SaveThrowDialog } from "../../../systems/dnd4e/module/apps/save-throw.js";

console.log(`SAVE ENDS MODULE`)
Hooks.once('init', () => {
  const hookIds = ["combatTurn", "combatRound"];
  hookIds.forEach(hookId => {
    Hooks.on(hookId, async (combatData, roundData, advanceData) => {
      if (advanceData.direction == 1) {
        const currId = combatData.current.tokenId;
        const currObj = combatData.scene.tokens.get(currId);
        const currActor = currObj.actor;
        const allSaveEnds = currActor.effects.filter((e) => e.duration.label == "Save Ends");
        allSaveEnds.forEach(saveEnds => new SaveThrowDialog(currActor, {
          effectSave: true,
          effectId: saveEnds._id
        }).render(true));
      }
    });
  });
});
