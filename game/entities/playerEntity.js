/*-------------------  a player entity -------------------------------- */
var PlayerEntity = me.ObjectEntity.extend({
    coolDownAfterDeath: false, //
    counter: 0,
    /* ----- constructor ------ */
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        // set the walking speed, on start player moves to the right        
        this.vel.x=3;
        this.vel.y=0;
        
        // set the gravity to 0
        this.gravity = 0;
        this.collidable = true;
        
        this.renderable.addAnimation("walk", [0,3]);
        this.renderable.addAnimation("walkLeft", [6,9]);
        this.renderable.addAnimation("walkUpDown", [0,0]);
        this.animationspeed = 3;
        this.renderable.setCurrentAnimation("walk");
        
        // adjust the bounding box
        this.updateColRect(1, 30, 1, 30);

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    checkKeystrokes: function() {
        if (me.input.isKeyPressed('left')) {
            this.renderable.setCurrentAnimation("walkLeft");
            this.vel.x = -3;
            this.vel.y = 0;
        }
        if (me.input.isKeyPressed('right')) {
            this.renderable.setCurrentAnimation("walk");
            this.vel.x = 3;
            this.vel.y = 0;
        }
        if (me.input.isKeyPressed('down')) {
            this.renderable.setCurrentAnimation("walkUpDown");
            this.vel.x = 0;
            this.vel.y = 3;
        }
        if (me.input.isKeyPressed('up')) {
            this.renderable.setCurrentAnimation("walkUpDown");
            this.vel.x = 0;
            this.vel.y = -3;

        }
    },
    hasLeftArea: function() {
        // Enter by the opposite side
        if ((this.vel.x < 0) && (this.pos.x <= 2)) {
            this.pos.x = 672-32;
        } else if ((this.vel.x > 0) && (this.pos.x >= 672-34)) {
            this.pos.x = 0;
        }
    },
    /* ----- update the player pos ------ */
    update: function() {

        this.hasLeftArea();

        // We might need this variable in the future for restoring direction if after selecting a new one
        // the mainPlayer would hit the wall
        var oldVel = this.vel.clone();
        var oldAnim = this.renderable.current.clone();

        if (! this.coolDownAfterDeath ) {
            this.checkKeystrokes();
        }

        // Try to update player's movement. Then check results, a non-zero res means there is a collision, so 
        // the player should not change direction but rather continue going in the old direction
        var res = this.updateMovement();    
        if (res.x || res.y) {
            this.vel.x = oldVel.x;
            this.vel.y = oldVel.y;
            this.renderable.current = oldAnim;
            this.updateMovement();
        }        

        // check for collision NOTE MelonJS seems to not process collisions without this line
        res = me.game.collide(this, false);
        if (res)
        {
            if ((res.obj.type == me.game.ENEMY_OBJECT) && (me.gamestat.getItemValue("onFire") == 0))
            {
                this.die();
            } else if ((res.obj.type == me.game.ENEMY_OBJECT) && (me.gamestat.getItemValue("onFire") == 1)) {
                res.obj.die();
                me.audio.play("yeah");
            }
        }

        //always update animation
        this.parent(this);
        return true;
    },
    die: function()
    {
        // The player has been touched and looses one life.
        me.gamestat.updateValue("lives",-1);

        if ( me.gamestat.getItemValue("lives") > 0 )
        {
            this.coolDownAfterDeath=true;
            me.audio.play("death");
            me.game.HUD.reset("liveCounterDisplay")
            // Get me to a safe place!!
            this.pos.x=64;
            this.pos.y=96;
            this.vel.x=0;
            this.vel.y=0;
            // let's flicker in case we touched an enemy
            this.renderable.flicker(120, function() {
                var hackman = me.game.getEntityByName("mainPlayer")[0];
                hackman.coolDownAfterDeath = false;
            });
        }
        else
        {
            me.state.change( me.state.GAME_END );
        }
    },
    onFire: function()
    {
        this.renderable.flicker(600, function(){
            me.gamestat.updateValue("onFire",-1);
        });
    }

});
