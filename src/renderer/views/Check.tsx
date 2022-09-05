import { FC, useState } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import {
  CompositeDecorator,
  ContentBlock,
  ContentState,
  convertToRaw,
  EditorState,
  Modifier,
} from 'draft-js';
import SimpleEditor from '../components/SimpleEditor';
import CheckedResult from '../components/CheckedResult';
import { appToaster } from '../utils';
import CheckedErrorSpan from '../components/CheckedSpan';

const decorator = new CompositeDecorator([
  {
    strategy: (
      block: ContentBlock,
      callback: (start: number, end: number) => void,
      contentState: ContentState
    ) => {
      block.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        if (entityKey === null) {
          return false;
        }
        return contentState.getEntity(entityKey).getType() === 'CHECKED_ERROR';
      }, callback);
    },
    component: CheckedErrorSpan,
  },
]);

const Check: FC = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );
  const [checkedErrors, setCheckedErrors] = useState([]);

  const handleSave = () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    // eslint-disable-next-line no-console
    console.log(rawContent);
  };

  const handleCheck = async () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const result = await window.electron.httpRequest('check', {
      key: 'checkContent',
      value: rawContent.blocks.map((block) => block.text).join('\n'),
    });
    if (result.code === 200) {
      setCheckedErrors(result.data as never);
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'CHECKED_ERROR',
        'MUTABLE',
        checkedErrors[0]
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const contentStateWithLink = Modifier.applyEntity(
        contentStateWithEntity,
        editorState.getSelection(),
        entityKey
      );
      setEditorState(
        EditorState.set(editorState, { currentContent: contentStateWithLink })
      );
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
          <Button icon="arrow-up" text="保存" onClick={() => handleSave()} />
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
