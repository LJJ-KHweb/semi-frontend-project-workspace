import { useEffect, useState } from "react";
import {
  Main,
  TitleSection,
  Title,
  SubTitle,
  CardSection,
  Card,
  ImageBox,
  ProductImage,
  ProductName,
  Stock,
  Mileage,
  PaginationSection,
} from "./styles/Shop";
import api from "../../api/axios";
import {
  NextButton,
  PageButton,
  Pagination,
} from "../boards/styles/Board.styles";

const PAGE_GROUP_SIZE = 5;

const Shop = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState({ size: 8, boardCounts: 0 });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get(`/shop?page=${page + 1}&size=${pages.size}`)
      .then((result) => {
        console.log(result.data.data);
        setPages(result.data.data.pageInfo);
        setProducts(result.data.data.productList);
      })
      .catch((e) => console.log(e.response));
  }, [page]);
  const totalPages = Math.ceil(pages.boardCounts / pages.size);
  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);
  return (
    <Main>
      <TitleSection>
        <Title>마일리지 상점입니다.</Title>
        <SubTitle>
          지금까지 적립한 마일리지로 다양한 리워드를 받아보세요.
        </SubTitle>
      </TitleSection>

      <CardSection>
        {products.map((product) => (
          <Card key={product.productNo}>
            <ImageBox>
              <ProductImage src={product.image} alt={product.productName} />
            </ImageBox>

            <ProductName>{product.productName}</ProductName>

            <Stock>재고수량 : {product.amount}개</Stock>

            <Mileage>{(product.price * -1).toLocaleString()} 마일리지</Mileage>
          </Card>
        ))}
      </CardSection>

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
    </Main>
  );
};

export default Shop;
