import React from 'react';
import { Icon } from 'components/icons';
import * as TextStyled from 'components/text/styles';
import { StorySortState } from '../../types'
import styled from 'styled-components';

const FlexRow = styled.div`
display:flex
`

const StorySorter = ({ sortState, toggleSortState } : { 
  sortState:StorySortState,
  toggleSortState:(label:string)=>void 
}) => {
  return (<FlexRow>
    <div style={{ marginRight: 'auto' }}>
      <StorySorterItem
        label="Title"
        sortState={sortState}
        toggleSort={() => toggleSortState('Title')} />
    </div>
    <div style={{ width: '12%' }}>
      <StorySorterItem
        label="Comments"
        sortState={sortState}
        toggleSort={() => toggleSortState('Comments')} />
    </div>
    <div style={{ width: '12%' }}>
      <StorySorterItem
        label="Points"
        sortState={sortState}
        toggleSort={() => toggleSortState('Points')} />
    </div>
    <div style={{ width: '10%' }} />
  </FlexRow>)
}


const StorySorterItem = ({ label, sortState, toggleSort }: {
  label: string,
  sortState: StorySortState,
  toggleSort: () => void
}) => {
  const isSortingAsc = sortState.column === label && sortState.direction === 'asc';
  const isSortingDesc = sortState.column === label && sortState.direction === 'desc';
  return (<FlexRow>
    <TextStyled.Semibold >{label}</TextStyled.Semibold>
    <div onClick={toggleSort} style={{ cursor: 'pointer' }}>
      <Icon icon="long-arrow-alt-up" color={isSortingAsc ? "inherit" : "#aaa"} />
      <Icon icon="long-arrow-alt-down" color={isSortingDesc ? "inherit" : "#aaa"} />
    </div>

  </FlexRow>)
}

export default StorySorter