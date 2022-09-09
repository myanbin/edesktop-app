import { FC } from 'react';
import { ContentState } from 'draft-js';

interface CheckedErrorProps {
  contentState: ContentState;
  entityKey: string;
}

const CheckedError: FC<CheckedErrorProps> = ({ contentState, entityKey }) => {
  const entity = contentState.getEntity(entityKey);
  const error = entity.getData();
  return <span className="checked-error">{error.errText}</span>;
};

export default CheckedError;
