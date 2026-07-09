import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "../../boards/styles/BoardForm.styles";

const RequireForm = () => {
  const navi = useNavigate();

  const [requireTitle, setRequireTitle] = useState("");
  const [requireContent, setRequireContent] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const picked = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const merged = [...files, ...picked];

    if (merged.length > 5) {
      alert("최대 5개까지 첨부 가능합니다.");
      e.target.value = "";
      return;
    }

    setFiles(merged);
    e.target.value = "";
  };

  const removeFile = (index) => {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!requireTitle.trim()) {
      alert("문의 제목을 입력해주세요.");
      return;
    }

    if (!requireContent.trim()) {
      alert("문의 내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();

    formData.append("requireTitle", requireTitle);
    formData.append("requireContent", requireContent);

    files.forEach((f) => {
      formData.append("file", f.file);
    });

    try {
      await api.post("/requires", formData);

      alert("문의사항이 등록되었습니다.");
      navi("/requires");
    } catch (err) {
      console.log(err.response?.data);
      alert("문의사항 등록에 실패했습니다.");
    }
  };

  return (
    <Spacer>
      <Wrap>
        <Card onSubmit={handleSubmit}>
          <FormRow>
            <Label>문의 제목</Label>
            <Input
              value={requireTitle}
              onChange={(e) => setRequireTitle(e.target.value)}
              placeholder="문의 제목을 입력하세요"
            />
          </FormRow>

          <FormRow>
            <Label>문의 내용</Label>
            <TextArea
              value={requireContent}
              onChange={(e) => setRequireContent(e.target.value)}
              placeholder="문의 내용을 입력하세요"
            />
          </FormRow>

          <FileLabel htmlFor="require-file-input">파일 선택</FileLabel>
          <FileInput
            id="require-file-input"
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
            <CancelButton type="button" onClick={() => navi("/requires")}>
              취소
            </CancelButton>

            <SubmitButton type="submit">등록</SubmitButton>
          </ButtonRow>
        </Card>
      </Wrap>
    </Spacer>
  );
};

export default RequireForm;
