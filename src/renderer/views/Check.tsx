import { FC, useState } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { CompositeDecorator, convertToRaw, EditorState } from 'draft-js';
import SimpleEditor from '../components/SimpleEditor';
import CheckedResult from '../components/CheckedResult';
import { appToaster } from '../utils';

const decorator = new CompositeDecorator([]);

const Check: FC = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );
  const [checkedErrors, setCheckedErrors] = useState([]);

  const handleCheck = async () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const result = await window.electron.httpRequest('check', {
      key: 'checkContent',
      value: rawContent.blocks.map((block) => block.text).join('\n'),
    });
    if (result.code === 200) {
      setCheckedErrors(result.data as never);
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
          editorState={editorState}
          updateState={(state: EditorState) => setEditorState(state)}
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
        <h3>Result</h3>
        <CheckedResult data={checkedErrors} />
      </section>
    </main>
  );
};

export default Check;
