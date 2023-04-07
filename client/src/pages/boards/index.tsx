import { Link, NavLink } from 'react-router-dom';
import { useGetBoardsQuery } from '../../entities/board/hooks/use-get-boards-query';
import { InlineForm } from '../../shared/components/inline-form';
import { useCallback } from 'react';
import { useCreateBoardMutation } from '../../entities/board/hooks/use-create-board-mutation';
import { TopBar } from '../../features/top-bar';

export const BoardsPage: React.FC = () => {
  const { getBoardsData } = useGetBoardsQuery();

  const { createBoardMutate } = useCreateBoardMutation();

  const createBoard = useCallback(
    (title: string) => createBoardMutate(title),
    []
  );

  return (
    <>
      <TopBar />
      <div className="boards-page-container">
        <div className="home-left-sidebar-container">
          <NavLink className="boards-side-menu-option" to="/boards">
            {({ isActive }) => (
              <span
                className={
                  isActive ? 'boards-side-menu-option-selected' : undefined
                }
              >
                Boards
              </span>
            )}
          </NavLink>

          <NavLink className="boards-side-menu-option" to="/">
            {({ isActive }) => (
              <span
                className={
                  isActive ? 'boards-side-menu-option-selected' : undefined
                }
              >
                Home
              </span>
            )}
          </NavLink>
        </div>

        <div className="boards-section-container">
          <div className="my-boards">
            <div className="my-boards-section-header">
              <div className="boards-page-header-name">My boards</div>
            </div>

            <div className="board-tile-list">
              <InlineForm
                className="create-board-form"
                defaultText="Create new board"
                onSubmit={createBoard}
              />
              {getBoardsData &&
                getBoardsData.map((board) => (
                  <Link
                    key={board.id}
                    className="board-tile"
                    to={`/boards/${board.id}`}
                  >
                    <div className="board-tile-details-name">{board.title}</div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
