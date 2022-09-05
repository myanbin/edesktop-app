import { FC } from 'react';
import { ContentState } from 'draft-js';

interface CheckedErrorSpanProps {
  contentState: ContentState;
  entityKey: string;
}

const CheckedErrorSpan: FC<CheckedErrorSpanProps> = ({
  contentState,
  entityKey,
}) => {
  const entity = contentState.getEntity(entityKey);
  const checkedError = entity.getData();
  return <mark>{checkedError.errText}</mark>;
};

export default CheckedErrorSpan;
