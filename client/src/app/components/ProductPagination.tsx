import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../model/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function Paginations({ metaData, onPageChange }: Props) {
  const { currentPage, totalCount, totalPage, pageSize } = metaData;
  const _page1 = (currentPage - 1) * pageSize + 1;
  const _page2 =
    currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize;
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        Displaying {_page1}-{_page2} of {totalCount} items
      </Typography>
      <Pagination
        color="secondary"
        size="large"
        count={totalPage}
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
      />
    </Box>
  );
}
