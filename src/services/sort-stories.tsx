import { StorySortState, Story } from "domain/search/types";
const sortStories = (sortState:StorySortState, stories:Story[]) : Story[] => {
    switch (sortState.column) {
        case 'Title':
            return stories.sort((a, b) => {
                if ((a.title || '') > (b.title || '')) return (sortState.direction === 'asc' ? 1 : -1);
                if ((a.title || '') < (b.title || '')) return (sortState.direction === 'asc' ? -1 : 1);
                return 0;
            });
        case 'Comments':
            return stories.sort((a, b) => {
                if ((a.num_comments || 0) > (b.num_comments || 0)) return (sortState.direction === 'asc' ? 1 : -1);
                if ((a.num_comments || 0) < (b.num_comments || 0)) return (sortState.direction === 'asc' ? -1 : 1);
                return 0;
            });
        case 'Points':
            return stories.sort((a, b) => {
                if ((a.points || 0) > (b.points || 0)) return (sortState.direction === 'asc' ? 1 : -1);
                if ((a.points || 0) < (b.points || 0)) return (sortState.direction === 'asc' ? -1 : 1);
                return 0;
            });
        default:
            return stories;
    }
}

export default sortStories;