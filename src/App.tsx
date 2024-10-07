// src/App.tsx
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import CounterTable from './Components/CounterTable/CounterTable';
import counterStore from './store/CounterStore';

function App() {
  useEffect(() => {
    counterStore.fetchCounters(0, 20);
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="#000000" p={2} sx={{ textAlign: 'start' }}>
        Список счетчиков
      </Typography>
      <CounterTable />
    </Box>
  );
}

export default App;
