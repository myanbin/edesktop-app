import { FC, useState } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { RawDraftContentState } from 'draft-js';
import GotoButton from '../components/GotoButton';
import SimpleEditor from '../components/SimpleEditor';

const Check: FC = () => {
  const [rawContent, setRawContent] = useState({
    blocks: [],
    entityMap: {},
  } as RawDraftContentState);

  const handleCheck = () => {
    // eslint-disable-next-line no-console
    console.log(rawContent);
    const input = {
      key: 'content',
      value: rawContent.blocks.map((block) => block.text).join('\n'),
    };
    // eslint-disable-next-line no-console
    console.log(input);
  };

  return (
    <main>
      <h2 className="pane-header">
        Check
        <GotoButton to="/auth/login" />
      </h2>
      <section className="input">
        <SimpleEditor
          rawContent={rawContent}
          updateContent={(raw) => setRawContent(raw)}
        />
        <div className="action">
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
