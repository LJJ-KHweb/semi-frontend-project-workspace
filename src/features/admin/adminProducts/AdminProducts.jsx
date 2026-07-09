import { useEffect, useState } from "react";
import api from "../../../api/axios";
import {
  Main,
  TopSection,
  AddButton,
  Table,
  HeaderRow,
  Row,
  Cell,
  ProductImage,
  ButtonGroup,
  UpdateButton,
  DeleteButton,
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  PreviewImage,
  Input,
  ModalButtonGroup,
  CancelButton,
  SaveButton,
  InputLabel,
  HiddenFileInput,
  FileButton,
  InputGroup,
  DeleteTitle,
  DeleteMessage,
  DeleteButtonGroup,
  DeleteModalContainer,
  DeleteConfirmButton,
  RestoreButton,
} from "./styles/AdminProducts";
import {
  NextButton,
  PageButton,
  Pagination,
} from "../../boards/styles/Board.styles";

const PAGE_GROUP_SIZE = 5;

const AdminProducts = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState({ size: 8, boardCounts: 0 });
  const [products, setProducts] = useState([]);

  const [updateModal, setUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    getProduts();
  }, [page]);

  const getProduts = () => {
    api
      .get(`/admin/products?page=${page + 1}&size=${pages.size}`)
      .then((result) => {
        console.log(result);
        setProducts(result.data.data.productList);
        setPages(result.data.data.pageInfo);
      })
      .catch((e) => console.log(e.response));
  };

  const totalPages = Math.ceil(pages.boardCounts / pages.size);
  const currentGroup = Math.floor(page / PAGE_GROUP_SIZE);
  const groupStart = currentGroup * PAGE_GROUP_SIZE;
  const groupEnd = Math.min(groupStart + PAGE_GROUP_SIZE, totalPages);
  const [insertModal, setInsertModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    productName: "",
    price: "",
    amount: "",
    imageFile: null,
  });
  const onInsert = () => {
    const formData = new FormData();

    formData.append("productName", newProduct.productName);
    formData.append("price", -Number(newProduct.price));
    formData.append("amount", Number(newProduct.amount));

    if (newProduct.imageFile) {
      formData.append("file", newProduct.imageFile);
    }

    api
      .post("/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("상품이 등록되었습니다.");

        setInsertModal(false);

        getProduts();
      })
      .catch((e) => {
        console.log(e.response);
        alert("상품 등록에 실패했습니다.");
      });
  };
  const onUpdate = () => {
    const formData = new FormData();

    // DTO 데이터
    formData.append("productName", selectedProduct.productName);
    formData.append("price", selectedProduct.price);
    formData.append("amount", selectedProduct.amount);

    // 이미지를 새로 선택한 경우만 전송
    if (selectedProduct.imageFile) {
      formData.append("file", selectedProduct.imageFile);
    }

    api
      .patch(`/admin/products/${selectedProduct.productNo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("상품이 수정되었습니다.");
        setUpdateModal(false);

        // 목록 다시 조회
        getProduts();
      })
      .catch((e) => {
        console.log(e.response);
        alert("상품 수정에 실패했습니다.");
      });
  };
  const onDelete = () => {
    api
      .delete(`/admin/products/${selectedProduct.productNo}`)
      .then(() => {
        alert("상품이 삭제되었습니다.");

        setDeleteModal(false);

        getProduts();
      })
      .catch((e) => {
        console.log(e.response);
        alert("삭제에 실패했습니다.");
      });
  };
  const onRestore = (product) => {
    console.log(selectedProduct);
    api
      .patch(`/admin/products/${product.productNo}/restore`)
      .then((result) => {
        getProduts();
      })
      .catch((e) => console.log(e.response));
  };
  return (
    <Main>
      <TopSection>
        <AddButton
          onClick={() => {
            setNewProduct({
              productName: "",
              price: "",
              amount: "",
              imageFile: null,
            });

            setInsertModal(true);
          }}
        >
          추가
        </AddButton>
      </TopSection>

      <Table>
        <HeaderRow>
          <Cell>상품번호</Cell>
          <Cell>상품이미지</Cell>
          <Cell>상품명</Cell>
          <Cell>상품가격</Cell>
          <Cell>남은수량</Cell>
          <Cell>공개여부</Cell>
          <Cell></Cell>
        </HeaderRow>

        {products.map((product) => (
          <Row key={product.productNo}>
            <Cell>{product.productNo}</Cell>

            <ProductImage src={product.image} alt={product.productName} />

            <Cell>{product.productName}</Cell>

            <Cell>{(-product.price).toLocaleString()} P</Cell>

            <Cell>{product.amount}개</Cell>

            <Cell>{product.status === "Y" ? "공개" : "비공개"}</Cell>

            <ButtonGroup>
              {product.status === "Y" ? (
                <>
                  <UpdateButton
                    onClick={() => {
                      setSelectedProduct({ ...product });
                      setUpdateModal(true);
                    }}
                  >
                    수정
                  </UpdateButton>

                  <DeleteButton
                    onClick={() => {
                      setSelectedProduct(product);
                      setDeleteModal(true);
                    }}
                  >
                    삭제
                  </DeleteButton>
                </>
              ) : (
                <RestoreButton
                  onClick={() => {
                    onRestore(product);
                  }}
                >
                  복구
                </RestoreButton>
              )}
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
      {insertModal && (
        <ModalOverlay onClick={() => setInsertModal(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalTitle>상품 추가</ModalTitle>

            <PreviewImage
              src={
                newProduct.imageFile
                  ? URL.createObjectURL(newProduct.imageFile)
                  : "/images/no-image.png"
              }
            />

            <HiddenFileInput
              id="insertImage"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  imageFile: e.target.files?.[0],
                })
              }
            />

            <FileButton htmlFor="insertImage">이미지 선택</FileButton>

            <InputGroup>
              <InputLabel>상품명</InputLabel>
              <Input
                value={newProduct.productName}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    productName: e.target.value,
                  })
                }
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>상품 가격</InputLabel>
              <Input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value,
                  })
                }
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>재고 수량</InputLabel>
              <Input
                type="number"
                value={newProduct.amount}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    amount: e.target.value,
                  })
                }
              />
            </InputGroup>

            <ModalButtonGroup>
              <CancelButton onClick={() => setInsertModal(false)}>
                취소
              </CancelButton>

              <SaveButton onClick={onInsert}>추가</SaveButton>
            </ModalButtonGroup>
          </ModalContainer>
        </ModalOverlay>
      )}
      {updateModal && selectedProduct && (
        <ModalOverlay onClick={() => setUpdateModal(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalTitle>상품 수정</ModalTitle>

            <PreviewImage
              src={
                selectedProduct.imageFile
                  ? URL.createObjectURL(selectedProduct.imageFile)
                  : selectedProduct.image
              }
              alt={selectedProduct.productName}
            />

            <HiddenFileInput
              id="productImage"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  imageFile: e.target.files?.[0],
                })
              }
            />

            <FileButton htmlFor="productImage">이미지 변경</FileButton>

            <InputGroup>
              <InputLabel>상품명</InputLabel>
              <Input
                value={selectedProduct.productName}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    productName: e.target.value,
                  })
                }
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>상품 가격</InputLabel>
              <Input
                type="number"
                value={-selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: -Number(e.target.value),
                  })
                }
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>재고 수량</InputLabel>
              <Input
                type="number"
                value={selectedProduct.amount}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    amount: Number(e.target.value),
                  })
                }
              />
            </InputGroup>

            <ModalButtonGroup>
              <CancelButton onClick={() => setUpdateModal(false)}>
                취소
              </CancelButton>

              <SaveButton onClick={onUpdate}>저장</SaveButton>
            </ModalButtonGroup>
          </ModalContainer>
        </ModalOverlay>
      )}
      {deleteModal && selectedProduct && (
        <ModalOverlay onClick={() => setDeleteModal(false)}>
          <DeleteModalContainer onClick={(e) => e.stopPropagation()}>
            <DeleteTitle>상품 삭제</DeleteTitle>

            <DeleteMessage>
              <strong>{selectedProduct.productName}</strong>
              <br />
              상품을 정말 삭제하시겠습니까?
            </DeleteMessage>

            <DeleteButtonGroup>
              <CancelButton onClick={() => setDeleteModal(false)}>
                취소
              </CancelButton>

              <DeleteConfirmButton onClick={onDelete}>삭제</DeleteConfirmButton>
            </DeleteButtonGroup>
          </DeleteModalContainer>
        </ModalOverlay>
      )}
    </Main>
  );
};

export default AdminProducts;
