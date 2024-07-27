import React, {FunctionComponent, PropsWithChildren} from 'react';
import {Text} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {useParagraphGroupContext} from './ParagraphGroup';

export type ParagraphSize = 'sm';

type ParagraphProps = PropsWithChildren<{
  size?: ParagraphSize;
}>;

const Paragraph: FunctionComponent<ParagraphProps> = ({children, size}) => {
  const {size: defaultSize} = useParagraphGroupContext();

  const {styles} = useStyles(stylesheet, {
    size: size ?? defaultSize ?? undefined,
  });

  return <Text style={styles.paragraph}>{children}</Text>;
};

const stylesheet = createStyleSheet(theme => ({
  paragraph: {
    color: theme.colors.text,
    fontWeight: 'semibold',

    variants: {
      size: {
        default: {
          fontSize: theme.fontSize.base,
        },
        sm: {
          fontSize: theme.fontSize.sm,
        },
      },
    },
  },
}));

export default Paragraph;
