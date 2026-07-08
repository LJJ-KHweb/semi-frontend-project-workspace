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
  const [deleteFileOrder, setDeleteFileOrder] = useState([]);

  const [pastFiles, setPastFiles] = useState([]); // 수정 시 이전에 이미 있던 파일 담아주는 애
  const { boardNo } = useParams();
  const isEdit = !!boardNo; // 현재 url에 boardNo가 있으면 true, 없으면 false 로 변환
  // url에 boardNo가 있으면 게시글을 보여줌
  useEffect(() => {
    if (!isEdit) return;
    api.get(`/boards/${boardNo}`).then((result) => {
      const data = result.data.data;
      setBoardTitle(data.boardTitle);
      setBoardContent(data.boardContent);
      setPastFiles(data.files ?? []);
    });
  }, [boardNo, isEdit]);

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
    if (merged.length > 5 || merged.length + pastFiles.length > 5) {
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

  const removePastFile = (file) => {
    console.log("들어옴");
    setDeleteFileOrder((prev) => [...prev, file.fileOrder]);
    setPastFiles((prev) => prev.filter((f) => f.filePath !== file.filePath));
    //console.log(deleteFileOrder);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("boardTitle", boardTitle);
    formData.append("boardContent", boardContent);
    console.log("pastFiles.length : ", pastFiles.length);
    if (files.length > 0) files.forEach((f) => formData.append("file", f.file));
    if (isEdit) {
      if (pastFiles.length > 0) {
        pastFiles.forEach((f, i) => {
          formData.append(`existingFiles[${i}].filePath`, f.filePath);
          formData.append(`existingFiles[${i}].fileOrder`, f.fileOrder);
          formData.append(`existingFiles[${i}].originalName`, f.originalName);
          formData.append(`existingFiles[${i}].boardNo`, boardNo);
          // FileDto의 나머지 필드도 동일하게 추가
        });
      }
      if (deleteFileOrder.length > 0) {
        deleteFileOrder.forEach((o, i) => {
          formData.append(`deleteOrder[${i}]`, o);
        });
      }
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
    }
    {
      /*files 는 multipartFile 형태 
      pastFiles 는 FileDto 형태
      */
    }

    const method = isEdit ? "patch" : "post";
    const url = isEdit ? `/boards/${boardNo}` : "/boards";

    try {
      const result = await api[method](url, formData);
      navi("/boards");
    } catch (err) {
      console.log(err.response.data);
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <Spacer>
      <Wrap>
        <Card onSubmit={handleSubmit}>
          <FormRow>
            <Label>제목</Label>
            <Input
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
            />
          </FormRow>

          <FormRow>
            <Label>내용</Label>
            <TextArea
              value={boardContent}
              onChange={(e) => setBoardContent(e.target.value)}
            />
          </FormRow>

          <FileLabel htmlFor="board-file-input">파일 선택</FileLabel>
          <FileInput
            id="board-file-input"
            type="file"
            multiple
            onChange={handleFileChange}
          />

          <PreviewWrap>
            {/* 수정시 이전 파일 미리보기 해주는 부분 */}
            {pastFiles.map((f) => (
              <PreviewItem key={f.filePath}>
                <PreviewImg src={f.filePath} />
                <RemoveButton type="button" onClick={() => removePastFile(f)}>
                  ×
                </RemoveButton>
              </PreviewItem>
            ))}

            {/* 작성시 첨부파일을 미리보기 해주는 부분 */}
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
            <CancelButton
              type="button"
              onClick={() => {
                isEdit ? navi(`/boards/detail/${boardNo}`) : navi("/boards");
              }}
            >
              취소
            </CancelButton>
            <SubmitButton type="submit">
              {isEdit ? "수정" : "등록"}
            </SubmitButton>
          </ButtonRow>
        </Card>
      </Wrap>
    </Spacer>
  );
};

export default BoardForm;
