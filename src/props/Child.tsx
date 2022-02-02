interface ChildProps {
  color: string;
}

export const Child = ({ color }: ChildProps) => {
  return <div className='div'>I'm a child</div>;
};
