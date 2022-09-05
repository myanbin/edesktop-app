import { FC } from 'react';
import { HTMLTable } from '@blueprintjs/core';

export type CheckedError = {
  errCode: number;
  errPosition: number;
  errText: string;
  corText: string;
  errMessage: string;
};

interface CheckedResultProps {
  data: CheckedError[];
}

const CheckedResult: FC<CheckedResultProps> = ({ data }) => {
  if (data.length === 0) {
    return <p>暂未检校或文稿中无错误</p>;
  }
  return (
    <HTMLTable condensed interactive style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>错误等级</th>
          <th>错误词汇</th>
          <th>建议词汇</th>
          <th>错误原因</th>
        </tr>
      </thead>
      <tbody>
        {data.map((error) => {
          return (
            <tr key={error.errPosition}>
              <td>{error.errCode}</td>
              <td>{error.errText}</td>
              <td>{error.corText}</td>
              <td>{error.errMessage}</td>
            </tr>
          );
        })}
      </tbody>
    </HTMLTable>
  );
};

export default CheckedResult;
