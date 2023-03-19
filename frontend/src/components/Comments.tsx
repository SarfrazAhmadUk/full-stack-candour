import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDebounceEffect } from '../hooks/useDebounceEffect';
import { Comment } from '../types/Comment';
import { sendRequest } from '../utils/api';
import CommentsTable from './CommentsTable';

function Comments() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    sort: 'created_at:desc'
  });
  const debouncedSearchTerm = useDebounceEffect(filters.search, 500);

  async function loadComments() {
    setIsLoading(true);
    try {
      const qs = new URLSearchParams(filters).toString();
      const { data } = await sendRequest(`/comments?${qs}`);
      setComments(data.data);
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        text: error.message ?? 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(
    () => {
      loadComments();
    },
    [debouncedSearchTerm, filters.sort]
  );

  function handleParamChange(key: 'search' | 'sort', value: string) {
    setFilters({
      ...filters,
      [key]: value
    })
  }

  return (
    <div className='container'>
      <div className='header'>
        <h1>Comments</h1>
        <div className='filters'>
          <input type='search' placeholder='Search...' value={filters.search} onChange={(e) => handleParamChange('search', e.target.value)} />
          <select name='sort' value={filters.sort} onChange={(e) => handleParamChange('sort', e.target.value)}>
            <option value='name:asc'>Name (A-Z)</option>
            <option value='name:desc'>Name (Z-A)</option>
            <option value='created_at:desc'>Oldest</option>
          </select>
        </div>
      </div>
      {
        isLoading
          ? 'Loading...'
          : <CommentsTable comments={comments} loadComments={loadComments} />
      }
    </div>
  )
}

export default Comments;
