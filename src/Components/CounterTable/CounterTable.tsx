import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import counterStore from '../../store/CounterStore';

const ITEMS_PER_PAGE = 20;

const CounterTable: React.FC = observer(() => {
  useEffect(() => {
    counterStore.fetchCounters(0, ITEMS_PER_PAGE);
  }, []);

  useEffect(() => {
    counterStore.fetchCounters((counterStore.currentPage - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
  }, [counterStore.currentPage]);

  const handleDelete = (meterId: string) => {
    counterStore.deleteCounter(meterId);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    counterStore.setCurrentPage(value);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell>Дата установки</TableCell>
              <TableCell>Автоматический</TableCell>
              <TableCell>Текущие показания</TableCell>
              <TableCell>Адрес</TableCell>
              <TableCell>Примечание</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {counterStore.counterList.map((counter, index) => (
              <TableRow
                key={counter.id}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer',
                  },
                }}
              >
                <TableCell>{(counterStore.currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                <TableCell>{'Неизвестно'}</TableCell>
                <TableCell>{new Date(counter.installation_date).toLocaleDateString()}</TableCell>
                <TableCell>{counter.is_automatic ? 'да' : 'нет'}</TableCell>
                <TableCell>{counter.initial_values[0]}</TableCell>
                <TableCell>{counterStore.addressMap[counter.area.id] || 'не указан'}</TableCell>
                <TableCell>{counter.description || 'Примечание отсутствует'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(counter.id)}>
                    <DeleteIcon sx={{ color: 'grey', '&:hover': { color: 'red' } }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(counterStore.totalItems / ITEMS_PER_PAGE)}
          page={counterStore.currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Box>
    </div>
  );
});

export default CounterTable;
