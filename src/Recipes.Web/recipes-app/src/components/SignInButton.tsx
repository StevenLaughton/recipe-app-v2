import { useMsal } from '@azure/msal-react';
import { IPublicClientApplication } from '@azure/msal-browser';
import { IonButton } from '@ionic/react';
import React from 'react';
import { loginRequest } from '../auth-config';

function handleLogin(instance: IPublicClientApplication) {
  instance.loginPopup(loginRequest).catch((e: Error) => {
    console.error(e);
  });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
function SignInButton() {
  const { instance } = useMsal();

  return (
    <IonButton color="secondary" className="ml-auto" onClick={() => handleLogin(instance)}>Sign in using Popup</IonButton>
  );
}

export default SignInButton;
