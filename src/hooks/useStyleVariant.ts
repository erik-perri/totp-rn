import {useMemo} from 'react';

export type ExtractStyles<VariantMap> = {
  [VariantName in keyof VariantMap]: VariantMap[VariantName] extends Record<
    string,
    infer Styles
  >
    ? Styles
    : never;
}[keyof VariantMap];

export type VariantMap<Styles> = Record<
  'default' | (string & NonNullable<unknown>),
  Record<string, Styles> | undefined
>;

export default function useStyleVariant<Map extends VariantMap<Styles>, Styles>(
  variants: Map,
  currentVariant: keyof VariantMap<Styles>,
  state: Record<string, boolean> = {},
): ExtractStyles<Styles> {
  return useMemo(() => {
    const baseStyles = variants.default;
    const themeStyles =
      currentVariant === 'default' ? {} : variants[currentVariant];
    const stateWithBase = {
      base: true,
      ...state,
    };

    return Object.entries(stateWithBase).reduce((acc, [key, value]) => {
      if (!value) {
        return acc;
      }

      return {
        ...acc,
        ...(baseStyles?.[key] || {}),
        ...(themeStyles?.[key] || {}),
      };
    }, baseStyles?.base ?? ({} as Styles)) as ExtractStyles<Styles>;
  }, [variants, currentVariant, state]);
}
