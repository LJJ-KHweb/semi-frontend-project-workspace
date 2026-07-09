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

const AdminBoardDetail = () => {
  const { boardNo } = useParams();
  const [board, setBoard] = useState();
  const [files, setFiles] = useState([]);

  const navi = useNavigate();

  useEffect(() => {
    api
      .get(`/admin/boards/${boardNo}`)
      .then((result) => {
        console.log(result);
        setBoard(result.data.data);
        setFiles(result.data.data.files || []);
      })
      .catch((e) => {
        console.log(e.response);
        alert("관리자 게시글 상세 조회 실패");
      });
  }, [boardNo]);

  return (
    <Spacer>
      <Wrap>
        <Card>
          <Header>
            <TitleRow>
              <Title>{board?.boardTitle}</Title>
            </TitleRow>

            <MetaRow>
              <MetaItem>{board?.userId}</MetaItem>
              <MetaItem>{board?.createDate}</MetaItem>
              <MetaItem>조회 {board?.views}</MetaItem>
              <MetaItem>{board?.status === "Y" ? "정상" : "삭제됨"}</MetaItem>
            </MetaRow>
          </Header>

          <Content>{board?.boardContent}</Content>

          <ImgWrap>
            {files.map((file) => (
              <Img key={file.fileOrder} src={file.filePath} />
            ))}
          </ImgWrap>

          <ButtonRow>
            <ListButton onClick={() => navi("/admin/boards")}>목록</ListButton>
          </ButtonRow>
        </Card>
      </Wrap>
    </Spacer>
  );
};

export default AdminBoardDetail;
