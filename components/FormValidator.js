class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _getErrorEl(inputElement) {
    return this._formEl.querySelector(`#${inputElement.id}-error`);
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._getErrorEl(inputElement);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._getErrorEl(inputElement);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonEl.classList.add(this._inactiveButtonClass);
      this._buttonEl.disabled = true;
    } else {
      this._buttonEl.classList.remove(this._inactiveButtonClass);
      this._buttonEl.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonEl = this._formEl.querySelector(this._submitButtonSelector);

    this._toggleButtonState(this._buttonEl);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(
          this._inputList,
          this._buttonEl,
          this._settings
        );
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation(inputElement) {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.value = "";
    });

    this._buttonEl.classList.add(this._inactiveButtonClass);
    this._buttonEl.disabled = true;
  }
}

export default FormValidator;
