import {
  faCloudflare,
  faDropbox,
  faFirefox,
  faGithub,
  faGitlab,
  faGoogle,
  faMicrosoft,
  faNpm,
  faPaypal,
} from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FunctionComponent, useMemo} from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {Authenticator} from '../../parsers/authenticatorParser';

type AuthenticatorIconProps = {
  issuer: Authenticator['issuer'];
};

const AuthenticatorIcon: FunctionComponent<AuthenticatorIconProps> = ({
  issuer,
}) => {
  const {styles} = useStyles(stylesheet);

  const icon = useMemo(() => {
    switch (true) {
      case issuer.toLowerCase().includes('cloudflare'):
        return faCloudflare;
      case issuer.toLowerCase().includes('dropbox'):
        return faDropbox;
      case issuer.toLowerCase().includes('firefox'):
        return faFirefox;
      case issuer.toLowerCase().includes('github'):
        return faGithub;
      case issuer.toLowerCase().includes('gitlab'):
        return faGitlab;
      case issuer.toLowerCase().includes('google'):
        return faGoogle;
      case issuer.toLowerCase().includes('microsoft'):
        return faMicrosoft;
      case issuer.toLowerCase() === 'npm':
        return faNpm;
      case issuer.toLowerCase().includes('paypal'):
        return faPaypal;
    }

    return faUser;
  }, [issuer]);

  return <FontAwesomeIcon style={styles.icon} icon={icon} size={32} />;
};

const stylesheet = createStyleSheet(theme => ({
  icon: {
    color: theme.colors.text,
  },
}));

export default AuthenticatorIcon;
