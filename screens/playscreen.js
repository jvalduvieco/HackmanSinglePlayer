var PlayScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        // stuff to reset on state change

        // dot Counter should be created before loading the level,
        // as it will be updated by each dot construction during level loading
        me.gamestat.add("dotCounter", 0);
        me.gamestat.add("onFire", 0);
        // load a level
        me.levelDirector.loadLevel("level0");

        // add a default HUD to the game mngr
        //me.game.addHUD(0, 32, 672, 32);
        me.game.addHUD( 0, 0, me.video.getWidth(), me.video.getHeight() );
        // add a new HUD item for showing the score
        me.game.HUD.addItem("dotCounterDisplay", new ScoreDisplay(550, 10));
        me.game.HUD.addItem("liveCounterDisplay", new LivesLeftDisplay(490, 10));

        // make sure everyhting is in the right order
        me.game.sort();
    },
    onDestroyEvent: function() {
        // remove the HUD
        me.game.disableHUD();
    }
});