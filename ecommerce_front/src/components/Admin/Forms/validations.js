const validations = (input) => {
  let regexGameName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexReleased = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  let regexNumberDecimal = /^\d+(\.\d+)?$/;
  let regexPlusNumber = /^\+([0-9]{2})$/;
  let regexNumber = /^-?\d+$/;
  const errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  } else if (!regexGameName.test(input.name)) {
    errors.name = "Game name only accept letters and blank spaces";
  }

  if (!input.released) {
    errors.released = "Date is required";
  } else if (!regexReleased.test(input.released)) {
    errors.released = "Date must be in date format";
  }

  if (!input.price) {
    errors.price = "Price is required";
  } else if (!regexNumberDecimal.test(input.price)) {
    errors.price = "Price must be a number";
  }

  if (!input.weight) {
    errors.weight = "Difficulty is required";
  } else if (!regexNumberDecimal.test(input.weight)) {
    errors.weight = "Weight must be a number";
  }
  if (!input.age) {
    errors.age = "Age is required";
  } else if (!regexPlusNumber.test(input.age)) {
    errors.age = "Age must be written like this: +15";
  }
  if (!input.players_min) {
    errors.players_min = "Players Min is required";
  } else if (!regexNumber.test(input.players_min)) {
    errors.players_min = "Players Min must be a number";
  }
  if (!input.players_max) {
    errors.players_max = "Players Max is required";
  } else if (!regexNumber.test(input.players_max)) {
    errors.players_max = "Players Min must be a number";
  } else if (input.players_max < input.players_min) {
    errors.players_max = " Players Max must be a larger than Players Min";
  }
  if (!input.playing_time) {
    errors.playing_time = "Playing Time is required";
  } else if (!regexNumber.test(input.playing_time)) {
    errors.playing_time = "Players time  must be a number";
  }
  if (!input.stock) {
    errors.stock = "Stock is required";
  } else if (!regexNumber.test(input.stock)) {
    errors.stock = "Stock must be a number";
  }

  return errors;
};

export default validations;
