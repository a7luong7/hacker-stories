import Chip from 'components/chip'
import { Styleless as StyelessButton } from 'components/button/styles'
import styled from 'styled-components'

const LastSearches = ({ searchedTerms, appendToSearchedTerms } : { 
    searchedTerms:string[],
    appendToSearchedTerms: (search:string) => void
}) => {
    return (<div style={{ marginTop: '1rem' }}>
        <label style={{ marginRight:'1rem' }}>Last Searches: </label>
        {searchedTerms.map(search => <LastSearch searchTerm={search} appendToSearchedTerms={appendToSearchedTerms} />)}
    </div>)
}

const ChipButton = styled(Chip)`
    margin-right:0.5rem;
    cursor:pointer;

    &:hover {
        -webkit-filter: brightness(90%);
    }
`

const LastSearch = ({ searchTerm,appendToSearchedTerms }:{ 
    searchTerm:string,
    appendToSearchedTerms: (search:string) => void
 }) => {
    return (<StyelessButton type="button" onClick={()=>appendToSearchedTerms(searchTerm)}>
        <ChipButton color="light">{searchTerm}</ChipButton>
    </StyelessButton>)
}

export default LastSearches;