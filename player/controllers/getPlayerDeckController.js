import playerDeckService from '../services/playerDeckService';
import randomBaseCardService from '../../card/services/randomBaseCardService';

export default function getPlayerDeckController(request, reply) {
    let userId = request.params.userId;

    playerDeckService.getPlayerDeck(userId)
        .then((playerDeck) => {
            if (!playerDeck) {
                return reply().code(404);
            }

            if (playerDeck.deck.length === 0) {
                return randomBaseCardService.getRandomBaseCards(5)
                    .then((baseCards) => {
                        return playerDeckService.createPlayerDeck(userId, baseCards);
                    })
                    .then((playerDeck) => {
                        reply(playerDeck);
                    })
                    .catch((err) => {
                        console.log(err.stack);
                        reply(err);
                    });
            } else {
                reply(playerDeck);
            }
        })
        .catch((err) => {
            console.log(err.stack);
            reply(err);
        });
}