export const email = {
  regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$',
  length: {
    max: 100
  }
};

export const password = {
  regex: new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*()\\\\\/\\[\\]\\-_=+{}|?>.<,:;~`\'])(?=.*[0-9])(?=.*[a-z]).{8,20}$'),
  length: {
    min: 8,
    max: 20
  }
};
