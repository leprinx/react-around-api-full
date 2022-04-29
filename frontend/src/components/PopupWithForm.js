import button from '../images/button/Close-Icon.svg';

function PopupWithForm(props) {
  return (
    <section className={props.name}>
      <div
        onClick={props.onClick}
        className={`cover cover_type_${props.name} ${
          props.isOpen ? 'cover_open' : ''
        }`}
      >
        <div className='cover__box'>
          <h2 className='profile-form__title'>{props.title}</h2>
          <form
            onSubmit={props.onSubmit}
            className={`form form_type_${props.name}`}
            name={props.name}
          >
            {props.children}
            <button className='reset-button form__save-button' type='submit'>
              {props.buttonText}
            </button>
          </form>
          <button className='reset-button' type='reset'>
            <img
              src={button}
              alt='close icon'
              className='button button_type_profile'
              onClick={props.onClose}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

export default PopupWithForm;
