import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spacer } from "../../../App.styles";
import api from "../../../api/axios";
import { TypeBadge } from "../styles/Board.styles";
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
  ButtonGroup,
  ListButton,
  ActionButton,
  Img,
  ImgWrap,
} from "../styles/BoardDetail.styles";
import { useAuth } from "../../../context/AuthContext";

const BoardDetail = () => {
  const { boardNo } = useParams();
  const [board, setBoard] = useState();
  const [files, setFiles] = useState([]);
  const navi = useNavigate();

  const { user } = useAuth();
  const isAdmin = user?.role === "[ROLE_ADMIN]";
  console.log(user.userName);
  console.log(board);
  const isAuthor = user?.userId === board?.userId;

  useEffect(() => {
    api
      .get(`/boards/${boardNo}`)
      .then((result) => {
        setBoard(result.data.data);
        setFiles(result.data.data.files);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [boardNo]);

  const handleDelete = async () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;

    await api.delete(`/boards/${boardNo}`);
    navi("/boards");
  };

  return (
    <Spacer>
      <Wrap>
        <Card>
          <Header>
            <TitleRow>
              <Title>{board?.boardTitle}</Title>
            </TitleRow>
            <MetaRow>
              <MetaItem>{board?.userName}</MetaItem>
              <MetaItem>{board?.createDate}</MetaItem>
              <MetaItem>조회 {board?.views}</MetaItem>
            </MetaRow>
          </Header>

          <Content>{board?.boardContent}</Content>
          <ImgWrap>
            {board?.files &&
              files.map((n) => <Img key={n.fileOrder} src={n.filePath} />)}
          </ImgWrap>

          <ButtonRow>
            <ListButton onClick={() => navi("/boards")}>목록</ListButton>

            {(isAuthor || isAdmin) && (
              <ButtonGroup>
                <ActionButton onClick={() => navi(`/boards/${boardNo}/edit`)}>
                  수정
                </ActionButton>
                <ActionButton data-danger={true} onClick={handleDelete}>
                  삭제
                </ActionButton>
              </ButtonGroup>
            )}
          </ButtonRow>
        </Card>
      </Wrap>
    </Spacer>
  );
};

export default BoardDetail;
