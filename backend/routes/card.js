const router = require('express').Router();

const {
  validateDeleteCard,
  validateCreateCard,
  validateLikeCard,
  validateDislikeCard,
} = require('../utils/validateJoiSchema');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.delete('/:cardId', validateDeleteCard, deleteCard);

router.post('/', validateCreateCard, createCard);

router.put('/:cardId/likes', validateLikeCard, likeCard);

router.delete('/:cardId/likes', validateDislikeCard, dislikeCard);

module.exports = router;
