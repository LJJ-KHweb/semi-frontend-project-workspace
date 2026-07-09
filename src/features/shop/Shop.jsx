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
  MileageBox,
  MileageLabel,
  MileageValue,
  TitleBox,
  ModalOverlay,
  ModalContainer,
  ModalImage,
  ModalProductName,
  ModalInfo,
  RemainingMileage,
  ModalButtonGroup,
  CancelButton,
  ExchangeButton,
} from "./styles/Shop";
import api from "../../api/axios";
import {
  NextButton,
  PageButton,
  Pagination,
} from "../boards/styles/Board.styles";
import { useNavigate } from "react-router-dom";

const PAGE_GROUP_SIZE = 5;

const Shop = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState({ size: 8, boardCounts: 0 });
  const [products, setProducts] = useState([]);
  const [myMileage, setMyMileage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, isOpen] = useState(false);
  const navi = useNavigate();
  useEffect(() => {
    getProducts();
    getMyMileage();
  }, [page]);
  const totalPages = Math.ceil(pages.boardCounts / pages.size);
  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);
  const isNotEnoughMileage =
    selectedProduct && myMileage + selectedProduct.price < 0;
  const getProducts = () => {
    api
      .get(`/shop?page=${page + 1}&size=${pages.size}`)
      .then((result) => {
        console.log(result.data.data);
        setPages(result.data.data.pageInfo);
        setProducts(result.data.data.productList);
      })
      .catch((e) => console.log(e.response));
  };

  const getMyMileage = () => {
    api
      .get(`/users/mypage?page=${page + 1}&size=${pages.size}`)
      .then((result) => {
        setMyMileage(result.data.data.mileageSum);
      });
  };
  const onSunmit = () => {
    console.log(selectedProduct.productNo);
    api
      .patch(`/shop/${selectedProduct.productNo}`)
      .then(() => {
        isOpen(false);
        getProducts();
        getMyMileage();
      })
      .catch((e) => console.log(e.response));
  };
  return (
    <Main>
      <TitleSection>
        <TitleBox>
          <Title>마일리지 상점입니다.</Title>
          <SubTitle>
            지금까지 적립한 마일리지로 다양한 리워드를 받아보세요.
          </SubTitle>
        </TitleBox>

        <MileageBox>
          <MileageLabel>보유 마일리지</MileageLabel>
          <MileageValue>{myMileage.toLocaleString()} P</MileageValue>
        </MileageBox>
      </TitleSection>

      <CardSection>
        {products.map((product) => (
          <Card
            key={product.productNo}
            onClick={() => {
              setSelectedProduct(product);
              isOpen(true);
            }}
          >
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
      {open && selectedProduct && (
        <ModalOverlay onClick={() => isOpen(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalImage
              src={selectedProduct.image}
              alt={selectedProduct.productName}
            />

            <ModalProductName>{selectedProduct.productName}</ModalProductName>

            <ModalInfo>
              <span>현재 마일리지</span>
              <span>{myMileage.toLocaleString()} P</span>
            </ModalInfo>

            <ModalInfo>
              <span>재고</span>
              <span>{selectedProduct.amount}개</span>
            </ModalInfo>

            <ModalInfo>
              <span>필요 마일리지</span>
              <span>{(-selectedProduct.price).toLocaleString()} P</span>
            </ModalInfo>

            <RemainingMileage>
              <span>구매 후 남은 마일리지</span>
              <span>
                {(myMileage + selectedProduct.price).toLocaleString()} P
              </span>
            </RemainingMileage>

            <ModalButtonGroup>
              <CancelButton onClick={() => isOpen(false)}>취소</CancelButton>

              <ExchangeButton onClick={onSunmit} disabled={isNotEnoughMileage}>
                교환하기
              </ExchangeButton>
            </ModalButtonGroup>
          </ModalContainer>
        </ModalOverlay>
      )}
    </Main>
  );
};

export default Shop;
