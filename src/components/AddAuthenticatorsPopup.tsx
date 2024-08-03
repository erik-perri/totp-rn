import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import useCheckDuplicateAuthenticator from '../hooks/useIsDuplicateAuthenticator';
import {AuthenticatorWithoutId} from '../parsers/authenticatorParser';
import AddAuthenticatorsPopupItem from './AddAuthenticatorsPopupItem';
import Button from './Button/Button';
import ButtonText from './Button/ButtonText';
import MenuPopup from './MenuPopup';

type AddAuthenticatorsPopupProps = {
  authenticators: AuthenticatorWithoutId[];
  isOpen: boolean;
  onCancel: () => void;
  onSave: (selected: AuthenticatorWithoutId[]) => Promise<void>;
};

const AddAuthenticatorsPopup: FunctionComponent<
  AddAuthenticatorsPopupProps
> = ({authenticators, isOpen, onCancel, onSave}) => {
  const {styles} = useStyles(stylesheet);
  const checkDuplicate = useCheckDuplicateAuthenticator();
  const dimensions = useWindowDimensions();
  const maxHeight = useMemo(() => dimensions.height * 0.5, [dimensions]);

  const [enabledState, setEnabledState] = useState<Record<number, boolean>>({});

  const hasEnabled = useMemo(() => {
    return Object.values(enabledState).some(Boolean);
  }, [enabledState]);

  const [isSaving, setIsSaving] = useState(false);
  const handleSave = useCallback(async () => {
    const enabledAuthenticators = authenticators.filter(
      (_, index) => enabledState[index],
    );

    if (!enabledAuthenticators.length) {
      return;
    }

    setIsSaving(true);
    await onSave(enabledAuthenticators);
    setIsSaving(false);
  }, [authenticators, enabledState, onSave]);

  useEffect(() => {
    if (isOpen) {
      setEnabledState(
        Object.fromEntries(
          authenticators.map((authenticator, index) => [
            index.toString(),
            !checkDuplicate(authenticator),
          ]),
        ),
      );
    }
  }, [authenticators, checkDuplicate, isOpen]);

  return (
    <MenuPopup
      maxDynamicContentSize={maxHeight}
      isOpen={isOpen}
      onClose={onCancel}>
      <View style={styles.menuContainer}>
        <View style={styles.contentContainer}>
          {authenticators.map((authenticator, index) => {
            const isDuplicate = checkDuplicate(authenticator);
            return (
              <AddAuthenticatorsPopupItem
                key={`${index.toString()}-${authenticator.issuer}`}
                authenticator={authenticator}
                error={
                  isDuplicate ? 'This authenticator already exists.' : undefined
                }
                canCheck={!isDuplicate && authenticators.length > 1}
                isChecked={Boolean(enabledState[index])}
                onPress={() => {
                  setEnabledState(state => {
                    return {
                      ...state,
                      [index]: !state[index],
                    };
                  });
                }}
              />
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={onCancel} variant="ghost">
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            onPress={handleSave}
            variant="solid"
            disabled={isSaving || !hasEnabled}>
            <ButtonText>Save</ButtonText>
          </Button>
        </View>
      </View>
    </MenuPopup>
  );
};

const stylesheet = createStyleSheet(() => ({
  buttonContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  contentContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  menuContainer: {
    gap: 16,
  },
}));

export default AddAuthenticatorsPopup;
