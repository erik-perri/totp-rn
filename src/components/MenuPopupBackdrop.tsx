import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import React, {FunctionComponent} from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

const MenuPopupBackdrop: FunctionComponent<
  BottomSheetBackdropProps
> = props => {
  const {styles} = useStyles(stylesheet);

  return (
    <BottomSheetBackdrop
      style={styles.backdrop}
      opacity={styles.backdrop.opacity}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      {...props}
    />
  );
};

const stylesheet = createStyleSheet(theme => ({
  backdrop: {
    backgroundColor: theme.colors.backdrop.background,
    opacity: 0.4,
  },
}));

export default MenuPopupBackdrop;
