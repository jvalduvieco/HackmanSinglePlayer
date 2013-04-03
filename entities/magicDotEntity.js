/*----------------
 a Coin entity
 ------------------------ */
var MagicDotEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.collidable = true;
        this.parent(x, y, settings);
        this.type = me.game.COLLECTABLE_OBJECT;
    },

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision : function (res, obj)
    {
        me.audio.play("cling");
        // The ghosts can be eaten, not nestable.
        if ( !me.gamestat.getItemValue("onFire")) {
            me.gamestat.updateValue("onFire",1);
            obj.onFire();
        }
        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.remove(this);
    }
});
