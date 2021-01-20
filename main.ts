// knop a= omhoog
input.onButtonPressed(Button.A, function () {
    sprite.change(LedSpriteProperty.Y, -1)
    // geluid als je A drukt
    music.playTone(622, music.beat(BeatFraction.Half))
})
// b= omlaag
input.onButtonPressed(Button.B, function () {
    sprite.change(LedSpriteProperty.Y, 1)
    // geluid voor als je omlaag gaat
    music.playTone(131, music.beat(BeatFraction.Half))
})
let leegObstakelY = 0
let stappen = 0
let sprite: game.LedSprite = null
// figuur is de vogel
sprite = game.createSprite(0, 2)
// de vogel knipperd zodat het duidelijk word wie de bird is
sprite.set(LedSpriteProperty.Blink, 300)
let obstakels: game.LedSprite[] = []
basic.forever(function () {
    // obstakel generaten
    while (obstakels.length > 0 && obstakels[0].get(LedSpriteProperty.X) == 0) {
        // 1 blokje weglaten van de obstakels zodat de vogel er doorheen kan
        obstakels.removeAt(0).delete()
    }
    // elke keer andere soort obstaakels zodat je moet bewegen met je poppetje
    for (let obstakel of obstakels) {
        obstakel.change(LedSpriteProperty.X, -1)
    }
    if (stappen % 3 == 0) {
        // willekeurig word er een gat opengehouden
        leegObstakelY = randint(0, 4)
        for (let index = 0; index <= 4; index++) {
            // zodat je pop er daadwerkelijk doorheen kan zonder daar te blijven
            if (index != leegObstakelY) {
                obstakels.push(game.createSprite(4, index))
            }
        }
    }
    for (let obstakel of obstakels) {
        // als je tegen een obstakel botst, dan ben je af
        if (obstakel.get(LedSpriteProperty.X) == sprite.get(LedSpriteProperty.X) && obstakel.get(LedSpriteProperty.Y) == sprite.get(LedSpriteProperty.Y)) {
            game.gameOver()
        }
    }
    stappen += 1
    // om de 100 ms gaat de flappy bird vooruit
    basic.pause(1000)
})
