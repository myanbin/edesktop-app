import { FC, useState } from 'react';
import { Button, ButtonGroup, Divider } from '@blueprintjs/core';
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RawDraftContentState,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './SimpleEditor.css';

interface SimpleEditorProps {
  rawContent: RawDraftContentState;
  updateContent: (raw: RawDraftContentState) => void;
}

const SimpleEditor: FC<SimpleEditorProps> = (props) => {
  const { rawContent, updateContent } = props;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(convertFromRaw(rawContent))
  );

  const handleChange = (state: EditorState) => {
    setEditorState(state);
    updateContent(convertToRaw(editorState.getCurrentContent()));
  };

  return (
    <div className="simple-editor">
      <ButtonGroup minimal>
        <Button
          minimal
          icon="undo"
          onClick={() => setEditorState(EditorState.undo(editorState))}
        />
        <Button
          minimal
          icon="redo"
          onClick={() => setEditorState(EditorState.redo(editorState))}
        />
        <Divider />
        <Button
          minimal
          icon="clean"
          text="清除"
          onClick={() => setEditorState(EditorState.createEmpty())}
        />
      </ButtonGroup>
      <Editor
        editorState={editorState}
        onChange={(state) => handleChange(state)}
      />
    </div>
  );
};

export default SimpleEditor;
