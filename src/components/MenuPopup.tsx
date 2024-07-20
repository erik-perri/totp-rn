import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

type MenuPopupProps = PropsWithChildren<{
  isOpen: boolean;
  maxDynamicContentSize?: number;
  onClose: () => void;
}>;

const PopupBackdrop: FunctionComponent<BottomSheetBackdropProps> = props => {
  return (
    <BottomSheetBackdrop
      opacity={0.25}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      {...props}
    />
  );
};

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
      backdropComponent={PopupBackdrop}
      backgroundComponent={PopupBackground}
      enableDynamicSizing
      enablePanDownToClose
      handleComponent={PopupHandle}
      index={0}
      maxDynamicContentSize={maxDynamicContentSize}
      onChange={handleSheetChanges}
      ref={bottomSheetRef}>
      <BottomSheetView>
        <SafeAreaView edges={['bottom']}>
          <View style={styles.contentContainer}>{children}</View>
        </SafeAreaView>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const stylesheet = createStyleSheet(theme => ({
  contentContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    paddingBottom: 12,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
