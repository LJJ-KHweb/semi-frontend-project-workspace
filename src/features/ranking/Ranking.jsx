import { useEffect, useState } from "react";
import api from "../../api/axios";

import {
  Pagination,
  PageButton,
  NextButton,
} from "../boards/styles/Board.styles";
import {
  Main,
  TitleSection,
  Title,
  SubTitle,
  MyRankCard,
  MyRankTitle,
  MyRankValue,
  Table,
  HeaderRow,
  Row,
  Cell,
  RankBadge,
} from "./styles/ranking";

const PAGE_GROUP_SIZE = 5;

const Ranking = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState({
    size: 10,
    boardCounts: 0,
  });

  const [ranks, setRanks] = useState([]);
  const [myRank, setMyRank] = useState(null);

  useEffect(() => {
    api.get(`/ranks?page=${page + 1}&size=${pages.size}`).then((result) => {
      setRanks(result.data.data.rankList);
      setPages(result.data.data.pageInfo);
      setMyRank(result.data.data.myRank);
    });
  }, [page]);

  const totalPages = Math.ceil(pages.boardCounts / pages.size);

  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);

  const groupStart = currentGroup * PAGE_GROUP_SIZE;

  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);

  return (
    <Main>
      <TitleSection>
        <Title>탄소 절감 랭킹</Title>

        <SubTitle>
          주행거리와 탄소 절감량을 기반으로 순위가 집계됩니다.
        </SubTitle>
      </TitleSection>

      {myRank && (
        <MyRankCard>
          <MyRankTitle>내 현재 순위</MyRankTitle>

          <MyRankValue>{myRank.rank}위</MyRankValue>
        </MyRankCard>
      )}

      <Table>
        <HeaderRow>
          <Cell>순위</Cell>
          <Cell>회원</Cell>
          <Cell>주행거리</Cell>
          <Cell>탄소절감량</Cell>
        </HeaderRow>

        {ranks.map((rank) => (
          <Row key={rank.userId}>
            <Cell>
              <RankBadge rank={rank.rank}>{rank.rank}</RankBadge>
            </Cell>

            <Cell>{rank.userName}</Cell>

            <Cell>{rank.distanceSum.toLocaleString()} km</Cell>

            <Cell>{rank.carbonReduction.toLocaleString()} kg</Cell>
          </Row>
        ))}
      </Table>

      <Pagination>
        {currentGroup > 0 && (
          <PageButton
            data-active={true}
            onClick={() => setPage(groupStart - 1)}
          >
            ··
          </PageButton>
        )}

        {page > 0 && (
          <NextButton onClick={() => setPage(page - 1)}>이전</NextButton>
        )}

        {Array.from({
          length: groupEnd - groupStart,
        }).map((_, i) => {
          const p = groupStart + i;

          return (
            <PageButton
              key={p}
              data-active={page === p}
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
            data-active={true}
            onClick={() => setPage(groupStart + PAGE_GROUP_SIZE)}
          >
            ··
          </PageButton>
        )}
      </Pagination>
    </Main>
  );
};

export default Ranking;
