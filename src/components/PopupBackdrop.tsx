import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import React, {FunctionComponent} from 'react';

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

export default PopupBackdrop;
