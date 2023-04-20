import closeIcon from 'shared/assets/close_icon.svg';
import trashIcon from 'shared/assets/trash.svg';
import { useNavigate, useParams } from 'react-router-dom';

export const BoardPageWithTaskModal: React.FC = () => {
  const { boardId, taskId } = useParams();
  const navigate = useNavigate();

  const goToBoard = () => {
    if (boardId) {
      navigate(`/boards/${boardId}`);
    }
  };

  return (
    <div className="task-modal">
      <div className="task-modal-container">
        <div className="task-modal-header">
          TASK TITLE INLINE FORM
          <img
            src={closeIcon}
            alt="close-icon"
            className="task-modal-close"
            onClick={goToBoard}
          />
        </div>
        <div className="task-modal-body">
          <div>
            <form className="column-select-container">SELECT COLUMN</form>
            <div className="task-modal-description">
              <div className="task-modal-description-label">Description</div>
              INLINE FORM DESCRIPTION
            </div>
          </div>
          <div className="task-modal-actions">
            <div className="task-modal-actions-label">Actions</div>
            <div>
              <div className="task-modal-actions-action">
                <img
                  src={trashIcon}
                  alt="trash-icon"
                  className="task-modal-actions-icon"
                />
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="task-modal-backdrop"></div>
    </div>
  );
};
