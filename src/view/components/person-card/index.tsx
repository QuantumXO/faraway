import React, { memo, ReactElement } from 'react';
import { IPerson } from '../../../types';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const Card = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '1px solid rgba(0, 0, 0, 0.08)',
  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
}));
const ListItemLabel = styled(ListItemText)(({ theme }) => ({
  color: '#1976d2',
  fontWeight: 700,
  maxWidth: 150,
}));

const ListItemValue = styled(Typography)(({ theme }) => ({
  color: '#000000',
}));

const PersonCard = (props: IPerson): ReactElement => {
  const { name, birth_year, gender }: IPerson = props;
  return (
    <Grid item xs={5} minWidth={325}>
      <Card>
        <Typography color="#000000" fontWeight="600" textAlign="left" variant="h6">{name}</Typography>
        <List>
          <ListItem disablePadding>
            <ListItemLabel primary="Gender: " />
            <ListItemValue>{gender}</ListItemValue>
          </ListItem>
          <ListItem disablePadding>
            <ListItemLabel primary="Birthday year: " />
            <ListItemValue>{birth_year}</ListItemValue>
          </ListItem>
        </List>
      </Card>
    </Grid>
  );
};

export default memo(PersonCard);