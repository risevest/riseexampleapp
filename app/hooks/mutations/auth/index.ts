import {useLinkTo} from '@react-navigation/native';
import extractPathFromURL from '@react-navigation/native/src/extractPathFromURL';
import {DispatchAuthAction} from 'app/redux/user/types';
import appsFlyer from 'app/utils/analytics/appsFlyer';
import {setKeychainValues} from 'app/utils/keychain';
import {deepLinkingPrefixes} from 'app/view/navigator/constants';
import {Linking} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {setUserId} from '../../../redux/user/actionCreators';
import {setItemToStorage} from '../../../utils/asyncstorage';
import {useDisplayMessage} from '../../useDisplayMessage';
import { login, pinLogin } from 'app/api/auth';

interface Session {
  country: string;
  hasCompletedSignup: boolean;
  id: number;
  token: string;
  uuid: string;
}

interface LoginData {
  email: string;
  type?: string;
}

interface Credentials extends LoginData {
  password: string;
}

interface PINData extends LoginData {
  pin: string;
}

async function handleLogin(
  session: Session,
  dispatch: DispatchAuthAction,
  linkTo?: (url: string) => void,
) {
  await setItemToStorage('sessionToken', session.token);
  await setItemToStorage('country', session.country);
  appsFlyer.setUserId(session.uuid);

  dispatch(setUserId(session.id));
  if (linkTo) {
    await handleDeepLink(linkTo);
  }
}

export async function handleDeepLink(linkTo: (url: string) => void) {
  const url = await Linking.getInitialURL();

  if (url) {
    const extractedPath = extractPathFromURL(deepLinkingPrefixes, url);
    if (extractedPath) {
      linkTo(extractedPath);
    }
  }
}

async function handleLoginSuccess(
  session: Session,
  data: Credentials,
  dispatch: DispatchAuthAction,
  linkTo?: (url: string) => void,
) {
  handleLogin(session, dispatch, linkTo);
  // if this fail it won't affect the app
  await setKeychainValues(data.email, data.password);
}

async function handlePinLoginSucess(
  session: Session,
  dispatch: DispatchAuthAction,
  linkTo: (url: string) => void,
) {
  handleLogin(session, dispatch, linkTo);
}

export const useLoginMutation = () => {
  const {displayServerError} = useDisplayMessage();
  const dispatch = useDispatch();
  const linkTo = useLinkTo();

  return useMutation(

    {
      mutationFn:     (data_: Credentials = {email: 'allisonkosy@gmail.com', password: 'Testing123@'}) => {
        const userData = data_ || {email: 'allisonkosy@gmail.com', password: 'Testing123@'};

        return login(userData.email, userData.password)
      },
      mutationKey:[ 'loginUser'],
      onError: error => {
        if (
          error instanceof Error &&
          error.message.toLocaleLowerCase().includes('network')
        ) {
          displayServerError(
            'Please check your device for internet connection',
            error.message,
          );
          return;
        }
        console.log(error)
        displayServerError(error);
      },
      onSuccess: (session: Session, data) =>
        handleLoginSuccess(session, data, dispatch, linkTo),
    },
  );
};

export const usePinLoginMutation = () => {
  const {displayServerError} = useDisplayMessage();
  const dispatch = useDispatch();
  const linkTo = useLinkTo();

  return useMutation(
    (userData: PINData) => pinLogin(userData.email, userData.pin),
    {
      mutationKey: 'pinLoginUser',
      onError: error => {
        displayServerError(error);
      },
      onSuccess: (session: Session) =>
        handlePinLoginSucess(session, dispatch, linkTo),
    },
  );
};
