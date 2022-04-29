import successImage from '../images/succes/succesImage.svg';
import errorImage from '../images/succes/errorImage.svg';
import button from '../images/button/Close-Icon.svg';

function InfoTooltip({ succes, isOpen, onClose }) {
  return (
    <div
      className={`cover cover_info-tool-tip ${isOpen && 'cover_open'}`}
    >
      <div className='cover__box cover__box_type_info-tool-tip'>
        <button className='reset-button' type='reset' onClick={onClose}>
          <img
            src={button}
            alt='close icon'
            className='button button_type_preview'
          />
        </button>
        <img
          className='cover__info-tool-tip_image'
          src={succes ? successImage : errorImage}
          alt='Status Image'
        />
        <p className='cover__info-tool-tip_message'>
          {succes
            ? 'Success! You have now been registered.'
            : 'Oops, something went wrong! Please try again.'}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
