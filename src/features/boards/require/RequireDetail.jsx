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
} from "../styles/BoardDetail.styles";

import {
  AnswerCard,
  AnswerHeader,
  AnswerWriter,
  AnswerContent,
} from "./styles/RequireDetail.styles";

const RequireDetail = () => {
  const { requireNo } = useParams();

  const [require, setRequire] = useState();
  const [files, setFiles] = useState([]);
  const [answers, setAnswers] = useState([]);

  const navi = useNavigate();

  useEffect(() => {
    api
      .get(`/requires/${requireNo}`)
      .then((result) => {
        const data = result.data.data;

        setRequire(data);
        setFiles(data.files ?? []);
        setAnswers(data.answer ?? []);
      })
      .catch((e) => {
        console.log(e.response);
        alert("문의사항을 조회할 수 없습니다.");
        navi("/requires");
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
              <MetaItem>{require?.userId}</MetaItem>
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
            <ListButton onClick={() => navi("/requires")}>목록</ListButton>
          </ButtonRow>
        </Card>
      </Wrap>
    </Spacer>
  );
};

export default RequireDetail;
