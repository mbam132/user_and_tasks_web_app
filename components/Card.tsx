import { ReactNode } from 'react';

interface IProps {
  title: string;
  children: ReactNode;
}

function Card({ title, children }: IProps) {
  return (
    <div className="flex flex-col gap-y-1.5 w-fit border-primary-100 border-2 rounded-md px-2 pt-6 pb-11 px-7 items-center h-fit mx-auto">
      <h1 className="text-xl text-center text-terciary-100">{title}</h1>
      {children}
    </div>
  );
}

export default Card;
