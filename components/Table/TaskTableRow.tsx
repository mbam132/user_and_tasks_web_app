import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RiDeleteBinLine } from 'react-icons/ri';
import GQLClient from '../../services/GQLClient';
import useThrottle from '../../hooks/useThrottle';
import { updateTask, deleteTask } from '../../store';
import { msIntervalBetweenCalls } from '../../utils/constants';
import { ITask } from '../../utils/types';

interface IProps {
  item: ITask;
}

function TaskListItem({ item }: IProps) {
  const dispatch = useDispatch();
  const [completedIsLoading, setCompletedIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handlePersistCompleted = async (checked: boolean) => {
    const mutationName = 'modifyTask';
    const mutation = `
      mutation {
        ${mutationName}(completed: ${checked}, id: ${+item.id}){
          ...on Error{
            message
          }
          ...on MutationModifyTaskSuccess{
            data
          }
        }
      }
    `;

    const requestResult: any = await GQLClient.request(mutation);

    const anErrorOcurred: boolean = !!requestResult[mutationName].message;

    if (anErrorOcurred) {
      throw new Error(requestResult[mutationName].message);
    }
  };

  const handleSetCompleted = async (event) => {
    setCompletedIsLoading(true);
    const newValue: boolean = event.target.checked;
    await handlePersistCompleted(newValue);

    dispatch(updateTask({ ...item, completed: newValue }));
    setCompletedIsLoading(false);
  };

  const handleDeleteTask = async () => {
    setIsDeleting(true);
    const mutationName = 'deleteTask';
    const mutation = `
      mutation {
        ${mutationName}(id: ${item.id}){
          ...on Error{
            message
          }
          ...on MutationDeleteTaskSuccess{
            data{
              name
            }
          }
        }
      }
    `;

    const requestResult: any = await GQLClient.request(mutation);

    const anErrorOcurred: boolean = !!requestResult[mutationName].message;

    if (anErrorOcurred) {
      setIsDeleting(false);
      throw new Error(requestResult[mutationName].message);
    }

    setIsDeleting(false);
    dispatch(deleteTask(item.id));
  };

  const { throttledCallback: throttledSetCompleted } = useThrottle({
    callback: handleSetCompleted,
    ms: msIntervalBetweenCalls,
  });

  const { throttledCallback: throttledDeleteTask } = useThrottle({
    callback: handleDeleteTask,
    ms: msIntervalBetweenCalls,
  });

  return (
    <tr>
      <td className="px-3 py-1.5 text-left text-terciary-100">{item.name}</td>
      <td className="px-3 py-1.5 text-left text-terciary-100">
        {new Date(item.createdAt).toLocaleString('es-ar')}
      </td>
      <td className="px-3 py-1.5 text-left flex items-center gap-x-1 h-[33px]">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={throttledSetCompleted}
          className="w-4 h-4 text-primary-100 bg-white border-secondary-100 rounded focus:ring-0"
        />
        {completedIsLoading ? (
          <div className="loading-spinner sm-spinner red-spinner" />
        ) : (
          <div className="w-[10px] h-[10px]" />
        )}
      </td>
      <td>
        <div className="flex items-center gap-x-1">
          <button type="button" onClick={throttledDeleteTask}>
            <RiDeleteBinLine className="text-primary-100 w-[18px] h-[18px] cursor-pointer	" />
          </button>
          {isDeleting ? (
            <div className="loading-spinner sm-spinner red-spinner" />
          ) : (
            <div className="w-[10px] h-[10px]" />
          )}
        </div>
      </td>
    </tr>
  );
}

export default TaskListItem;
