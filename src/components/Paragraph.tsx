import React, {FunctionComponent, PropsWithChildren} from 'react';
import {Text} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import useStyleVariant from '../hooks/useStyleVariant';
import {useParagraphGroupContext} from './ParagraphGroup';

export type ParagraphSize = 'base' | 'sm';

type ParagraphProps = PropsWithChildren<{
  size?: ParagraphSize;
}>;

const Paragraph: FunctionComponent<ParagraphProps> = ({children, size}) => {
  const {styles} = useStyles(stylesheet);
  const {size: defaultSize} = useParagraphGroupContext();

  const paragraphStyles = useStyleVariant(
    {
      default: {
        base: styles.paragraph,
      },
      sm: {
        base: styles.paragraphSmall,
      },
    },
    size ?? defaultSize ?? 'base',
  );

  return <Text style={paragraphStyles}>{children}</Text>;
};

const stylesheet = createStyleSheet(theme => ({
  paragraph: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: 'semibold',
  },
  paragraphSmall: {
    fontSize: theme.fontSize.sm,
  },
}));

export default Paragraph;
