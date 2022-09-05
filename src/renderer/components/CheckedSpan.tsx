import { FC } from 'react';
import { ContentState } from 'draft-js';

interface CheckedErrorSpanProps {
  contentState: ContentState;
  entityKey: string;
  children: never;
}

const CheckedErrorSpan: FC<CheckedErrorSpanProps> = ({
  contentState,
  entityKey,
  children,
}) => {
  const entity = contentState.getEntity(entityKey);
  const checkedError = entity.getData();
  return <mark title={checkedError.corText}>{children}</mark>;
};

export default CheckedErrorSpan;
