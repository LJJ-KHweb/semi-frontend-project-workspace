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

const NoticeDetail = () => {
  const { noticeNo } = useParams();
  const [notice, setNotice] = useState();
  const [files, setFiles] = useState([]);
  const navi = useNavigate();

  const { user } = useAuth();
  const isAdmin = user?.role === "[ROLE_ADMIN]";

  useEffect(() => {
    api
      .get(`/notices/${noticeNo}`)
      .then((result) => {
        console.log(result);
        setNotice(result.data.data);
        setFiles(result.data.data.files);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, [noticeNo]);

  const handleDelete = async () => {
    if (!window.confirm("게시글을 삭제하시겠습니까?")) return;

    await api.delete(`/notices/${noticeNo}`);
    navi("/notices");
  };

  return (
    <Spacer>
      <Wrap>
        <Card>
          <Header>
            <TitleRow>
              <Title>{notice?.noticeTitle}</Title>
            </TitleRow>
            <MetaRow>
              <MetaItem>{notice?.userName}</MetaItem>
              <MetaItem>{notice?.createDate}</MetaItem>
              <MetaItem>조회 {notice?.views}</MetaItem>
            </MetaRow>
          </Header>

          <Content>{notice?.noticeContent}</Content>
          <ImgWrap>
            {notice?.files &&
              files.map((n) => <Img key={n.fileOrder} src={n.filePath} />)}
          </ImgWrap>

          <ButtonRow>
            <ListButton onClick={() => navi("/notices")}>목록</ListButton>

            {isAdmin && (
              <ButtonGroup>
                <ActionButton onClick={() => navi(`/notices/${noticeNo}/edit`)}>
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

export default NoticeDetail;
