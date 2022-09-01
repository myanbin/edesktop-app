import { FC, useState } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { RawDraftContentState } from 'draft-js';
import SimpleEditor from '../components/SimpleEditor';
import { appToaster } from '../utils';

const Check: FC = () => {
  const [rawContent, setRawContent] = useState({
    blocks: [],
    entityMap: {},
  } as RawDraftContentState);

  const handleCheck = async () => {
    const input = {
      key: 'checkContent',
      value: rawContent.blocks.map((block) => block.text).join('\n'),
    };
    const result = await window.electron.httpRequest('check', input);
    if (result.code === 200) {
      // eslint-disable-next-line no-console
      console.log(result);
    } else {
      appToaster.show({
        intent: Intent.DANGER,
        icon: 'warning-sign',
        message: '检校失败',
      });
    }
  };

  return (
    <main className="check-page">
      <h2 className="pane-header">Check</h2>
      <section className="input">
        <SimpleEditor
          rawContent={rawContent}
          updateContent={(raw) => setRawContent(raw)}
        />
        <div className="space-content">
          <Button icon="arrow-up" text="上传文档" />
          <Button
            intent={Intent.PRIMARY}
            icon="tick"
            text="立即检校"
            onClick={() => handleCheck()}
          />
        </div>
      </section>
      <section className="output">
        <p>输出错误</p>
      </section>
    </main>
  );
};

export default Check;
