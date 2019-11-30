import React, { useRef, useEffect } from 'react';
import _ from 'lodash';

function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!_.isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffect(callback: any, dependencies: any) {
  useEffect(callback, useDeepCompareMemoize(dependencies));
}
