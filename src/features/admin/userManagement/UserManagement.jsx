import { useEffect, useState } from "react";
import {
  ButtonGroup,
  Cell,
  FilterButton,
  FilterGroup,
  HeaderRow,
  Main,
  RoleBadge,
  RoleButton,
  RoleButtonGroup,
  Row,
  Table,
  TopSection,
  UpdateButton,
} from "./styles/userManagement";
import api from "../../../api/axios";
import {
  CancelButton,
  InputGroup,
  InputLabel,
  ModalButtonGroup,
  ModalContainer,
  ModalOverlay,
  ModalTitle,
  SaveButton,
} from "../adminProducts/styles/adminProducts";
import { Input } from "../AdminStations/StationForm.styles";
import {
  NextButton,
  PageButton,
  Pagination,
} from "../../boards/styles/Board.styles";

const PAGE_GROUP_SIZE = 5;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectUser, setSelectUser] = useState(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState({ size: 10, boardCounts: 0 });
  const [updateModal, setUpdateModal] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [role, setRole] = useState("ALL");
  const roleText = {
    ROLE_USER: "일반 회원",
    ROLE_ADMIN: "운영자",
    ROLE_BAN: "정지",
  };
  useEffect(() => {
    getUsers();
  }, [page, role]);

  const getUsers = () => {
    api
      .get(`/admin/users?page=${page + 1}&size=${pages.size}&role=${role}`)
      .then((result) => {
        console.log(result);
        setUsers(result.data.data.users);
        setPages(result.data.data.pageInfo);
      });
  };
  const totalPages = Math.ceil(pages.boardCounts / pages.size);
  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);
  const onUpdate = () => {
    api
      .patch("/admin/users", {
        userId: selectUser.originalUserId,
        role: selectUser.role,
      })
      .then((result) => {
        console.log(result);
        setUpdateModal(false);
        getUsers();
      })
      .catch((e) => console.log(e.response));
  };
  return (
    <Main>
      <TopSection>
        <FilterGroup>
          <FilterButton onClick={() => setRole("ALL")}>전체</FilterButton>

          <FilterButton
            role="ROLE_USER"
            data-active={users.role === "ROLE_USER"}
            onClick={() => setRole("ROLE_USER")}
          >
            일반 회원
          </FilterButton>

          <FilterButton
            role="ROLE_ADMIN"
            data-active={users.role === "ROLE_ADMIN"}
            onClick={() => setRole("ROLE_ADMIN")}
          >
            운영자
          </FilterButton>

          <FilterButton
            role="ROLE_BAN"
            data-active={users.role === "ROLE_BAN"}
            onClick={() => setRole("ROLE_BAN")}
          >
            정지(BAN)
          </FilterButton>
        </FilterGroup>
      </TopSection>

      <Table>
        <HeaderRow>
          <Cell>이름</Cell>
          <Cell>ID</Cell>
          <Cell>Email</Cell>
          <Cell>가입일</Cell>
          <Cell>ROLE</Cell>
          <Cell>EDIT</Cell>
        </HeaderRow>

        {users.map((user) => (
          <Row key={user.originalUserId}>
            <Cell>{user.userName}</Cell>

            <Cell>{user.userId}</Cell>

            <Cell>{user.email}</Cell>

            <Cell>{user.createDate}</Cell>

            <Cell>
              <RoleBadge role={user.role}>{user.role}</RoleBadge>
            </Cell>

            <ButtonGroup>
              <UpdateButton
                onClick={() => {
                  setSelectUser(user);
                  setUpdateModal(true);
                }}
              >
                수정
              </UpdateButton>
            </ButtonGroup>
          </Row>
        ))}
      </Table>
      <Pagination>
        {currentGroup > 0 && (
          <PageButton
            onClick={() => setPage(groupStart - 1)}
            data-active={true}
          >
            ··
          </PageButton>
        )}
        {page > 0 && (
          <NextButton onClick={() => setPage(page - 1)}>이전</NextButton>
        )}
        {Array.from({ length: groupEnd - groupStart }).map((_, i) => {
          const p = groupStart + i;
          return (
            <PageButton
              key={p}
              data-active={p === page}
              onClick={() => setPage(p)}
            >
              {p + 1}
            </PageButton>
          );
        })}
        {page < totalPages - 1 && (
          <NextButton onClick={() => setPage(page + 1)}>다음</NextButton>
        )}
        {groupStart + PAGE_GROUP_SIZE < totalPages && (
          <PageButton
            onClick={() => setPage(groupStart + PAGE_GROUP_SIZE)}
            data-active={true}
          >
            ··
          </PageButton>
        )}
      </Pagination>
      {updateModal && selectUser && (
        <ModalOverlay onClick={() => setUpdateModal(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalTitle>회원 권한 수정</ModalTitle>

            <InputGroup>
              <InputLabel>이름</InputLabel>
              <Input value={selectUser.userName} readOnly />
            </InputGroup>

            <InputGroup>
              <InputLabel>ID</InputLabel>
              <Input value={selectUser.userId} readOnly />
            </InputGroup>

            <InputGroup>
              <InputLabel>이메일</InputLabel>
              <Input value={selectUser.email} readOnly />
            </InputGroup>

            <InputGroup>
              <InputLabel>회원 권한</InputLabel>

              <RoleButtonGroup>
                <RoleButton
                  type="button"
                  $active={selectUser.role === "ROLE_USER"}
                  $role="ROLE_USER"
                  onClick={() =>
                    setSelectUser({
                      ...selectUser,
                      role: "ROLE_USER",
                    })
                  }
                >
                  일반 회원
                </RoleButton>

                <RoleButton
                  type="button"
                  $active={selectUser.role === "ROLE_ADMIN"}
                  $role="ROLE_ADMIN"
                  onClick={() =>
                    setSelectUser({
                      ...selectUser,
                      role: "ROLE_ADMIN",
                    })
                  }
                >
                  운영자
                </RoleButton>

                <RoleButton
                  type="button"
                  $active={selectUser.role === "ROLE_BAN"}
                  $role="ROLE_BAN"
                  onClick={() =>
                    setSelectUser({
                      ...selectUser,
                      role: "ROLE_BAN",
                    })
                  }
                >
                  정지(BAN)
                </RoleButton>
              </RoleButtonGroup>
            </InputGroup>

            <ModalButtonGroup>
              <CancelButton onClick={() => setUpdateModal(false)}>
                취소
              </CancelButton>

              <SaveButton onClick={onUpdate}>수정</SaveButton>
            </ModalButtonGroup>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Main>
  );
};
export default UserManagement;
