import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const { noticeNo } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [notice, setNotice] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === "ROLE_ADMIN" || user?.role === "[ROLE_ADMIN]";

  useEffect(() => {
    setLoading(true);

    api
      .get(`/notices/admin/${noticeNo}`)
      .then((response) => {
        setNotice(response.data.data);
        setFiles(response.data.data.files ?? []);
      })
      .catch((error) => {
        console.error("공지사항 상세조회 실패:", error);

        const status = error.response?.status;

        if (status === 404) {
          alert("존재하지 않는 공지사항입니다.");
        } else {
          alert("공지사항을 불러오지 못했습니다.");
        }

        navigate("/admin/notices");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [noticeNo, navigate]);

  const handleDelete = async () => {
    if (!isAdmin) {
      alert("관리자만 공지사항을 삭제할 수 있습니다.");
      return;
    }

    if (notice?.status !== "Y") {
      alert("이미 삭제된 공지사항입니다.");
      return;
    }

    const isConfirmed = window.confirm("정말 이 공지사항을 삭제하시겠습니까?");

    if (!isConfirmed) return;

    try {
      await api.delete(`/notices/${noticeNo}`);

      alert("공지사항이 삭제되었습니다.");

      setNotice((prev) => ({
        ...prev,
        status: "N",
      }));
    } catch (error) {
      console.error("공지사항 삭제 실패:", error);

      const message =
        error.response?.data?.message ??
        "공지사항 삭제 중 오류가 발생했습니다.";

      alert(message);
    }
  };

  const handleRestore = async () => {
    if (!isAdmin) {
      alert("관리자만 공지사항 삭제를 취소할 수 있습니다.");
      return;
    }

    if (notice?.status !== "N") {
      alert("삭제된 공지사항이 아닙니다.");
      return;
    }

    const isConfirmed = window.confirm(
      "이 공지사항의 삭제를 취소하시겠습니까?",
    );

    if (!isConfirmed) return;

    try {
      await api.patch(`/notices/restore/${noticeNo}`);

      alert("공지사항 삭제가 취소되었습니다.");

      setNotice((prev) => ({
        ...prev,
        status: "Y",
      }));
    } catch (error) {
      console.error("공지사항 삭제 취소 실패:", error);

      const message =
        error.response?.data?.message ??
        "공지사항 삭제 취소 중 오류가 발생했습니다.";

      alert(message);
    }
  };

  const handleUpdate = () => {
    if (!isAdmin) {
      alert("관리자만 공지사항을 수정할 수 있습니다.");
      return;
    }

    if (notice?.status !== "Y") {
      alert("삭제된 공지사항은 수정할 수 없습니다.");
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
              공개 여부: {notice.publicYN === "Y" ? "공개" : "비공개"}
            </MetaItem>

            <MetaItem>
              상태: {notice.status === "Y" ? "정상" : "삭제됨"}
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
          <ListButton type="button" onClick={() => navigate("/admin/notices")}>
            목록
          </ListButton>

          {isAdmin && (
            <ButtonGroup>
              {notice.status === "Y" && (
                <ActionButton type="button" onClick={handleUpdate}>
                  수정
                </ActionButton>
              )}

              {notice.status === "Y" ? (
                <ActionButton type="button" onClick={handleDelete}>
                  삭제
                </ActionButton>
              ) : (
                <ActionButton type="button" onClick={handleRestore}>
                  삭제취소
                </ActionButton>
              )}
            </ButtonGroup>
          )}
        </ButtonRow>
      </Card>
    </Wrap>
  );
};

export default AdminNoticeDetail;
