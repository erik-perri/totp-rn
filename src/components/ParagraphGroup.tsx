import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {ParagraphSize} from './Paragraph';

type ParagraphGroupProps = PropsWithChildren<{
  size?: ParagraphSize;
}>;

const ParagraphGroup: FunctionComponent<ParagraphGroupProps> = ({
  children,
  size,
}) => {
  const {styles} = useStyles(stylesheet);

  return (
    <ParagraphGroupContext.Provider value={{size}}>
      <View style={styles.group}>{children}</View>
    </ParagraphGroupContext.Provider>
  );
};

const stylesheet = createStyleSheet(() => ({
  group: {
    gap: 8,
  },
}));

const ParagraphGroupContext = createContext<{
  size?: ParagraphSize;
}>({
  size: undefined,
});

export function useParagraphGroupContext() {
  return useContext(ParagraphGroupContext);
}

export default ParagraphGroup;
