import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import React, {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {StyleSheet, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import MenuPopupBackdrop from './MenuPopupBackdrop';

type MenuPopupProps = PropsWithChildren<{
  isOpen: boolean;
  maxDynamicContentSize?: number;
  onClose: () => void;
}>;

const MenuPopup: FunctionComponent<MenuPopupProps> = ({
  children,
  isOpen,
  maxDynamicContentSize,
  onClose,
}) => {
  const {styles} = useStyles(stylesheet);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const PopupBackground = useCallback(
    () => <View style={styles.background} />,
    [styles],
  );

  const PopupHandle = useCallback(
    () => (
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
      </View>
    ),
    [styles],
  );

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
      backdropComponent={MenuPopupBackdrop}
      backgroundComponent={PopupBackground}
      enableDynamicSizing
      enablePanDownToClose
      handleComponent={PopupHandle}
      index={0}
      maxDynamicContentSize={maxDynamicContentSize}
      onChange={handleSheetChanges}
      ref={bottomSheetRef}>
      <BottomSheetView>
        <View style={styles.contentContainer}>{children}</View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const stylesheet = createStyleSheet((theme, runtime) => ({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  contentContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    paddingBottom: runtime.insets.bottom + 12,
  },
  handle: {
    backgroundColor: theme.colors.text,
    borderRadius: 9999,
    height: 4,
    marginVertical: 10,
    width: 30,
  },
  handleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default MenuPopup;
