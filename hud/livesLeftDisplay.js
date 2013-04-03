var LivesLeftDisplay = me.HUD_Item.extend(
    {
        init: function( x, y )
        {
            this.livesIcon = me.loader.getImage("hud_lives");
            this.parent( x, y );
            this.font = new me.BitmapFont( "16x16_font", 16 );
            this.font.set("left", 1);
        },

        draw: function( context, x, y )
        {
            context.drawImage( this.livesIcon, this.pos.x + x, this.pos.y + y - 4 );
            this.font.draw( context, me.gamestat.getItemValue("lives"), this.pos.x + x + 32, this.pos.y + y );
        }
    });