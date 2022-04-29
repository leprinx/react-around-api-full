import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const linkRef = useRef('');
  const nameRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: nameRef.current.value, link: linkRef.current.value });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name='add'
      title='New place'
      buttonText='Create'
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id='new-place-input'
        type='text'
        className='form__edit-form form__edit-form_type_new-place'
        name='name'
        placeholder='text'
        required
        minLength='1'
        maxLength='40'
        ref={nameRef}
      />
      <span className='form__input-error' id='new-place-input-error'></span>
      <input
        id='new-place-link'
        type='url'
        className='form__edit-form form__edit-form_type_place-picture'
        name= 'link'
        placeholder= 'link'
        required
        ref={linkRef}
      />
      <span className='form__input-error' id='new-place-link-error'></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
