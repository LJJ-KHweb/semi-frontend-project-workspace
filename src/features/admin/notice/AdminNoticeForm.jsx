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
  OptionRow,
  RadioRow,
  RadioLabel,
} from "../../boards/styles/BoardForm.styles";

const AdminNoticeForm = () => {
  const navi = useNavigate();
  const { noticeNo } = useParams();

  // noticeNo가 있으면 수정, 없으면 작성
  const isEdit = !!noticeNo;

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [publicYN, setPublicYN] = useState("Y");

  // 새롭게 선택한 파일
  const [files, setFiles] = useState([]);

  // 수정 전에 이미 등록되어 있던 파일
  const [pastFiles, setPastFiles] = useState([]);

  // 수정하면서 삭제한 기존 파일의 순서
  const [deleteFileOrder, setDeleteFileOrder] = useState([]);

  /*
   * 수정 화면일 경우
   * 기존 공지사항의 제목, 내용, 공개 여부, 첨부파일 조회
   */
  useEffect(() => {
    if (!isEdit) {
      return;
    }

    const getNotice = async () => {
      try {
        const response = await api.get(`/notices/admin/${noticeNo}`);
        const data = response.data.data;

        console.log("공지사항 상세조회 결과:", data);

        setNoticeTitle(data.noticeTitle);
        setNoticeContent(data.noticeContent);
        setPublicYN(data.publicYN);
        setPastFiles(data.files ?? []);
      } catch (error) {
        console.error("공지사항 조회 실패:", error);

        alert("공지사항 정보를 불러오지 못했습니다.");
        navi("/admin/notices");
      }
    };

    getNotice();
  }, [noticeNo, isEdit, navi]);

  /*
   * 새 파일 선택
   */
  const handleFileChange = (e) => {
    const picked = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const merged = [...files, ...picked];

    /*
     * 기존 파일 + 새 파일의 전체 개수가
     * 5개를 넘으면 추가하지 않음
     */
    if (merged.length + pastFiles.length > 5) {
      picked.forEach((pickedFile) => {
        URL.revokeObjectURL(pickedFile.preview);
      });

      alert("최대 5개까지 첨부 가능합니다.");
      e.target.value = "";

      return;
    }

    setFiles(merged);

    // 같은 파일을 다시 선택해도 change 이벤트가 발생하도록 초기화
    e.target.value = "";
  };

  /*
   * 새롭게 선택한 파일 삭제
   */
  const removeFile = (index) => {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);

      return prev.filter((_, fileIndex) => fileIndex !== index);
    });
  };

  /*
   * 기존에 등록되어 있던 파일 삭제
   */
  const removePastFile = (file) => {
    setDeleteFileOrder((prev) => {
      // 같은 fileOrder가 중복으로 들어가는 것을 방지
      if (prev.includes(file.fileOrder)) {
        return prev;
      }

      return [...prev, file.fileOrder];
    });

    setPastFiles((prev) =>
      prev.filter((pastFile) => pastFile.fileOrder !== file.fileOrder),
    );
  };

  /*
   * 공지사항 등록 또는 수정
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!noticeTitle.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }

    if (!noticeContent.trim()) {
      alert("내용을 입력해 주세요.");
      return;
    }

    const formData = new FormData();

    formData.append("noticeTitle", noticeTitle);
    formData.append("noticeContent", noticeContent);
    formData.append("publicYN", publicYN);

    /*
     * 새롭게 선택한 파일 추가
     */
    files.forEach((fileData) => {
      formData.append("file", fileData.file);
    });

    /*
     * 수정하는 경우 삭제할 기존 파일 순서 추가
     */
    if (isEdit) {
      deleteFileOrder.forEach((fileOrder, index) => {
        formData.append(`deleteOrder[${index}]`, fileOrder);
      });
    }

    const method = isEdit ? "patch" : "post";
    const url = isEdit ? `/notices/${noticeNo}` : "/notices";

    try {
      await api[method](url, formData);

      alert(
        isEdit ? "공지사항이 수정되었습니다." : "공지사항이 등록되었습니다.",
      );

      if (isEdit) {
        navi(`/admin/notices/${noticeNo}`);
      } else {
        navi("/admin/notices");
      }
    } catch (error) {
      console.error("공지사항 저장 실패:", error);

      const message =
        error.response?.data?.message ?? "공지사항 저장에 실패했습니다.";

      alert(message);
    }
  };

  return (
    <Spacer>
      <Wrap>
        <Card onSubmit={handleSubmit}>
          <FormRow>
            <Label>제목</Label>

            <Input
              type="text"
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              placeholder="공지사항 제목을 입력해 주세요."
            />
          </FormRow>

          <FormRow>
            <Label>내용</Label>

            <TextArea
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
              placeholder="공지사항 내용을 입력해 주세요."
            />
          </FormRow>

          <OptionRow>
            <FileLabel htmlFor="admin-notice-file-input">파일 선택</FileLabel>

            <FileInput
              id="admin-notice-file-input"
              type="file"
              multiple
              onChange={handleFileChange}
            />

            <RadioRow>
              <Label>공개범위</Label>

              <RadioLabel>
                <input
                  type="radio"
                  name="publicYN"
                  value="Y"
                  checked={publicYN === "Y"}
                  onChange={(e) => setPublicYN(e.target.value)}
                />
                공개
              </RadioLabel>

              <RadioLabel>
                <input
                  type="radio"
                  name="publicYN"
                  value="N"
                  checked={publicYN === "N"}
                  onChange={(e) => setPublicYN(e.target.value)}
                />
                비공개
              </RadioLabel>
            </RadioRow>
          </OptionRow>

          <PreviewWrap>
            {/* 수정 전부터 존재하던 파일 */}
            {pastFiles.map((file) => (
              <PreviewItem key={`${file.fileOrder}-${file.filePath}`}>
                <PreviewImg src={file.filePath} alt={file.originalName} />

                <RemoveButton
                  type="button"
                  onClick={() => removePastFile(file)}
                >
                  ×
                </RemoveButton>
              </PreviewItem>
            ))}

            {/* 새롭게 선택한 파일 */}
            {files.map((fileData, index) => (
              <PreviewItem key={fileData.preview}>
                <PreviewImg src={fileData.preview} alt={fileData.file.name} />

                <RemoveButton type="button" onClick={() => removeFile(index)}>
                  ×
                </RemoveButton>
              </PreviewItem>
            ))}
          </PreviewWrap>

          <ButtonRow>
            <CancelButton
              type="button"
              onClick={() => {
                if (isEdit) {
                  navi(`/admin/notices/${noticeNo}`);
                } else {
                  navi("/admin/notices");
                }
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

export default AdminNoticeForm;
