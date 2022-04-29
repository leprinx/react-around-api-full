import button from '../images/button/Close-Icon.svg';

function ImagePopup({
  isOpen,
  onClick,
  onClose,
  card,
}) {
  return (
    <div
      className={`cover cover_type_preview ${isOpen && 'cover_open'}`}
      onClick={onClick}
    >
      <div className='cover__box cover__box_type_preview'>
        <button className='reset-button' type='reset' onClick={onClose}>
          <img
            src={button}
            alt='close icon'
            className='button button_type_preview'
          />
        </button>
        <img
          alt={card?.name}
          className='cover__preview-image'
          src={card?.link}
        />
        <p className='cover__preview-image-subtitle'>{card?.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
