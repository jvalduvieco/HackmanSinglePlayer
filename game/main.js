var jsApp = {
    /* --- Initialize the jsApp --- */
    onload: function() {
        // init the video
        if (!me.video.init('game', 672, 736, true, 1.0, true)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }

        // initialize the "audio"
        me.audio.init("mp3,ogg");

        // set all resources to be loaded
        me.loader.onload = this.loaded.bind(this);

        // set all resources to be loaded
        me.loader.preload(g_resources);

        //Set default lives
        me.gamestat.add("lives", 3);
        // load everything & display a loading screen
        me.state.change(me.state.LOADING);
    },
    

    // callback when system components and resources are loaded
    loaded: function() {
        // set the "Play game" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());
        me.state.set(me.state.GAME_END, new EndGameScreen());

        // add our player entity in the entity pool
        me.entityPool.add("mainPlayer", PlayerEntity);
        me.entityPool.add("ghost", GhostEntity);
        me.entityPool.add("dotEntity", DotEntity);
        me.entityPool.add("magicDotEntity", MagicDotEntity);
                
        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT,	"left",false);
        me.input.bindKey(me.input.KEY.RIGHT, "right",false);
        me.input.bindKey(me.input.KEY.UP, "up",false);
        me.input.bindKey(me.input.KEY.DOWN, "down",false);

        me.debug.renderHitBox = false;
        me.debug.displayFPS = true;
        me.debug.renderVelocity = true;

        me.state.change(me.state.PLAY);
    }
};

//bootstrap :)
window.onReady(function() {
    jsApp.onload();
});