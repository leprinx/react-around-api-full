import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarValue = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarValue.current.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name='changePic'
      title='Change profile picture'
      buttonText='Save'
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id='new-pic-link'
        type='url'
        className='form__edit-form form__edit-form_type_profile-picture'
        name='pic-link'
        placeholder='link'
        required
        ref={avatarValue}
      />
      <span className='form__input-error' id='new-pic-link-error'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
