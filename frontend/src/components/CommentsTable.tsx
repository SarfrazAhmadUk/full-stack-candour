import Swal from 'sweetalert2';
import { Comment } from '../types/Comment';
import { sendRequest } from '../utils/api';
import Status from './Status';

interface ICommentsTableProps {
  comments: Comment[];
  loadComments: () => void;
}

function CommentsTable({ comments, loadComments }: ICommentsTableProps) {

  async function toggleStatus(comment: Comment) {
    if (comment.approved) {
      Swal.fire({
        text: 'Comment is already approved.',
        icon: 'info',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      await sendRequest(`/comments/${comment.id}/approve`, 'PATCH');
      Swal.fire({
        title: 'Success',
        text: 'Comment approved successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      loadComments();
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        text: error.message ?? 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Comment</th>
        <th>Approved</th>
      </tr>
      {
        comments.length
          ? comments.map((comment) => {
            return <tr>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>
                <div dangerouslySetInnerHTML={{ __html: comment.comment }}></div>
              </td>
              <td>
                <Status
                  approved={comment.approved}
                  handleClick={() => toggleStatus(comment)}
                />
              </td>
            </tr>
          })
          : (
            <tr>
              <td colSpan={4}>No records available.</td>
            </tr>
          )
      }
    </table>
  )
}

export default CommentsTable
