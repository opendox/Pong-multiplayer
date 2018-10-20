let utils = 
{
	add: 
	{
		button: function(ctx,x,y,text,style,callback)
		{
			let cont = ctx.add.container(x,y);
			let btn = ctx.add.sprite(0,0,'button',0);
			btn.setInteractive();
			btn.on('pointerdown', () => 
			{
				btn.setFrame(1);
			});
			let txt = ctx.add.text(-100,-20,text);
			txt.setFontSize(style.size);
			txt.setFontStyle(style.style);
			txt.setFontFamily(style.font);
			txt.setColor(style.color);
			txt.setBackgroundColor(style.bg);
			
			
			
			cont.add([btn,txt]);
			
			return cont;
		}
	}
}