class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref('gameState')
        gameStateRef.on("value", function(data){
            gameState = data.val()
        })
        
    }

    updateState(state){
        database.ref('/').update({
            gameState:state
        })
    }

    async start(){
        if(gameState === 0){
            player = new Player()
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists()){ 
                playerCount = playerCountRef.val();
                player.getCount(); 
            }

            form = new Form()
            form.display()

            border = createSprite(displayWidth/2,displayHeight/2,50,displayHeight)
            border.debug = true
            

            player1 = createSprite(100,displayHeight/2)
            player1.addImage("player1",soldier1Img)
            player2 = createSprite(displayWidth-100,displayHeight/2)
            player2.addImage("player2",soldier2Img)
            player2.scale = 0.3

            players=[player1,player2]
            
            bulletGroup = new Group()
        }
    }

    play(){
        form.hide()

        image(bgImg,0,0,displayWidth,displayHeight);
        drawSprites();
        Player.getPlayerInfo();
        Player.updatePlayersFinished();

        if(allPlayers != undefined){
            var index = 0
            for(var plr in allPlayers){
                index += 1
                if(index === 1){
                    players[index-1].x = width/4 + allPlayers[plr].distanceX
                    players[index-1].y = height/2 + allPlayers[plr].distanceY
                }
                if(index === 2){
                    players[index-1].x = 3*width/4 + allPlayers[plr].distanceX
                    players[index-1].y = height/2 + allPlayers[plr].distanceY
                }

                //display score
                textSize(25)
                fill(255)
                text("Player1: "+ allPlayers.player1.score, 100, 100 )
                text("Player2: "+ allPlayers.player2.score, 100, 150 )
                


            }

                
        }
        


        //Move the player with arrow keys
    if(players[player.index-1].isTouching(wallGroup)){
            player.distanceX += 0
            player.updatePlayerInfo()
    }
    else{
    
        if(keyDown(RIGHT_ARROW) && player.index != null){
            if((player.index ===1 && players[player.index-1].x < width/2-50) || player.index ===2){
                player.distanceX += 10
                player.updatePlayerInfo()
            }
            
        }

        if(keyDown(LEFT_ARROW) && player.index != null){
            if((player.index ===2 && players[player.index-1].x > width/2+50) || player.index ===1){
                player.distanceX -= 10
                player.updatePlayerInfo()
            }
            
        }

        
    }

    if(keyDown(UP_ARROW) && player.index != null){
        player.distanceY -= 10
        player.updatePlayerInfo()
    }

    if(keyDown(DOWN_ARROW) && player.index != null){
        player.distanceY += 10
        player.updatePlayerInfo()
    }
    


        // Generate Bullets
        if(keyWentDown("space")){
            bullet1 = createSprite(200,200)
            var i = player.index-1;
            bullet1.y = players[i].y
            bullet1.addImage("bullet1",bullet1Img)
            bulletGroup.add(bullet1)
            if(player.index === 1){
                bullet1.x = players[i].x + 100
                bullet1.velocityX = 100
            }
            else if(player.index = 2){
                bullet1.x = players[i].x - 100
                bullet1.velocityX = -100
            }
        }

        //Updating score
        for(var i = 0; i < bulletGroup.length; i++){
            if(bulletGroup.get(i).isTouching(players)){
                player.score += 1
                player.updatePlayerInfo()
                bulletGroup.get(i).destroy()
            }

        }
        
        

        if(player.score === 5){
            playersFinished += 1;
            Player.updatePlayersFinished(playersFinished)
        }
        if(playersFinished === 1){
            gameState = 2;
        }

     }

     end(){
         var message = createElement('h2')
         message.position(displayWidth/2-100, displayHeight/2)
         if(player.score === 5){
             message.html("You win" + player.name)
         }
         else{
             message.html("You lose" + player.name)
         }
         

     }
}