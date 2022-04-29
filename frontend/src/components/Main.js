import { useContext } from 'react';
import editImage from '../images/profile/modifier.png';
import addElement from '../images/add-element/add-element.svg';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const user = useContext(CurrentUserContext);

  return (
    <main className='content container'>
      <section className='profile'>
        <div className='profile__info'>
          <div className='profile__avatar-container'>
            <img
              src={user.avatar}
              alt='Traveler profile picture'
              className='profile__avatar'
            />
            <button
              className='profile__avatar-button'
              type='button'
              onClick={onEditAvatarClick}
            ></button>
          </div>
          <div className='profile__description'>
            <div className='profile__line'>
              <h1 className='profile__author'>{user.name}</h1>
              <button
                className='reset-button'
                type='button'
                onClick={onEditProfileClick}
              >
                <img src={editImage} alt='pen' className='profile__modifier' />
              </button>
            </div>
            <p className='profile__subtitle'>{user.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlaceClick}
          className='reset-button add-element'
          type='button'
        >
          <img
            src={addElement}
            alt='plus symbol'
            className='add-element__symbol'
          />
        </button>
      </section>
      <section className='places'>
        <ul className='places__elements'>
          {cards.map((card) => (
            <Card
              onCardLike={onCardLike}
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
