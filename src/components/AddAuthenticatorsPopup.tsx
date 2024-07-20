import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

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
          authenticators.map((_, index) => [index.toString(), true]),
        ),
      );
    }
  }, [authenticators, isOpen]);

  return (
    <MenuPopup
      maxDynamicContentSize={maxHeight}
      isOpen={isOpen}
      onClose={onCancel}>
      <View style={styles.contentContainer}>
        {authenticators.map((authenticator, index) => (
          <AddAuthenticatorsPopupItem
            key={`${index.toString()}-${authenticator.issuer}`}
            authenticator={authenticator}
            canCheck={authenticators.length > 1}
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
        ))}
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
    </MenuPopup>
  );
};

const stylesheet = createStyleSheet(() => ({
  contentContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  buttonContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    padding: 12,
  },
}));

export default AddAuthenticatorsPopup;
