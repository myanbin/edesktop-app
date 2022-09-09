import { FC, useState } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import {
  CompositeDecorator,
  ContentBlock,
  ContentState,
  convertToRaw,
  EditorState,
  Modifier,
  SelectionState,
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

type CheckedError = {
  key?: string;
  start: number;
  end: number;
  errText: string;
  corText: string;
  level: number;
  message: string;
};

const Check: FC = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );
  const [checkedErrors, setCheckedErrors] = useState<CheckedError[]>([]);

  const handleSave = () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    // eslint-disable-next-line no-console
    console.log(rawContent);
    console.log(editorState.getSelection());
  };

  const handleCheck = async () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    // 创建检校请求体，每一个 Block 为一个检校单元
    const input = rawContent.blocks.map((block) => {
      return {
        key: block.key,
        value: block.text,
      };
    });
    const result = await window.electron.httpRequest('check', input);
    if (result.code === 200) {
      setCheckedErrors(result.data);
      // eslint-disable-next-line no-console
      console.log('response', result.data);

      result.data.forEach((error: CheckedError) => {
        const blockKey = error.key as string;
        const selection = SelectionState.createEmpty(blockKey);
        const newSelection = selection.merge({
          anchorOffset: error.start,
          focusOffset: error.end,
        });
        console.log(newSelection);
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          'CHECKED_ERROR',
          'MUTABLE',
          error
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const contentStateWithLink = Modifier.applyEntity(
          contentStateWithEntity,
          EditorState.acceptSelection(editorState, newSelection).getSelection(),
          entityKey
        );
        setEditorState(
          EditorState.set(editorState, { currentContent: contentStateWithLink })
        );
      });
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
