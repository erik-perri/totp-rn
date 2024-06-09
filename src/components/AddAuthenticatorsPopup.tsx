import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import {AuthenticatorWithoutId} from '../parsers/authenticatorParser';
import AddAuthenticatorsPopupItem from './AddAuthenticatorsPopupItem';
import PopupBackdrop from './PopupBackdrop';

type AddAuthenticatorsPopupProps = {
  authenticators: AuthenticatorWithoutId[];
  isOpen: boolean;
  onCancel: () => void;
  onSave: (selected: AuthenticatorWithoutId[]) => Promise<void>;
};

const AddAuthenticatorsPopup: FunctionComponent<
  AddAuthenticatorsPopupProps
> = ({authenticators, isOpen, onCancel, onSave}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const dimensions = useWindowDimensions();
  const maxHeight = useMemo(() => dimensions.height * 0.5, [dimensions]);

  const [enabledState, setEnabledState] = useState<Record<number, boolean>>({});

  const hasEnabled = useMemo(() => {
    return Object.values(enabledState).some(Boolean);
  }, [enabledState]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onCancel();
      }
    },
    [onCancel],
  );

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
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [authenticators, isOpen]);

  return (
    <BottomSheetModal
      backdropComponent={PopupBackdrop}
      enableDynamicSizing
      enablePanDownToClose
      index={0}
      maxDynamicContentSize={maxHeight}
      onChange={handleSheetChanges}
      ref={bottomSheetRef}>
      <BottomSheetView>
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
          <Pressable
            disabled={isSaving}
            onPress={onCancel}
            style={buttonStyleGenerator}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable
            disabled={isSaving || !hasEnabled}
            onPress={() => void handleSave()}
            style={buttonStyleGenerator}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    padding: 12,
  },
  buttonText: {
    textAlign: 'center',
  },
});

function buttonStyleGenerator({pressed}: PressableStateCallbackType) {
  return {
    backgroundColor: pressed ? '#d1d5db' : '#f3f4f6',
    borderRadius: 8,
    padding: 16,
    flexGrow: 1,
  };
}

export default AddAuthenticatorsPopup;
