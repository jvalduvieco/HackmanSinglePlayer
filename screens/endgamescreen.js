
/*---------------------- The end game screen ----------------------*/
var EndGameScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);

        this.background = null;
        this.font = null;
        this.scrollerfont = null;
        this.scrollertween = null;

        this.scroller = "THANK'S FOR PLAYING";
        this.scrollerpos = 600;
    },

    // reset function
    onResetEvent: function() {
        if (this.background == null) {
            // init stuff if not yet done
            this.background = me.loader.getImage("endGameBackground");
            // font to display the menu items
            this.font = new me.BitmapFont("32x32_font", 32);
            this.font.set("left");

            // set the scroller
            this.scrollerfont = new me.BitmapFont("32x32_font", 32);
            this.scrollerfont.set("left");

        }

        // reset to default value
        this.scrollerpos = 640;

        // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({
            scrollerpos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();

        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);

        // play something
        //me.audio.play("cling");

    },

    // some callback for the tween objects
    scrollover: function() {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({
            scrollerpos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
    },

    // update function
    update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed('enter')) {
            me.gamestat.add("lives",3);
            me.state.change(me.state.PLAY);
        }
        return true;
    },

    // draw function
    draw: function(context) {
        context.drawImage(this.background, 0, 0);

        this.font.draw(context, "PRESS ENTER TO PLAY", 20, 240);
        this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
    },

    // destroy function
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        //just in case
        this.scrollertween.stop();
    }
});
