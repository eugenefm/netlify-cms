import React, { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import getMockData from '../utils/getMockData';

import Table from '.';
import Icon from '../Icon';
import { Menu, MenuItem } from '../Menu';

const Title = styled.div`
  font-weight: bold;
`;
const Subtitle = styled.div`
  font-size: 12px;
`;

export default {
  title: 'Components/Table',
  decorators: [withKnobs],
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.background};
`;

const FeaturedImage = styled.div`
  background-image: url(${({ srcUrl }) => srcUrl});
  background-size: cover;
  background-position: center center;
  bacnkground-repeat: no-repeat;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 6px;
`;
const FeaturedIcon = styled(Icon)`
  stroke: none;
  fill: #ffc762;
`;
FeaturedIcon.defaultProps = {
  size: 'sm',
  name: 'star',
};

export const _Table = () => {
  const mockData = React.useMemo(() => getMockData('post', 32), []);

  console.log('mockData', mockData);

  const columns = React.useMemo(() => [
    {
      id: 'featured',
      Cell({ row: { original: rowData } }) {
        return <>{rowData.featured && <FeaturedIcon />}</>;
      },
      minWidth: 32,
      width: '32px',
      maxWidth: 32,
    },
    {
      id: 'featuredImage',
      Cell({ row: { original: rowData } }) {
        return <FeaturedImage srcUrl={rowData.featuredImage.small} />;
      },
      // minWidth: 56,
      width: '56px',
      // maxWidth: 56,
    },
    {
      Header: 'Title',
      Cell({ row: { original: rowData } }) {
        return (
          <>
            <Title>{rowData.title}</Title>
            <Subtitle>{rowData.description}</Subtitle>
          </>
        );
      },
      width: 'auto',
    },
    {
      Header: 'Category',
      accessor: 'category',
      width: '10%',
    },
    {
      Header: 'Status',
      accessor: 'status',
      width: '10%',
    },
    {
      Header: 'Date Modified',
      accessor: 'dateModified',
      width: '15%',
    },
    {
      Header: 'Date Created',
      accessor: 'dateCreated',
      width: '15%',
    },
    {
      Header: 'Author',
      accessor: 'author',
      width: '10%',
    },
  ]);
  const onClick = boolean('onClick', true);

  return (
    <Wrap>
      <Table
        columns={columns}
        data={mockData}
        onClick={onClick ? rowData => alert(`You just clicked table row ${rowData.id}.`) : null}
        renderMenu={({ rowData, anchorEl, closeMenu }) => (
          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={closeMenu}
            anchorOrigin={{ x: 'right', y: 'bottom' }}
            transformOrigin={{ x: 'right', y: 'top' }}
          >
            <MenuItem
              icon="edit-3"
              onClick={() => {
                console.log(rowData);
                alert(`Editing post ${rowData.id}.`);
                closeMenu();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              icon="copy"
              onClick={() => {
                alert(`Duplicating post ${rowData.id}.`);
                closeMenu();
              }}
            >
              Duplicate
            </MenuItem>
            <MenuItem
              icon="trash-2"
              type="danger"
              onClick={() => {
                alert(`Deleting post ${rowData.id}.`);
                closeMenu();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        )}
      />
    </Wrap>
  );
};

_Table.story = {
  name: 'Table',
};
