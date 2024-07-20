import {useMemo} from 'react';

import {usePressableContext} from '../components/PressableShell';
import useStyleVariant, {ExtractStyles, VariantMap} from './useStyleVariant';

export default function usePressableVariant<
  Map extends VariantMap<Styles>,
  Styles,
>(
  variants: Map,
  currentVariant: keyof VariantMap<Styles>,
  state: Record<string, boolean> = {},
): ExtractStyles<Styles> {
  const {pressed, disabled} = usePressableContext();

  const pressableState = useMemo(() => {
    return {
      ...state,
      pressed,
      disabled: Boolean(disabled),
    };
  }, [disabled, state, pressed]);

  return useStyleVariant(variants, currentVariant, pressableState);
}
