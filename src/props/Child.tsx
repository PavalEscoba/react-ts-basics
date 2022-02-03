interface ChildProps {
  color: string;
  onClick: () => void;
}

export const Child = ({ color }: ChildProps) => {
  return <div className={color}>I'm a child</div>;
};

export const ChildAsFC: React.FC<ChildProps> = ({ color, onClick, children }) => {
  return (
    <div>
      <div className={color}>I'm a child</div>
      <button onClick={onClick}>Click me</button>
      {children}
    </div>
  );
};
