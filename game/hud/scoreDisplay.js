/* score HUD Item */
  
var ScoreDisplay = me.HUD_Item.extend({
    
    init: function(x, y) {
        // call the parent constructor
        this.dotIcon = me.loader.getImage("dot");
        this.parent(x, y);
        // create a font
        this.font = new me.BitmapFont("16x16_font", 16);
        this.font.set("left", 1);
    },
    
    /* ----- draw our score ------ */
    draw: function(context, x, y) {
        context.drawImage( this.dotIcon, this.pos.x + x, this.pos.y + y - 4 );
        this.font.draw(context, this.value, this.pos.x + x + 32, this.pos.y + y);
    }
});
