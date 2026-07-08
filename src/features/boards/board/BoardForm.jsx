import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spacer } from "../../../App.styles";
import api from "../../../api/axios";
import {
  Wrap,
  Card,
  FormRow,
  Label,
  Input,
  TextArea,
  ButtonRow,
  CancelButton,
  SubmitButton,
  FileLabel,
  FileInput,
  PreviewWrap,
  PreviewItem,
  PreviewImg,
  RemoveButton,
} from "../styles/BoardForm.styles";

const BoardForm = () => {
  const navi = useNavigate();
  const [boardTitle, setBoardTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    // e.target.files는 FileList라 배열 메서드가 없음 -> 배열로 변환
    // 동시에 각 File을 미리보기용 blob URL과 함께 묶어서 저장
    const picked = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file), // <img src={preview}>로 바로 보여줄 수 있는 임시 URL
    }));

    // 이전에 골라둔 파일 + 이번에 새로 고른 파일을 합침 (여러 번에 걸쳐 선택 가능하니까)
    const merged = [...files, ...picked];

    // 합친 개수가 5개 초과면 막고, 이번 선택은 반영하지 않음
    if (merged.length > 5) {
      alert("최대 5개까지 첨부 가능합니다.");
      e.target.value = "";
      return;
    }

    setFiles(merged);
    e.target.value = ""; // input 값을 비워야 같은 파일을 다시 골라도 onChange가 재발생함
  };

  // 미리보기에서 x 버튼 눌렀을 때 해당 파일만 목록에서 제거
  const removeFile = (index) => {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview); // 안 쓰는 blob URL은 메모리에서 해제
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <Spacer>
      <Wrap>
        <Card>
          <FormRow>
            <Label>제목</Label>
            <Input onChange={(e) => setBoardTitle(e.target.value)} />
          </FormRow>

          <FormRow>
            <Label>내용</Label>
            <TextArea onChange={(e) => setBoardContent(e.target.value)} />
          </FormRow>

          <FileLabel htmlFor="board-file-input">파일 선택</FileLabel>
          <FileInput
            id="board-file-input"
            type="file"
            multiple
            onChange={handleFileChange}
          />

          <PreviewWrap>
            {files.map((f, i) => (
              <PreviewItem key={f.preview}>
                <PreviewImg src={f.preview} />
                <RemoveButton type="button" onClick={() => removeFile(i)}>
                  ×
                </RemoveButton>
              </PreviewItem>
            ))}
          </PreviewWrap>

          <ButtonRow>
            <CancelButton type="button" onClick={() => navi("/boards")}>
              취소
            </CancelButton>
            <SubmitButton type="submit">등록</SubmitButton>
          </ButtonRow>
        </Card>
      </Wrap>
    </Spacer>
  );
};

export default BoardForm;
