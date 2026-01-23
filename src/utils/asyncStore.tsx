import AsyncStorage from '@react-native-async-storage/async-storage';

const IS_LOGGED_KEY = 'IS_LOGGED';

export const saveIsLoggedIn = async (isLogged: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(IS_LOGGED_KEY, JSON.stringify(isLogged));
  } catch (error) {
    console.log('saveIsLoggedInError', error);
  }
};

export const getIsLoggedIn = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(IS_LOGGED_KEY);
    return value ? JSON.parse(value) : false;
  } catch (error) {
    console.log('getIsLoggedInError', error);
    return false;
  }
};

const USERS_KEY = 'REGISTERED_USERS';

import { User } from '../types/userType';
import { LoggedInUser } from '../types/loggedInUser';
import { RequestedService } from '../types/requestedService';
import { ReferredService } from '../types/referredService';

export const saveRegisteredUser = async (user: User): Promise<void> => {
  try {
    const existingUsers = await AsyncStorage.getItem(USERS_KEY);

    const users: User[] = existingUsers ? JSON.parse(existingUsers) : [];

    users.push(user);

    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.log('saveRegisteredUserError', error);
  }
};

export const getRegisteredUsers = async (): Promise<User[]> => {
  try {
    const value = await AsyncStorage.getItem(USERS_KEY);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.log('getRegisteredUsersError', error);
    return [];
  }
};

const CURRENT_USER_KEY = 'CURRENT_USER';

export const saveLoggedInUser = async (user: LoggedInUser): Promise<void> => {
  try {
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.log('saveLoggedInUserError', error);
  }
};

export const getLoggedInUser = async (): Promise<LoggedInUser | null> => {
  try {
    const value = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log('getLoggedInUserError', error);
    return null;
  }
};

export const clearLoggedInUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.log('clearLoggedInUserError', error);
  }
};

const REQUESTED_SERVICES_KEY = 'REQUESTED_SERVICES';

export const addRequestedService = async (
  service: RequestedService,
): Promise<void> => {
  try {
    const stored = await AsyncStorage.getItem(REQUESTED_SERVICES_KEY);
    const services: RequestedService[] = stored ? JSON.parse(stored) : [];

    const user = await getLoggedInUser();
    if (!user) return;

    // ❗ Prevent duplicate requests for this user
    const alreadyExists = services.some(
      item => item.id === service.id && item.userId === user.id,
    );

    if (!alreadyExists) {
      services.push({ ...service, userId: user.id });

      await AsyncStorage.setItem(
        REQUESTED_SERVICES_KEY,
        JSON.stringify(services),
      );
    }
  } catch (error) {
    console.log('addRequestedServiceError', error);
  }
};

export const getRequestedServices = async (): Promise<RequestedService[]> => {
  try {
    const user = await getLoggedInUser();
    if (!user) return [];

    const stored = await AsyncStorage.getItem(REQUESTED_SERVICES_KEY);
    const services: RequestedService[] = stored ? JSON.parse(stored) : [];
    return services.filter(item => item.userId === user.id);
  } catch (error) {
    console.log('getRequestedServicesError', error);
    return [];
  }
};

export const removeRequestedService = async (
  serviceId: string,
): Promise<void> => {
  try {
    const stored = await AsyncStorage.getItem(REQUESTED_SERVICES_KEY);
    const services: RequestedService[] = stored ? JSON.parse(stored) : [];

    const updatedServices = services.filter(item => item.id !== serviceId);

    await AsyncStorage.setItem(
      REQUESTED_SERVICES_KEY,
      JSON.stringify(updatedServices),
    );
  } catch (error) {
    console.log('removeRequestedServiceError', error);
  }
};
const REFERRED_SERVICES_KEY = 'REFERRED_SERVICES';

export const addReferredService = async (
  service: ReferredService,
): Promise<void> => {
  try {
    const stored = await AsyncStorage.getItem(REFERRED_SERVICES_KEY);
    const services: ReferredService[] = stored ? JSON.parse(stored) : [];

    const user = await getLoggedInUser();
    if (!user) return;

    const referralId =
      Date.now().toString() + Math.random().toString(36).substring(7);
    services.push({ ...service, referralId, userId: user.id });

    await AsyncStorage.setItem(REFERRED_SERVICES_KEY, JSON.stringify(services));
  } catch (error) {
    console.log('addReferredServiceError', error);
  }
};

export const getReferredServices = async (): Promise<ReferredService[]> => {
  try {
    const user = await getLoggedInUser();
    if (!user) return [];

    const stored = await AsyncStorage.getItem(REFERRED_SERVICES_KEY);
    const services: ReferredService[] = stored ? JSON.parse(stored) : [];
    return services.filter(item => item.userId === user.id);
  } catch (error) {
    console.log('getReferredServicesError', error);
    return [];
  }
};

export const removeReferredService = async (
  serviceId: string,
): Promise<void> => {
  try {
    const stored = await AsyncStorage.getItem(REFERRED_SERVICES_KEY);
    const services: ReferredService[] = stored ? JSON.parse(stored) : [];

    const updatedServices = services.filter(
      item => item.referralId !== serviceId,
    );

    await AsyncStorage.setItem(
      REFERRED_SERVICES_KEY,
      JSON.stringify(updatedServices),
    );
  } catch (error) {
    console.log('removeReferredServiceError', error);
  }
};
