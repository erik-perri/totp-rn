import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import React, {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {StyleSheet, View} from 'react-native';

import PopupBackdrop from './PopupBackdrop';

type MenuPopupProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

const MenuPopup: FunctionComponent<MenuPopupProps> = ({
  children,
  isOpen,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <BottomSheetModal
      index={0}
      enableDynamicSizing
      enablePanDownToClose
      backdropComponent={PopupBackdrop}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}>
      <BottomSheetView>
        <View style={styles.contentContainer}>{children}</View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    paddingBottom: 16,
  },
});

export default MenuPopup;
