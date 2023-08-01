import React, { ReactElement, useState, useEffect, ChangeEvent } from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import PersonCard from './components/person-card';
import Grid from '@mui/material/Grid';
import { IPerson, IPeopleRequest } from '../types';
import CircularProgress from '@mui/material/CircularProgress';
import useDebounce from '../services/hooks/use-debounce';

import '../assets/index.css';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '100%',
  color: 'inherit',
  '& .MuiInputBase-input': {
    height: '36px',
    margin: '0 auto',
    color: '#000000',
    fontSize: 16,
    borderRadius: 5,
    border: '2px solid rgba(0, 0, 0, 0.08)',
    padding: theme.spacing(1),
    transition: theme.transitions.create('width'),
    '&:focus, &:not([disabled]):hover': {
      borderColor: '#1976d2',
    },
  },
}));
const API_BASE_URL: string = 'https://swapi.dev/api';
const SEARCH_PATTERN: RegExp = /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{1,240}$/;

function App(): ReactElement {
  const [search, handleSearch] = useState<string>('');
  const [peopleRequest, handlePeopleRequest] = useState<null | IPeopleRequest>(() => null);
  const [currentPage, setCurrentPage] = useState<number>(() => 1);
  const [loading, toggleLoading] = useState<boolean>(() => false);
  
  const {
    results: people = [],
    next,
    previous,
    count: pagesCount
  } = peopleRequest || {} as IPeopleRequest;
  
  const onGetPeople = async (): Promise<void> => {
    try {
      toggleLoading(true);
      
      const response: Response = await fetch(`${API_BASE_URL}/people/?page=${currentPage}`);
      
      const data: IPeopleRequest = await response.json();
      
      handlePeopleRequest(data);
    } catch (e) {
      console.log(e);
    } finally {
      toggleLoading(false);
    }
  };
  
  useEffect((): void => {
    onGetPeople();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  
  const onAPIPersonSearch = async (): Promise<void> => {
    if (search.length) {
      const isValidSearch: boolean = SEARCH_PATTERN.test(search);
      if (isValidSearch) {
        try {
          toggleLoading(true);
          
          const response: Response = await fetch(`${API_BASE_URL}/people/?search=${search}`);
          
          const data: IPeopleRequest = await response.json();
          
          handlePeopleRequest(data);
        } catch (e) {
          console.log(e);
        } finally {
          toggleLoading(false);
        }
      }
    } else {
      await onGetPeople();
    }
  };
  
  useDebounce(onAPIPersonSearch, [search], 300);
  
  const onSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const { target: { value } } = e;
    handleSearch(value);
  };
  
  const onHandlePagination = (event: ChangeEvent<unknown>, page: number): void => setCurrentPage(page);
  
  const renderHeader = (): ReactElement => {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Faraway. Sikorskiy Dmitriy
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };
  
  const renderSearch = (): ReactElement => {
    return (
      <Box
        sx={{ width: '100%' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StyledInputBase
          disabled={loading}
          value={search}
          onChange={onSearch}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Box>
    );
  };
  
  const renderPeopleList = (): ReactElement => {
    let layout: ReactElement = <Typography component="p">Person not found...</Typography>;
    if (!loading && people?.length) {
      layout = (
        <Grid container spacing={2} justifyContent="space-around">
          {people.map((item: IPerson, index: number): ReactElement => {
            return <PersonCard key={index} {...item}/>;
          })}
        </Grid>
      );
    }
    return layout;
  };
  
  const renderNavigation = (): ReactElement | null => {
    let layout: ReactElement | null = null;
    if (pagesCount) {
      const count: number = Math.ceil(pagesCount / 10);
      layout = (
        <Pagination
          count={count}
          page={currentPage}
          hideNextButton={!next}
          hidePrevButton={!previous}
          onChange={onHandlePagination}
        />
      );
    }
    return layout;
  };
  
  return (
    <Box paddingBottom={10}>
      {renderHeader()}
      <Box
        gap={4}
        flexShrink={1}
        maxWidth={640}
        display="flex"
        margin="32px auto 0"
        flexDirection="column"
        alignItems="center"
      >
        {renderSearch()}
        {loading
          ? <CircularProgress/>
          : (
            <>
              {renderPeopleList()}
              {renderNavigation()}
            </>
          )
        }
      </Box>
    </Box>
  );
}

export default App;
