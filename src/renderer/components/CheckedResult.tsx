import { FC } from 'react';
import { HTMLTable } from '@blueprintjs/core';

export type CheckedError = {
  key?: string;
  start: number;
  end: number;
  errText: string;
  corText: string;
  level: number;
  message: string;
};

interface CheckedResultProps {
  data: CheckedError[];
}

const CheckedResult: FC<CheckedResultProps> = ({ data }) => {
  return (
    <HTMLTable condensed interactive style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>错误词汇</th>
          <th>建议词汇</th>
          <th>错误等级</th>
          <th>错误原因</th>
        </tr>
      </thead>
      <tbody>
        {data.map((error) => {
          return (
            <tr key={`${error.key}-${error.start}`}>
              <td>{error.errText}</td>
              <td>{error.corText}</td>
              <td>{error.level}</td>
              <td>{error.message}</td>
            </tr>
          );
        })}
      </tbody>
    </HTMLTable>
  );
};

export default CheckedResult;
