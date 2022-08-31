import { Position, Toaster } from '@blueprintjs/core';

const appToaster = Toaster.create({
  position: Position.TOP,
  maxToasts: 3,
});

const nanoid = (): string => {
  return 'V1StGXR8_Z5jdHi6B-myT';
};

export { appToaster, nanoid };
