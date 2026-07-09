import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Spacer } from "../../../App.styles";
import api from "../../../api/axios";

import {
  Wrap,
  Card,
  Header,
  TitleRow,
  Title,
  MetaRow,
  MetaItem,
  Content,
  ButtonRow,
  ListButton,
  Img,
  ImgWrap,
} from "../../boards/styles/BoardDetail.styles";

import {
  AnswerCard,
  AnswerHeader,
  AnswerWriter,
  AnswerContent,
} from "../../boards/require/styles/RequireDetail.styles";

const AdminRequireDetail = () => {
  const { requireNo } = useParams();

  const [require, setRequire] = useState();
  const [files, setFiles] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [answerContent, setAnswerContent] = useState("");

  const navi = useNavigate();

  const handleAnswerSubmit = async () => {
    if (!answerContent.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }

    try {
      await api.post(`/admin/requires/${requireNo}`, {
        answerContent,
      });

      alert("답변이 등록되었습니다.");
      setAnswerContent("");

      const result = await api.get(`/admin/requires/${requireNo}`);
      const data = result.data.data;

      setRequire(data);
      setFiles(data.files ?? []);
      setAnswers(data.answer ?? []);
    } catch (e) {
      console.log(e.response);
      alert("답변 등록에 실패했습니다.");
    }
  };

  useEffect(() => {
    api
      .get(`/admin/requires/${requireNo}`)
      .then((result) => {
        const data = result.data.data;

        setRequire(data);
        setFiles(data.files ?? []);
        setAnswers(data.answer ?? []);
      })
      .catch((e) => {
        console.log(e.response);
        alert("문의사항을 조회할 수 없습니다.");
        navi("/admin/requires");
      });
  }, [requireNo, navi]);

  return (
    <Spacer>
      <Wrap>
        <Card>
          <Header>
            <TitleRow>
              <Title>{require?.requireTitle}</Title>
            </TitleRow>

            <MetaRow>
              <MetaItem>작성자: {require?.userId}</MetaItem>
              <MetaItem>{require?.createDate}</MetaItem>
            </MetaRow>
          </Header>

          <Content>{require?.requireContent}</Content>

          <ImgWrap>
            {files.map((file) => (
              <Img key={file.fileOrder} src={file.filePath} />
            ))}
          </ImgWrap>
          <Content>
            <h3>답변 작성</h3>

            <textarea
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              placeholder="답변 내용을 입력하세요"
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "12px",
                resize: "vertical",
              }}
            />

            <ButtonRow>
              <ListButton onClick={handleAnswerSubmit}>답변 등록</ListButton>
            </ButtonRow>
          </Content>
          <Content>
            <h3>관리자 답변</h3>

            {answers.length === 0 ? (
              <p>아직 등록된 답변이 없습니다.</p>
            ) : (
              answers.map((answer) => (
                <AnswerCard key={answer.answerNo}>
                  <AnswerHeader>
                    <AnswerWriter>{answer.userId}</AnswerWriter>
                  </AnswerHeader>

                  <AnswerContent>{answer.answerCotent}</AnswerContent>
                </AnswerCard>
              ))
            )}
          </Content>

          <ButtonRow>
            <ListButton onClick={() => navi("/admin/requires")}>
              목록
            </ListButton>
          </ButtonRow>
        </Card>
      </Wrap>
    </Spacer>
  );
};

export default AdminRequireDetail;
