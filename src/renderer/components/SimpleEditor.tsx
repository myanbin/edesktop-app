import { FC } from 'react';
import { Button, ButtonGroup, Divider } from '@blueprintjs/core';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './SimpleEditor.css';

interface SimpleEditorProps {
  editorState: EditorState;
  updateState: (state: EditorState) => void;
}

const SimpleEditor: FC<SimpleEditorProps> = ({ editorState, updateState }) => {
  return (
    <div className="simple-editor">
      <ButtonGroup minimal>
        <Button
          minimal
          icon="undo"
          onClick={() => updateState(EditorState.undo(editorState))}
        />
        <Button
          minimal
          icon="redo"
          onClick={() => updateState(EditorState.redo(editorState))}
        />
        <Divider />
        <Button
          minimal
          icon="clean"
          text="清除"
          onClick={() => updateState(EditorState.createEmpty())}
        />
      </ButtonGroup>
      <Editor
        editorState={editorState}
        onChange={(state) => updateState(state)}
      />
    </div>
  );
};

export default SimpleEditor;
