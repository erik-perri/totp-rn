import {RefObject, useEffect} from 'react';

import {useFormGroupContext} from '../components/FormGroup';

type FocusableElement = {
  focus(): void;
};

export default function useFormGroupLabelSelector(
  elementRef: RefObject<FocusableElement>,
) {
  const {addLabelPressEventListener} = useFormGroupContext();

  useEffect(() => {
    const unsubscribe = addLabelPressEventListener(() => {
      elementRef.current?.focus();
    });

    return () => {
      unsubscribe();
    };
  }, [addLabelPressEventListener, elementRef]);
}
