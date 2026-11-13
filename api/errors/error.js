// Create an error message class
class ErrorMessage {
  alphaErr(field = "Field") {
    return `${field} must only contain letters.`;
  }

  lengthErr(field = "Field", min, max) {
    return `${field} must be between ${min} and ${max} characters.`;
  }

  lengthMinErr(field = "Field", min) {
    return `${field} must at least ${min} characters long`;
  }

  lengthMaxErr(field = "Field", max) {
    return `${field} must not exceed ${max} characters`;
  }

  emailErr() {
    return "Please provide a valid email address.";
  }

  requiredErr(attr) {
    return `${attr} is required.`;
  }

  atleastErr(attr, criterion) {
    return `${attr} must contain atleast one ${criterion}`;
  }

  confirmErr(attr) {
    return `Please confirm your ${attr}`;
  }

  mismatchErr(attr) {
    return `${attr} do not match`;
  }

  onlyErr(attr, feature) {
    return `${attr} must contain only ${feature}`;
  }
}

const errorMessage = new ErrorMessage();
export default errorMessage;
