import { getRegisteredUsers } from './asyncStore';

const EMAIL_REG = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,63})+$/;

export const PasswordValid = (value: string) => {
  const validMinLength = /^.{8,}$/;
  const validMaxLength = /^.{6,16}$/;
  const containLowercase = /[a-z]/;
  const containUppercase = /[A-Z]/;
  const containNumber = /\d/;
  const containSpecial = /[@$!%?&#\*]/;

  if (value === undefined || value.trim() === '') {
    return 'Please enter your password.';
  } else if (!validMinLength.test(value)) {
    return 'Use at least 8 characters, including one uppercase letter, one lowercase letter, one number and one special character.';
  } else if (!validMaxLength.test(value)) {
    return 'Use at least 8 characters, including one uppercase letter, one lowercase letter, one number and one special character.';
  } else if (!containLowercase.test(value)) {
    return 'Use at least 8 characters, including one uppercase letter, one lowercase letter, one number and one special character.';
  } else if (!containUppercase.test(value)) {
    return 'Use at least 8 characters, including one uppercase letter, one lowercase letter, one number and one special character.';
  } else if (!containNumber.test(value)) {
    return 'Use at least 8 characters, including one uppercase letter, one lowercase letter, one number and one special character.';
  } else if (!containSpecial.test(value)) {
    return 'Use at least 8 characters, including one uppercase letter, one lowercase letter, one number and one special character.';
  } else {
    return null;
  }
};

export const EmailValid = (value: string) => {
  if (value === undefined || value.trim() === '') {
    return 'Please enter your email.';
  } else if (!EMAIL_REG.test(value)) {
    return 'Please enter a valid email.';
  } else {
    return null;
  }
};

export const NameValid = (value: string) => {
  if (value === undefined || value.trim() === '') {
    return 'Please enter your name.';
  } else {
    return null;
  }
};

import { LoggedInUser } from '../types/loggedInUser';

export const validateUserLogin = async (
  email: string,
  password: string,
): Promise<LoggedInUser | null> => {
  try {
    const users = await getRegisteredUsers();

    const matchedUser = users.find(
      u => u.email === email && u.password === password,
    );

    if (matchedUser) {
      return {
        name: matchedUser.name,
        email: matchedUser.email,
      };
    }

    return null;
  } catch (error) {
    console.log('validateUserLoginError', error);
    return null;
  }
};
