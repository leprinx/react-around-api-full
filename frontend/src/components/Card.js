import { useContext } from 'react';
import deleteButton from '../images/places/delete-button.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  function handleClick() {
    onCardClick(card);
  }
  const user = useContext(CurrentUserContext);
  const isOwn = card.owner === user._id;
  const isLiked = card.likes.some((i) => i[0] === user._id);
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDelete() {
    onCardDelete(card);
  }

  return (
    <li className='places__element'>
      <img
        className='places__picture'
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className='places__element-description'>
        <h2 className='places__title'>{card.name}</h2>
        <div className='places__likes'>
          <button
            className={`reset-button places__element-like ${
              isLiked && 'places__element-like_active'
            }`}
            type='button'
            onClick={handleLikeClick}
          />
          <p className='places__show-likes'>{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <img
          src={deleteButton}
          alt='trash can'
          className='places__element-remove'
          onClick={handleDelete}
        />
      )}
    </li>
  );
}

export default Card;
