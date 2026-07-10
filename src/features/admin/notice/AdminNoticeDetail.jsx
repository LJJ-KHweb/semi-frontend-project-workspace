import { useAuth } from "../../../context/AuthContext";
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
  ButtonGroup,
  ListButton,
  ActionButton,
  Img,
  ImgWrap,
} from "../../boards/styles/BoardDetail.styles";

const AdminNoticeDetail = () => {
  // URL에 들어 있는 noticeNo 가져오기
  const { noticeNo } = useParams();

  // 조회한 공지사항 정보
  const [notice, setNotice] = useState(null);

  // 공지사항에 등록된 첨부파일
  const [files, setFiles] = useState([]);

  // 로딩 여부
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { user } = useAuth();

  // 프로젝트의 실제 role 저장 형태에 맞게 확인
  const isAdmin = user?.role === "ROLE_ADMIN" || user?.role === "[ROLE_ADMIN]";

  useEffect(() => {
    const getNoticeDetail = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/notices/admin/${noticeNo}`);

        const responseData = response.data?.data ?? response.data;

        setNotice(responseData.notice ?? responseData);
        setFiles(responseData.files ?? []);
      } catch (error) {
        console.error("공지사항 상세조회 실패:", error);

        const status = error.response?.status;

        if (status === 404) {
          alert("존재하지 않는 공지사항입니다.");
        } else {
          alert("공지사항을 불러오지 못했습니다.");
        }

        navigate("/admin/notices");
      } finally {
        setLoading(false);
      }
    };

    getNoticeDetail();
  }, [noticeNo, navigate]);

  // 공지사항 삭제
  const handleDelete = async () => {
    if (!isAdmin) {
      alert("관리자만 공지사항을 삭제할 수 있습니다.");
      return;
    }

    const isConfirmed = window.confirm("정말 이 공지사항을 삭제하시겠습니까?");

    if (!isConfirmed) {
      return;
    }

    try {
      await api.delete(`/notices/${noticeNo}`);

      alert("공지사항이 삭제되었습니다.");
      navigate("/admin/notices");
    } catch (error) {
      console.error("공지사항 삭제 실패:", error);

      const message =
        error.response?.data?.message ??
        "공지사항 삭제 중 오류가 발생했습니다.";

      alert(message);
    }
  };

  // 수정 페이지 이동
  const handleUpdate = () => {
    if (!isAdmin) {
      alert("관리자만 공지사항을 수정할 수 있습니다.");
      return;
    }

    navigate(`/admin/notices/${noticeNo}/edit`);
  };

  if (loading) {
    return (
      <Wrap>
        <Card>공지사항을 불러오는 중입니다.</Card>
      </Wrap>
    );
  }

  if (!notice) {
    return (
      <Wrap>
        <Card>공지사항 정보가 없습니다.</Card>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <Card>
        <Header>
          <TitleRow>
            <Title>{notice.noticeTitle}</Title>
          </TitleRow>

          <MetaRow>
            <MetaItem>
              작성자: {notice.userName ?? notice.noticeWriter}
            </MetaItem>

            <MetaItem>작성일: {notice.createDate}</MetaItem>

            <MetaItem>조회수: {notice.views ?? 0}</MetaItem>

            <MetaItem>
              공개 여부: {notice.publicYn === "Y" ? "공개" : "비공개"}
            </MetaItem>
          </MetaRow>
        </Header>

        <Content>{notice.noticeContent}</Content>

        {files.length > 0 && (
          <ImgWrap>
            {files.map((file, index) => (
              <Img
                key={`${file.fileOrder ?? index}-${file.filePath}`}
                src={file.filePath}
                alt={file.originalName ?? `공지사항 첨부파일 ${index + 1}`}
              />
            ))}
          </ImgWrap>
        )}

        <ButtonRow>
          <ListButton onClick={() => navigate("/admin/notices")}>
            목록
          </ListButton>

          {isAdmin && (
            <ButtonGroup>
              <ActionButton type="button" onClick={handleUpdate}>
                수정
              </ActionButton>

              <ActionButton type="button" onClick={handleDelete}>
                삭제
              </ActionButton>
            </ButtonGroup>
          )}
        </ButtonRow>
      </Card>
    </Wrap>
  );
};

export default AdminNoticeDetail;
